import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Image } from '@/components/ui/image';
import { ArrowRight, CheckCircle, Clock, Users, BookOpen, Trophy, Zap } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getFallbackImage, getTertiaryFallbackImage } from '@/services/imageGenerationService';
import RazorpayService from '@/services/razorpayService';

// Professional SVG Illustrations for each step
const ApplicationIllustration = () => (
  <svg viewBox="0 0 400 400" className="w-full h-full">
    <rect width="400" height="400" fill="rgba(216, 255, 145, 0.05)" rx="20" />
    {/* Form Document */}
    <rect x="80" y="60" width="240" height="280" fill="white" opacity="0.9" rx="10" />
    {/* Form Lines */}
    <rect x="100" y="90" width="80" height="12" fill="#d8ff91" opacity="0.6" rx="4" />
    <rect x="100" y="120" width="160" height="8" fill="#ddd" opacity="0.5" rx="4" />
    <rect x="100" y="140" width="160" height="8" fill="#ddd" opacity="0.5" rx="4" />
    <rect x="100" y="160" width="160" height="8" fill="#ddd" opacity="0.5" rx="4" />
    <rect x="100" y="190" width="160" height="8" fill="#ddd" opacity="0.5" rx="4" />
    <rect x="100" y="210" width="160" height="8" fill="#ddd" opacity="0.5" rx="4" />
    {/* Button */}
    <rect x="130" y="260" width="140" height="40" fill="#d8ff91" rx="6" />
    <text x="200" y="287" fontSize="14" fontWeight="bold" textAnchor="middle" fill="#333">SUBMIT</text>
    {/* Checkmark */}
    <circle cx="320" cy="80" r="30" fill="#4ade80" opacity="0.9" />
    <path d="M 310 82 L 318 90 L 330 76" stroke="white" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const DemoIllustration = () => (
  <svg viewBox="0 0 400 400" className="w-full h-full">
    <rect width="400" height="400" fill="rgba(216, 255, 145, 0.05)" rx="20" />
    {/* VR Headset */}
    <ellipse cx="200" cy="120" rx="80" ry="70" fill="none" stroke="#d8ff91" strokeWidth="4" />
    {/* Left Eye */}
    <circle cx="160" cy="110" r="30" fill="none" stroke="#d8ff91" strokeWidth="3" />
    <circle cx="160" cy="110" r="15" fill="#4a5568" opacity="0.8" />
    {/* Right Eye */}
    <circle cx="240" cy="110" r="30" fill="none" stroke="#d8ff91" strokeWidth="3" />
    <circle cx="240" cy="110" r="15" fill="#4a5568" opacity="0.8" />
    {/* Top Band */}
    <rect x="130" y="50" width="140" height="20" fill="#d8ff91" opacity="0.7" rx="10" />
    {/* Virtual World - circles representing VR experience */}
    <circle cx="200" cy="240" r="40" fill="none" stroke="#d8ff91" strokeWidth="2" opacity="0.6" />
    <circle cx="200" cy="240" r="60" fill="none" stroke="#d8ff91" strokeWidth="1" opacity="0.4" />
    <circle cx="200" cy="240" r="80" fill="none" stroke="#d8ff91" strokeWidth="1" opacity="0.2" />
    {/* Star - representing technology */}
    <path d="M 200 200 L 205 215 L 220 215 L 210 225 L 215 240 L 200 230 L 185 240 L 190 225 L 180 215 L 195 215 Z" fill="#d8ff91" opacity="0.8" />
  </svg>
);

const AssessmentIllustration = () => (
  <svg viewBox="0 0 400 400" className="w-full h-full">
    <rect width="400" height="400" fill="rgba(216, 255, 145, 0.05)" rx="20" />
    {/* Clipboard */}
    <rect x="100" y="80" width="200" height="240" fill="white" opacity="0.9" rx="10" />
    <rect x="100" y="50" width="70" height="40" fill="#d8ff91" rx="6" />
    {/* Clip */}
    <circle cx="115" cy="70" r="8" fill="#666" />
    {/* Checkmarks */}
    <g transform="translate(0, 0)">
      <path d="M 130 120 L 140 130 L 155 110" stroke="#4ade80" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M 130 160 L 140 170 L 155 150" stroke="#4ade80" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M 130 200 L 140 210 L 155 190" stroke="#4ade80" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M 130 240 L 140 250 L 155 230" stroke="#4ade80" strokeWidth="3" fill="none" strokeLinecap="round" />
    </g>
    {/* Text lines */}
    <rect x="170" y="125" width="110" height="6" fill="#ddd" opacity="0.5" rx="3" />
    <rect x="170" y="165" width="110" height="6" fill="#ddd" opacity="0.5" rx="3" />
    <rect x="170" y="205" width="110" height="6" fill="#ddd" opacity="0.5" rx="3" />
    <rect x="170" y="245" width="110" height="6" fill="#ddd" opacity="0.5" rx="3" />
    {/* Stars (Rating) */}
    <g transform="translate(200, 310)">
      <path d="M 0 -8 L 2 -2 L 8 -1 L 3 3 L 5 9 L 0 6 L -5 9 L -3 3 L -8 -1 L -2 -2 Z" fill="#d8ff91" />
      <path d="M 20 -8 L 22 -2 L 28 -1 L 23 3 L 25 9 L 20 6 L 15 9 L 17 3 L 12 -1 L 18 -2 Z" fill="#d8ff91" />
      <path d="M 40 -8 L 42 -2 L 48 -1 L 43 3 L 45 9 L 40 6 L 35 9 L 37 3 L 32 -1 L 38 -2 Z" fill="#d8ff91" />
    </g>
  </svg>
);

const ProgramIllustration = () => (
  <svg viewBox="0 0 400 400" className="w-full h-full">
    <rect width="400" height="400" fill="rgba(216, 255, 145, 0.05)" rx="20" />
    {/* Three Program Boxes */}
    {/* Beginner Box */}
    <rect x="50" y="100" width="90" height="180" fill="#3b82f6" opacity="0.8" rx="8" />
    <text x="95" y="140" fontSize="14" fontWeight="bold" textAnchor="middle" fill="white">BEGINNER</text>
    <text x="95" y="165" fontSize="11" textAnchor="middle" fill="white" opacity="0.8">Level 1</text>
    {/* Intermediate Box */}
    <rect x="155" y="60" width="90" height="220" fill="#d8ff91" opacity="0.8" rx="8" />
    <text x="200" y="120" fontSize="14" fontWeight="bold" textAnchor="middle" fill="#333">INTERMEDIATE</text>
    <text x="200" y="145" fontSize="11" textAnchor="middle" fill="#333" opacity="0.8">Level 2-3</text>
    {/* Advanced Box */}
    <rect x="260" y="100" width="90" height="180" fill="#ef4444" opacity="0.8" rx="8" />
    <text x="305" y="140" fontSize="14" fontWeight="bold" textAnchor="middle" fill="white">ADVANCED</text>
    <text x="305" y="165" fontSize="11" textAnchor="middle" fill="white" opacity="0.8">Level 4+</text>
    {/* Arrow pointing to intermediate */}
    <path d="M 200 320 L 200 300" stroke="#d8ff91" strokeWidth="3" fill="none" strokeLinecap="round" />
    <path d="M 190 310 L 200 300 L 210 310" stroke="#d8ff91" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const WelcomeIllustration = () => (
  <svg viewBox="0 0 400 400" className="w-full h-full">
    <rect width="400" height="400" fill="rgba(216, 255, 145, 0.05)" rx="20" />
    {/* Rocket */}
    <path d="M 200 50 L 210 120 L 200 140 L 190 120 Z" fill="#d8ff91" />
    {/* Rocket body */}
    <rect x="185" y="140" width="30" height="100" fill="#ef4444" opacity="0.9" rx="5" />
    {/* Rocket window */}
    <circle cx="200" cy="160" r="8" fill="#4a5568" opacity="0.9" />
    {/* Flames */}
    <path d="M 190 240 L 185 280 L 200 260 L 215 280 L 210 240" fill="#f97316" opacity="0.8" />
    <path d="M 192 250 L 188 275 L 200 265 L 212 275 L 208 250" fill="#fbbf24" opacity="0.7" />
    {/* Stars around rocket */}
    <g fill="#d8ff91">
      <path d="M 80 100 L 85 108 L 93 108 L 87 113 L 89 121 L 80 116 L 71 121 L 73 113 L 67 108 L 75 108 Z" />
      <path d="M 320 150 L 325 158 L 333 158 L 327 163 L 329 171 L 320 166 L 311 171 L 313 163 L 307 158 L 315 158 Z" />
      <path d="M 100 280 L 105 288 L 113 288 L 107 293 L 109 301 L 100 296 L 91 301 L 93 293 L 87 288 L 95 288 Z" />
      <path d="M 300 280 L 305 288 L 313 288 L 307 293 L 309 301 L 300 296 L 291 301 L 293 293 L 287 288 L 295 288 Z" />
    </g>
    {/* Success text indicator */}
    <circle cx="200" cy="340" r="25" fill="#4ade80" opacity="0.8" />
    <path d="M 190 340 L 198 348 L 210 330" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function AdmissionProcessPage() {
  const navigate = useNavigate();

  const handleBookDemoPayment = async () => {
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
  // Admission steps with SVG illustrations
  const steps = [
    {
      stepNumber: 1 as const,
      title: 'Online Application',
      description: 'Fill out our quick online form with basic information about your child - their interests, age, and goals. It takes just 5 minutes!',
      icon: '📝',
      illustration: <ApplicationIllustration />
    },
    {
      stepNumber: 2 as const,
      title: 'Demo Session',
      description: 'Schedule a 30-minute demo where your child can experience our VR robotics platform, meet our instructors, and ask questions.',
      icon: '🎮',
      illustration: <DemoIllustration />
    },
    {
      stepNumber: 3 as const,
      title: 'Assessment & Feedback',
      description: 'After the demo, we provide personalized feedback and recommend the best learning path for your child based on their skill level.',
      icon: '⭐',
      illustration: <AssessmentIllustration />
    },
    {
      stepNumber: 4 as const,
      title: 'Choose Your Program',
      description: 'Select from our flexible plans - beginner, intermediate, or advanced. Start immediately in the next batch or your preferred schedule.',
      icon: '🎯',
      illustration: <ProgramIllustration />
    },
    {
      stepNumber: 5 as const,
      title: 'Welcome to VR Robotics!',
      description: 'Get access to our platform, instructors, learning materials, and community. Your child begins their journey to becoming a tech innovator!',
      icon: '🚀',
      illustration: <WelcomeIllustration />
    }
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
        {/* Circuit Background */}
        <div className="fixed inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(216, 255, 145, 0.1) 1px, transparent 1px),
              linear-gradient(rgba(216, 255, 145, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }} />
        </div>

      {/* Hero Section with Parent-Focused Message */}
      <section className="relative py-24 px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block mb-6 px-4 py-2 rounded-full bg-primary/10 border border-primary/30"
          >
            <span className="text-primary font-semibold">Give Your Child a Competitive Edge</span>
          </motion.div>
          <motion.h1
            className="font-heading text-6xl lg:text-7xl mb-6 text-foreground"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{
              textShadow: '0 0 30px rgba(216, 255, 145, 0.4)'
            }}
          >
            Simple 5-Step Admission Process
          </motion.h1>
          <motion.p
            className="font-paragraph text-xl lg:text-2xl text-foreground/90 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Join thousands of students mastering robotics, AI, and VR technology. Start your child's transformation in just 5 simple steps.
          </motion.p>
        </div>
      </section>

      {/* Process Steps - No Loading State */}
      <section className="relative py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className={`grid lg:grid-cols-2 gap-6 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                  {/* Text Content */}
                  <div className={`space-y-6 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/40">
                        <span className="font-heading text-3xl">{step.icon}</span>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-primary uppercase tracking-wide">Step {step.stepNumber}</div>
                        <h2 className="font-heading text-3xl lg:text-4xl text-foreground">{step.title}</h2>
                      </div>
                    </div>

                    <p className="font-paragraph text-lg text-foreground/80 leading-relaxed">
                      {step.description}
                    </p>

                    {step.stepNumber === 1 && (
                      <motion.button
                        className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-heading font-semibold px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/student-application')}
                      >
                        Start Application
                        <ArrowRight className="w-5 h-5" />
                      </motion.button>
                    )}
                  </div>

                  {/* Icon/Visual - SVG Illustration */}
                  <div className={`relative ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <motion.div 
                      className="relative aspect-square rounded-3xl overflow-hidden flex items-center justify-center group"
                      style={{
                        background: 'linear-gradient(135deg, rgba(216, 255, 145, 0.08), rgba(255, 211, 158, 0.05))',
                        border: '1px solid rgba(216, 255, 145, 0.3)',
                        backdropFilter: 'blur(10px)'
                      }}
                      whileHover={{ scale: 1.08, boxShadow: '0 0 40px rgba(216, 255, 145, 0.5)' }}
                      transition={{ type: 'spring', stiffness: 300, damping: 10 }}
                    >
                      <motion.div
                        className="w-full h-full p-8"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 10 }}
                      >
                        {step.illustration}
                      </motion.div>
                      {/* Glow overlay */}
                      <div className="absolute inset-0 opacity-0 hover:opacity-20 transition-opacity bg-gradient-to-br from-primary via-transparent to-secondary pointer-events-none rounded-3xl" />
                    </motion.div>
                    
                    {/* Animated floating particles around image */}
                    <motion.div
                      className="absolute -inset-4 rounded-3xl border border-primary/20"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                      style={{ pointerEvents: 'none' }}
                    />
                  </div>
                </div>

                {/* Connector Arrow */}
                {index < steps.length - 1 && (
                  <div className="flex justify-center my-12">
                    <motion.div
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                    >
                      <ArrowRight className="w-8 h-8 text-secondary rotate-90" />
                    </motion.div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Parents Choose VR Robotics */}
      <section className="relative py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-5xl lg:text-6xl mb-4 text-foreground">
              Why Parents Choose Us
            </h2>
            <p className="font-paragraph text-xl text-foreground/70 max-w-3xl mx-auto">
              Thousands of families trust VR Robotics Academy to inspire and educate their children
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Trophy className="w-12 h-12 text-primary" />,
                title: '98% Student Satisfaction',
                description: 'Parents report improved STEM skills, confidence, and career readiness in their children.'
              },
              {
                icon: <Users className="w-12 h-12 text-secondary" />,
                title: 'Expert Instructors',
                description: 'Learn from industry professionals with real-world robotics and AI experience.'
              },
              {
                icon: <Zap className="w-12 h-12 text-primary" />,
                title: 'Hands-On Learning',
                description: 'Interactive VR experiences and real robot building projects, not just theory.'
              },
              {
                icon: <BookOpen className="w-12 h-12 text-secondary" />,
                title: '18-Module Curriculum',
                description: 'Comprehensive learning path from basics to advanced topics, clearly structured.'
              },
              {
                icon: <Clock className="w-12 h-12 text-primary" />,
                title: 'Flexible Schedules',
                description: 'Adaptive learning pace and timing that works for busy families.'
              },
              {
                icon: <CheckCircle className="w-12 h-12 text-secondary" />,
                title: 'Recognized Certificates',
                description: 'Boost college applications with industry-recognized certifications.'
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 rounded-2xl"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <div className="mb-4">{benefit.icon}</div>
                <h3 className="font-heading text-xl mb-3 text-foreground">{benefit.title}</h3>
                <p className="font-paragraph text-foreground/70">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Parent Testimonials */}
      <section className="relative py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-5xl lg:text-6xl mb-4 text-foreground">
              What Parents Say
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'Rajesh Kumar',
                role: 'Parent of Aarav (Age 12)',
                quote: 'My son\'s confidence has skyrocketed since joining VR Robotics. He went from shy to leading team projects!'
              },
              {
                name: 'Priya Sharma',
                role: 'Parent of Anika (Age 10)',
                quote: 'Best investment for her future. She\'s learned coding, robotics, and problem-solving in just 3 months!'
              },
              {
                name: 'Amit Patel',
                role: 'Parent of Dev (Age 14)',
                quote: 'The hands-on projects are amazing. Dev is actually excited about STEM now and talks about it constantly.'
              },
              {
                name: 'Sneha Reddy',
                role: 'Parent of Aditi (Age 11)',
                quote: 'Flexible scheduling and personal attention from instructors. Worth every rupee spent!'
              },
              {
                name: 'Vikram Singh',
                role: 'Parent of Rohan (Age 13)',
                quote: 'The curriculum is well-structured and challenging. Rohan is actually considering engineering as a career now.'
              },
              {
                name: 'Neha Gupta',
                role: 'Parent of Zara (Age 9)',
                quote: 'I love how VR makes learning fun. Zara rushes to her classes and loves her instructors!'
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 rounded-2xl"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
                <p className="font-paragraph text-foreground/90 mb-4 italic">{`"${testimonial.quote}"`}</p>
                <div>
                  <p className="font-heading font-semibold text-foreground">{testimonial.name}</p>
                  <p className="font-paragraph text-sm text-foreground/60">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-5xl lg:text-6xl mb-4 text-foreground">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                q: 'What age group is suitable?',
                a: 'VR Robotics Academy is designed for students aged 8-16. We have specialized programs for different age groups and skill levels.'
              },
              {
                q: 'Does my child need prior robotics experience?',
                a: 'No! Our beginner programs are designed for complete novices. We start from basics and progress at a comfortable pace.'
              },
              {
                q: 'What\'s the time commitment?',
                a: 'Programs range from 2-3 hours per week for beginners to flexible schedules for advanced learners. You choose what works best.'
              },
              {
                q: 'Are there offline classes?',
                a: 'Yes! We offer both online and hybrid models. Contact us to find centers near you.'
              },
              {
                q: 'Can we see a sample class before enrolling?',
                a: 'Absolutely! Book a demo session to experience our teaching style and platform firsthand.'
              },
              {
                q: 'What certifications will my child get?',
                a: 'Upon completion, students receive industry-recognized certificates that boost college applications and resume.'
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <h3 className="font-heading text-xl mb-3 text-foreground flex items-start gap-3">
                  <span className="text-primary text-2xl flex-shrink-0">Q</span>
                  {faq.q}
                </h3>
                <p className="font-paragraph text-foreground/80 ml-9">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="p-16 rounded-3xl text-center"
            style={{
              background: 'linear-gradient(135deg, rgba(216, 255, 145, 0.1), rgba(255, 211, 158, 0.1))',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <motion.h2
              className="font-heading text-4xl lg:text-5xl mb-6 text-foreground"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Ready to Start Your Child's Journey?
            </motion.h2>
            <motion.p
              className="font-paragraph text-xl text-foreground/80 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Join thousands of students already mastering robotics, AI, and VR technology. Book a demo today!
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <motion.button
                className="bg-primary text-primary-foreground font-heading font-semibold px-10 py-4 rounded-lg text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBookDemoPayment}
              >
                Book Demo
              </motion.button>
              <motion.button
                className="bg-transparent text-secondary border-2 border-secondary font-heading font-semibold px-10 py-4 rounded-lg text-lg"
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 211, 158, 0.1)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/contact')}
              >
                Contact Us
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>
      </div>
    <Footer />
    </>
  );
}
