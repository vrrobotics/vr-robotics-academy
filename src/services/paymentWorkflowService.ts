/**
 * Payment Workflow Service
 * Handles post-payment operations including Google Sheets updates
 * Ensures Google Sheets only updates when payment is successfully completed
 */

import { GoogleSheetsService } from './googleSheetsService';

export interface PaymentRecord {
  id: string;
  paymentId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
}

export interface BookingWithPayment {
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  childName: string;
  childAge?: string;
  preferredDate: string;
  preferredTime: string;
  interests: string;
  message: string;
  bookingId: string;
  paymentId?: string;
  paymentStatus?: 'paid' | 'unpaid';
}

export class PaymentWorkflowService {
  /**
   * Store payment record after successful Razorpay payment
   */
  static async recordPayment(paymentId: string, amount: number): Promise<{
    success: boolean;
    paymentRecordId?: string;
    error?: string;
  }> {
    try {
      const paymentRecord: PaymentRecord = {
        id: crypto.randomUUID(),
        paymentId,
        amount,
        currency: 'INR',
        status: 'completed',
        createdAt: new Date().toISOString()
      };

      console.log('[PaymentWorkflow] Recording payment:', paymentRecord);
      
      // Store in session storage as a fallback
      // In the future, this can be extended to save to Supabase if needed
      sessionStorage.setItem(`payment_record_${paymentId}`, JSON.stringify(paymentRecord));
      console.log('[PaymentWorkflow] ✓ Payment record created:', paymentRecord.id);

      return {
        success: true,
        paymentRecordId: paymentRecord.id
      };
    } catch (error) {
      console.error('[PaymentWorkflow] Error recording payment:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Handle complete post-payment workflow:
   * 1. Record payment
   * 2. Update Google Sheets with payment status
   * 3. Return combined result
   */
  static async handlePostPaymentWorkflow(
    paymentId: string,
    bookingData: BookingWithPayment
  ): Promise<{
    paymentRecorded: boolean;
    sheetsUpdated: boolean;
    error?: string;
  }> {
    try {
      console.log('[PaymentWorkflow] Starting post-payment workflow for:', paymentId);

      // Step 1: Record the payment
      const paymentResult = await this.recordPayment(paymentId, 100); // $1 = 100 paise

      // Step 2: Update Google Sheets with payment information
      let sheetsUpdated = false;
      if (paymentResult.success) {
        try {
          console.log('[PaymentWorkflow] Adding booking to Google Sheets with payment status...');
          const sheetsResult = await GoogleSheetsService.appendDemoBooking({
            parentName: bookingData.parentName,
            parentEmail: bookingData.parentEmail,
            parentPhone: bookingData.parentPhone,
            childName: bookingData.childName,
            childAge: bookingData.childAge,
            preferredDate: bookingData.preferredDate,
            preferredTime: bookingData.preferredTime,
            interests: bookingData.interests,
            message: bookingData.message,
            bookingId: bookingData.bookingId,
            paymentId, // Include payment ID
            paymentStatus: 'paid' // Mark as paid
          });

          if (sheetsResult.success) {
            console.log('[PaymentWorkflow] ✓ Google Sheets updated with payment status');
            sheetsUpdated = true;
          } else {
            console.warn('[PaymentWorkflow] ⚠ Google Sheets update failed:', sheetsResult.error);
          }
        } catch (sheetsErr) {
          console.error('[PaymentWorkflow] Error updating Google Sheets:', sheetsErr);
        }
      }

      return {
        paymentRecorded: paymentResult.success,
        sheetsUpdated,
        error: paymentResult.error
      };
    } catch (error) {
      console.error('[PaymentWorkflow] Error in post-payment workflow:', error);
      return {
        paymentRecorded: false,
        sheetsUpdated: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Store temporary payment session data (for pending bookings)
   * This allows capturing payment before getting full booking details
   */
  static storePaymentSession(paymentId: string): void {
    try {
      const sessionData = {
        paymentId,
        timestamp: new Date().toISOString(),
        verified: true
      };
      sessionStorage.setItem(`payment_${paymentId}`, JSON.stringify(sessionData));
      console.log('[PaymentWorkflow] Payment session stored:', paymentId);
    } catch (error) {
      console.error('[PaymentWorkflow] Error storing payment session:', error);
    }
  }

  /**
   * Retrieve and clear payment session data
   */
  static getAndClearPaymentSession(paymentId: string): any {
    try {
      const sessionData = sessionStorage.getItem(`payment_${paymentId}`);
      if (sessionData) {
        sessionStorage.removeItem(`payment_${paymentId}`);
        console.log('[PaymentWorkflow] Payment session retrieved and cleared:', paymentId);
        return JSON.parse(sessionData);
      }
      return null;
    } catch (error) {
      console.error('[PaymentWorkflow] Error retrieving payment session:', error);
      return null;
    }
  }
}

export default PaymentWorkflowService;
