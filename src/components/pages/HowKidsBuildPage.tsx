import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { Lightbulb, Wrench, Code, TestTube, Presentation, Trophy } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BookDemoPopup from '@/components/BookDemoPopup';
import RazorpayService from '@/services/razorpayService';

export default function HowKidsBuildPage() {
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

  const steps = [
    {
      icon: Lightbulb,
      title: 'Ideation & Planning',
      description: 'Students brainstorm ideas, sketch designs, and plan their project. Mentors guide them through the design thinking process.',
      details: [
        'Problem identification',
        'Research and inspiration',
        'Sketching and wireframing',
        'Planning materials and approach'
      ],
      color: 'primary'
    },
    {
      icon: Wrench,
      title: 'Building & Assembly',
      description: 'Time to bring ideas to life! Students assemble robots, connect components, and build physical prototypes with hands-on guidance.',
      details: [
        'Component selection',
        'Robot assembly',
        'Circuit connections',
        'Mechanical construction'
      ],
      color: 'secondary'
    },
    {
      icon: Code,
      title: 'Programming',
      description: 'Students write code to control their creations. They learn to program sensors, motors, and create interactive behaviors.',
      details: [
        'Writing control code',
        'Sensor integration',
        'Logic implementation',
        'Feature development'
      ],
      color: 'primary'
    },
    {
      icon: TestTube,
      title: 'Testing & Debugging',
      description: 'Projects are tested, refined, and improved. Students learn that failure is part of the learning process and iterate to perfection.',
      details: [
        'Functionality testing',
        'Bug identification',
        'Problem solving',
        'Performance optimization'
      ],
      color: 'secondary'
    },
    {
      icon: Presentation,
      title: 'Presentation',
      description: 'Students showcase their projects to peers and mentors, explaining their design choices and demonstrating functionality.',
      details: [
        'Project documentation',
        'Demo preparation',
        'Public speaking',
        'Peer feedback'
      ],
      color: 'primary'
    },
    {
      icon: Trophy,
      title: 'Celebration & Reflection',
      description: 'Celebrate achievements and reflect on learnings. Students receive feedback and plan their next innovative project!',
      details: [
        'Achievement recognition',
        'Learning reflection',
        'Portfolio addition',
        'Next steps planning'
      ],
      color: 'secondary'
    }
  ];

  return (
    <>
      <Header />
      <BookDemoPopup />
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
            How Kids Build Projects
          </motion.h1>
          <motion.p
            className="font-paragraph text-xl lg:text-2xl text-foreground/90 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            A step-by-step journey from idea to innovation with expert mentorship every step of the way
          </motion.p>
        </div>
      </section>

      {/* Process Steps */}
      <section className="relative py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-16">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className={`grid lg:grid-cols-2 gap-6 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                  <div className={`space-y-6 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <div className="flex items-center gap-4">
                      <div className={`flex-shrink-0 w-16 h-16 rounded-2xl bg-${step.color}/10 flex items-center justify-center`}>
                        <step.icon className={`w-8 h-8 text-${step.color}`} />
                      </div>
                      <div>
                        <div className="font-heading text-sm text-foreground/60 mb-1">Step {index + 1}</div>
                        <h2 className="font-heading text-3xl lg:text-4xl text-foreground">{step.title}</h2>
                      </div>
                    </div>
                    
                    <p className="font-paragraph text-lg text-foreground/80 leading-relaxed">
                      {step.description}
                    </p>

                    <div className="space-y-3">
                      {step.details.map((detail, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-center gap-3"
                        >
                          <div className={`w-2 h-2 rounded-full bg-${step.color}`} />
                          <span className="font-paragraph text-foreground/90">{detail}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className={`relative ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <div className="relative aspect-video rounded-3xl overflow-hidden"
                      style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: `1px solid rgba(${step.color === 'primary' ? '216, 255, 145' : '255, 211, 158'}, 0.2)`,
                        backdropFilter: 'blur(10px)'
                      }}
                    >
                      <Image
                        src={
                          index === 0 ? 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=450&fit=crop&q=80' :
                          index === 1 ? 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=450&fit=crop&q=80' :
                          index === 2 ? 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=800&h=450&fit=crop&q=80' :
                          index === 3 ? 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&h=450&fit=crop&q=80' :
                          index === 4 ? 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=450&fit=crop&q=80' :
                          'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&h=450&fit=crop&q=80'
                        }
                        alt={`${step.title} process`}
                        className="w-full h-full object-cover"
                        width={800}
                      />
                    </div>
                  </div>
                </div>

                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="flex justify-center my-12">
                    <motion.div
                      className="w-1 h-16 bg-gradient-to-b from-primary to-secondary rounded-full"
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                    />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mentorship Section */}
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
            Expert Mentorship at Every Step
          </motion.h2>

          <div className="grid lg:grid-cols-2 gap-6 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(216, 255, 145, 0.2)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <Image
                  src="https://static.wixstatic.com/media/39909b_601a59b94af848958cbe94e170de940e~mv2.png?originWidth=768&originHeight=576"
                  alt="Mentor helping student with robotics project"
                  className="w-full h-full object-cover"
                  width={800}
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="font-heading text-3xl lg:text-4xl text-foreground">
                Personalized Guidance from Industry Experts
              </h3>
              <p className="font-paragraph text-lg text-foreground/80 leading-relaxed">
                Our mentors are experienced robotics engineers, software developers, and educators who are passionate about inspiring the next generation. They provide:
              </p>
              <div className="space-y-4">
                {[
                  'One-on-one support and guidance',
                  'Real-world industry insights',
                  'Encouragement and motivation',
                  'Technical expertise and troubleshooting',
                  'Career pathway advice',
                  'Portfolio development assistance'
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center mt-1">
                      <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                    </div>
                    <span className="font-paragraph text-lg text-foreground">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Project Examples */}
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
            Example Projects Students Build
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Line-Following Robot',
                description: 'A robot that uses sensors to follow a path autonomously',
                level: 'Beginner'
              },
              {
                title: 'Obstacle Avoidance Car',
                description: 'Self-driving car that navigates around obstacles',
                level: 'Intermediate'
              },
              {
                title: 'VR Maze Game',
                description: 'Immersive virtual reality puzzle game',
                level: 'Intermediate'
              },
              {
                title: 'Smart Home System',
                description: 'IoT project controlling lights and sensors',
                level: 'Advanced'
              },
              {
                title: 'Robotic Arm',
                description: 'Programmable arm for picking and placing objects',
                level: 'Advanced'
              },
              {
                title: 'AI Chatbot',
                description: 'Conversational AI with natural language processing',
                level: 'Advanced'
              }
            ].map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="p-8 rounded-2xl"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <div className="inline-flex px-3 py-1 rounded-full bg-secondary/20 text-secondary text-sm font-heading mb-4">
                  {project.level}
                </div>
                <h3 className="font-heading text-2xl mb-3 text-foreground">{project.title}</h3>
                <p className="font-paragraph text-foreground/70">{project.description}</p>
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
              Ready to Build Amazing Projects?
            </motion.h2>
            <motion.p
              className="font-paragraph text-xl text-foreground/80 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Join our academy and start creating with expert mentorship!
            </motion.p>
            <motion.button
              className="bg-primary text-primary-foreground font-heading font-semibold px-8 py-4 rounded-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBookDemoPayment}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Book Demo
            </motion.button>
          </div>
        </div>
      </section>
      </div>
    <Footer />
    </>
  );
}
