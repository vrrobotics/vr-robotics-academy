/**
 * Razorpay Payment Service
 * Handles payment processing for demo bookings
 */

import { GoogleSheetsService } from '@/services/googleSheetsService';
import { BaseCrudService } from '@/integrations';
import { EmailService } from '@/services/emailService';

interface RazorpayOptions {
  amount: number; // Amount in minor units of `currency` (e.g. 100 cents = USD 1)
  currency?: string;
  description?: string;
  name?: string;
  flowType?: 'demo' | 'session';
  notes?: Record<string, string>;
  prefillEmail?: string;
  prefillPhone?: string;
  prefillName?: string;
  onSuccess?: (response: any) => void;
  onError?: (error: any) => void;
}

export interface DemoBookingDetails {
  parentName?: string;
  email?: string;
  phone?: string;
  childName?: string;
  childAge?: string;
  preferredDate?: string;
  preferredTime?: string;
  interests?: string;
  message?: string;
}

interface PlanPaymentOptions {
  planName: string;
  billingMode: 'session' | 'month';
  amountUsd: number;
  actionLabel?: string;
  onSuccess?: (response: any) => void;
  onError?: (error: any) => void;
}

interface DemoDetailsFormConfig {
  title?: string;
  subtitle?: string;
  submitText?: string;
}

interface RazorpayOrderResponse {
  id: string;
  amount: number;
  currency: string;
}

