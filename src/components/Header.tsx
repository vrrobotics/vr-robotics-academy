import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Bell } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { Image } from '@/components/ui/image';
import { messageService } from '@/services/messageService';
import RazorpayService from '@/services/razorpayService';

// Analytics tracking helper
const trackEvent = (eventName: string, eventData?: Record<string, any>) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, eventData);
  }
};

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const { user } = useAuthStore();

  // Load unread count for admin users
  useEffect(() => {
    if (user?.role === 'admin') {
      messageService.getUnreadCount().then(setUnreadCount);
      // Refresh every 5 seconds
      const interval = setInterval(() => {
        messageService.getUnreadCount().then(setUnreadCount);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [user]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    {
      name: 'Programs',
      submenu: [
        { name: 'Why VR Robotics', path: '/why-vr-robotics' },
        { name: 'What Kids Learn', path: '/what-kids-learn' },
        { name: 'How We Build', path: '/how-kids-build' }
      ]
    },
    { name: 'Certificates', path: '/certificates' },
    { name: 'Admission', path: '/admission-process' },
    { name: 'Pricing', path: '/program-fees' },
    { name: 'Contact', path: '/contact' },
    ...(user && user.role === 'teacher' ? [{ name: 'Teacher Dashboard', path: '/teacher-dashboard' }] : [])
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-20 sm:h-24"
      style={{
        background: 'rgba(15, 15, 15, 0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255, 140, 66, 0.15)'
      }}
    >
      <div className="w-full h-full flex items-center justify-between px-4 sm:px-6 md:px-8">
        {/* Logo - Left */}
        <Link 
          to="/" 
          className="flex-shrink-0 h-full flex items-center"
          onClick={() => {
            // Close mobile menu if open
            if (isOpen) setIsOpen(false);
            // Track event
            trackEvent('logo_click', { location: 'header' });
          }}
        >
          <motion.div
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center"
          >
            <Image
              src="https://res.cloudinary.com/dicfqwlfq/image/upload/v1764505259/VR_Robotics_Logo_upscaled_1_rrrrn8.png"
              alt="VR Robotics Academy Logo"
              width={120}
              className="h-auto w-auto max-h-16 sm:max-h-20"
            />
          </motion.div>
        </Link>

        {/* Desktop Navigation - Center */}
        <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
          {navLinks.map((link) => (
            <div key={link.path || link.name} className="relative">
              {link.submenu ? (
                <motion.button
                  className="px-4 py-2 rounded-lg font-paragraph text-foreground/80 hover:text-foreground flex items-center gap-1 cursor-pointer"
                  whileHover={{ backgroundColor: 'rgba(255, 140, 66, 0.1)' }}
                  onClick={() => setActiveDropdown(activeDropdown === link.name ? null : link.name)}
                >
                  {link.name}
                  <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === link.name ? 'rotate-180' : ''}`} />
                </motion.button>
              ) : (
                <Link to={link.path!}>
                  <motion.div
                    className="px-4 py-2 rounded-lg font-paragraph text-foreground/80 hover:text-foreground"
                    whileHover={{ backgroundColor: 'rgba(255, 140, 66, 0.1)', y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    {link.name}
                  </motion.div>
                </Link>
              )}

              {/* Dropdown Menu */}
              {link.submenu && activeDropdown === link.name && (
                <motion.div
                  className="absolute left-0 mt-0 w-48 rounded-xl bg-background border border-primary/20 shadow-2xl py-2 z-50"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {link.submenu.map((item) => (
                    <Link key={item.path} to={item.path} onClick={() => setActiveDropdown(null)}>
                      <motion.div
                        className="px-4 py-3 font-paragraph text-foreground/80 hover:text-primary hover:bg-primary/5"
                        whileHover={{ x: 4 }}
                      >
                        {item.name}
                      </motion.div>
                    </Link>
                  ))}
                </motion.div>
              )}
            </div>
          ))}
        </nav>

        {/* CTA Buttons - Right */}
        <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
          {user ? (
            <>
              {user.role === 'admin' && (
                <Link to="/admin-notifications">
                  <motion.button
                    className="relative p-2 rounded-lg text-foreground hover:bg-primary/10 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Bell className="w-6 h-6" />
                    {unreadCount > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                      >
                        {unreadCount > 99 ? '99+' : unreadCount}
                      </motion.span>
                    )}
                  </motion.button>
                </Link>
              )}
              {user.role === 'student' && (
                <Link to="/student-upcoming-classes">
                  <motion.button
                    className="bg-green-600 hover:bg-green-700 text-white font-heading font-semibold px-6 py-3 rounded-[10px]"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Upcoming Classes
                  </motion.button>
                </Link>
              )}
              <Link to={
                user.role === 'student' ? '/student-dashboard' :
                user.role === 'teacher' ? '/teacher-dashboard' :
                '/admin-dashboard'
              }>
                <motion.button
                  className="bg-primary text-primary-foreground font-heading font-semibold px-6 py-3 rounded-[10px]"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Dashboard
                </motion.button>
              </Link>
            </>
          ) : (
            <>
              <motion.button
                className="bg-primary text-primary-foreground font-heading font-semibold px-6 py-3 rounded-[10px]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={async () => {
                  trackEvent('cta_click', { button: 'book_demo_header' });
                  await RazorpayService.initiateDemo1DollarPayment(
                    (response) => {
                      console.log('✓ Payment successful:', response);
                      trackEvent('demo_booking_payment_success', { 
                        source: 'header',
                        paymentId: response.razorpay_payment_id 
                      });
                    },
                    (error) => {
                      console.error('✗ Payment failed:', error);
                      trackEvent('demo_booking_payment_failed', { 
                        source: 'header',
                        error: error?.message 
                      });
                    }
                  );
                }}
              >
                Book Demo
              </motion.button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          className="lg:hidden p-2 rounded-lg text-foreground"
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </motion.button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="lg:hidden mt-4 p-4 rounded-2xl"
          style={{
            background: 'rgba(15, 15, 15, 0.95)',
            border: '1px solid rgba(255, 140, 66, 0.2)'
          }}
        >
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <div key={link.path || link.name}>
                {link.submenu ? (
                  <>
                    <motion.button
                      className="w-full text-left px-4 py-3 rounded-lg font-paragraph text-foreground/80 flex items-center justify-between"
                      whileHover={{ backgroundColor: 'rgba(255, 140, 66, 0.1)', x: 4 }}
                      onClick={() => setActiveDropdown(activeDropdown === link.name ? null : link.name)}
                    >
                      {link.name}
                      <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === link.name ? 'rotate-180' : ''}`} />
                    </motion.button>
                    {activeDropdown === link.name && (
                      <div className="pl-4 space-y-2">
                        {link.submenu.map((item) => (
                          <Link key={item.path} to={item.path} onClick={() => setIsOpen(false)}>
                            <motion.div
                              className="px-4 py-2 rounded-lg font-paragraph text-foreground/70 text-sm"
                              whileHover={{ backgroundColor: 'rgba(255, 140, 66, 0.1)', x: 4 }}
                            >
                              {item.name}
                            </motion.div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link to={link.path!} onClick={() => setIsOpen(false)}>
                    <motion.div
                      className="px-4 py-3 rounded-lg font-paragraph text-foreground/80"
                      whileHover={{ backgroundColor: 'rgba(255, 140, 66, 0.1)', x: 4 }}
                    >
                      {link.name}
                    </motion.div>
                  </Link>
                )}
              </div>
            ))}

            <div className="border-t border-foreground/10 my-4 pt-4 space-y-2">
              {user ? (
                <>
                  {user.role === 'student' && (
                    <Link to="/student-upcoming-classes" onClick={() => setIsOpen(false)}>
                      <motion.button
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-heading font-semibold px-6 py-3 rounded-[10px]"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Upcoming Classes
                      </motion.button>
                    </Link>
                  )}
                  <Link to={
                    user.role === 'student' ? '/student-dashboard' :
                    user.role === 'teacher' ? '/teacher-dashboard' :
                    '/admin-dashboard'
                  } onClick={() => setIsOpen(false)}>
                    <motion.button
                      className="w-full bg-primary text-primary-foreground font-heading font-semibold px-6 py-3 rounded-[10px]"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Dashboard
                    </motion.button>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/demo-booking" onClick={() => setIsOpen(false)}>
                    <motion.button
                      className="w-full bg-primary text-primary-foreground font-heading font-semibold px-6 py-3 rounded-[10px]"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => trackEvent('cta_click', { button: 'book_demo_mobile' })}
                    >
                      Book Demo
                    </motion.button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </motion.nav>
      )}
    </header>
  );
}
