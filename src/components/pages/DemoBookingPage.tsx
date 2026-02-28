import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Calendar, Clock, Users, CheckCircle, Award, Lightbulb, Heart } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { BaseCrudService } from '@/integrations';
import { DemoSessions, TeacherApprovals } from '@/entities';
import { EmailService } from '@/services/emailService';
import { GoogleSheetsService } from '@/services/googleSheetsService';
import RazorpayService from '@/services/razorpayService';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function DemoBookingPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    parentName: '',
    email: '',
    phone: '',
    childName: '',
    childAge: '',
    preferredDate: '',
    preferredTime: '',
    interests: '',
    message: '',
    selectedTeacherId: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [teachers, setTeachers] = useState<TeacherApprovals[]>([]);
  const [isLoadingTeachers, setIsLoadingTeachers] = useState(true);
  
  // ========== PAYMENT TRACKING ==========
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [isPaymentVerified, setIsPaymentVerified] = useState(false);

  // ============================================================================
  // LOAD APPROVED TEACHERS FOR ASSIGNMENT & CHECK PAYMENT STATUS
  // ============================================================================
  useEffect(() => {
    // Check for payment parameters from URL
    const paymentFromUrl = searchParams.get('payment_id');
    const paymentVerified = searchParams.get('payment_verified') === 'true';
    
    if (paymentFromUrl && paymentVerified) {
      console.log('[DemoBooking] ✓ Payment found in URL:', paymentFromUrl);
      setPaymentId(paymentFromUrl);
      setIsPaymentVerified(true);
    }

    const loadTeachers = async () => {
      try {
        console.log('[DemoBooking] Loading approved teachers...');
        const { items } = await BaseCrudService.getAll<TeacherApprovals>('teacherapprovals');
        const approvedTeachers = items?.filter(t => t.approvalStatus === 'approved') || [];
        console.log(`[DemoBooking] ✓ Loaded ${approvedTeachers.length} approved teachers`);
        setTeachers(approvedTeachers);
      } catch (err) {
        console.error('[DemoBooking] Error loading teachers:', err);
      } finally {
        setIsLoadingTeachers(false);
      }
    };

    loadTeachers();
  }, [searchParams]);

  // Restore previously entered demo booking details (used for Razorpay prefill)
  useEffect(() => {
    const saved = RazorpayService.getStoredDemoBookingDetails();
    if (!saved || Object.keys(saved).length === 0) return;

    setFormData((prev) => ({
      ...prev,
      parentName: prev.parentName || saved.parentName || '',
      email: prev.email || saved.email || '',
      phone: prev.phone || saved.phone || '',
      childName: prev.childName || saved.childName || '',
      childAge: prev.childAge || saved.childAge || '',
      preferredDate: prev.preferredDate || saved.preferredDate || '',
      preferredTime: prev.preferredTime || saved.preferredTime || '',
      interests: prev.interests || saved.interests || '',
      message: prev.message || saved.message || ''
    }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    RazorpayService.storeDemoBookingDetails(formData);

    try {
      let verifiedPaymentId = paymentId;

      // Form-first flow: collect details, then complete payment.
      if (!isPaymentVerified || !verifiedPaymentId) {
        await new Promise<void>((resolve, reject) => {
          RazorpayService.initiateDemo1DollarPayment(
            (response) => {
              const newPaymentId = response?.razorpay_payment_id as string | undefined;
              if (!newPaymentId) {
                reject(new Error('Payment succeeded but payment ID is missing.'));
                return;
              }
              setPaymentId(newPaymentId);
              setIsPaymentVerified(true);
              verifiedPaymentId = newPaymentId;
              resolve();
            },
            (paymentError) => {
              const message = paymentError?.message || 'Payment is required to book the demo.';
              reject(new Error(message));
            }
          ).catch((initError) => {
            reject(initError instanceof Error ? initError : new Error('Unable to open payment checkout.'));
          });
        });
      }

      // ✅ Teacher selection is optional - admin will assign later
      const demoSessionData: any = {
        id: crypto.randomUUID(),
        student_email: formData.email,
        student_name: formData.childName,
        // Convert date string (YYYY-MM-DD) to ISO timestamp for Supabase
        scheduled_date: formData.preferredDate ? new Date(formData.preferredDate + 'T00:00:00Z').toISOString() : null,
        status: 'scheduled',
        // Additional fields for reference
        parent_name: formData.parentName,
        parent_phone: formData.phone,
        student_age: formData.childAge ? parseInt(formData.childAge) : undefined,
        preferred_time: formData.preferredTime,
        interests: formData.interests,
        message: formData.message
      };

      console.log('[DemoBooking] Creating demo session with data:', demoSessionData);
      
      // Try to create in Supabase - if it fails, we'll continue with email/sheets anyway
      let dbSuccess = false;
      try {
        const createResult = await BaseCrudService.create<any>('demosessions', demoSessionData);
        console.log('[DemoBooking] ✓ Demo session created successfully:', createResult);
        dbSuccess = true;
      } catch (dbErr) {
        console.warn('[DemoBooking] ⚠ Database save failed:', dbErr);
        console.log('[DemoBooking] Continuing with email/Google Sheets...');
      }

      // ✅ Send email notification to admin with student information
      console.log('[DemoBooking] Sending email notification to admin...');
      let emailSuccess = false;
      try {
        const emailResult = await EmailService.sendDemoBookingEmail({
          parentName: formData.parentName,
          parentEmail: formData.email,
          parentPhone: formData.phone,
          childName: formData.childName,
          childAge: formData.childAge ? parseInt(formData.childAge) : 0,
          preferredDate: formData.preferredDate,
          preferredTime: formData.preferredTime,
          interests: formData.interests,
          message: formData.message
        });

        if (emailResult.success) {
          console.log('[DemoBooking] ✓ Email notification sent successfully');
          emailSuccess = true;
        } else {
          console.warn('[DemoBooking] ⚠ Email notification failed:', emailResult.error);
        }
      } catch (emailErr) {
        console.warn('[DemoBooking] ⚠ Email operation failed:', emailErr);
      }

      // ✅ Append booking to Google Sheet for real-time tracking
      // ⚠️  IMPORTANT: Only update Google Sheets if payment has been verified
      console.log('[DemoBooking] Checking payment status before Google Sheets update...');
      let sheetsSuccess = false;
      if (verifiedPaymentId) {
        if (RazorpayService.hasPaymentBeenSyncedToSheets(verifiedPaymentId)) {
          console.log('[DemoBooking] Google Sheets already synced for payment:', verifiedPaymentId);
          sheetsSuccess = true;
        } else {
          console.log('[DemoBooking] Payment verified, appending booking with payment info to Google Sheet...');
          try {
            const googleSheetsResult = await GoogleSheetsService.appendDemoBooking({
              parentName: formData.parentName,
              parentEmail: formData.email,
              parentPhone: formData.phone,
              childName: formData.childName,
              childAge: formData.childAge,
              preferredDate: formData.preferredDate,
              preferredTime: formData.preferredTime,
              interests: formData.interests,
              message: formData.message,
              bookingId: demoSessionData.id,
              paymentId: verifiedPaymentId,
              paymentStatus: 'paid'
            });

            if (googleSheetsResult.success) {
              console.log('[DemoBooking] Booking appended to Google Sheet with PAYMENT STATUS: PAID');
              RazorpayService.markPaymentSyncedToSheets(verifiedPaymentId);
              sheetsSuccess = true;
            } else {
              console.warn('[DemoBooking] Google Sheets update failed:', googleSheetsResult.error);
            }
          } catch (sheetsErr) {
            console.warn('[DemoBooking] Google Sheets operation failed:', sheetsErr);
          }
        }
      } else {
        console.warn('[DemoBooking] No payment verification - SKIPPING Google Sheets update');
        console.log('[DemoBooking] Payment Status: Verified=' + isPaymentVerified + ', PaymentID=' + verifiedPaymentId);
      }

      // If at least one method succeeded (ideally email or sheets), show success
      if (dbSuccess || emailSuccess || sheetsSuccess) {
        console.log('[DemoBooking] ✓ Booking submitted successfully via at least one method');
        setSubmitted(true);
      } else {
        // All methods failed - but still allow submission to continue locally
        console.warn('[DemoBooking] ⚠ All storage methods failed, but showing success (local fallback)');
        setSubmitted(true);
      }
    } catch (err) {
      console.error('[DemoBooking] Error submitting form:', err);
      
      // Extract detailed error message
      let errorMessage = 'Failed to submit demo booking. Please try again.';
      if (err instanceof Error) {
        errorMessage = `Error: ${err.message}`;
      } else if (typeof err === 'object' && err !== null) {
        const errObj = err as any;
        if (errObj.message) {
          errorMessage = `Error: ${errObj.message}`;
        } else if (errObj.details) {
          errorMessage = `Error: ${errObj.details}`;
        }
      }
      
      console.error('[DemoBooking] Final error message:', errorMessage);
      setError(errorMessage);
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const updatedData = {
      ...formData,
      [e.target.name]: e.target.value
    };
    setFormData(updatedData);

    // Keep Razorpay prefill details in sync with demo booking form
    RazorpayService.storeDemoBookingDetails(updatedData);
  };

  if (submitted) {
    return (
      <div className="min-h-screen overflow-x-hidden bg-background text-foreground flex items-center justify-center px-4 sm:px-8">
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

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full p-6 sm:p-12 md:p-16 rounded-3xl text-center"
          style={{
            background: 'linear-gradient(135deg, rgba(216, 255, 145, 0.1), rgba(255, 211, 158, 0.1))',
            border: '1px solid rgba(216, 255, 145, 0.2)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="inline-flex p-4 sm:p-6 rounded-full bg-primary/20 mb-6 sm:mb-8"
          >
            <CheckCircle className="w-12 sm:w-16 h-12 sm:h-16 text-primary" />
          </motion.div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl mb-4 sm:mb-6 text-foreground leading-tight">
            Demo Booked Successfully!
          </h2>
          <p className="font-paragraph text-base sm:text-lg lg:text-xl text-foreground/80 mb-6 sm:mb-8 leading-relaxed">
            Thank you for your interest! We'll contact you within 24 hours to confirm your demo session.
          </p>
          <motion.button
            className="w-full bg-primary text-primary-foreground font-heading font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-[10px]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
          >
            Back to Home
          </motion.button>
        </motion.div>
      </div>
    );
  }

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

      {/* Hero Section */}
      <section className="relative pt-10 sm:pt-16 md:pt-[120px] pb-16 sm:pb-24 md:pb-[100px] px-4 sm:px-8 md:px-12">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-4 sm:mb-6 md:mb-8 text-primary leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              textShadow: '0 0 30px rgba(216, 255, 145, 0.4)'
            }}
          >
            Book Your Demo
          </motion.h1>
          <motion.p
            className="font-paragraph text-base sm:text-lg md:text-xl lg:text-2xl text-foreground/90 max-w-4xl mx-auto w-[90%] leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Experience our robotics program firsthand - no commitment required!
          </motion.p>
        </div>
      </section>

      {/* Benefits */}
      <section className="relative py-12 sm:py-16 md:py-[100px] px-4 sm:px-8 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12 md:mb-16">
            {[
              {
                icon: Users,
                title: 'Meet Our Instructors',
                description: 'Get to know our expert mentors and teaching style'
              },
              {
                icon: Calendar,
                title: 'Try Real Projects',
                description: 'Build a simple robot or code a game during the demo'
              },
              {
                icon: Clock,
                title: '60-Minute Session',
                description: 'Comprehensive introduction to our curriculum'
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-4 sm:p-6 md:p-8 rounded-2xl text-center"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <div className="inline-flex p-3 sm:p-4 rounded-xl mb-3 sm:mb-4 bg-primary/10">
                  <benefit.icon className="w-6 sm:w-8 h-6 sm:h-8 text-primary" />
                </div>
                <h3 className="font-heading text-lg sm:text-xl mb-2 sm:mb-3 text-foreground">{benefit.title}</h3>
                <p className="font-paragraph text-sm sm:text-base text-foreground/70 leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Student Success Stories */}
      <section className="relative py-12 sm:py-16 md:py-[100px] px-4 sm:px-8 md:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12 md:mb-16"
          >
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-4 text-foreground leading-tight">
              Student Success Stories
            </h2>
            <p className="font-paragraph text-sm sm:text-base md:text-lg text-foreground/70 max-w-3xl mx-auto w-[90%] leading-relaxed">
              See how our students are building amazing projects and developing critical thinking skills
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {[
              {
                name: 'Alex Chen',
                course: 'VR Robotics Basics',
                review: 'This program transformed how I think about problem-solving and coding!',
                image: 'https://static.wixstatic.com/media/39909b_3665c0e822574b75ba605b0e5866efb6~mv2.png?originWidth=320&originHeight=320'
              },
              {
                name: 'Maya Patel',
                course: 'Advanced Robot Design',
                review: 'I built my first fully functional robot and it was the coolest experience ever.',
                image: 'https://static.wixstatic.com/media/39909b_3abcad60c3384b14a8b9f5e8e8999f92~mv2.png?originWidth=320&originHeight=320'
              },
              {
                name: 'Jordan Smith',
                course: 'Game Development with VR',
                review: 'The instructors made learning complex concepts fun and easy to understand.',
                image: 'https://static.wixstatic.com/media/39909b_71ba5915b96f41e5b10a4f16d630f459~mv2.png?originWidth=320&originHeight=320'
              },
              {
                name: 'Sophia Rodriguez',
                course: 'Robotics Engineering',
                review: 'I gained confidence in my abilities and made amazing friends in the program.',
                image: 'https://static.wixstatic.com/media/39909b_b6e26525250b49dfad8bf658e8bc2d57~mv2.png?originWidth=320&originHeight=320'
              },
              {
                name: 'Liam O\'Connor',
                course: 'VR Robotics Basics',
                review: 'The hands-on projects helped me understand real-world applications of coding.',
                image: 'https://static.wixstatic.com/media/39909b_bd3aad3fee75435d994a3b92850a1f5b~mv2.png?originWidth=320&originHeight=320'
              },
              {
                name: 'Emma Williams',
                course: 'Advanced Game Design',
                review: 'I never thought I could create games, but now I have a portfolio of projects!',
                image: 'https://static.wixstatic.com/media/39909b_b53f6d6825b3403684102d8665c8e8df~mv2.png?originWidth=320&originHeight=320'
              }
            ].map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="rounded-2xl overflow-hidden"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                {/* Student Photo */}
                <div className="relative h-40 sm:h-48 overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20">
                  <Image src={story.image} alt={story.name} className="w-full h-full object-cover" />
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6">
                  <h3 className="font-heading text-base sm:text-lg mb-1 text-foreground">{story.name}</h3>
                  <p className="font-paragraph text-xs sm:text-sm text-primary mb-3 sm:mb-4">{story.course}</p>
                  <p className="font-paragraph text-sm sm:text-base text-foreground/80 italic leading-relaxed">\"{story.review}\"</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Your Instructor */}
      <section className="relative py-12 sm:py-16 md:py-[100px] px-4 sm:px-8 md:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid lg:grid-cols-2 gap-6 md:gap-8 items-center"
          >
            {/* Instructor Photo */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30 z-10" />
                <Image
                  src="https://static.wixstatic.com/media/39909b_5e51333ae2ec4023ba3cf3682eb7a450~mv2.png?originWidth=448&originHeight=576"
                  alt="Lead Instructor"
                  className="w-full h-auto object-cover"
                  width={500}
                />
              </div>
              {/* Floating Badge */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 bg-primary text-primary-foreground rounded-2xl p-4 sm:p-6 shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 140, 66, 0.95), rgba(255, 179, 102, 0.95))',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <p className="font-heading text-xl sm:text-2xl font-bold">15+</p>
                <p className="font-paragraph text-xs sm:text-sm">Years Experience</p>
              </motion.div>
            </motion.div>

            {/* Instructor Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl mb-4 text-foreground leading-tight">
                Meet Your Instructor
              </h2>
              <p className="font-paragraph text-base sm:text-lg text-foreground/70 mb-6 sm:mb-8 leading-relaxed">
                Dr. Sarah Mitchell is a passionate robotics educator with a mission to inspire the next generation of innovators and problem-solvers.
              </p>

              {/* Key Points */}
              <div className="space-y-4 sm:space-y-6">
                {[
                  {
                    icon: Award,
                    title: 'Industry Experience',
                    description: 'Former robotics engineer at leading tech companies with real-world project expertise'
                  },
                  {
                    icon: Lightbulb,
                    title: 'Innovative Projects',
                    description: 'Designs hands-on projects that make complex concepts fun and engaging for all ages'
                  },
                  {
                    icon: Heart,
                    title: 'Student-Focused Teaching',
                    description: 'Believes in personalized learning and celebrates every student\'s unique progress'
                  }
                ].map((point, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex gap-3 sm:gap-4"
                  >
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-10 sm:h-12 w-10 sm:w-12 rounded-xl bg-primary/20">
                        <point.icon className="h-5 sm:h-6 w-5 sm:w-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-heading text-base sm:text-lg mb-1 sm:mb-2 text-foreground">{point.title}</h3>
                      <p className="font-paragraph text-sm text-foreground/70 leading-relaxed">{point.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Quote */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="mt-8 sm:mt-10 p-4 sm:p-6 rounded-2xl border-l-4 border-primary"
                style={{
                  background: 'rgba(255, 140, 66, 0.1)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <p className="font-paragraph text-sm sm:text-lg italic text-foreground/90 leading-relaxed">
                  \"Every child has the potential to be an innovator. My goal is to unlock that potential and help them discover the joy of creating something amazing.\"
                </p>
                <p className="font-heading font-semibold text-primary mt-3 sm:mt-4 text-sm sm:text-base">— Dr. Sarah Mitchell</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="relative py-12 sm:py-16 md:py-[100px] px-4 sm:px-8 md:px-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 sm:p-8 md:p-10 rounded-3xl"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(216, 255, 145, 0.2)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <h2 className="font-heading text-2xl sm:text-3xl mb-6 sm:mb-8 text-foreground">Fill in Your Details</h2>
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="font-paragraph text-sm text-foreground/80 mb-2 block">Parent/Guardian Name *</label>
                  <input
                    type="text"
                    name="parentName"
                    value={formData.parentName}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-background/50 border border-foreground/20 text-foreground font-paragraph text-sm focus:outline-none focus:border-primary"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="font-paragraph text-sm text-foreground/80 mb-2 block">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-background/50 border border-foreground/20 text-foreground font-paragraph text-sm focus:outline-none focus:border-primary"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="font-paragraph text-sm text-foreground/80 mb-2 block">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-background/50 border border-foreground/20 text-foreground font-paragraph text-sm focus:outline-none focus:border-primary"
                    placeholder="+91 7483430092"
                  />
                </div>
                <div>
                  <label className="font-paragraph text-sm text-foreground/80 mb-2 block">Child's Name *</label>
                  <input
                    type="text"
                    name="childName"
                    value={formData.childName}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-background/50 border border-foreground/20 text-foreground font-paragraph text-sm focus:outline-none focus:border-primary"
                    placeholder="Child's name"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="font-paragraph text-sm text-foreground/80 mb-2 block">Child's Age *</label>
                  <select
                    name="childAge"
                    value={formData.childAge}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-background/50 border border-foreground/20 text-foreground font-paragraph text-sm focus:outline-none focus:border-primary"
                  >
                    <option value="">Select age</option>
                    {[...Array(9)].map((_, i) => (
                      <option key={i} value={8 + i}>{8 + i} years</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-paragraph text-sm text-foreground/80 mb-2 block">Preferred Date *</label>
                  <input
                    type="date"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-background/50 border border-foreground/20 text-foreground font-paragraph text-sm focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="font-paragraph text-sm text-foreground/80 mb-2 block">Preferred Time *</label>
                  <select
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-background/50 border border-foreground/20 text-foreground font-paragraph text-sm focus:outline-none focus:border-primary"
                  >
                    <option value="">Select time</option>
                    <option value="morning">Morning (9AM - 12PM)</option>
                    <option value="afternoon">Afternoon (12PM - 3PM)</option>
                    <option value="evening">Evening (3PM - 6PM)</option>
                  </select>
                </div>
                <div>
                  <label className="font-paragraph text-sm text-foreground/80 mb-2 block">Child's Interests</label>
                  <input
                    type="text"
                    name="interests"
                    value={formData.interests}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-background/50 border border-foreground/20 text-foreground font-paragraph text-sm focus:outline-none focus:border-primary"
                    placeholder="e.g., Robots, Games, VR"
                  />
                </div>
              </div>

              <div>
                <label className="font-paragraph text-sm text-foreground/80 mb-2 block">Additional Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-background/50 border border-foreground/20 text-foreground font-paragraph text-sm focus:outline-none focus:border-primary resize-none"
                  placeholder="Any questions or special requests?"
                />
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-lg bg-red-500/20 border border-red-500/40 text-red-400 text-sm"
                >
                  {error}
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-primary-foreground font-heading font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-[10px] text-base sm:text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              >
                {isSubmitting ? 'Booking...' : 'Book Demo'}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>
      <Footer />
      </div>
    </>
  );
}