interface ClientRegionContext {
  countryCode: string;
  preferredCurrency: string;
}

  export class RazorpayService {
  private static readonly KEY_ID =
    ((import.meta as any)?.env?.VITE_RAZORPAY_KEY_ID as string) || '';
  
  // Dedicated session payment key (for pricing page sessions)
  private static readonly SESSION_KEY_ID =
    ((import.meta as any)?.env?.VITE_RAZORPAY_SESSION_KEY_ID as string) ||
    ((import.meta as any)?.env?.VITE_RAZORPAY_KEY_ID as string) ||
    '';
  
  private static readonly SCRIPT_URL = 'https://checkout.razorpay.com/v1/checkout.js';
  private static readonly DEMO_DETAILS_STORAGE_KEY = 'vr_demo_booking_details';
  private static readonly SESSION_DETAILS_STORAGE_KEY = 'vr_session_enrollment_details';
  private static readonly SHEETS_SYNC_KEY_PREFIX = 'vr_sheets_synced_';

  private static readonly PRODUCT_DESCRIPTION =
    'VR Robotics demo class booking for students. Hands-on robotics and AI learning session.';

  private static toRazorpayDescription(value?: string): string {
    const fallback = this.PRODUCT_DESCRIPTION;
    const raw = (value || fallback).trim();
    return raw.length > 255 ? raw.slice(0, 252) + '...' : raw;
  }

  private static loadRazorpayScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if ((window as any).Razorpay) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = this.SCRIPT_URL;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load Razorpay script'));
      document.body.appendChild(script);
    });
  }

  private static sanitizeNoteValue(value?: string): string {
    const normalized = (value || '').trim();
    return normalized.length > 255 ? normalized.slice(0, 255) : normalized;
  }

  static storeDemoBookingDetails(details: DemoBookingDetails): void {
    try {
      if (typeof window === 'undefined') return;
      window.localStorage.setItem(this.DEMO_DETAILS_STORAGE_KEY, JSON.stringify(details || {}));
    } catch (error) {
      console.warn('[Razorpay] Failed to persist demo booking details:', error);
    }
  }

  static getStoredDemoBookingDetails(): DemoBookingDetails {
    try {
      if (typeof window === 'undefined') return {};
      const raw = window.localStorage.getItem(this.DEMO_DETAILS_STORAGE_KEY);
      if (!raw) return {};
      const parsed = JSON.parse(raw);
      return parsed && typeof parsed === 'object' ? parsed : {};
    } catch (error) {
      console.warn('[Razorpay] Failed to read stored demo booking details:', error);
      return {};
    }
  }

  private static getSheetsSyncKey(paymentId: string): string {
    return `${this.SHEETS_SYNC_KEY_PREFIX}${paymentId}`;
  }

  static hasPaymentBeenSyncedToSheets(paymentId?: string): boolean {
    try {
      if (!paymentId || typeof window === 'undefined') return false;
      return window.sessionStorage.getItem(this.getSheetsSyncKey(paymentId)) === '1';
    } catch {
      return false;
    }
  }

  static markPaymentSyncedToSheets(paymentId?: string): void {
    try {
      if (!paymentId || typeof window === 'undefined') return;
      window.sessionStorage.setItem(this.getSheetsSyncKey(paymentId), '1');
    } catch {
      // no-op
    }
  }

  private static async syncPaidBookingToGoogleSheets(paymentResponse: any): Promise<void> {
    const paymentId = paymentResponse?.razorpay_payment_id as string | undefined;
    console.log('[Razorpay] syncPaidBookingToGoogleSheets called with paymentId:', paymentId);
    if (!paymentId) {
      console.warn('[Razorpay] No payment ID found in response');
      return;
    }
    if (this.hasPaymentBeenSyncedToSheets(paymentId)) {
      console.log('[Razorpay] Payment already synced to sheets:', paymentId);
      return;
    }

    const details = this.getStoredDemoBookingDetails();
    const notes = paymentResponse?.razorpay_notes || this.getStoredPaymentNotes() || {};
    console.log('[Razorpay] Retrieved notes:', notes);
    console.log('[Razorpay] Is pricing enrollment?', notes.payment_type === 'session_enrollment');

    try {
      // Check if this is a pricing enrollment by looking at payment notes
      if (notes.payment_type === 'session_enrollment') {
        console.log('[Razorpay] Routing to pricing enrollment sync');
        return this.syncPricingEnrollmentToGoogleSheets(paymentResponse);
      }

      const shouldPersistDemo = notes.persist_demo_after_payment !== '0';
      let bookingId = crypto.randomUUID();
      if (shouldPersistDemo) {
        // Persist paid demo booking to Supabase for all entry points
        // (home page, popups, header button, etc.).
        const demoRecord = {
          _id: bookingId,
          parentname: details.parentName || '',
          parentemail: details.email || '',
          parentphone: details.phone || '',
          childname: details.childName || '',
          childage: details.childAge ? parseInt(details.childAge, 10) : null,
          preferreddate: details.preferredDate || '',
          preferredtime: details.preferredTime || '',
          interests: details.interests || '',
          message: details.message || '',
          status: 'pending'
        };
        await BaseCrudService.create('demosessions', demoRecord);
        console.log('[Razorpay] Demo booking saved to Supabase:', demoRecord._id);
      }

      try {
        await EmailService.sendDemoBookingNotifications({
          parentName: details.parentName || '',
          parentEmail: details.email || '',
          parentPhone: details.phone || '',
          childName: details.childName || '',
          childAge: details.childAge ? parseInt(details.childAge, 10) : 0,
          preferredDate: details.preferredDate || '',
          preferredTime: details.preferredTime || '',
          interests: details.interests || '',
          message: details.message || '',
          paymentId
        });
        console.log('[Razorpay] Demo booking emails sent (admin + parent)');
      } catch (emailError) {
        console.warn('[Razorpay] Demo booking email send failed:', emailError);
      }

      const result = await GoogleSheetsService.appendDemoBooking({
        parentName: details.parentName || '',
        parentEmail: details.email || '',
        parentPhone: details.phone || '',
        childName: details.childName || '',
        childAge: details.childAge || '',
        preferredDate: details.preferredDate || '',
        preferredTime: details.preferredTime || '',
        interests: details.interests || '',
        message: details.message || '',
        bookingId,
        paymentId,
        paymentStatus: 'paid'
      });

      if (result.success) {
        this.markPaymentSyncedToSheets(paymentId);
        console.log('[Razorpay] ✓ Google Sheets synced for paid booking:', paymentId);
      } else {
        console.warn('[Razorpay] Google Sheets sync failed:', result.error || result.message);
      }
    } catch (error) {
      // For paid session enrollments, DB persistence is mandatory.
      if (notes.payment_type === 'session_enrollment') {
        throw error;
      }
      console.warn('[Razorpay] Google Sheets sync error:', error);
    }
  }

  private static async syncPricingEnrollmentToGoogleSheets(paymentResponse: any): Promise<void> {
    const paymentId = paymentResponse?.razorpay_payment_id as string | undefined;
    console.log('[Razorpay] syncPricingEnrollmentToGoogleSheets called:', paymentId);
    if (!paymentId) {
      console.warn('[Razorpay] No payment ID in pricing enrollment sync');
      return;
    }

    const notes = paymentResponse?.razorpay_notes || this.getStoredPaymentNotes() || {};
    const details = this.getStoredDemoBookingDetails();
    console.log('[Razorpay] Pricing enrollment - notes:', notes);
    console.log('[Razorpay] Pricing enrollment - details:', details);

    try {
      const enrollmentRecord = {
        _id: crypto.randomUUID(),
        paymentid: paymentId,
        paymentstatus: 'paid',
        studentname: details.childName || details.parentName || 'Unknown Student',
        studentemail: details.email || 'unknown@example.com',
        studentphone: details.phone || '',
        planname: notes.plan_name || 'Unknown Plan',
        billingmode: (notes.billing_mode as 'session' | 'month') || 'session',
        amountusd: parseFloat(notes.amount_usd) || 0,
        source: 'program_fees',
        enrolledat: new Date().toISOString()
      };

      await BaseCrudService.create('sessionenrollments', enrollmentRecord);
      console.log('[Razorpay] Session enrollment saved to Supabase:', enrollmentRecord._id);
      try {
        await EmailService.sendSessionEnrollmentNotifications({
          parentName: details.parentName || 'Parent',
          parentEmail: details.email || 'unknown@example.com',
          parentPhone: details.phone || '',
          studentName: details.childName || details.parentName || 'Student',
          planName: notes.plan_name || 'Unknown Plan',
          billingMode: ((notes.billing_mode as 'session' | 'month') || 'session'),
          amountUsd: parseFloat(notes.amount_usd) || 0,
          paymentId
        });
        console.log('[Razorpay] Session enrollment emails sent (admin + parent)');
      } catch (emailError) {
        console.warn('[Razorpay] Session enrollment email send failed:', emailError);
      }
      console.log('[Razorpay] 🚀 Starting pricing enrollment sync to Google Sheets:', {
        paymentId,
        planName: notes.plan_name,
        billingMode: notes.billing_mode,
        studentName: details.childName || details.parentName,
        studentEmail: details.email
      });

      const result = await GoogleSheetsService.appendPricingEnrollment({
        studentName: details.childName || details.parentName || 'Unknown Student',
        studentEmail: details.email || 'unknown@example.com',
        studentPhone: details.phone || '',
        planName: notes.plan_name || 'Unknown Plan',
        planBillingMode: (notes.billing_mode as 'session' | 'month') || 'session',
        planAmount: parseFloat(notes.amount_usd) || 0,
        paymentId
      });
      console.log('[Razorpay] appendPricingEnrollment returned:', result);

      if (result.success) {
        this.markPaymentSyncedToSheets(paymentId);
        console.log('[Razorpay] ✅✅✅ PRICING ENROLLMENT SUCCESSFULLY SYNCED ✅✅✅', paymentId);
      } else {
        console.error('[Razorpay] ❌ Pricing enrollment sync FAILED:', result.error || result.message);
      }
    } catch (error) {
      console.error('[Razorpay] Pricing enrollment sync error:', error);
      throw error;
    }
  }

  private static getStoredPaymentNotes(): any {
    if (typeof window === 'undefined') return null;
    try {
      const stored = window.sessionStorage.getItem('razorpay_payment_notes');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }

  private static storePaymentNotes(notes: any): void {
    if (typeof window === 'undefined') return;
    try {
      window.sessionStorage.setItem('razorpay_payment_notes', JSON.stringify(notes));
    } catch {
      // no-op
    }
  }

  private static hasRequiredDemoDetails(details: DemoBookingDetails): boolean {
    return Boolean(
      details.parentName &&
      details.email &&
      details.phone &&
      details.childName &&
      details.childAge &&
      details.preferredDate &&
      details.preferredTime
    );
  }

  private static async requestDemoDetailsFromUI(
    initial: DemoBookingDetails,
    formConfig?: DemoDetailsFormConfig
  ): Promise<DemoBookingDetails> {
    if (typeof window === 'undefined') return initial;

    return new Promise<DemoBookingDetails>((resolve, reject) => {
      let settled = false;

      const cleanup = () => {
        window.removeEventListener('vr:demo-details-submitted', onSubmitted as EventListener);
        window.removeEventListener('vr:demo-details-cancelled', onCancelled as EventListener);
      };

      const onSubmitted = (event: CustomEvent<any>) => {
        if (settled) return;
        settled = true;
        cleanup();
        const payload = event.detail;
        const submitted =
          payload && typeof payload === 'object' && payload.details && typeof payload.details === 'object'
            ? payload.details
            : payload;
        resolve(submitted || {});
      };

      const onCancelled = () => {
        if (settled) return;
        settled = true;
        cleanup();
        reject(new Error('Demo details form was cancelled.'));
      };

      window.addEventListener('vr:demo-details-submitted', onSubmitted as EventListener);
      window.addEventListener('vr:demo-details-cancelled', onCancelled as EventListener);

      window.dispatchEvent(
        new CustomEvent('vr:open-demo-details-form', {
          detail: {
            details: initial || {},
            formConfig: formConfig || {}
          }
        })
      );
    });
  }

  private static async ensureDemoBookingDetails(formConfig?: DemoDetailsFormConfig): Promise<DemoBookingDetails> {
    const stored = this.getStoredDemoBookingDetails();
    // Always open details form before payment so the user confirms current data.
    const collected = await this.requestDemoDetailsFromUI(stored, formConfig);
    const merged = {
      ...stored,
      ...(collected || {})
    };
    this.storeDemoBookingDetails(merged);
    return merged;
  }

  private static getClientRegionContext(): ClientRegionContext {
    const envDefaultCountry = (((import.meta as any)?.env?.VITE_DEFAULT_COUNTRY as string) || '').toUpperCase();
    if (envDefaultCountry === 'IN') {
      return { countryCode: 'IN', preferredCurrency: 'INR' };
    }
    if (envDefaultCountry) {
      return { countryCode: envDefaultCountry, preferredCurrency: 'USD' };
    }

    const forcedCountry =
      typeof window !== 'undefined'
        ? (window.localStorage.getItem('vr_force_country') || '').toUpperCase()
        : '';

    if (forcedCountry === 'IN') {
      return { countryCode: 'IN', preferredCurrency: 'INR' };
    }
    if (forcedCountry && forcedCountry !== 'IN') {
      return { countryCode: forcedCountry, preferredCurrency: 'USD' };
    }

    const locale = typeof navigator !== 'undefined' ? navigator.language || 'en-US' : 'en-US';
    const locales = typeof navigator !== 'undefined' ? navigator.languages || [locale] : [locale];
    const localeParts = locale.split('-');
    let countryCode = (localeParts[1] || '').toUpperCase();

    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    const offsetMinutes = -new Date().getTimezoneOffset(); // e.g. IST => +330
    const isIndiaTimezone =
      timeZone.includes('Asia/Kolkata') ||
      timeZone.includes('Asia/Calcutta') ||
      offsetMinutes === 330;
    const isIndiaLocale = locales.some((l) => l.toUpperCase().includes('-IN'));

    // Prefer explicit India timezone even if browser locale is set to another country.
    if (isIndiaTimezone || isIndiaLocale) {
      countryCode = 'IN';
    } else if (!countryCode) {
      // Fallback for browsers that provide locale without region (e.g. "en")
      countryCode = 'US';
    }

    const preferredCurrency = (() => {
      switch (countryCode) {
        case 'IN': return 'INR';
        case 'GB': return 'GBP';
        case 'AE': return 'AED';
        case 'SG': return 'SGD';
        case 'CA': return 'CAD';
        case 'AU': return 'AUD';
        case 'DE':
        case 'FR':
        case 'IT':
        case 'ES': return 'EUR';
        default: return 'USD';
      }
    })();

    return {
      countryCode,
      preferredCurrency
    };
  }

  private static async createOrder(amount: number, currency: string): Promise<RazorpayOrderResponse> {
    const { countryCode, preferredCurrency } = this.getClientRegionContext();

    const response = await fetch('/api/razorpay/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        amount,
        currency,
        preferredCurrency,
        countryCode
      })
    });

    const payload = await response.json().catch(() => ({}));
    if (!response.ok || !payload?.order?.id) {
      throw new Error(payload?.error || 'Unable to create Razorpay order');
    }

    return payload.order as RazorpayOrderResponse;
  }

  private static async createSessionOrder(
    amount: number,
    currency: string,
    planName?: string,
    billingMode?: 'session' | 'month'
  ): Promise<RazorpayOrderResponse> {
    const { countryCode, preferredCurrency } = this.getClientRegionContext();

    const response = await fetch('/api/razorpay/create-session-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        amount,
        currency,
        preferredCurrency,
        countryCode,
        planName,
        billingMode
      })
    });

    const payload = await response.json().catch(() => ({}));
    if (!response.ok || !payload?.order?.id) {
      throw new Error(payload?.error || 'Unable to create session order');
    }

    return payload.order as RazorpayOrderResponse;
  }

  static async initiatePayment(options: RazorpayOptions): Promise<void> {
    try {
      if (!this.KEY_ID) {
        throw new Error('Missing VITE_RAZORPAY_KEY_ID. Configure it in your env file.');
      }

      await this.loadRazorpayScript();
      const region = this.getClientRegionContext();
      let order: RazorpayOrderResponse | null = null;
      try {
        order = await this.createOrder(options.amount, options.currency || 'USD');
      } catch (createOrderError) {
        console.warn('[Razorpay] Order creation failed, using fallback checkout mode', createOrderError);
      }

      const fallbackCurrency = region.countryCode === 'IN' ? 'INR' : (options.currency || 'USD');
      const fallbackAmount = region.countryCode === 'IN' ? 4900 : options.amount; // INR 49.00 for USD 0.54

      const storedDetails = this.getStoredDemoBookingDetails();
      const prefillName = options.prefillName || storedDetails.parentName || '';
      const prefillEmail = options.prefillEmail || storedDetails.email || '';
      const prefillPhone = options.prefillPhone || storedDetails.phone || '';

      const razorpayOptions: any = {
        key: this.KEY_ID,
        amount: order?.amount || fallbackAmount,
        currency: order?.currency || fallbackCurrency,
        name: options.name || 'VR Robotics Academy',
        description: this.toRazorpayDescription(options.description),
        image: 'https://res.cloudinary.com/dicfqwlfq/image/upload/v1764505259/VR_Robotics_Logo_upscaled_1_rrrrn8.png',
        handler: async (response: any) => {
          await this.syncPaidBookingToGoogleSheets(response);
          if (options.onSuccess) {
            options.onSuccess(response);
            return;
          }
          this.defaultSuccessHandler(response);
        },
        prefill: {
          name: prefillName,
          email: prefillEmail,
          contact: prefillPhone
        },
        notes: {
          note_key_1: options.flowType === 'session' ? 'Session Enrollment' : 'Demo Booking',
          note_key_2: 'VR Robotics Academy',
          program: options.flowType === 'session' ? 'Paid Robotics Session' : 'Robotics Course (Grades 1-12)',
          parent_name: this.sanitizeNoteValue(storedDetails.parentName),
          parent_email: this.sanitizeNoteValue(storedDetails.email),
          parent_phone: this.sanitizeNoteValue(storedDetails.phone),
          child_name: this.sanitizeNoteValue(storedDetails.childName),
          child_age: this.sanitizeNoteValue(storedDetails.childAge),
          preferred_date: this.sanitizeNoteValue(storedDetails.preferredDate),
          preferred_time: this.sanitizeNoteValue(storedDetails.preferredTime)
          ,
          ...(options.notes || {})
        },
        method: {},
        theme: {
          color: '#ff8c42'
        },
        modal: {
          ondismiss: () => {
            if (options.onError) {
              options.onError({ message: 'Payment cancelled' });
            }
          }
        }
      };

      const isIndiaOrder =
        (order?.currency || fallbackCurrency || 'USD').toUpperCase() === 'INR' ||
        region.countryCode === 'IN';
      razorpayOptions.method = isIndiaOrder
        ? {
            upi: true,
            card: false,
            netbanking: false,
            wallet: false
          }
        : {
            upi: false,
            card: true,
            netbanking: false,
            wallet: false
          };

      if (order?.id) {
        razorpayOptions.order_id = order.id;
      }

      // @ts-ignore Razorpay is loaded from checkout.js at runtime
      const rzp = new window.Razorpay(razorpayOptions);
      rzp.on('payment.failed', (response: any) => {
        const reason = response?.error?.description || response?.error?.reason || 'Payment failed';
        if (options.onError) {
          options.onError({ message: reason, details: response?.error || response });
        }
      });
      rzp.open();
    } catch (error) {
      console.error('[Razorpay] initiatePayment failed:', error);
      const message = error instanceof Error ? error.message : 'Unable to open payment checkout';
      if (options.onError) {
        options.onError(error);
      }
      alert(message);
    }
  }

  static async initiateDemo1DollarPayment(
    onSuccess?: (response: any) => void,
    onError?: (error: any) => void,
    options?: { persistDemoAfterPayment?: boolean }
  ): Promise<void> {
    const details = await this.ensureDemoBookingDetails({
      title: 'Book Demo Details',
      subtitle: 'Fill the form and continue to payment.',
      submitText: 'Continue to Payment'
    });
    await this.initiatePayment({
      amount: 54, // 54 cents = USD 0.54
      currency: 'USD',
      description: this.PRODUCT_DESCRIPTION,
      name: 'VR Robotics Academy',
      flowType: 'demo',
      notes: {
        persist_demo_after_payment: options?.persistDemoAfterPayment === false ? '0' : '1'
      },
      prefillName: details.parentName || '',
      prefillEmail: details.email || '',
      prefillPhone: details.phone || '',
      onSuccess,
      onError
    });
  }

  static async initiatePlanPayment(options: PlanPaymentOptions): Promise<void> {
    const amountUsd = Number(options.amountUsd);
    if (!Number.isFinite(amountUsd) || amountUsd <= 0) {
      throw new Error('Invalid plan amount');
    }

    const billingText = options.billingMode === 'month' ? 'Per Month' : 'Per Session';
    const details = await this.ensureDemoBookingDetails({
      title: 'Session Enrollment Form',
      subtitle: `${options.actionLabel || options.planName} (${billingText})`,
      submitText: `Pay $${amountUsd}`
    });
    const amountInUsdCents = Math.max(1, Math.round(amountUsd * 100));
    const description = `${options.planName} plan - $${amountUsd}/${options.billingMode}`;

    await this.initiatePayment({
      amount: amountInUsdCents,
      currency: 'USD',
      description,
      name: 'VR Robotics Academy',
      flowType: 'session',
      notes: {
        plan_name: this.sanitizeNoteValue(options.planName),
        billing_mode: this.sanitizeNoteValue(options.billingMode),
        amount_usd: this.sanitizeNoteValue(String(amountUsd)),
        action_label: this.sanitizeNoteValue(options.actionLabel || options.planName)
      },
      prefillName: details.parentName || '',
      prefillEmail: details.email || '',
      prefillPhone: details.phone || '',
      onSuccess: options.onSuccess,
      onError: options.onError
    });
  }

  static async initiateSessionEnrollmentPayment(options: PlanPaymentOptions): Promise<void> {
    const amountUsd = Number(options.amountUsd);
    if (!Number.isFinite(amountUsd) || amountUsd <= 0) {
      throw new Error('Invalid plan amount');
    }

    const billingText = options.billingMode === 'month' ? 'Per Month' : 'Per Session';
    const details = await this.ensureDemoBookingDetails({
      title: 'Session Enrollment Form',
      subtitle: `${options.actionLabel || options.planName} (${billingText})`,
      submitText: `Pay $${amountUsd}`
    });

    const amountInUsdCents = Math.max(1, Math.round(amountUsd * 100));
    const description = `${options.planName} - $${amountUsd}/${options.billingMode}`;

    try {
      if (!this.SESSION_KEY_ID) {
        throw new Error('Missing VITE_RAZORPAY_SESSION_KEY_ID or VITE_RAZORPAY_KEY_ID. Configure it in your env file.');
      }

      await this.loadRazorpayScript();
      const region = this.getClientRegionContext();
      let order: RazorpayOrderResponse | null = null;
      
      try {
        order = await this.createSessionOrder(
          amountInUsdCents,
          'USD',
          options.planName,
          options.billingMode
        );
      } catch (createOrderError) {
        console.warn('[Razorpay] Session order creation failed, using fallback checkout mode', createOrderError);
      }

      const fallbackCurrency = 'USD';
      const fallbackAmount = amountInUsdCents;

      const storedDetails = this.getStoredDemoBookingDetails();
      const prefillName = options.planName || storedDetails.parentName || '';
      const prefillEmail = options.planName || storedDetails.email || '';
      const prefillPhone = storedDetails.phone || '';

      // Prepare payment notes for Google Sheets tracking
      const paymentNotes = {
        note_key_1: 'Session Enrollment',
        note_key_2: 'VR Robotics Academy',
        program: 'Paid Robotics Session',
        payment_type: 'session_enrollment',
        plan_name: this.sanitizeNoteValue(options.planName),
        billing_mode: this.sanitizeNoteValue(options.billingMode),
        amount_usd: this.sanitizeNoteValue(String(amountUsd)),
        action_label: this.sanitizeNoteValue(options.actionLabel || options.planName),
        parent_name: this.sanitizeNoteValue(storedDetails.parentName),
        parent_email: this.sanitizeNoteValue(storedDetails.email),
        parent_phone: this.sanitizeNoteValue(storedDetails.phone),
        child_name: this.sanitizeNoteValue(storedDetails.childName),
        child_age: this.sanitizeNoteValue(storedDetails.childAge)
      };

      console.log('[Razorpay] 🟢 PREPARING PAYMENT NOTES FOR GOOGLE SHEETS SYNC:', paymentNotes);

      // Store notes for later retrieval during payment success
      this.storePaymentNotes(paymentNotes);
      console.log('[Razorpay] 🟢 NOTES STORED IN SESSION STORAGE');

      const razorpayOptions: any = {
        key: this.SESSION_KEY_ID,
        amount: order?.amount || fallbackAmount,
        currency: order?.currency || fallbackCurrency,
        name: 'VR Robotics Academy',
        description: this.toRazorpayDescription(description),
        image: 'https://res.cloudinary.com/dicfqwlfq/image/upload/v1764505259/VR_Robotics_Logo_upscaled_1_rrrrn8.png',
        handler: async (response: any) => {
          console.log('[Razorpay] 🟢 PAYMENT SUCCESS RECEIVED, PAYMENT ID:', response.razorpay_payment_id);
          // Add stored notes to the response for sync handler
          response.razorpay_notes = paymentNotes;
          console.log('[Razorpay] PAYMENT SUCCESS, attached notes:', response.razorpay_notes);
          try {
            await this.syncPaidBookingToGoogleSheets(response);
            if (options.onSuccess) {
              options.onSuccess(response);
              return;
            }
            this.defaultSuccessHandler(response);
          } catch (syncError) {
            const message = syncError instanceof Error ? syncError.message : 'Payment recorded but failed to persist enrollment.';
            console.error('[Razorpay] Enrollment persistence failed after payment:', syncError);
            if (options.onError) {
              options.onError({ message, details: syncError });
            } else {
              alert(message);
            }
          }
        },
        prefill: {
          name: prefillName,
          email: prefillEmail,
          contact: prefillPhone
        },
        notes: paymentNotes,
        method: {
          upi: false,
          card: true,
          netbanking: false,
          wallet: false
        },
        theme: {
          color: '#ff8c42'
        },
        modal: {
          ondismiss: () => {
            if (options.onError) {
              options.onError({ message: 'Payment cancelled' });
            }
          }
        }
      };

      if (order?.id) {
        razorpayOptions.order_id = order.id;
      }

      // @ts-ignore Razorpay is loaded from checkout.js at runtime
      const rzp = new window.Razorpay(razorpayOptions);
      rzp.on('payment.failed', (response: any) => {
        const reason = response?.error?.description || response?.error?.reason || 'Payment failed';
        if (options.onError) {
          options.onError({ message: reason, details: response?.error || response });
        }
      });
      rzp.open();
    } catch (error) {
      console.error('[Razorpay] Session enrollment payment initiation failed:', error);
      const message = error instanceof Error ? error.message : 'Unable to open payment checkout';
      if (options.onError) {
        options.onError(error);
      }
      alert(message);
    }
  }

  private static defaultSuccessHandler(response: any): void {
    const message = `Payment successful.\n\nPayment ID: ${response.razorpay_payment_id}`;
    alert(message);
  }
}

export default RazorpayService;


