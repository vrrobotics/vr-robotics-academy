import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { Lightbulb, Bot, Code, Glasses, Puzzle, Gamepad2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BookDemoPopup from '@/components/BookDemoPopup';

export default function WhatKidsLearnPage() {
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
            What Kids Will Learn
          </motion.h1>
          <motion.p
            className="font-paragraph text-xl lg:text-2xl text-foreground/90 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            A comprehensive journey through robotics, coding, VR, and creative problem-solving
          </motion.p>
        </div>
      </section>

      {/* Main Learning Outcomes */}
      <section className="relative py-16 px-8">
        <div className="max-w-7xl mx-auto space-y-24">
          {/* Creative Thinking */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="inline-flex p-4 rounded-xl bg-primary/10">
                <Lightbulb className="w-12 h-12 text-primary" />
              </div>
              <h2 className="font-heading text-4xl lg:text-5xl text-foreground">Creative Thinking</h2>
              <p className="font-paragraph text-lg text-foreground/80 leading-relaxed">
                Students learn to approach problems from multiple angles, think outside the box, and develop innovative solutions. Creative thinking is the foundation of all great inventions!
              </p>
              <div className="space-y-4">
                {[
                  'Design thinking methodology',
                  'Brainstorming and ideation techniques',
                  'Prototyping and iteration',
                  'Creative problem-solving strategies',
                  'Innovation mindset development'
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="font-paragraph text-foreground/90">{item}</span>
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
              <div className="relative aspect-square rounded-3xl overflow-hidden"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(216, 255, 145, 0.2)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <Image
                  src="https://static.wixstatic.com/media/39909b_9c23d0c78b804a7f8ccb7a772ff505ff~mv2.png?originWidth=768&originHeight=768"
                  alt="Students brainstorming creative solutions"
                  className="w-full h-full object-cover"
                  width={800}
                />
              </div>
            </motion.div>
          </div>

          {/* Robotics */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative order-2 lg:order-1"
            >
              <div className="relative aspect-square rounded-3xl overflow-hidden"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 211, 158, 0.2)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <Image
                  src="https://static.wixstatic.com/media/39909b_e1ba574845454abdaf0af1313d2c407b~mv2.png?originWidth=768&originHeight=768"
                  alt="Students building robots"
                  className="w-full h-full object-cover"
                  width={800}
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6 order-1 lg:order-2"
            >
              <div className="inline-flex p-4 rounded-xl bg-secondary/10">
                <Bot className="w-12 h-12 text-secondary" />
              </div>
              <h2 className="font-heading text-4xl lg:text-5xl text-foreground">Robotics Engineering</h2>
              <p className="font-paragraph text-lg text-foreground/80 leading-relaxed">
                From basic mechanics to advanced automation, students build and program real robots. They learn how machines work, how to control them, and how to make them solve real-world problems.
              </p>
              <div className="space-y-4">
                {[
                  'Robot assembly and construction',
                  'Sensors and actuators',
                  'Motor control and movement',
                  'Autonomous navigation',
                  'Robot-environment interaction',
                  'Competition robotics'
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-2 h-2 rounded-full bg-secondary" />
                    <span className="font-paragraph text-foreground/90">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Coding */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="inline-flex p-4 rounded-xl bg-primary/10">
                <Code className="w-12 h-12 text-primary" />
              </div>
              <h2 className="font-heading text-4xl lg:text-5xl text-foreground">Coding & Programming</h2>
              <p className="font-paragraph text-lg text-foreground/80 leading-relaxed">
                Master the language of computers! Students start with visual block-based coding and progress to text-based programming languages, learning to create games, apps, and control robots.
              </p>
              <div className="space-y-4">
                {[
                  'Block-based programming (Scratch, Blockly)',
                  'Python programming fundamentals',
                  'JavaScript for web and games',
                  'Algorithms and logic',
                  'Debugging and testing',
                  'Game development',
                  'App creation'
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="font-paragraph text-foreground/90">{item}</span>
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
              <div className="relative aspect-square rounded-3xl overflow-hidden"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(216, 255, 145, 0.2)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <Image
                  src="https://static.wixstatic.com/media/39909b_6081f77db36a4680bd1e3b9840eb6db0~mv2.png?originWidth=768&originHeight=768"
                  alt="Students learning to code"
                  className="w-full h-full object-cover"
                  width={800}
                />
              </div>
            </motion.div>
          </div>

          {/* VR Technology */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative order-2 lg:order-1"
            >
              <div className="relative aspect-square rounded-3xl overflow-hidden"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 211, 158, 0.2)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <Image
                  src="https://static.wixstatic.com/media/39909b_4c46cc8ded5546e0b5c15f5e89d1eb58~mv2.png?originWidth=768&originHeight=768"
                  alt="Students using VR technology"
                  className="w-full h-full object-cover"
                  width={800}
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6 order-1 lg:order-2"
            >
              <div className="inline-flex p-4 rounded-xl bg-secondary/10">
                <Glasses className="w-12 h-12 text-secondary" />
              </div>
              <h2 className="font-heading text-4xl lg:text-5xl text-foreground">Virtual Reality</h2>
              <p className="font-paragraph text-lg text-foreground/80 leading-relaxed">
                Step into immersive worlds! Students explore VR technology, create virtual environments, and understand how VR is transforming education, entertainment, and industry.
              </p>
              <div className="space-y-4">
                {[
                  'VR headset operation and safety',
                  '3D environment exploration',
                  'Virtual world creation',
                  'VR game design',
                  'Spatial computing concepts',
                  'Future of VR and AR'
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-2 h-2 rounded-full bg-secondary" />
                    <span className="font-paragraph text-foreground/90">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Additional Skills */}
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
            Bonus Skills & Knowledge
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Puzzle,
                title: 'Problem Solving',
                skills: ['Critical thinking', 'Logical reasoning', 'Debugging skills', 'Analytical mindset']
              },
              {
                icon: Gamepad2,
                title: 'Game Development',
                skills: ['Game design principles', 'Level creation', 'Character programming', 'User experience']
              },
              {
                icon: Bot,
                title: 'AI & Machine Learning',
                skills: ['AI basics', 'Pattern recognition', 'Data analysis', 'Smart systems']
              },
              {
                icon: Lightbulb,
                title: 'Innovation',
                skills: ['Entrepreneurial thinking', 'Product design', 'Prototyping', 'Presentation skills']
              },
              {
                icon: Code,
                title: 'Web Development',
                skills: ['HTML & CSS', 'Interactive websites', 'Web apps', 'Digital design']
              },
              {
                icon: Glasses,
                title: '3D Modeling',
                skills: ['3D design tools', 'Virtual objects', 'Animation basics', 'Spatial thinking']
              }
            ].map((skill, index) => (
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
                <div className="inline-flex p-3 rounded-xl mb-4 bg-primary/10">
                  <skill.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-heading text-2xl mb-4 text-foreground">{skill.title}</h3>
                <ul className="space-y-2">
                  {skill.skills.map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
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
              Ready to Start Learning?
            </motion.h2>
            <motion.p
              className="font-paragraph text-xl text-foreground/80 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Explore our comprehensive curriculum and see how we bring these skills to life!
            </motion.p>
            <motion.button
              className="bg-primary text-primary-foreground font-heading font-semibold px-8 py-4 rounded-[10px]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/curriculum'}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              View Curriculum
            </motion.button>
          </div>
        </div>
      </section>
      </div>
    <Footer />
    </>
  );
}
