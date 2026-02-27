/**
 * Reusable Book Demo Payment Button Component
 * 
 * Use this component anywhere you want to add a "Book Demo" payment button.
 * Handles all Razorpay payment logic internally and redirects to booking form on success.
 * 
 * @example
 * ```tsx
 * import BookDemoButton from '@/components/BookDemoButton';
 * 
 * <BookDemoButton 
 *   variant="primary"
 *   className="your-custom-class"
 *   onSuccess={() => console.log('Payment successful')}
 * />
 * ```
 */

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RazorpayService from '@/services/razorpayService';
import PaymentWorkflowService from '@/services/paymentWorkflowService';

interface BookDemoButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children?: React.ReactNode;
  onSuccess?: (response: any) => void;
  onError?: (error: any) => void;
  source?: string; // For tracking which component triggered the payment
  disabled?: boolean;
  redirectToDemoBooking?: boolean; // Whether to redirect to booking form after payment
}

export default function BookDemoButton({
  variant = 'primary',
  size = 'md',
  className = '',
  children = 'Book Demo Now - $1',
  onSuccess,
  onError,
  source = 'book_demo_button',
  disabled = false,
  redirectToDemoBooking = true
}: BookDemoButtonProps) {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const variantStyles = {
    primary: 'bg-primary text-primary-foreground',
    secondary: 'bg-secondary text-secondary-foreground',
    outline: 'bg-transparent text-secondary border-2 border-secondary'
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm rounded-lg',
    md: 'px-6 py-3 rounded-lg',
    lg: 'px-8 py-4 rounded-xl text-lg'
  };

  const handleClick = async () => {
    setIsProcessing(true);
    try {
      await RazorpayService.initiateDemo1DollarPayment(
        (response) => {
          console.log('✓ Payment successful:', response);
          
          // Store payment session for later verification
          PaymentWorkflowService.storePaymentSession(response.razorpay_payment_id);
          
          if (onSuccess) {
            onSuccess(response);
          }
          
          // Track the event
          if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', 'demo_booking_payment_success', {
              source,
              paymentId: response.razorpay_payment_id
            });
          }
          
          // Redirect to booking form with payment info if enabled
          if (redirectToDemoBooking) {
            console.log('[BookDemoButton] Redirecting to booking form with payment info');
            navigate(`/demo-booking?payment_id=${response.razorpay_payment_id}&payment_verified=true`);
          }
        },
        (error) => {
          console.error('✗ Payment failed:', error);
          if (onError) {
            onError(error);
          }
          // Track the event
          if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', 'demo_booking_payment_failed', {
              source,
              error: error?.message
            });
          }
        }
      );
    } catch (error) {
      console.error('Error initiating payment:', error);
      if (onError) {
        onError(error);
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <motion.button
      className={`font-heading font-semibold ${variantStyles[variant]} ${sizeStyles[size]} ${className} disabled:opacity-50 transition-all duration-300`}
      whileHover={{ scale: !isProcessing && !disabled ? 1.05 : 1 }}
      whileTap={{ scale: !isProcessing && !disabled ? 0.95 : 1 }}
      onClick={handleClick}
      disabled={isProcessing || disabled}
    >
      {isProcessing ? 'Processing Payment...' : children}
    </motion.button>
  );
}
