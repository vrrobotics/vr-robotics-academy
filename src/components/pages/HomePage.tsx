import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Image } from '@/components/ui/image';
import { Rocket, Cpu, Zap, Users, Award, BookOpen, ArrowRight, CheckCircle, Sparkles, Target, Star, TrendingUp, Shield, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PageTransition } from '@/components/PageTransition';
import { ScrollAnimationWrapper } from '@/components/ScrollAnimationWrapper';
import { FloatingElement } from '@/components/FloatingElement';
import { GlowingElement } from '@/components/GlowingElement';
import { PremiumScrollAnimation } from '@/components/PremiumScrollAnimation';
import { FuturisticTitle } from '@/components/FuturisticTitle';
import { premiumAnimations, easings } from '@/lib/premium-animations';
import { Head } from '@/components/Head';
import { OrganizationSchema, CourseSchema } from '@/components/SchemaMarkup';
import { trackEvent, trackConversion } from '@/components/AnalyticsTracker';
import { BaseCrudService } from '@/integrations';
import EnrollmentOnboardingPopup from '@/components/EnrollmentOnboardingPopup';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RazorpayService from '@/services/razorpayService';

type AnimatedElementProps = {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  delay?: number;
};

const AnimatedElement: React.FC<AnimatedElementProps> = ({ children, className, threshold = 0.1, delay = 0 }) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    element.classList.add('is-visible');
                }, delay);
                observer.unobserve(element);
            }
        }, { threshold });

        observer.observe(element);
        return () => observer.disconnect();
    }, [delay, threshold]);

    return <div ref={ref} className={cn('animate-reveal', className)}>{children}</div>;
};

