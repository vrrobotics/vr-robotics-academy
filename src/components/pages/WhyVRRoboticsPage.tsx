import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { Brain, Trophy, Users, Sparkles, Globe, Rocket } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BookDemoPopup from '@/components/BookDemoPopup';
import RazorpayService from '@/services/razorpayService';

export default function WhyVRRoboticsPage() {
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

  return (
    <>
      <Header />
      <BookDemoPopup />
      <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      {/* Circuit Background */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(90deg, rgba(255, 140, 66, 0.1) 1px, transparent 1px),
            linear-gradient(rgba(255, 140, 66, 0.1) 1px, transparent 1px)
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
              textShadow: '0 0 30px rgba(255, 140, 66, 0.4)'
            }}
          >
            Why Choose VR Robotics Academy?
          </motion.h1>
          <motion.p
            className="font-paragraph text-xl lg:text-2xl text-foreground/90 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Discover the benefits that make us the premier choice for robotics and coding education
          </motion.p>
        </div>
      </section>

      {/* Main Benefits Grid */}
      <section className="relative py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: 'Develop Critical Thinking',
                description: 'Our curriculum is designed to challenge young minds and develop problem-solving skills that last a lifetime. Students learn to break down complex problems, think logically, and create innovative solutions.',
                benefits: [
                  'Analytical reasoning skills',
                  'Creative problem-solving',
                  'Logical thinking patterns',
                  'Decision-making abilities'
                ]
              },
              {
                icon: Trophy,
                title: 'Build Confidence',
                description: 'Watch your child grow as they complete projects, overcome challenges, and see their code come to life. Every success builds confidence and encourages them to tackle bigger challenges.',
                benefits: [
                  'Sense of accomplishment',
                  'Public speaking opportunities',
                  'Project presentations',
                  'Peer collaboration'
                ]
              },
              {
                icon: Users,
                title: 'Collaborative Learning',
                description: 'Students work in teams, share ideas, and learn from each other in a supportive environment. Collaboration skills are essential for future success in any field.',
                benefits: [
                  'Teamwork experience',
                  'Communication skills',
                  'Leadership development',
                  'Peer mentoring'
                ]
              },
              {
                icon: Sparkles,
                title: 'Ignite Creativity',
                description: 'Robotics and coding are creative pursuits! Students design their own robots, create unique games, and bring their imagination to life through technology.',
                benefits: [
                  'Creative expression',
                  'Design thinking',
                  'Innovation mindset',
                  'Artistic integration'
                ]
              },
              {
                icon: Globe,
                title: 'Future-Ready Skills',
                description: 'Prepare for careers that don\'t even exist yet! Our students learn skills that are in high demand across all industries, from engineering to medicine to entertainment.',
                benefits: [
                  'Coding proficiency',
                  'Tech literacy',
                  'Adaptability',
                  'Digital citizenship'
                ]
              },
              {
                icon: Rocket,
                title: 'Real-World Applications',
                description: 'Every lesson connects to real-world scenarios. Students understand how robotics and AI are used in space exploration, healthcare, environmental protection, and more.',
                benefits: [
                  'Practical knowledge',
                  'Industry connections',
                  'Career awareness',
                  'Social impact projects'
                ]
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 rounded-3xl"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <div className="inline-flex p-4 rounded-xl mb-6 bg-primary/10">
                  <benefit.icon className="w-10 h-10 text-primary" />
                </div>
                <h3 className="font-heading text-2xl mb-4 text-foreground">{benefit.title}</h3>
                <p className="font-paragraph text-lg text-foreground/80 mb-6 leading-relaxed">
                  {benefit.description}
                </p>
                <ul className="space-y-3">
                  {benefit.benefits.map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                      <span className="font-paragraph text-foreground/70">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
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
            The VR Robotics Advantage
          </motion.h2>

          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-10 rounded-3xl bg-gradient-to-br from-primary/20 to-primary/5"
              style={{
                border: '1px solid rgba(255, 140, 66, 0.2)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <h3 className="font-heading text-3xl mb-8 text-primary">What We Offer</h3>
              <div className="space-y-6">
                {[
                  'Small class sizes (max 8 students)',
                  'Personalized learning paths',
                  'Industry-expert instructors',
                  'Latest VR and robotics equipment',
                  'Hands-on project-based learning',
                  'Real-world problem solving',
                  'Portfolio development',
                  'Certification upon completion',
                  'Ongoing mentorship',
                  'Community of innovators'
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-start gap-4"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center mt-1">
                      <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                    </div>
                    <span className="font-paragraph text-lg text-foreground">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 211, 158, 0.2)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <Image
                  src="https://static.wixstatic.com/media/39909b_23c8c6847dbd4f5ca0ff128aa7e17681~mv2.png?originWidth=768&originHeight=960"
                  alt="Students working on robotics projects"
                  className="w-full h-full object-cover"
                  width={800}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Success Stories Teaser */}
      <section className="relative py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="p-16 rounded-3xl text-center"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 140, 66, 0.1), rgba(255, 179, 102, 0.1))',
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
              Join Our Community of Young Innovators
            </motion.h2>
            <motion.p
              className="font-paragraph text-xl text-foreground/80 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Over 1,000 students have already started their journey with us. Your child could be next!
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <motion.button
                className="bg-primary text-primary-foreground font-heading font-semibold px-8 py-4 rounded-[10px]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBookDemoPayment}
              >
                Book Free Demo
              </motion.button>
              <motion.button
                className="bg-transparent text-secondary border-2 border-secondary font-heading font-semibold px-8 py-4 rounded-[10px]"
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 211, 158, 0.1)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/program-fees'}
              >
                View Pricing
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
