import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BaseCrudService } from '@/integrations';
import { ProgramFees } from '@/entities';
import { Check, Star } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BookDemoButton from '@/components/BookDemoButton';
import RazorpayService from '@/services/razorpayService';

export default function ProgramFeesPage() {
  const navigate = useNavigate();
  const [plans, setPlans] = useState<ProgramFees[]>([]);
  const [loading, setLoading] = useState(true);
  const [billingMode, setBillingMode] = useState<'session' | 'month'>('session');
  const [processingPlanKey, setProcessingPlanKey] = useState<string | null>(null);

  const planPricingById: Record<string, { session: number; month: number; cta: string }> = {
    'plan-basic': { session: 20, month: 160, cta: 'Start Learning' },
    'plan-premium': { session: 25, month: 200, cta: 'Get Started Now' },
    'plan-elite': { session: 30, month: 240, cta: 'Book Your Session' }
  };

  const fallbackPricingByCta: Record<string, { session: number; month: number; cta: string }> = {
    'start learning': { session: 20, month: 160, cta: 'Start Learning' },
    'get started now': { session: 25, month: 200, cta: 'Get Started Now' },
    'book your session': { session: 30, month: 240, cta: 'Book Your Session' }
  };

  const getPlanPricing = (plan: ProgramFees) => {
    const byId = planPricingById[plan._id];
    if (byId) return byId;

    const normalizedCta = (plan.callToActionText || '').trim().toLowerCase();
    const byCta = fallbackPricingByCta[normalizedCta];
    if (byCta) return byCta;

    const fallbackSession = Number(plan.price);
    return {
      session: Number.isFinite(fallbackSession) && fallbackSession > 0 ? fallbackSession : 0,
      month: Number.isFinite(fallbackSession) && fallbackSession > 0 ? fallbackSession : 0,
      cta: plan.callToActionText || 'Get Started'
    };
  };

  useEffect(() => {
    loadPlans();
  }, []);

  const handlePlanCheckout = async (plan: ProgramFees) => {
    const pricing = getPlanPricing(plan);
    const amountUsd = billingMode === 'session' ? pricing.session : pricing.month;
    if (!Number.isFinite(amountUsd) || amountUsd <= 0) {
      alert('Invalid plan amount. Please try again.');
      return;
    }

    const planKey = `${plan._id}-${billingMode}`;
    setProcessingPlanKey(planKey);
    try {
      await RazorpayService.initiateSessionEnrollmentPayment({
        planName: plan.planName,
        billingMode,
        amountUsd,
        actionLabel: `${pricing.cta}${billingMode === 'month' ? ' /per month' : ''}`,
        onSuccess: () => {
          console.log(`[ProgramFees] Payment successful for ${plan.planName} (${billingMode})`);
        },
        onError: (error) => {
          console.error(`[ProgramFees] Payment failed for ${plan.planName}:`, error);
        }
      });
    } finally {
      setProcessingPlanKey((current) => (current === planKey ? null : current));
    }
  };

  const loadPlans = async () => {
    setLoading(true);
    const { items } = await BaseCrudService.getAll<ProgramFees>('programfees');
    
    // Default pricing plans for online classes
    const defaultPlans: ProgramFees[] = [
      {
        _id: 'plan-basic',
        planName: 'Basic',
        price: 20,
        billingCycle: 'session',
        shortDescription: 'Perfect for learners who prefer collaborative group learning',
        featuresSummary: `Group Class - 20 Students Online\nScheduled live sessions (2x per week)\nAccess to all learning materials\nProject assignments & feedback\nCommunity forum support\nCompletion certificate`,
        isRecommended: false,
        callToActionText: 'Start Learning'
      },
      {
        _id: 'plan-premium',
        planName: 'Premium',
        price: 25,
        billingCycle: 'session',
        shortDescription: 'Best for students seeking personalized attention and guidance',
        featuresSummary: `Small Group Class - 5 Students Online\nScheduled live sessions (2x per week)\nAll learning materials + advanced content\nPersonalized feedback on projects\nPriority support & guidance\n2 hours 1-on-1 mentoring per month\nProgress tracking dashboard\nProfessional certificate`,
        isRecommended: true,
        callToActionText: 'Get Started Now'
      },
      {
        _id: 'plan-elite',
        planName: 'Elite',
        price: 30,
        billingCycle: 'session',
        shortDescription: 'Ultimate program for serious learners - fully customized learning',
        featuresSummary: `One-on-One Online Classes\nFlexible scheduling (arrange with instructor)\nCustom curriculum tailored to your goals\nPremium robotics kit (included)\nAdvanced projects & real-world challenges\nCareer pathway planning\nElite professional certificate\nDirect instructor access`,
        isRecommended: false,
        callToActionText: 'Book Your Session'
      }
    ];

    // If Supabase rows exist but some text fields are empty, merge with defaults
    const defaultsById = new Map(defaultPlans.map((plan) => [plan._id, plan]));
    const mergedPlans = items.map((plan) => {
      const fallback = defaultsById.get(plan._id);
      if (!fallback) return plan;

      return {
        ...fallback,
        ...plan,
        planName: plan.planName || fallback.planName,
        shortDescription: plan.shortDescription || fallback.shortDescription,
        featuresSummary: plan.featuresSummary || fallback.featuresSummary,
        callToActionText: plan.callToActionText || fallback.callToActionText
      };
    });

    // Use defaults if DB is empty; otherwise use merged data
    setPlans(items.length > 0 ? mergedPlans : defaultPlans);
    setLoading(false);
  };

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
      <section className="relative py-24 px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            className="font-heading text-6xl lg:text-7xl mb-8 text-primary"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              textShadow: '0 0 30px rgba(216, 255, 145, 0.4)'
            }}
          >
            Program Fees
          </motion.h1>
          <motion.p
            className="font-paragraph text-xl lg:text-2xl text-foreground/90 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Choose the perfect plan for your robotics learning journey
          </motion.p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="relative py-16 px-8">
        <div className="max-w-7xl mx-auto">
          {/* Billing Toggle */}
          <div className="flex justify-center mb-12">
            <div className="relative flex items-center w-64 p-1 rounded-full" style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)'
            }}>
              {/* Sliding Background */}
              <motion.div
                layoutId="toggle-bg"
                className="absolute top-1 bottom-1 w-1/2 rounded-full bg-primary"
                animate={{ x: billingMode === 'session' ? 0 : '100%' }}
                transition={{ type: 'spring', damping: 20, stiffness: 200 }}
              />
              
              {/* Toggle Buttons */}
              <button
                onClick={() => setBillingMode('session')}
                className={`relative flex-1 py-2 font-heading font-semibold transition-colors duration-300 ${
                  billingMode === 'session' ? 'text-primary-foreground' : 'text-foreground/60'
                }`}
              >
                Per Session
              </button>
              <button
                onClick={() => setBillingMode('month')}
                className={`relative flex-1 py-2 font-heading font-semibold transition-colors duration-300 ${
                  billingMode === 'month' ? 'text-primary-foreground' : 'text-foreground/60'
                }`}
              >
                Per Month
              </button>
            </div>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="p-10 rounded-3xl animate-pulse"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <div className="h-8 bg-foreground/10 rounded mb-4" />
                  <div className="h-12 bg-foreground/10 rounded mb-6" />
                  <div className="h-4 bg-foreground/10 rounded mb-2" />
                  <div className="h-4 bg-foreground/10 rounded" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {plans.map((plan, index) => (
                <motion.div
                  key={plan._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className={`relative p-10 rounded-3xl ${plan.isRecommended ? 'lg:scale-105' : ''}`}
                  style={{
                    background: plan.isRecommended 
                      ? 'linear-gradient(135deg, rgba(216, 255, 145, 0.1), rgba(255, 211, 158, 0.1))'
                      : 'rgba(255, 255, 255, 0.05)',
                    border: plan.isRecommended 
                      ? '2px solid rgba(216, 255, 145, 0.3)'
                      : '1px solid rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  {plan.isRecommended && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full bg-primary flex items-center gap-2">
                      <Star className="w-4 h-4 text-primary-foreground fill-current" />
                      <span className="font-heading text-sm text-primary-foreground font-semibold">
                        RECOMMENDED
                      </span>
                    </div>
                  )}

                  <h3 className="font-heading text-3xl mb-4 text-foreground">{plan.planName}</h3>
                  
	                  <div className="mb-6">
	                    <div className="flex items-baseline gap-2 mb-2">
	                      <span className="font-heading text-5xl text-primary">
	                        ${billingMode === 'session' ? getPlanPricing(plan).session : getPlanPricing(plan).month}
	                      </span>
	                      <span className="font-paragraph text-foreground/60">
	                        /{billingMode === 'session' ? 'session' : 'per month'}
                      </span>
                    </div>
                  </div>

                  {plan.shortDescription && (
                    <p className="font-paragraph text-lg text-foreground/80 mb-6 leading-relaxed">
                      {plan.shortDescription}
                    </p>
                  )}

                  {plan.featuresSummary && (
                    <div className="space-y-3 mb-8">
                      {plan.featuresSummary.split('\n').filter(f => f.trim()).map((feature, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                          <span className="font-paragraph text-foreground/90">{feature.trim()}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <motion.button
                    className={`w-full font-heading font-semibold px-6 py-3 rounded-lg transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed ${
                      plan.isRecommended
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-transparent text-secondary border-2 border-secondary'
                    }`}
                    whileHover={{ scale: processingPlanKey === `${plan._id}-${billingMode}` ? 1 : 1.02 }}
                    whileTap={{ scale: processingPlanKey === `${plan._id}-${billingMode}` ? 1 : 0.98 }}
                    onClick={() => handlePlanCheckout(plan)}
                    disabled={processingPlanKey === `${plan._id}-${billingMode}`}
	                  >
	                    {processingPlanKey === `${plan._id}-${billingMode}`
	                      ? 'Opening Payment...'
	                      : `${getPlanPricing(plan).cta}${billingMode === 'month' ? ' /per month' : ''}`}
	                  </motion.button>
	                </motion.div>
	              ))}
            </div>
          )}
        </div>
      </section>

      {/* Additional Info */}
      <section className="relative py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="font-heading text-5xl text-center mb-16 text-secondary"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              textShadow: '0 0 30px rgba(255, 211, 158, 0.4)'
            }}
          >
            What's Included
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: '100% Online',
                description: 'Learn from anywhere - no need to commute or travel'
              },
              {
                title: 'Expert Instructors',
                description: 'Industry professionals with real-world robotics experience'
              },
              {
                title: 'Virtual Robotics Lab',
                description: 'VR simulations + physical robotics kits for hands-on learning'
              },
              {
                title: 'Live Interactive Sessions',
                description: 'Real-time instruction with screen sharing and instant feedback'
              },
              {
                title: 'All Materials Included',
                description: 'Robotics kits and software licenses included in monthly fee'
              },
              {
                title: 'Professional Certificates',
                description: 'Industry-recognized credentials upon successful completion'
              },
              {
                title: 'Recorded Sessions',
                description: 'Access replays of live classes anytime for review'
              },
              {
                title: 'Flexible Scheduling',
                description: 'Choose times that work best for you (weekday & weekend)'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="p-6 rounded-2xl"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <h3 className="font-heading text-xl mb-2 text-foreground">{item.title}</h3>
                <p className="font-paragraph text-sm text-foreground/70">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="font-heading text-5xl text-center mb-16 text-primary"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              textShadow: '0 0 30px rgba(216, 255, 145, 0.4)'
            }}
          >
            Frequently Asked Questions
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                question: 'How do online classes work?',
                answer: 'Classes are taught live via video conferencing with screen sharing, VR demonstrations, and real-time interactive coding. You control your robotics kit from home while the instructor guides you.'
              },
              {
                question: 'What\'s the difference between Basic, Premium, and Elite?',
                answer: 'Basic has 20 students per class (group learning), Premium has 5 students (more personalized), and Elite is 1-on-1 with a dedicated instructor. Choose based on the level of attention you need.'
              },
              {
                question: 'What happens if I miss a live session?',
                answer: 'All classes are recorded. You can watch the replay anytime at your convenience. Elite students get priority scheduling to minimize missed sessions.'
              },
              {
                question: 'Are the robotics kits included?',
                answer: 'Yes! Professional robotics kits are shipped to your home and included in the monthly fee. Return the kit if you cancel your subscription.'
              },
              {
                question: 'Can I upgrade my plan anytime?',
                answer: 'Absolutely! You can upgrade from Basic → Premium → Elite at any time. Your existing progress carries over immediately.'
              },
              {
                question: 'Is there a money-back guarantee?',
                answer: 'Yes, we offer a 30-day satisfaction guarantee on all plans. If you\'re not happy with your learning experience, we\'ll refund your first month.'
              },
              {
                question: 'What certifications do I get?',
                answer: 'Each plan includes a professional certificate upon completion. Elite certificates are enhanced and recognized by top tech companies.'
              },
              {
                question: 'How long is each program?',
                answer: 'Our basic programs run 8-12 weeks depending on the curriculum track. Elite students can customize their learning timeline with their instructor.'
              }
            ].map((faq, index) => (
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
                <h3 className="font-heading text-xl mb-3 text-foreground">{faq.question}</h3>
                <p className="font-paragraph text-foreground/70">{faq.answer}</p>
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
              Still Have Questions?
            </motion.h2>
            <motion.p
              className="font-paragraph text-xl text-foreground/80 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Book a free demo or contact us to learn more about our programs and pricing!
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <BookDemoButton
                variant="primary"
                size="lg"
                source="program_fees_cta"
                children="Book Free Demo"
              />
              <motion.button
                className="bg-transparent text-secondary border-2 border-secondary font-heading font-semibold px-8 py-4 rounded-lg"
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
