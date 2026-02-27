import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { ArrowLeft, BookOpen, Code, Lightbulb, Zap, Target, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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

export default function Module4DetailsPage() {
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
      title: 'Conductivity Tester',
      objective: 'Build a conductivity tester to explore material conductivity',
      learningOutcomes: [
        'Understand basic circuit connections',
        'Learn about material conductivity',
        'Practice using Microbit sensors'
      ],
      image: 'https://static.wixstatic.com/media/39909b_5193ae566a5a4885ac23d52e546166b2~mv2.png?originWidth=448&originHeight=320'
    },
    {
      number: 2,
      title: 'Paper Circuits',
      objective: 'Create a paper circuit for hands-on circuitry exploration',
      learningOutcomes: [
        'Basic understanding of circuits',
        'Express creativity in circuit design',
        'Learn circuit fundamentals through hands-on experience'
      ],
      image: 'https://static.wixstatic.com/media/39909b_9262382377dd4747a506c7884d7a7da7~mv2.png?originWidth=448&originHeight=320'
    },
    {
      number: 3,
      title: 'LED Blink',
      objective: 'Program Microbit to make an LED blink with circuit',
      learningOutcomes: [
        'Master Microbit programming',
        'Understand digital output',
        'Learn basic coding concepts'
      ],
      image: 'https://static.wixstatic.com/media/39909b_a1aff5b127a24408a80b958138a9c0f3~mv2.png?originWidth=448&originHeight=320'
    },
    {
      number: 4,
      title: 'Button Control LED',
      objective: 'Develop a circuit where a button press controls an LED',
      learningOutcomes: [
        'Master button interfacing',
        'Control LEDs based on user input',
        'Understand event-driven programming'
      ],
      image: 'https://static.wixstatic.com/media/39909b_769a476ce9314cb597be73d5f1fed8de~mv2.png?originWidth=448&originHeight=320'
    },
    {
      number: 5,
      title: 'Touch Detection LED',
      objective: 'Implement touch detection to control Microbit\'s LED',
      learningOutcomes: [
        'Master touch sensor integration',
        'Develop interactive Microbit electronics',
        'Understand sensor input handling'
      ],
      image: 'https://static.wixstatic.com/media/39909b_61b19e321d4d4a9bb8eaa12fb9f5614b~mv2.png?originWidth=448&originHeight=320'
    },
    {
      number: 6,
      title: 'RGB Colors',
      objective: 'Use Microbit to display different RGB colors on an LED',
      learningOutcomes: [
        'Explore RGB color mixing',
        'Understand RGB color values',
        'Master color control programming'
      ],
      image: 'https://static.wixstatic.com/media/39909b_bf8e481b5c25440aaad7ced51ba464c9~mv2.png?originWidth=448&originHeight=320'
    },
    {
      number: 7,
      title: 'Traffic Lights',
      objective: 'Simulate a traffic light system with Microbit for sequential control',
      learningOutcomes: [
        'Understand sequential control',
        'Learn traffic light logic',
        'Master timing and state management'
      ],
      image: 'https://static.wixstatic.com/media/39909b_f9ef87b999c644bcaa5faa542f115bc9~mv2.png?originWidth=448&originHeight=320'
    },
    {
      number: 8,
      title: 'Microbit Guitar',
      objective: 'Create a Microbit-based guitar with button-triggered sounds',
      learningOutcomes: [
        'Map button inputs to sounds',
        'Understand basic music programming',
        'Develop interactive sound systems'
      ],
      image: 'https://static.wixstatic.com/media/39909b_2f4300459fe7437e87adf2f9c3527c82~mv2.png?originWidth=448&originHeight=320'
    },
    {
      number: 9,
      title: 'Automatic Street LED',
      objective: 'Simulate an automatic street lights system using Microbit',
      learningOutcomes: [
        'Practice sequential programming',
        'Learn automation concepts',
        'Master sensor-based control'
      ],
      image: 'https://static.wixstatic.com/media/39909b_5bbf924cd03d43a99e49624b7572a72c~mv2.png?originWidth=448&originHeight=320'
    },
    {
      number: 10,
      title: 'Servo Motor Control',
      objective: 'Connect Microbit to control a servo motor for basic motion',
      learningOutcomes: [
        'Learn about servo motors',
        'Master output control',
        'Understand motor programming'
      ],
      image: 'https://static.wixstatic.com/media/39909b_f9237579d4734d5fbd095a00f15b3bcf~mv2.png?originWidth=448&originHeight=320'
    },
    {
      number: 11,
      title: 'Clap Robot',
      objective: 'Program a robot to respond to claps for various actions',
      learningOutcomes: [
        'Learn sound detection',
        'Understand how sound sensors work',
        'Develop sound-responsive robotics'
      ],
      image: 'https://static.wixstatic.com/media/39909b_0fc15f31d70e4857a5a66a6acbd685b4~mv2.png?originWidth=448&originHeight=320'
    },
    {
      number: 12,
      title: 'Smart Dustbin',
      objective: 'Build a Microbit-controlled dustbin with automatic lid opening',
      learningOutcomes: [
        'Integrate sensors for object detection',
        'Understand smart systems',
        'Develop practical IoT applications'
      ],
      image: 'https://static.wixstatic.com/media/39909b_8f54f7d485da478d9387de2e10c84058~mv2.png?originWidth=448&originHeight=320'
    },
    {
      number: 13,
      title: 'Autopilot Robot',
      objective: 'Develop a Microbit robot with autopilot capabilities using sensors',
      learningOutcomes: [
        'Integrate multiple sensors for navigation',
        'Practice complex robotic programming',
        'Understand autonomous systems'
      ],
      image: 'https://static.wixstatic.com/media/39909b_86416c241ff34711b4622a888aead297~mv2.png?originWidth=448&originHeight=320'
    },
    {
      number: 14,
      title: 'Program a Notice Board',
      objective: 'Develop a digital notice board using programming',
      learningOutcomes: [
        'Learn digital signage',
        'Master text display techniques',
        'Understand dynamic content updating'
      ],
      image: 'https://static.wixstatic.com/media/39909b_ad60bbb7c63a49be88edfd2399cd0fda~mv2.png?originWidth=448&originHeight=320'
    },
    {
      number: 15,
      title: 'Mobile Controlled Plant Watering',
      objective: 'Automate plant watering using a mobile app',
      learningOutcomes: [
        'Integrate sensor data with mobile app',
        'Understand plant care automation',
        'Develop IoT applications'
      ],
      image: 'https://static.wixstatic.com/media/39909b_4ffea8a51f9f4dac947521558be14cf6~mv2.png?originWidth=448&originHeight=320'
    },
    {
      number: 16,
      title: 'Keypad Calculator',
      objective: 'Create a calculator using a keypad for numerical input',
      learningOutcomes: [
        'Learn calculator logic',
        'Master keypad mapping',
        'Develop user-friendly interfaces'
      ],
      image: 'https://static.wixstatic.com/media/39909b_82effe03017a4862bb432c113c2dc8ab~mv2.png?originWidth=448&originHeight=320'
    }
  ];

  const stats = [
    { label: '65 Classes', icon: BookOpen, color: 'from-orange-500/20 to-orange-600/10' },
    { label: '40 Projects', icon: Code, color: 'from-amber-500/20 to-amber-600/10' },
    { label: '95 Concepts', icon: Lightbulb, color: 'from-yellow-500/20 to-yellow-600/10' }
  ];

  const keyFeatures = [
    {
      icon: Target,
      title: 'Hands-On Learning',
      description: 'Build real circuits and robotic systems from basic components to advanced applications'
    },
    {
      icon: Zap,
      title: 'Practical Electronics',
      description: 'Master circuit design, sensor integration, and motor control with Microbit'
    },
    {
      icon: Code,
      title: 'Programming Fundamentals',
      description: 'Learn coding concepts through interactive hardware projects and real-world applications'
    }
  ];

  return (
    <div ref={containerRef} className="min-h-screen overflow-x-hidden bg-background text-foreground overflow-hidden relative">
      <Header />
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
                <span className="font-heading text-sm font-bold text-secondary tracking-wide relative z-10">BEGINNER LEVEL • GRADES 1-3</span>
              </motion.div>
            </div>

            {/* Main Title - Enhanced with Gradient Animation */}
            <motion.h1 
              className="font-heading text-6xl sm:text-7xl md:text-8xl text-foreground mb-8 leading-tight font-bold tracking-tight relative"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              Microbit Robotics
              <motion.span 
                className="block bg-gradient-to-r from-secondary via-secondary to-primary bg-clip-text text-transparent"
                animate={{ backgroundPosition: ['0%', '100%', '0%'] }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                Beginner
              </motion.span>
            </motion.h1>

            {/* Subtitle with Staggered Animation */}
            <motion.p 
              className="font-paragraph text-lg md:text-2xl text-foreground/75 max-w-4xl mx-auto mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Microbit robotics for beginners offers a practical and accessible introduction to programming and electronics. Master simple concepts to control hardware like motors and sensors through hands-on projects.
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
              ))}
            </div>
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
                      title: 'Circuit Fundamentals',
                      desc: 'Build and understand basic electrical circuits with hands-on exploration of conductivity and circuit connections'
                    },
                    {
                      title: 'Hardware Control',
                      desc: 'Learn to program and control real hardware like LEDs, motors, and sensors using Microbit'
                    },
                    {
                      title: 'Sensor Integration',
                      desc: 'Master touch detection, button interfacing, and sensor-based programming for interactive projects'
                    },
                    {
                      title: 'Practical Robotics',
                      desc: 'Build real robotic systems including fans, traffic lights, and automated systems with sequential control'
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
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Projects Section - Premium Layout with Enhanced Animations */}
      <section className="relative py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
            style={{ y: y3 }}
          >
            <motion.h2
              className="font-heading text-5xl md:text-6xl text-foreground mb-6 font-bold"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              16 Hands-On Projects
            </motion.h2>
            <p className="font-paragraph text-xl text-foreground/70 max-w-3xl mx-auto">
              Each project builds foundational skills from basic circuits to advanced motor control and automation
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
                      whileHover={{ scale: 1.12, y: -15, rotate: 2 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="relative"
                    >
                      {/* Magical glow effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-secondary/30 to-primary/20 rounded-3xl blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
                      />
                      
                      {/* Animated border */}
                      <motion.div
                        className="absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-r from-secondary/60 via-secondary/30 to-primary/30 bg-clip-border"
                        animate={{ 
                          backgroundPosition: ['0%', '100%', '0%'],
                          opacity: [0.3, 0.8, 0.3]
                        }}
                        transition={{ duration: 4, repeat: Infinity, delay: index * 0.2 }}
                      />
                      
                      <div className="relative rounded-3xl overflow-hidden border-2 border-secondary/30 group-hover:border-secondary/60 transition-all duration-300 bg-background/50 backdrop-blur-sm" style={{ height: '330px', width: '500px' }}>
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
                Ready to Build?
              </motion.h2>
              
              <motion.p
                className="font-paragraph text-xl text-foreground/75 mb-12 max-w-3xl mx-auto text-center leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                Start your Microbit robotics journey with 16 hands-on projects that teach practical electronics and programming fundamentals.
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
                    <span className="relative">Book Demo</span>
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </section>
      <Footer />
    </div>
  );
}
