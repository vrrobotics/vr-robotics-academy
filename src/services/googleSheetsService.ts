/**
 * Google Sheets Integration Service
 * Automatically appends demo bookings to Google Sheet
 * 
 * This service communicates with a Google Apps Script deployed as a web app
 * which handles writing to the Google Sheet securely
 */

export interface GoogleSheetRow {
  registrationDate: string;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  studentName: string;
  studentAge: number | undefined;
  preferredDate: string;
  preferredTime: string;
  interests: string;
  message: string;
  status: string;
  bookingId: string;
  paymentId?: string;
  paymentStatus?: 'paid' | 'unpaid';
}

export class GoogleSheetsService {
  /**
   * Get the Google Apps Script web app URL from environment
   */
  private static getScriptUrl(): string | undefined {
    return import.meta.env.VITE_GOOGLE_SCRIPT_URL || 'https://script.google.com/macros/s/AKfycbyYN7ewMKixBaNjqSX4lF70iDEDssJs4U6pjgHTXURweOkW6xuw-BGo4texUX0iSUM/exec';
  }

  /**
   * Append demo booking to Google Sheet
   * Sends data to Google Apps Script which handles the write operation
   * 
   * NOTE: This should only be called AFTER payment is successful
   * Payment status is automatically tracked if paymentId is provided
   */
  static async appendDemoBooking(bookingData: {
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
  }): Promise<{
    success: boolean;
    message: string;
    error?: string;
  }> {
    try {
      const scriptUrl = this.getScriptUrl();
      if (!scriptUrl) {
        console.warn('[GoogleSheets] No Google Apps Script URL configured - skipping Sheet update');
        return {
          success: false,
          message: 'Google Sheets integration not configured',
          error: 'VITE_GOOGLE_SCRIPT_URL not set'
        };
      }

      const rowData: GoogleSheetRow = {
        registrationDate: new Date().toLocaleDateString(),
        parentName: bookingData.parentName,
        parentEmail: bookingData.parentEmail,
        parentPhone: bookingData.parentPhone,
        studentName: bookingData.childName,
        studentAge: bookingData.childAge ? parseInt(bookingData.childAge) : undefined,
        preferredDate: bookingData.preferredDate,
        preferredTime: bookingData.preferredTime,
        interests: bookingData.interests,
        message: bookingData.message,
        status: bookingData.paymentStatus === 'paid' ? 'paid' : 'scheduled',
        bookingId: bookingData.bookingId.substring(0, 8),
        paymentId: bookingData.paymentId,
        paymentStatus: bookingData.paymentStatus || 'unpaid'
      };

      console.log('[GoogleSheets] Appending booking to sheet:', {
        ...rowData,
        paymentStatus: bookingData.paymentStatus,
        paymentId: bookingData.paymentId ? '✓ Present' : '✗ Not present'
      });

      const response = await fetch(scriptUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'appendRow',
          data: rowData
        })
      });

      console.log('[GoogleSheets] ✓ Successfully appended to Google Sheet');
      return {
        success: true,
        message: 'Booking added to Google Sheet'
      };
    } catch (error) {
      console.error('[GoogleSheets] Error appending to sheet:', error);
      return {
        success: false,
        message: 'Failed to update Google Sheet',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Batch append multiple demo bookings
   */
  static async appendMultipleBookings(bookings: any[]): Promise<{
    success: boolean;
    appended: number;
    errors: string[];
  }> {
    try {
      const errors: string[] = [];
      let appended = 0;

      for (const booking of bookings) {
        const result = await this.appendDemoBooking(booking);
        if (result.success) {
          appended++;
        } else {
          errors.push(result.error || result.message);
        }
      }

      return {
        success: errors.length === 0,
        appended,
        errors
      };
    } catch (error) {
      console.error('[GoogleSheets] Error in batch append:', error);
      return {
        success: false,
        appended: 0,
        errors: [error instanceof Error ? error.message : 'Unknown error']
      };
    }
  }

  /**
   * Get the status of Google Sheets integration
   */
  static isConfigured(): boolean {
    return !!this.getScriptUrl();
  }

  /**
   * Get configuration status for debugging
   */
  static getStatus() {
    const scriptUrl = this.getScriptUrl();
    return {
      configured: !!scriptUrl,
      scriptUrl: scriptUrl ? '✓ Set' : '✗ Not set'
    };
  }
}
