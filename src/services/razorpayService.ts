/**
 * Razorpay Payment Service
 * Handles all payment processing for demo bookings
 */

interface RazorpayOptions {
  amount: number; // Amount in paise (₹1 = 100 paise)
  currency?: string;
  description?: string;
  name?: string;
  prefillEmail?: string;
  prefillPhone?: string;
  prefillName?: string;
  onSuccess?: (response: any) => void;
  onError?: (error: any) => void;
}

export class RazorpayService {
  private static readonly KEY_ID = 'rzp_live_SJky2Z5xAWUMJU';
  private static readonly SCRIPT_URL = 'https://checkout.razorpay.com/v1/checkout.js';

  private static readonly PRODUCT_DESCRIPTION = `Robotics Education Program - Grades 1-12

Comprehensive robotics curriculum designed to build foundational STEM skills in students across all grade levels. From basic assembly and programming concepts for elementary students to advanced automation and AI-driven robotics for secondary learners, our platform provides a structured learning path with hands-on projects, interactive simulations, and real-world engineering challenges. Develop critical thinking, problem-solving, and collaboration skills while mastering modern robotics technology.`;

  /**
   * Load Razorpay script dynamically
   */
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

  /**
   * Initialize and open Razorpay payment modal
   */
  static async initiatePayment(options: RazorpayOptions): Promise<void> {
    try {
      // Load Razorpay script if not already loaded
      await this.loadRazorpayScript();

      const razorpayOptions = {
        key: this.KEY_ID,
        amount: options.amount,
        currency: options.currency || 'INR',
        name: options.name || 'VR Robotics Academy',
        description: options.description || this.PRODUCT_DESCRIPTION,
        image: 'https://res.cloudinary.com/dicfqwlfq/image/upload/v1764505259/VR_Robotics_Logo_upscaled_1_rrrrn8.png',
        handler: (response: any) => {
          console.log('✓ Payment successful:', response);
          if (options.onSuccess) {
            options.onSuccess(response);
          } else {
            this.defaultSuccessHandler(response);
          }
        },
        prefill: {
          name: options.prefillName || '',
          email: options.prefillEmail || '',
          contact: options.prefillPhone || ''
        },
        notes: {
          note_key_1: 'Demo Booking',
          note_key_2: 'VR Robotics Academy',
          program: 'Robotics Course (Grades 1-12)'
        },
        theme: {
          color: '#ff8c42'
        },
        modal: {
          ondismiss: () => {
            console.log('Payment cancelled by user');
            if (options.onError) {
              options.onError({ message: 'Payment cancelled' });
            }
          }
        }
      };

      // @ts-ignore
      const rzp = new window.Razorpay(razorpayOptions);
      rzp.open();
    } catch (error) {
      console.error('Error initiating payment:', error);
      if (options.onError) {
        options.onError(error);
      }
    }
  }

  /**
   * Initiate demo booking payment ($1 USD = 100 paise INR approx)
   */
  static async initiateDemo1DollarPayment(
    onSuccess?: (response: any) => void,
    onError?: (error: any) => void
  ): Promise<void> {
    await this.initiatePayment({
      amount: 100, // $1 = 100 paise in INR
      currency: 'INR',
      description: this.PRODUCT_DESCRIPTION,
      name: 'VR Robotics Academy',
      onSuccess,
      onError
    });
  }

  /**
   * Default success handler - shows alert and logs details
   */
  private static defaultSuccessHandler(response: any): void {
    const message = `🎉 Payment Successful!

Payment ID: ${response.razorpay_payment_id}

Your demo booking has been confirmed. Our team will contact you shortly to schedule your session.`;

    alert(message);
    console.log('Payment Details:', response);

    // Optional: Redirect to confirmation page after payment
    // window.location.href = '/demo-booking-confirmation';
  }
}

export default RazorpayService;