const curriculumModules = [
  { name: "Digital Logic Foundations", description: "Build your first programs and understand core computational thinking", image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&h=300&fit=crop&q=80" },
  { name: "Creative Code Lab", description: "Design interactive animations and games using visual programming", image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=300&fit=crop&q=80" },
  { name: "3D Innovation Studio", description: "Transform ideas into 3D models and prototypes for real-world solutions", image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop&q=80" },
  { name: "Smart Electronics Workshop", description: "Master circuits, sensors, and microcontroller programming", image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop&q=80" },
  { name: "Robot Builder Academy", description: "Assemble and program intelligent robots from scratch", image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop&q=80" },
  { name: "Advanced Robotics Engineering", description: "Design autonomous systems with complex sensors and actuators", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop&q=80" },
  { name: "Python Power Skills", description: "Master professional coding with industry-standard Python language", image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=300&fit=crop&q=80" },
  { name: "Automation & AI Lab", description: "Create intelligent scripts and automated solutions using Python", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop&q=80" },
  { name: "Mobile Innovation Studio", description: "Build professional mobile applications for Android and iOS", image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop&q=80" },
  { name: "Connected Robotics Systems", description: "Develop apps that control robots through wireless connectivity", image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=300&fit=crop&q=80" },
  { name: "AI & Machine Learning Basics", description: "Train intelligent systems and understand artificial intelligence concepts", image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=300&fit=crop&q=80" },
  { name: "Computer Vision Projects", description: "Enable robots to see and interpret the world through cameras", image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=400&h=300&fit=crop&q=80" },
  { name: "IoT & Smart Technology", description: "Connect devices to the internet and build smart home systems", image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=400&h=300&fit=crop&q=80" },
  { name: "Interactive Game Development", description: "Create immersive games with professional tools and frameworks", image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop&q=80" },
  { name: "Web Builder Fundamentals", description: "Design and code modern, interactive websites from scratch", image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&h=300&fit=crop&q=80" },
  { name: "Electronics & Circuit Design", description: "Master electronic components and advanced circuit engineering", image: "https://images.unsplash.com/photo-1581092162562-40aa08e78837?w=400&h=300&fit=crop&q=80" },
  { name: "Innovation Challenge", description: "Compete in robotics challenges and showcase your skills", image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=300&fit=crop&q=80" },
  { name: "Final Grand Project", description: "Apply all your knowledge in a comprehensive capstone project", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop&q=80" }
];

// Log curriculum module images for debugging
if (typeof window !== 'undefined') {
  console.log('=== CURRICULUM MODULE IMAGES ===');
  curriculumModules.forEach((module) => {
    console.log(`${module.name}: ${module.image}`);
  });
  console.log('=== END MODULE IMAGES ===');
}

export default function HomePage() {
  const [prefersReducedMotion] = useState(() => 
    typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false
  );

  const shouldAnimate = !prefersReducedMotion;
  const [featuredCourses, setFeaturedCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showEnrollmentPopup, setShowEnrollmentPopup] = useState(false);
  const [showScrollPopup, setShowScrollPopup] = useState(false);
  const [hasShownPopup, setHasShownPopup] = useState(false);
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  const handleImageError = (moduleName: string, imageUrl: string, e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    console.error(`Image failed to load: ${moduleName}`, {
      url: imageUrl,
      error: e,
      status: target.naturalWidth === 0 ? 'Failed to load' : 'Image loaded but may not be visible'
    });
    setFailedImages(prev => new Set([...prev, moduleName]));
    // Set background gradient fallback
    target.style.display = 'none';
  };

  // Razorpay Payment Handler - $1 Demo Booking
  const handleBookDemoPayment = async () => {
    try {
      await RazorpayService.initiateDemo1DollarPayment(
        (response) => {
          console.log('✓ Demo payment successful:', response);
          trackConversion('demo_booking_payment_success', { paymentId: response.razorpay_payment_id });
        },
        (error) => {
          console.error('✗ Demo payment failed:', error);
          trackEvent('demo_booking_payment_failed', { error: error?.message });
        }
      );
    } catch (error) {
      console.error('Error initiating payment:', error);
    }
  };

  // Fetch featured courses on mount
  useEffect(() => {
    fetchFeaturedCourses();
  }, []);

  // Show popup when user scrolls to middle of page
  useEffect(() => {
    const handleScroll = () => {
      if (hasShownPopup) return;

      const scrollPosition = window.scrollY + window.innerHeight;
      const pageHeight = document.documentElement.scrollHeight;
      const middleOfPage = pageHeight * 0.5;

      // Show popup when user reaches middle of the page
      if (scrollPosition >= middleOfPage) {
        setShowScrollPopup(true);
        setHasShownPopup(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasShownPopup]);

  // Debug all images on page load
  useEffect(() => {
    const debugImages = () => {
      console.log('=== IMAGE DEBUG REPORT ===');
      const images = document.querySelectorAll('img');
      console.log(`Total images on page: ${images.length}`);
      
      images.forEach((img, index) => {
        const alt = img.getAttribute('alt');
        const src = img.getAttribute('src');
        const isVisible = img.offsetParent !== null;
        const hasSize = img.offsetWidth > 0 && img.offsetHeight > 0;
        const naturalSize = img.naturalWidth > 0 && img.naturalHeight > 0;
        
        console.log(`Image ${index + 1}: ${alt || 'No alt text'}`, {
          src: src?.substring(0, 50) + '...',
          visible: isVisible,
          hasSize: hasSize,
          dimensions: `${img.offsetWidth}x${img.offsetHeight}`,
          naturalDimensions: `${img.naturalWidth}x${img.naturalHeight}`,
          loaded: naturalSize,
          complete: img.complete
        });
      });
      console.log('=== END DEBUG REPORT ===');
    };

    // Run debug after a short delay to ensure DOM is fully rendered
    const timer = setTimeout(debugImages, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Load Spline 3D viewer script
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://unpkg.com/@splinetool/viewer@1.12.58/build/spline-viewer.js';
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const fetchFeaturedCourses = async () => {
    try {
      setLoading(true);
      const { items } = await BaseCrudService.getAll('featuredcourses');
      setFeaturedCourses(items);
    } catch (error) {
      console.error('Error fetching featured courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const highlights = [
    { icon: Rocket, title: 'Hands-On Learning', description: 'Build real robots and code interactive games with expert mentorship.' },
    { icon: Cpu, title: 'VR & AI Integration', description: 'Explore cutting-edge technology in immersive virtual environments.' },
    { icon: Zap, title: 'Creative Thinking', description: 'Develop problem-solving skills through exciting STEM challenges.' },
    { icon: Users, title: 'Expert Mentors', description: 'Learn from industry professionals passionate about robotics and education.' },
    { icon: Award, title: 'Certified Programs', description: 'Earn recognized certificates as you master new skills and complete modules.' },
    { icon: BookOpen, title: '18 Module Curriculum', description: 'A comprehensive learning path from the basics to advanced robotics.' }
  ];

  const stats = [
    { label: 'Active Students', value: '2,500+', icon: Users },
    { label: 'Expert Instructors', value: '50+', icon: Award },
    { label: 'Success Rate', value: '98%', icon: Target },
    { label: 'Certifications Awarded', value: '1,200+', icon: CheckCircle }
  ];

  const scrollRef = useRef(null);

  return (
    <>
      <Head 
        title="VR Robotics Academy - Master Robotics, Coding & AI"
        description="Learn robotics, VR development, and AI through hands-on projects. Join 2,500+ students transforming their passion into expertise."
        keywords="robotics education, VR learning, coding for kids, STEM education, AI learning"
        ogImage="https://static.wixstatic.com/media/39909b_3513a502b98941b4a18fedf184e5ae1e~mv2.png"
      />
      <OrganizationSchema />
      <CourseSchema 
        name="VR Robotics Academy Program"
        description="Master robotics, VR development, and AI through hands-on projects"
        price="0"
      />
      <EnrollmentOnboardingPopup 
        isOpen={showEnrollmentPopup}
        onClose={() => setShowEnrollmentPopup(false)}
      />
      
      {/* Scroll-triggered Book Demo Popup */}
      <AnimatePresence>
        {showScrollPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowScrollPopup(false)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: 50, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="glass-pane p-8 rounded-2xl max-w-lg w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setShowScrollPopup(false)}
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
                  <Rocket className="w-16 h-16 text-secondary mx-auto" />
                </motion.div>
                
                <h3 className="font-heading text-3xl text-secondary mb-4">
                  Ready to Start Your Journey? 🚀
                </h3>
                
                <div className="mb-4">
                  <p className="font-heading text-5xl text-secondary mb-2">₹49</p>
                  <p className="font-paragraph text-lg text-foreground/80">
                    Limited Time Demo Class Offer!
                  </p>
                </div>

                <p className="font-paragraph text-base text-foreground/80 mb-6">
                  Book your interactive 60-minute robotics demo class and experience hands-on learning with VR Robotics Academy!
                </p>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 text-left">
                    <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0" />
                    <span className="font-paragraph text-foreground/90">60-minute interactive demo - Only ₹49</span>
                  </div>
                  <div className="flex items-center gap-3 text-left">
                    <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0" />
                    <span className="font-paragraph text-foreground/90">Meet our expert instructors</span>
                  </div>
                  <div className="flex items-center gap-3 text-left">
                    <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0" />
                    <span className="font-paragraph text-foreground/90">Try real robotics projects</span>
                  </div>
                </div>

                <motion.button
                    className="w-full bg-secondary text-secondary-foreground font-heading font-semibold px-8 py-4 rounded-lg neon-glow-secondary text-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setShowScrollPopup(false);
                      handleBookDemoPayment();
                      trackEvent('Popup Demo Booking Click', { source: 'timed_popup' });
                    }}
                  >
                    Book Demo Now - ₹99
                  </motion.button>

                <button
                  onClick={() => setShowScrollPopup(false)}
                  className="mt-4 text-foreground/60 hover:text-foreground transition-colors font-paragraph text-sm"
                >
                  Maybe later
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <Header />
      <PageTransition>
      <style>{`
        .animate-reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .animate-reveal.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .glass-pane {
          background: rgba(255, 140, 66, 0.05);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 140, 66, 0.2);
          transition: all 0.3s ease;
        }
        .glass-pane:hover {
          background: rgba(255, 140, 66, 0.1);
          border-color: rgba(255, 140, 66, 0.4);
        }
        .neon-glow-primary {
          box-shadow: 0 0 20px rgba(255, 140, 66, 0.4), 0 0 40px rgba(255, 140, 66, 0.2);
        }
        .neon-glow-secondary {
          box-shadow: 0 0 20px rgba(255, 179, 102, 0.4), 0 0 40px rgba(255, 179, 102, 0.2);
        }
        .text-glow-primary {
          text-shadow: 0 0 8px rgba(255, 140, 66, 0.2), 0 0 16px rgba(255, 140, 66, 0.08);
        }
        .circuit-bg {
          background-image:
            radial-gradient(circle at 1px 1px, rgba(255, 140, 66, 0.08) 1px, transparent 0),
            radial-gradient(circle at 25px 25px, rgba(255, 140, 66, 0.05) 1px, transparent 0);
          background-size: 50px 50px;
        }
        .section-clip-top {
          clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
        }
        .section-clip-bottom {
          clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
        }
        .stat-card {
          position: relative;
          overflow: hidden;
        }
        .stat-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 140, 66, 0.1), transparent);
          transition: left 0.5s ease;
        }
        .stat-card:hover::before {
          left: 100%;
        }
        /* Enhanced animations */
        @keyframes float-bounce {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(255, 140, 66, 0.4), 0 0 40px rgba(255, 140, 66, 0.2); }
          50% { box-shadow: 0 0 30px rgba(255, 140, 66, 0.6), 0 0 60px rgba(255, 140, 66, 0.3); }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        @keyframes rotate-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes scale-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes slide-in-left {
          0% { opacity: 0; transform: translateX(-50px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes slide-in-right {
          0% { opacity: 0; transform: translateX(50px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes bounce-in {
          0% { opacity: 0; transform: scale(0.8) translateY(20px); }
          50% { opacity: 1; }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes glow-pulse {
          0%, 100% { filter: drop-shadow(0 0 5px rgba(255, 140, 66, 0.3)); }
          50% { filter: drop-shadow(0 0 15px rgba(255, 140, 66, 0.6)); }
        }
        .float-animation {
          animation: float-bounce 3s ease-in-out infinite;
        }
        .pulse-glow-animation {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        .shimmer-animation {
          background: linear-gradient(90deg, transparent, rgba(255, 140, 66, 0.2), transparent);\n          background-size: 1000px 100%;\n          animation: shimmer 3s infinite;\n        }
        .rotate-animation {
          animation: rotate-slow 20s linear infinite;
        }
        .scale-pulse-animation {
          animation: scale-pulse 2s ease-in-out infinite;
        }
        .bounce-in-animation {
          animation: bounce-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .glow-pulse-animation {
          animation: glow-pulse 2s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-reveal,
          .float-animation,
          .pulse-glow-animation,
          .shimmer-animation,
          .rotate-animation,
          .scale-pulse-animation,
          .bounce-in-animation,
          .glow-pulse-animation {
            animation: none;
            transition: none;
          }
        }
        
        /* Apollo Hospitals-style Video Background Responsive Handling */
        @media (max-aspect-ratio: 1/1) {
          /* Portrait mode (mobile) - ensure video fills and centers */
          video {
            width: auto !important;
            height: 100% !important;
            min-width: 100% !important;
            object-position: center center !important;
          }
        }
        
        @media (min-aspect-ratio: 1/1) {
          /* Landscape mode (desktop) - ensure video fills and centers */
          video {
            width: 100% !important;
            height: auto !important;
            min-height: 100% !important;
            object-position: center center !important;
          }
        }
      `}</style>
      <div ref={scrollRef} className="relative w-full overflow-x-hidden">
        {/* Hero Section - Two Column Layout: Text Left, Robot Right */}
        <div className="relative w-full min-h-screen bg-gradient-to-b from-background via-background/95 to-background pb-12 sm:pb-16">
          <motion.section 
            className="relative min-h-screen flex items-center justify-center z-10 px-6 sm:px-8 md:px-12 pt-24 sm:pt-28 md:pt-32"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <div className="w-full max-w-[100rem] mx-auto relative min-h-screen lg:min-h-[700px]">
              {/* Robot Layer - Front (Top Layer) */}
              <motion.div
                className="absolute right-0 top-0 w-full lg:w-1/2 h-full flex items-center justify-center z-20"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
              >
                {/* Outer Rotating Liquid Glow - Full Screen */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center -z-10"
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <div 
                    className="absolute blur-3xl opacity-70"
                    style={{
                      width: '1000px',
                      height: '800px',
                      background: 'radial-gradient(ellipse 40% 60% at 30% 40%, rgba(255, 179, 102, 0.8), transparent 70%)',
                      filter: 'blur(60px)',
                    }}
                  />
                </motion.div>

                {/* Primary Pulsing Liquid Glow - Full Screen */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center -z-10"
                  animate={{
                    opacity: [0.5, 1, 0.5],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <div 
                    className="absolute blur-3xl"
                    style={{
                      width: '900px',
                      height: '900px',
                      background: 'radial-gradient(ellipse 50% 70% at 50% 30%, rgba(255, 140, 66, 0.9), transparent 60%)',
                      filter: 'blur(70px)',
                    }}
                  />
                </motion.div>

                {/* Secondary Rotating Liquid Glow - Full Screen */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center -z-10"
                  animate={{
                    rotate: [360, 0],
                    opacity: [0.4, 0.8, 0.4],
                  }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <div 
                    className="absolute blur-2xl"
                    style={{
                      width: '950px',
                      height: '820px',
                      background: 'radial-gradient(ellipse 55% 65% at 60% 50%, rgba(255, 179, 102, 0.75), transparent 65%)',
                      filter: 'blur(65px)',
                    }}
                  />
                </motion.div>

                {/* Tertiary Morphing Liquid Glow - Full Screen */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center -z-10"
                  animate={{
                    scale: [0.9, 1.3, 0.9],
                    opacity: [0.3, 0.8, 0.3],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                >
                  <div 
                    className="absolute blur-3xl"
                    style={{
                      width: '880px',
                      height: '720px',
                      background: 'radial-gradient(ellipse 45% 75% at 45% 60%, rgba(255, 140, 66, 0.85), transparent 55%)',
                      filter: 'blur(55px)',
                    }}
                  />
                </motion.div>

                {/* Center Bright Liquid Glow - Full Screen */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center -z-10"
                  animate={{
                    opacity: [0.6, 1, 0.6],
                    scale: [0.95, 1.1, 0.95],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <div 
                    className="absolute blur-3xl"
                    style={{
                      width: '750px',
                      height: '750px',
                      background: 'radial-gradient(ellipse 50% 60% at 50% 45%, rgba(255, 179, 102, 1), transparent 50%)',
                      filter: 'blur(60px)',
                    }}
                  />
                </motion.div>

                <spline-viewer 
                  url="https://prod.spline.design/FNanjG-W99jZaCiJ/scene.splinecode"
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    borderRadius: '20px',
                    transform: 'scale(1.5)',
                    zIndex: 10,
                  }}
                />
              </motion.div>

              {/* Text Layer - Background (Bottom Layer) */}
              <div className="absolute left-0 top-0 w-full lg:w-full h-full flex items-center justify-start z-10">
                <div className="relative z-10 w-full lg:w-1/2 text-center lg:text-left px-6 sm:px-8 md:px-12 py-20">
                  {/* Badge - Subtle Fade Up */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0 }}
                    className="inline-block mb-6"
                  >
                    <motion.div
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 pulse-glow-animation"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div>
                        <Sparkles className="w-4 h-4 text-primary" />
                      </div>
                      <span className="font-paragraph text-sm text-primary font-semibold">The Future of STEM Education</span>
                    </motion.div>
                  </motion.div>

                  {/* Main Heading - Subtle Fade Up */}
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
                    className="mb-4"
                  >
                    <h1 
                      className="font-heading text-xl sm:text-2xl md:text-4xl lg:text-5xl text-secondary leading-[1.2]"
                    >
                      Learn Robotics & AI Faster — With Clear Guidance and Real Projects.
                    </h1>
                  </motion.div>
                  
                  {/* Subtitle - Subtle Fade Up */}
                  <motion.p
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
                    className="font-paragraph text-base sm:text-lg md:text-xl lg:text-2xl text-foreground/80 max-w-2xl mb-8 sm:mb-12 leading-relaxed"
                  >
                    Structured courses, expert support, and hands-on learning for students and beginners.
                  </motion.p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8 sm:mb-12 md:mb-16">
                    <FloatingElement duration={3} distance={15}>
                      <Link to="/demo-booking" className="w-full sm:w-auto">
                        <motion.button
                          className="bg-primary text-primary-foreground font-heading font-semibold px-8 py-4 rounded-[10px] neon-glow-primary text-base sm:text-lg w-full"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Book Demo →
                        </motion.button>
                      </Link>
                    </FloatingElement>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        </div>

        {/* Why Choose Us Section - Features Section - Black Background */}
        <section className="relative z-10 py-16 sm:py-24 md:py-40 bg-background overflow-hidden">
          <div className="max-w-[100rem] mx-auto px-6 sm:px-8 md:px-12">
            <div className="text-center mb-16 sm:mb-20">
              <PremiumScrollAnimation variant="fadeInUp">
                <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-primary text-glow-primary mb-4 sm:mb-6 px-4">
                  Why Choose VR Robotics Academy?
                </h2>
                <p className="font-paragraph text-base sm:text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto px-4">
                  We combine cutting-edge technology with expert mentorship to create an unparalleled learning experience that transforms young minds into innovators.
                </p>
              </PremiumScrollAnimation>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {highlights.map((highlight, index) => (
                <PremiumScrollAnimation key={index} variant="fadeInUp" delay={index * 0.1}>
                  <motion.div
                    className="glass-pane p-6 sm:p-8 rounded-2xl h-full flex flex-col"
                    whileHover={{ y: -8, borderColor: 'rgba(255, 140, 66, 0.5)' }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <motion.div 
                      className="p-4 rounded-xl bg-primary/10 border border-primary/20 w-fit mb-6"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                    >
                      <highlight.icon className="w-8 h-8 text-primary" />
                    </motion.div>
                    <h3 className="font-heading text-xl sm:text-2xl mb-3 text-foreground">{highlight.title}</h3>
                    <p className="font-paragraph text-base sm:text-lg text-foreground/70 flex-grow">{highlight.description}</p>
                  </motion.div>
                </PremiumScrollAnimation>
              ))}
            </div>
          </div>
        </section>

        {/* Curriculum Showcase - Module Cards */}
        <section className="relative z-10 py-16 sm:py-24 md:py-40 bg-background overflow-hidden">
          <div className="max-w-[100rem] mx-auto px-6 sm:px-8 md:px-12">
            <div className="text-center mb-16 sm:mb-20">
              <PremiumScrollAnimation variant="fadeInDown">
                <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-secondary text-glow-secondary mb-4 sm:mb-6 px-4">
                  18-Module Learning Path
                </h2>
                <p className="font-paragraph text-base sm:text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto px-4">
                  From coding fundamentals to advanced robotics and AI. Each module builds practical skills through hands-on projects and real-world applications.
                </p>
              </PremiumScrollAnimation>
            </div>

            {/* Module Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
              {curriculumModules.map((module, index) => (
                <PremiumScrollAnimation key={index} variant="fadeInUp" delay={index * 0.05}>
                  <Link to="/demo-booking">
                    <motion.div
                      className="glass-pane p-6 sm:p-8 rounded-2xl h-full flex flex-col cursor-pointer group overflow-hidden"
                      whileHover={{ y: -8, borderColor: 'rgba(255, 179, 102, 0.5)' }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      viewport={{ once: true }}
                    >
                      {/* Image */}
                      <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-6 bg-gradient-to-br from-secondary/20 to-primary/20">
                        <img
                          src={module.image}
                          alt={module.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          loading="eager"
                          onError={(e) => handleImageError(module.name, module.image, e)}
                          onLoad={(e) => {
                            console.log(`Image loaded successfully: ${module.name}`);
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                      </div>
                      
                      <motion.div 
                        className="p-4 rounded-xl bg-secondary/10 border border-secondary/20 w-fit mb-6"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.15 }}
                      >
                        <BookOpen className="w-8 h-8 text-secondary" />
                      </motion.div>
                      <h3 className="font-heading text-xl sm:text-2xl mb-3 text-foreground group-hover:text-secondary transition-colors">{module.name}</h3>
                      <p className="font-paragraph text-base sm:text-lg text-foreground/70 flex-grow">
                        {module.description}
                      </p>
                      <motion.div 
                        className="flex items-center gap-2 text-secondary mt-6 group-hover:gap-4 transition-all"
                        whileHover={{ x: 4 }}
                      >
                        <span className="font-heading font-semibold text-sm sm:text-base">Book Demo</span>
                        <ArrowRight className="w-5 h-5" />
                      </motion.div>
                    </motion.div>
                  </Link>
                </PremiumScrollAnimation>
              ))}
            </div>

            <div className="text-center px-4">
              <Link to="/demo-booking" className="inline-block w-full sm:w-auto">
                <motion.button
                  className="bg-secondary text-secondary-foreground font-heading font-semibold px-8 sm:px-10 py-4 rounded-lg neon-glow-secondary text-base sm:text-lg w-full sm:w-auto"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Book Demo
                </motion.button>
              </Link>
            </div>
          </div>
        </section>

        {/* Certificates Section */}
        <section className="relative z-10 py-16 sm:py-24 md:py-40 bg-background overflow-hidden">
            <div className="max-w-[100rem] mx-auto px-6 sm:px-8 md:px-12 grid lg:grid-cols-2 gap-6 sm:gap-8 items-center">
            <PremiumScrollAnimation variant="fadeInLeft">
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-primary text-glow-primary mb-4 sm:mb-6">
                Earn Recognized Certifications
              </h2>
              <p className="font-paragraph text-base sm:text-lg md:text-xl text-foreground/80 max-w-lg mb-6 sm:mb-8">
                Upon completing our core curriculum, students receive a verifiable certificate showcasing expertise in robotics, coding, and design—recognized by industry leaders.
              </p>
              <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                {[
                  'Industry-recognized credentials',
                  'Shareable digital certificates',
                  'Portfolio-ready projects',
                  'Career advancement opportunities'
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 8 }}
                  >
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.15 }}
                    >
                      <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
                    </motion.div>
                    <span className="font-paragraph text-base sm:text-lg text-foreground/80">{benefit}</span>
                  </motion.div>
                ))}
              </div>
              <Link to="/certificates">
                <motion.button
                  className="font-heading font-semibold text-primary text-lg inline-flex items-center gap-2 hover:gap-4 transition-all"
                  whileHover={{ x: 4 }}
                >
                  See Certificate Examples <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </PremiumScrollAnimation>

            <PremiumScrollAnimation variant="fadeInRight">
              <motion.div
                className="relative glass-pane rounded-3xl p-8 overflow-hidden"
                whileHover={{ scale: 1.02, y: -4 }}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Image
                  src="https://static.wixstatic.com/media/39909b_3513a502b98941b4a18fedf184e5ae1e~mv2.png?originWidth=768&originHeight=576"
                  alt="A sample certificate from VR Robotics Academy with a futuristic design."
                  className="w-full h-auto object-contain rounded-2xl"
                  width={800}
                />
              </motion.div>
            </PremiumScrollAnimation>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative z-10 py-16 sm:py-24 md:py-40 bg-black overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <Image
              src="https://static.wixstatic.com/media/39909b_781f82110d514966878a7c5b77490b08~mv2.png?originWidth=1920&originHeight=1024"
              alt="Abstract grid background"
              className="w-full h-full object-cover"
              width={1920}
            />
          </div>

          <div className="relative max-w-[100rem] mx-auto text-center px-6 sm:px-8 md:px-12">
            <PremiumScrollAnimation variant="fadeInUp">
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-foreground text-glow-primary mb-4 sm:mb-6">
                Ready to Transform Your Future?
              </h2>
              <p className="font-paragraph text-base sm:text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto mb-8 sm:mb-12">
                Take the first step toward becoming a robotics expert. Book a free demo, explore our curriculum, or start your enrollment today.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
                <Link to="/demo-booking" className="w-full sm:w-auto">
                  <motion.button
                    className="bg-primary text-primary-foreground font-heading font-semibold px-8 sm:px-10 py-4 rounded-lg text-base sm:text-lg neon-glow-primary w-full"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Book Free Demo
                  </motion.button>
                </Link>
                <Link to="/admission-process" className="w-full sm:w-auto">
                  <motion.button
                    className="bg-transparent text-primary border-2 border-primary font-heading font-semibold px-8 sm:px-10 py-4 rounded-lg text-base sm:text-lg w-full"
                    whileHover={{ scale: 1.05, y: -2, backgroundColor: 'rgba(255, 140, 66, 0.1)' }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Start Enrollment
                  </motion.button>
                </Link>
                <Link to="/program-fees">
                  <motion.button
                    className="bg-secondary/10 text-secondary border-2 border-secondary font-heading font-semibold px-10 py-4 rounded-lg text-lg w-full sm:w-auto"
                    whileHover={{ scale: 1.05, y: -2, backgroundColor: 'rgba(255, 179, 102, 0.15)' }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Pricing
                  </motion.button>
                </Link>
              </div>
            </PremiumScrollAnimation>
          </div>
        </section>

        {/* Teacher Signup Section */}
        <section className="relative z-10 py-24 md:py-40 section-clip-bottom bg-gradient-to-b from-black via-black/95 to-black overflow-hidden">
          {/* Decorative Background Elements */}
          <motion.div
            className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10"
            animate={{ y: [0, 30, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -z-10"
            animate={{ y: [0, -30, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
          />

          <div className="relative max-w-7xl mx-auto px-4 md:px-8">
            <PremiumScrollAnimation variant="fadeInUp">
              <div className="glass-pane rounded-3xl p-8 md:p-16 border border-primary/30 text-center">
                {/* Badge */}
                <motion.div
                  className="inline-block mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    >
                      <Users className="w-4 h-4 text-primary" />
                    </motion.div>
                    <span className="font-paragraph text-sm text-primary font-semibold">Join Our Team</span>
                  </div>
                </motion.div>

                {/* Main Heading */}
                <motion.h2
                  className="font-heading text-4xl md:text-6xl text-foreground mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  Want to join as <span className="text-primary">teacher?</span>
                </motion.h2>

                {/* Subtitle */}
                <motion.p
                  className="font-paragraph text-xl text-foreground/80 max-w-2xl mx-auto mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  Share your expertise and inspire the next generation of robotics innovators. Become part of our growing community of passionate educators.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <Link to="/teacher-signup">
                    <motion.button
                      className="bg-primary text-primary-foreground font-heading font-semibold px-10 py-4 rounded-lg text-lg neon-glow-primary w-full sm:w-auto flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Sign Up
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                  </Link>
                </motion.div>
              </div>
            </PremiumScrollAnimation>
          </div>
        </section>
        
        <Footer />
      </div>
    </PageTransition>
    </>
  );
}
