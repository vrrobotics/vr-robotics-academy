import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { ArrowLeft, BookOpen, Code, Lightbulb, Zap, Target, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import Header from '@/components/Header';

// Floating particle component for magical effect
function FloatingParticle({ delay, duration }: { delay: number; duration: number }) {
  return (
    <motion.div
      className="absolute w-1 h-1 bg-secondary rounded-full"
      animate={{
        y: [0, -100, 0],
        x: [0, Math.random() * 100 - 50, 0],
        opacity: [0, 1, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

// Animated counter component
function AnimatedCounter({ value, duration = 2 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = value / (duration * 60);
    const interval = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(interval);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(interval);
  }, [value, duration]);

  return <span>{count}</span>;
}

export default function Module5Grade47Page() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Create parallax effects for different sections
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const projects = [
    {
      number: 1,
      title: 'Display Names on LCD',
      objective: 'Display user names on an LCD screen using Arduino',
      learningOutcomes: [
        'Understand LCD interfacing',
        'Text display techniques',
        'User interaction implementation'
      ],
      image: 'https://static.wixstatic.com/media/39909b_96459bf3007d43b5808f8aacb1594f72~mv2.png?id=module5-g47-lcd-display'
    },
    {
      number: 2,
      title: 'App Controlled LCD Display',
      objective: 'Control an LCD display using a mobile app',
      learningOutcomes: [
        'Mobile app development basics',
        'Real-time data display',
        'Wireless communication'
      ],
      image: 'https://static.wixstatic.com/media/39909b_402292d1cfc544f2b8edb2afe494d2d3~mv2.png?id=module5-g47-app-lcd'
    },
    {
      number: 3,
      title: 'Smart Dustbin',
      objective: 'Create a smart dustbin that opens when approached',
      learningOutcomes: [
        'IR sensor usage',
        'Smart home concepts',
        'Automation principles'
      ],
      image: 'https://static.wixstatic.com/media/39909b_05d426b2531648fab651718c213bcf03~mv2.png?id=module5-g47-smart-dustbin'
    },
    {
      number: 4,
      title: 'Autopilot Robot - Tesla Model',
      objective: 'Simulate autopilot behavior inspired by Tesla vehicles',
      learningOutcomes: [
        'Autonomous robot concepts',
        'Sensor fusion techniques',
        'Path planning algorithms'
      ],
      image: 'https://static.wixstatic.com/media/39909b_731d336d252a4d0996c5735d9503adba~mv2.png?id=module5-g47-autopilot'
    },
    {
      number: 5,
      title: 'Automatic Door Opening System',
      objective: 'Design an automatic door opening system using sensors',
      learningOutcomes: [
        'Door control mechanisms',
        'Sensor integration',
        'Smart home applications'
      ],
      image: 'https://static.wixstatic.com/media/39909b_a2878715e02d4d40acae8877551a39be~mv2.png?id=module5-g47-auto-door'
    },
    {
      number: 6,
      title: 'Joystick Controls',
      objective: 'Interface a joystick with Arduino for user control',
      learningOutcomes: [
        'Joystick interfacing',
        'Analog input handling',
        'User-driven control systems'
      ],
      image: 'https://static.wixstatic.com/media/39909b_0bb248bd2f0c47e7b02001edb518ae68~mv2.png?id=module5-g47-joystick'
    },
    {
      number: 7,
      title: 'App Controlled Watering Plants',
      objective: 'Automate plant watering using a mobile app',
      learningOutcomes: [
        'IoT applications',
        'App integration',
        'Plant care automation'
      ],
      image: 'https://static.wixstatic.com/media/39909b_5969c59411ac4bdfb8829fab9874c613~mv2.png?id=module5-g47-watering'
    },
    {
      number: 8,
      title: 'App & Voice Controlled Study Lamp',
      objective: 'Develop a study lamp controlled via app and voice commands',
      learningOutcomes: [
        'Voice recognition integration',
        'IoT concepts',
        'Multifunctional device control'
      ],
      image: 'https://static.wixstatic.com/media/39909b_56c74b494d94454a9ca4e592f1a7d375~mv2.png?id=module5-g47-lamp'
    },
    {
      number: 9,
      title: 'Keypad Calculator',
      objective: 'Create a calculator using a keypad for numerical input',
      learningOutcomes: [
        'Calculator logic implementation',
        'Keypad mapping',
        'User interface design'
      ],
      image: 'https://static.wixstatic.com/media/39909b_21bf28ba8a8949bea132959fc5a1ca59~mv2.png?id=module5-g47-calculator'
    }
  ];

  const stats = [
    { label: '38 Classes', icon: BookOpen, color: 'from-orange-500/20 to-orange-600/10' },
    { label: '25 Projects', icon: Code, color: 'from-amber-500/20 to-amber-600/10' },
    { label: '45 Concepts', icon: Lightbulb, color: 'from-yellow-500/20 to-yellow-600/10' }
  ];

  const keyFeatures = [
    {
      icon: Target,
      title: 'Hands-On IoT Projects',
      description: 'Build real-world IoT applications from smart home devices to mobile-controlled systems'
    },
    {
      icon: Zap,
      title: 'Advanced Sensor Integration',
      description: 'Master multiple sensor types and learn to fuse sensor data for intelligent automation'
    },
    {
      icon: Code,
      title: 'Mobile App Development',
      description: 'Connect Arduino projects to mobile apps for remote control and real-time monitoring'
    }
  ];

  return (
    <>
      <Header />
      <div ref={containerRef} className="min-h-screen overflow-x-hidden bg-background text-foreground overflow-hidden relative">
      {/* Magical Background Elements with Enhanced Animations */}
      <motion.div
        className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-secondary/15 via-secondary/5 to-transparent rounded-full blur-3xl pointer-events-none"
        animate={{ 
          y: [0, 60, 0], 
          x: [0, 40, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        style={{ zIndex: 0 }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-primary/10 via-secondary/5 to-transparent rounded-full blur-3xl pointer-events-none"
        animate={{ 
          y: [0, -60, 0], 
          x: [0, -40, 0],
          scale: [1, 1.15, 1]
        }}
        transition={{ duration: 17, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        style={{ zIndex: 0 }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-gradient-to-r from-secondary/8 to-primary/8 rounded-full blur-3xl pointer-events-none"
        animate={{ 
          scale: [1, 1.2, 1], 
          opacity: [0.3, 0.6, 0.3],
          rotate: [0, 180, 360]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        style={{ zIndex: 0 }}
      />

      {/* Floating Particles for Magical Effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        {Array.from({ length: 20 }).map((_, i) => (
          <FloatingParticle
            key={i}
            delay={i * 0.15}
            duration={4 + Math.random() * 2}
          />
        ))}
      </div>

      {/* Header with Back Button - Enhanced */}
      <motion.div 
        className="relative pt-8 px-4 md:px-8 z-30"
        style={{ y: y1 }}
      >
        <div className="max-w-7xl mx-auto">
          <Link to="/curriculum">
            <motion.button
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-secondary/15 to-secondary/5 border border-secondary/40 text-secondary hover:border-secondary/60 hover:bg-gradient-to-r hover:from-secondary/25 hover:to-secondary/10 transition-all duration-300 group"
              whileHover={{ scale: 1.08, x: -5 }}
              whileTap={{ scale: 0.92 }}
            >
              <motion.div
                animate={{ x: [0, -3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowLeft className="w-4 h-4 group-hover:text-secondary transition-colors" />
              </motion.div>
              Back to Curriculum
            </motion.button>
          </Link>
        </div>
      </motion.div>

      {/* Hero Section - Magical Enhanced */}
      <section className="relative pt-20 pb-28 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="text-center mb-16"
            style={{ y: y2 }}
          >
            {/* Level Badge - Animated */}
            <div className="inline-block mb-8">
              <motion.div
                className="flex items-center gap-3 px-5 py-3 rounded-full bg-gradient-to-r from-secondary/20 to-secondary/10 border border-secondary/50 backdrop-blur-sm relative overflow-hidden group"
                whileHover={{ scale: 1.08, borderColor: 'rgba(255, 179, 102, 0.8)' }}
              >
                {/* Animated background shine */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{ x: [-100, 100] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <motion.div
                  className="w-2 h-2 rounded-full bg-secondary"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span className="font-heading text-sm font-bold text-secondary tracking-wide relative z-10">INTERMEDIATE LEVEL • GRADES 4-7</span>
              </motion.div>
            </div>

            {/* Main Title - Enhanced with Gradient Animation */}
            <motion.h1 
              className="font-heading text-6xl sm:text-7xl md:text-8xl text-foreground mb-8 leading-tight font-bold tracking-tight relative"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              Arduino Robotics
              <motion.span 
                className="block bg-gradient-to-r from-secondary via-secondary to-primary bg-clip-text text-transparent"
                animate={{ backgroundPosition: ['0%', '100%', '0%'] }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                Tinkerer
              </motion.span>
            </motion.h1>

            {/* Subtitle with Staggered Animation */}
            <motion.p 
              className="font-paragraph text-lg md:text-2xl text-foreground/75 max-w-4xl mx-auto mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Arduino robotics for kids introduces sensor integration, motor control, and interactive technologies in an engaging way. Through hands-on learning, kids develop foundational skills to build and program robots. Encouraging creativity, problem-solving, and the development of more advanced projects over time.
            </motion.p>

            {/* Stats Grid - Enhanced with Counters */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30, scale: 0.8 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.6 }}
                  className={`relative group`}
                >
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${stat.color} rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
                  />
                  <motion.div 
                    className="relative p-6 rounded-2xl border border-secondary/30 bg-background/50 backdrop-blur-sm hover:border-secondary/60 transition-all duration-300"
                    whileHover={{ y: -8, borderColor: 'rgba(255, 179, 102, 0.6)' }}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <motion.div
                        className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}`}
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity, delay: index * 0.3 }}
                      >
                        <stat.icon className="w-6 h-6 text-secondary" />
                      </motion.div>
                      <span className="font-heading text-2xl font-bold text-foreground">
                        <AnimatedCounter value={parseInt(stat.label)} duration={2} />
                      </span>
                      <span className="font-paragraph text-sm text-foreground/60">{stat.label.split(' ')[1]}</span>
                    </div>
                  </motion.div>
                </motion.div>
              ))}</div>
          </motion.div>
        </div>
      </section>

      {/* Key Features Section - Enhanced */}
      <section className="relative py-20 px-4 md:px-8 bg-gradient-to-b from-secondary/8 via-background to-background">
        <motion.div 
          className="max-w-7xl mx-auto"
          style={{ y: y1 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {keyFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                className="group relative"
              >
                {/* Animated background glow */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-primary/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 4, repeat: Infinity, delay: index * 0.3 }}
                />
                
                <motion.div 
                  className="relative p-8 rounded-2xl border border-secondary/20 bg-gradient-to-br from-secondary/5 to-background hover:border-secondary/40 transition-all duration-300"
                  whileHover={{ y: -12, scale: 1.02 }}
                >
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
                  >
                    <div className="p-3 rounded-xl bg-gradient-to-br from-secondary/20 to-secondary/10 w-fit mb-4">
                      <feature.icon className="w-6 h-6 text-secondary" />
                    </div>
                  </motion.div>
                  <h3 className="font-heading text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                  <p className="font-paragraph text-foreground/70 leading-relaxed">{feature.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Overview Section - Refined with Parallax */}
      <section className="relative py-20 px-4 md:px-8">
        <motion.div 
          className="max-w-7xl mx-auto"
          style={{ y: y2 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <motion.div 
              className="p-10 md:p-14 rounded-3xl border border-secondary/30 bg-gradient-to-br from-secondary/8 via-background to-background backdrop-blur-sm relative overflow-hidden group"
              whileHover={{ borderColor: 'rgba(255, 179, 102, 0.5)' }}
            >
              {/* Animated gradient background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-secondary/10 via-transparent to-primary/10"
                animate={{ x: [-100, 100] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
              
              <div className="relative z-10">
                <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-8 font-bold">What You'll Master</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                    {
                      title: 'IoT & Smart Systems',
                      desc: 'Develop intelligent systems that interact with the physical world through sensors and actuators'
                    },
                    {
                      title: 'Mobile App Integration',
                      desc: 'Connect Arduino projects to mobile applications for remote control and real-time monitoring'
                    },
                    {
                      title: 'Advanced Automation',
                      desc: 'Create sophisticated automation systems that respond to environmental conditions and user inputs'
                    },
                    {
                      title: 'Sensor Fusion & Data Processing',
                      desc: 'Combine multiple sensor inputs to make intelligent decisions and control complex robotic systems'
                    }
                  ].map((item, idx) => (
                    <motion.div 
                      key={idx} 
                      className="flex gap-4"
                      initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <motion.div 
                        className="w-1 bg-gradient-to-b from-secondary to-secondary/30 rounded-full flex-shrink-0"
                        animate={{ height: [20, 40, 20] }}
                        transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
                      />
                      <div>
                        <h3 className="font-heading text-lg font-bold text-foreground mb-2">{item.title}</h3>
                        <p className="font-paragraph text-foreground/70">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}</div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Projects Section - Premium Layout with Enhanced Animations */}
      <section className="relative py-28 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
            style={{ y: y3 }}
          >
            <motion.h2
              className="font-heading text-5xl md:text-6xl text-foreground mb-6 font-bold"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              9 Progressive Projects
            </motion.h2>
            <p className="font-paragraph text-xl text-foreground/70 max-w-3xl mx-auto">
              Each project builds on previous concepts, advancing from basic sensor integration to sophisticated IoT systems
            </p>
          </motion.div>

          <div className="space-y-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.08, duration: 0.6 }}
                className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-10 items-center group relative`}
              >
                {/* Animated background line */}
                <motion.div
                  className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-secondary via-secondary/50 to-transparent"
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  style={{ originY: 0 }}
                />

                {/* Content */}
                <motion.div 
                  className="flex-1 relative z-10"
                  whileHover={{ x: index % 2 === 0 ? -10 : 10 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                    className="inline-block mb-4"
                  >
                    <motion.span 
                      className="font-heading text-xs font-bold text-secondary bg-gradient-to-r from-secondary/20 to-secondary/10 px-4 py-2 rounded-full border border-secondary/30"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.15 }}
                    >
                      PROJECT {String(project.number).padStart(2, '0')}
                    </motion.span>
                  </motion.div>
                  
                  <motion.h3 
                    className="font-heading text-3xl md:text-4xl text-foreground mb-4 font-bold leading-tight"
                    animate={{ color: ['#FFFFFF', '#FFB366', '#FFFFFF'] }}
                    transition={{ duration: 4, repeat: Infinity, delay: index * 0.2 }}
                  >
                    {project.title}
                  </motion.h3>
                  
                  <p className="font-paragraph text-lg text-foreground/80 mb-6 leading-relaxed">
                    <span className="text-secondary font-semibold">Objective:</span> {project.objective}
                  </p>
                  
                  <div className="mb-6">
                    <p className="font-heading text-sm font-bold text-secondary mb-4 uppercase tracking-wide">Learning Outcomes</p>
                    <ul className="space-y-3">
                      {project.learningOutcomes.map((outcome, idx) => (
                        <motion.li 
                          key={idx} 
                          className="flex gap-3 font-paragraph text-foreground/80"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 + idx * 0.05 }}
                        >
                          <motion.span 
                            className="text-secondary font-bold text-lg leading-none flex-shrink-0"
                            animate={{ x: [0, 3, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: idx * 0.1 }}
                          >
                            →
                          </motion.span>
                          <span>{outcome}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>

                {/* Image - Enhanced with Magical Effects */}
                {project.image && (
                  <motion.div 
                    className="flex-1 relative"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.1, duration: 0.6 }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.08, y: -10 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="relative"
                    >
                      {/* Magical glow effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-secondary/30 to-primary/20 rounded-2xl blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
                      />
                      
                      <div className="relative rounded-2xl overflow-hidden border border-secondary/20 group-hover:border-secondary/40 transition-all duration-300 w-full max-w-md bg-secondary/5 flex items-center justify-center" style={{ aspectRatio: '16/10' }}>
                        <Image
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover"
                          width={500}
                        />
                        
                        {/* Overlay shine effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                          animate={{ x: [-100, 100] }}
                          transition={{ duration: 3, repeat: Infinity }}
                        />
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Premium with Magical Effects */}
      <section className="relative py-28 px-4 md:px-8 bg-gradient-to-b from-background via-secondary/5 to-background overflow-hidden z-20">
        <motion.div 
          className="max-w-7xl mx-auto relative z-20"
          style={{ opacity }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            {/* Animated background elements */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-secondary/15 to-primary/10 rounded-3xl blur-2xl"
              animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 6, repeat: Infinity }}
            />
            
            <motion.div
              className="absolute -top-40 -right-40 w-80 h-80 bg-secondary/20 rounded-full blur-3xl"
              animate={{ x: [0, 30, 0], y: [0, 30, 0] }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            
            <motion.div
              className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl"
              animate={{ x: [0, -30, 0], y: [0, -30, 0] }}
              transition={{ duration: 10, repeat: Infinity, delay: 1 }}
            />
            
            <div className="relative p-14 md:p-20 rounded-3xl border border-secondary/40 bg-gradient-to-br from-secondary/10 via-background to-background backdrop-blur-sm">
              <motion.h2
                className="font-heading text-5xl lg:text-6xl mb-8 text-foreground font-bold text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ scale: { duration: 4, repeat: Infinity } }}
              >
                Ready to Become an Arduino Tinkerer?
              </motion.h2>
              
              <motion.p
                className="font-paragraph text-xl text-foreground/75 mb-12 max-w-3xl mx-auto text-center leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                Join intermediate learners mastering Arduino robotics with 9 sophisticated IoT projects that build real engineering expertise.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex flex-col sm:flex-row flex-wrap justify-center gap-6"
              >
                <Link to="/student-signup">
                  <motion.button
                    className="bg-gradient-to-r from-secondary to-primary text-secondary-foreground font-heading font-bold px-10 py-4 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
                    whileHover={{ scale: 1.08, y: -4 }}
                    whileTap={{ scale: 0.92 }}
                  >
                    {/* Animated shine effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      animate={{ x: [-100, 100] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span className="relative flex items-center gap-2">
                      <Sparkles className="w-5 h-5" />
                      Enroll Now
                    </span>
                  </motion.button>
                </Link>
                
                <Link to="/demo-booking">
                  <motion.button
                    className="bg-transparent text-secondary border-2 border-secondary font-heading font-bold px-10 py-4 rounded-xl text-lg hover:bg-gradient-to-r hover:from-secondary/10 hover:to-secondary/5 transition-all duration-300 relative overflow-hidden group"
                    whileHover={{ scale: 1.08, y: -4, borderColor: 'rgba(255, 179, 102, 0.8)' }}
                    whileTap={{ scale: 0.92 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-secondary/20 via-transparent to-secondary/20"
                      animate={{ x: [-100, 100] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                    <span className="relative">Book Free Demo</span>
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </div>
    </>
  );
}
