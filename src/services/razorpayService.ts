/**
 * Razorpay Payment Service
 * Handles payment processing for demo bookings
 */

import { GoogleSheetsService } from '@/services/googleSheetsService';

interface RazorpayOptions {
  amount: number; // Amount in minor units of `currency` (e.g. 100 cents = USD 1)
  currency?: string;
  description?: string;
  name?: string;
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
    ((import.meta as any)?.env?.VITE_RAZORPAY_KEY_ID as string) || 'rzp_test_SLEljQjEAaLhr7';
  private static readonly SCRIPT_URL = 'https://checkout.razorpay.com/v1/checkout.js';
  private static readonly DEMO_DETAILS_STORAGE_KEY = 'vr_demo_booking_details';
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
    if (!paymentId) return;
    if (this.hasPaymentBeenSyncedToSheets(paymentId)) return;

    const details = this.getStoredDemoBookingDetails();

    try {
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
        bookingId: crypto.randomUUID(),
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
      console.warn('[Razorpay] Google Sheets sync error:', error);
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

  private static async requestDemoDetailsFromUI(initial: DemoBookingDetails): Promise<DemoBookingDetails> {
    if (typeof window === 'undefined') return initial;

    return new Promise<DemoBookingDetails>((resolve, reject) => {
      let settled = false;

      const cleanup = () => {
        window.removeEventListener('vr:demo-details-submitted', onSubmitted as EventListener);
        window.removeEventListener('vr:demo-details-cancelled', onCancelled as EventListener);
      };

      const onSubmitted = (event: CustomEvent<DemoBookingDetails>) => {
        if (settled) return;
        settled = true;
        cleanup();
        resolve(event.detail || {});
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
          detail: initial || {}
        })
      );
    });
  }

  private static async ensureDemoBookingDetails(): Promise<DemoBookingDetails> {
    const stored = this.getStoredDemoBookingDetails();
    // Always open details form before payment so the user confirms current data.
    const collected = await this.requestDemoDetailsFromUI(stored);
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
          note_key_1: 'Demo Booking',
          note_key_2: 'VR Robotics Academy',
          program: 'Robotics Course (Grades 1-12)',
          parent_name: this.sanitizeNoteValue(storedDetails.parentName),
          parent_email: this.sanitizeNoteValue(storedDetails.email),
          parent_phone: this.sanitizeNoteValue(storedDetails.phone),
          child_name: this.sanitizeNoteValue(storedDetails.childName),
          child_age: this.sanitizeNoteValue(storedDetails.childAge),
          preferred_date: this.sanitizeNoteValue(storedDetails.preferredDate),
          preferred_time: this.sanitizeNoteValue(storedDetails.preferredTime)
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
    onError?: (error: any) => void
  ): Promise<void> {
    const details = await this.ensureDemoBookingDetails();
    await this.initiatePayment({
      amount: 54, // 54 cents = USD 0.54
      currency: 'USD',
      description: this.PRODUCT_DESCRIPTION,
      name: 'VR Robotics Academy',
      prefillName: details.parentName || '',
      prefillEmail: details.email || '',
      prefillPhone: details.phone || '',
      onSuccess,
      onError
    });
  }

  private static defaultSuccessHandler(response: any): void {
    const message = `Payment successful.\n\nPayment ID: ${response.razorpay_payment_id}`;
    alert(message);
  }
}

export default RazorpayService;

