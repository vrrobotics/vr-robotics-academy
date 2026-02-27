import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { Target, Lightbulb, Microscope, Handshake } from 'lucide-react';
import Header from '@/components/Header';
import BookDemoPopup from '@/components/BookDemoPopup';
import Footer from '@/components/Footer';

export default function AboutPage() {
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
      <section className="relative py-24 px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h1
            className="font-heading text-5xl sm:text-6xl lg:text-7xl text-center mb-8 text-primary"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            About VR Robotics Academy
          </motion.h1>
          <motion.p
            className="font-paragraph text-lg sm:text-xl lg:text-2xl text-center text-foreground/90 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Empowering the next generation of innovators through cutting-edge robotics and coding education
          </motion.p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="relative py-16 px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="font-heading text-4xl lg:text-5xl text-foreground">Our Mission</h2>
              <p className="font-paragraph text-lg text-foreground/80 leading-relaxed">
                VR Robotics Academy is dedicated to inspiring young minds through innovative STEM education. We believe that every child has the potential to become a creator, innovator, and problem-solver.
              </p>
              <p className="font-paragraph text-lg text-foreground/80 leading-relaxed">
                Our academy combines hands-on robotics, creative coding, and immersive virtual reality experiences to make learning exciting, engaging, and future-ready.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative aspect-video rounded-2xl overflow-hidden"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 140, 66, 0.2)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <Image
                  src="https://static.wixstatic.com/media/39909b_5265e227542f4be682d5d373abe3b8d3~mv2.png?originWidth=768&originHeight=768"
                  alt="Students learning robotics"
                  className="w-full h-full object-cover"
                  width={800}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Pillars */}
      <section className="relative py-16 px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="font-heading text-4xl sm:text-5xl text-center mb-10 text-secondary"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Our Core Pillars
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Microscope,
                title: 'STEM Excellence',
                description: 'We focus on Science, Technology, Engineering, and Mathematics education through project-based learning. Our curriculum is designed to build strong foundational skills while encouraging creative exploration and innovation.',
                gradient: 'from-primary/20 to-primary/5'
              },
              {
                icon: Lightbulb,
                title: 'VR & AI Integration',
                description: 'Experience the future of learning with Virtual Reality and Artificial Intelligence. Our students explore immersive environments, interact with AI systems, and understand how these technologies shape our world.',
                gradient: 'from-secondary/20 to-secondary/5'
              },
              {
                icon: Handshake,
                title: 'Hands-On Learning',
                description: 'Learning by doing is at the heart of our approach. Students build real robots, write actual code, and create tangible projects. Every lesson includes practical application and real-world problem-solving.',
                gradient: 'from-primary/20 to-primary/5'
              },
              {
                icon: Target,
                title: 'Future-Ready Skills',
                description: 'We prepare students for tomorrow\'s challenges by teaching critical thinking, collaboration, and creativity. Our programs develop skills that go beyond robotics, preparing kids for success in any field they choose.',
                gradient: 'from-secondary/20 to-secondary/5'
              }
            ].map((pillar, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`p-8 sm:p-10 rounded-3xl bg-gradient-to-br ${pillar.gradient}`}
                style={{
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <div className="inline-flex p-4 rounded-xl mb-6 bg-foreground/10">
                  <pillar.icon className="w-10 h-10 text-primary" />
                </div>
                <h3 className="font-heading text-2xl sm:text-3xl mb-4 text-foreground">{pillar.title}</h3>
                <p className="font-paragraph text-base sm:text-lg text-foreground/80 leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="relative py-16 px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative order-2 lg:order-1"
            >
              <div className="relative aspect-square rounded-3xl overflow-hidden"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 140, 66, 0.2)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <Image
                  src="https://static.wixstatic.com/media/39909b_8d2b2d78e23f41ba87a2dec5997d5595~mv2.png?originWidth=768&originHeight=768"
                  alt="VR Robotics Academy classroom"
                  className="w-full h-full object-cover"
                  width={800}
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8 order-1 lg:order-2"
            >
              <h2 className="font-heading text-4xl lg:text-5xl text-foreground">What Makes Us Different</h2>
              
              <div className="space-y-6">
                {[
                  {
                    title: 'Small Class Sizes',
                    description: 'Maximum 8 students per class ensures personalized attention and mentorship'
                  },
                  {
                    title: 'Industry Expert Instructors',
                    description: 'Learn from professionals with real-world robotics and AI experience'
                  },
                  {
                    title: 'State-of-the-Art Equipment',
                    description: 'Access to latest VR headsets, robotics kits, and coding platforms'
                  },
                  {
                    title: 'Project Portfolio',
                    description: 'Build a showcase of projects to demonstrate skills and creativity'
                  },
                  {
                    title: 'Flexible Learning Paths',
                    description: 'Customized curriculum that adapts to each student\'s pace and interests'
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="flex-shrink-0 w-2 h-2 rounded-full bg-primary mt-3" />
                    <div>
                      <h4 className="font-heading text-xl text-foreground mb-2">{item.title}</h4>
                      <p className="font-paragraph text-foreground/80">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <Footer />
      </div>
    </>
  );
}
