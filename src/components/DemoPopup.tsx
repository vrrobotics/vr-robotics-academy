import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import RazorpayService from '@/services/razorpayService';

interface DemoPopupProps {
  enabledPages?: string[];
}

export default function DemoPopup({ enabledPages = [] }: DemoPopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Only show popup on enabled pages
    if (enabledPages.length > 0 && !enabledPages.includes(location.pathname)) {
      return;
    }

    // Show popup after 3 seconds
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, [location.pathname, enabledPages]);

  const handleBookDemo = async () => {
    setIsOpen(false);
    try {
      await RazorpayService.initiateDemo1DollarPayment(
        (response) => {
          console.log('Demo payment successful:', response);
        },
        (error) => {
          console.error('Demo payment failed:', error);
        }
      );
    } catch (error) {
      console.error('Error initiating demo payment:', error);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-sm mx-4"
          >
            <div
              className="relative rounded-3xl p-6 sm:p-8 overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 140, 66, 0.15), rgba(255, 179, 102, 0.1))',
                border: '1px solid rgba(255, 140, 66, 0.3)',
                backdropFilter: 'blur(20px)',
              }}
            >
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-lg hover:bg-foreground/10 transition-colors"
              >
                <X className="w-5 h-5 text-foreground/70" />
              </motion.button>

              {/* Content */}
              <div className="text-center">
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                  className="inline-flex p-4 rounded-full bg-primary/20 mb-4"
                >
                  <svg
                    className="w-8 h-8 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </motion.div>

                {/* Heading */}
                <h2 className="font-heading text-2xl sm:text-3xl mb-3 text-foreground leading-tight">
                  Ready to Get Started?
                </h2>

                {/* Description */}
                <p className="font-paragraph text-sm sm:text-base text-foreground/80 mb-6 leading-relaxed">
                  Book a demo and experience our robotics program firsthand. No commitment required!
                </p>

                {/* Buttons */}
                <div className="flex flex-col gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleBookDemo}
                    className="w-full bg-primary text-primary-foreground font-heading font-semibold px-6 py-3 rounded-[10px] text-base transition-all"
                  >
                    Book a Demo
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsOpen(false)}
                    className="w-full bg-foreground/10 text-foreground font-heading font-semibold px-6 py-3 rounded-[10px] text-base hover:bg-foreground/20 transition-colors"
                  >
                    Maybe Later
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
