import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Rocket, CheckCircle } from 'lucide-react';
import { trackEvent } from '@/components/AnalyticsTracker';
import RazorpayService from '@/services/razorpayService';

export default function BookDemoPopup() {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [hasShownPopup, setHasShownPopup] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Show popup when user scrolls to middle of page
  useEffect(() => {
    const handleScroll = () => {
      if (hasShownPopup) return;

      const scrollPosition = window.scrollY + window.innerHeight;
      const pageHeight = document.documentElement.scrollHeight;
      const middleOfPage = pageHeight * 0.5;

      // Show popup when user reaches middle of the page
      if (scrollPosition >= middleOfPage) {
        setShowPopup(true);
        setHasShownPopup(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasShownPopup]);

  const handlePaymentClick = async () => {
    setIsProcessing(true);
    try {
      await RazorpayService.initiateDemo1DollarPayment(
        (response) => {
          console.log('✓ Payment successful:', response);
          setShowPopup(false);
          trackEvent('Popup Demo Booking Payment Success', { 
            source: 'scroll_popup',
            paymentId: response.razorpay_payment_id 
          });
        },
        (error) => {
          console.error('✗ Payment failed:', error);
          trackEvent('Popup Demo Booking Payment Failed', { 
            source: 'scroll_popup',
            error: error?.message 
          });
        }
      );
    } catch (error) {
      console.error('Error initiating payment:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <AnimatePresence>
      {showPopup && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowPopup(false)}
        >
          <motion.div
            initial={{ scale: 0.8, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.8, y: 50, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="glass-pane p-5 rounded-2xl max-w-sm w-full relative"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'rgba(255, 140, 66, 0.05)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 140, 66, 0.2)',
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 text-foreground/60 hover:text-foreground transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Popup Content */}
            <div className="text-center">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
                className="inline-block mb-4"
              >
                <Rocket className="w-12 h-12 text-secondary mx-auto" />
              </motion.div>
              
              <h3 className="font-heading text-xl text-secondary mb-4">
                Ready to Start Your Journey? 🚀
              </h3>
              
              <div className="mb-4">
                <p className="font-heading text-3xl text-secondary mb-2">$1</p>
                <p className="font-paragraph text-base text-foreground/80">
                  Limited Time Demo Class Offer!
                </p>
              </div>

              <p className="font-paragraph text-sm text-foreground/80 mb-6">
                Book your interactive 60-minute robotics demo class and experience hands-on learning with VR Robotics Academy!
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-2 text-left">
                  <CheckCircle className="w-4 h-4 text-secondary flex-shrink-0" />
                  <span className="font-paragraph text-sm text-foreground/90">60-minute interactive demo - Only $1</span>
                </div>
                <div className="flex items-center gap-2 text-left">
                  <CheckCircle className="w-4 h-4 text-secondary flex-shrink-0" />
                  <span className="font-paragraph text-sm text-foreground/90">Meet our expert instructors</span>
                </div>
                <div className="flex items-center gap-2 text-left">
                  <CheckCircle className="w-4 h-4 text-secondary flex-shrink-0" />
                  <span className="font-paragraph text-sm text-foreground/90">Try real robotics projects</span>
                </div>
              </div>

              <motion.button
                className="w-full bg-secondary text-secondary-foreground font-heading font-semibold px-6 py-3 rounded-lg text-base disabled:opacity-50"
                style={{
                  boxShadow: '0 0 20px rgba(255, 179, 102, 0.4), 0 0 40px rgba(255, 179, 102, 0.2)',
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePaymentClick}
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing...' : 'Book Demo Now - $1'}
              </motion.button>

              <button
                onClick={() => setShowPopup(false)}
                className="mt-4 text-foreground/60 hover:text-foreground transition-colors font-paragraph text-sm"
              >
                Maybe later
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
