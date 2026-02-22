import { motion, useScroll, useTransform, useMotionTemplate, AnimatePresence } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { ArrowLeft, Zap, Lightbulb, Code, Cpu, Smartphone, Wrench, Sparkles, Rocket, Gauge } from 'lucide-react';
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

// Animated gradient text component
function GradientText({ children }: { children: React.ReactNode }) {
  return (
    <motion.span
      className="bg-gradient-to-r from-secondary via-primary to-secondary bg-clip-text text-transparent"
      animate={{ backgroundPosition: ['0%', '100%', '0%'] }}
      transition={{ duration: 5, repeat: Infinity }}
    >
      {children}
    </motion.span>
  );
}

// Magnetic button component for enhanced interactivity
function MagneticButton({ children, ...props }: any) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPosition({ x: x * 0.2, y: y * 0.2 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Particle burst effect component
function ParticleBurst({ x, y }: { x: number; y: number }) {
  return (
    <div className="fixed pointer-events-none">
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const distance = 100;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;

        return (
          <motion.div
            key={i}
            className="w-2 h-2 bg-secondary rounded-full"
            initial={{ x, y, opacity: 1, scale: 1 }}
            animate={{ x: x + tx, y: y + ty, opacity: 0, scale: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        );
      })}
    </div>
  );
}

export default function Module3Grade812Page() {
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
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  const [burstParticles, setBurstParticles] = useState<Array<{ x: number; y: number; id: number }>>([]);

  const handleParticleBurst = (e: React.MouseEvent) => {
    const id = Date.now();
    setBurstParticles(prev => [...prev, { x: e.clientX, y: e.clientY, id }]);
    setTimeout(() => {
      setBurstParticles(prev => prev.filter(p => p.id !== id));
    }, 600);
  };

  const projects = [
    {
      number: 1,
      title: 'Display Names on LCD',
      objective: 'Create a program that displays custom text and names on an LCD screen',
      learningOutcomes: [
        'LCD display interfacing with Arduino',
        'String manipulation and text handling',
        'Display formatting and positioning'
      ],
      image: 'https://static.wixstatic.com/media/39909b_92800dc1878c4fda94a3291790ec8dda~mv2.png?originWidth=448&originHeight=384'
    },
    {
      number: 2,
      title: 'App Controlled LCD Display',
      objective: 'Control LCD display content via a mobile app using Bluetooth communication',
      learningOutcomes: [
        'Bluetooth module integration',
        'Mobile app communication protocols',
        'Real-time data transmission'
      ],
      image: 'https://static.wixstatic.com/media/39909b_cf929dc3b85c4b07ab8b50a8c62721c6~mv2.png?originWidth=448&originHeight=384'
    },
    {
      number: 3,
      title: 'Smart Dustbin',
      objective: 'Build an automatic dustbin that opens when motion is detected',
      learningOutcomes: [
        'Motion sensor (PIR) implementation',
        'Servo motor control for lid operation',
        'Automated triggering systems'
      ],
      image: 'https://static.wixstatic.com/media/39909b_216a0bf040c74d0da99ddc5a46c54e29~mv2.png?originWidth=448&originHeight=384'
    },
    {
      number: 4,
      title: 'Autopilot Robot - Tesla Model',
      objective: 'Create a self-driving robot that navigates obstacles autonomously',
      learningOutcomes: [
        'Ultrasonic sensor for obstacle detection',
        'Motor control and movement coordination',
        'Autonomous navigation algorithms'
      ],
      image: 'https://static.wixstatic.com/media/39909b_15536fc8df1a4a8eb5ceb763a37084ab~mv2.png?originWidth=448&originHeight=384'
    },
    {
      number: 5,
      title: 'Automatic Door Opening System',
      objective: 'Design a smart door that opens automatically when someone approaches',
      learningOutcomes: [
        'Distance sensing and threshold logic',
        'Servo motor for door mechanism',
        'Safety and response timing'
      ],
      image: 'https://static.wixstatic.com/media/39909b_2c9bb7be19b04538aba9de7550b6b199~mv2.png?originWidth=448&originHeight=384'
    },
    {
      number: 6,
      title: 'Joystick Controls',
      objective: 'Use an analog joystick to control robot movement in multiple directions',
      learningOutcomes: [
        'Analog input reading and mapping',
        'Multi-axis control systems',
        'Real-time response to user input'
      ],
      image: 'https://static.wixstatic.com/media/39909b_20f485ed7d164c3596fd0b1ede64392e~mv2.png?originWidth=448&originHeight=384'
    },
    {
      number: 7,
      title: 'App Controlled Watering Plants',
      objective: 'Create a smart plant watering system controlled through a mobile application',
      learningOutcomes: [
        'Soil moisture sensor integration',
        'Water pump control via relay',
        'App-based automation and scheduling'
      ],
      image: 'https://static.wixstatic.com/media/39909b_01da64c856f4410181189b71766ae261~mv2.png?originWidth=448&originHeight=384'
    },
    {
      number: 8,
      title: 'App & Voice Controlled Study Lamp',
      objective: 'Build a smart lamp controlled by both mobile app and voice commands',
      learningOutcomes: [
        'Voice recognition module integration',
        'PWM brightness control',
        'Dual control interface implementation'
      ],
      image: 'https://static.wixstatic.com/media/39909b_c9c3cc58dc5547d08695ddca2eb524fc~mv2.png?originWidth=448&originHeight=384'
    },
    {
      number: 9,
      title: 'Keypad Calculator',
      objective: 'Create a functional calculator using a keypad and LCD display',
      learningOutcomes: [
        'Keypad matrix scanning and debouncing',
        'Mathematical computation logic',
        'Real-time display updates'
      ],
      image: 'https://static.wixstatic.com/media/39909b_6150091e618f4d22978fe993b1340928~mv2.png?originWidth=448&originHeight=384'
    }
  ];

  const stats = [
    { label: '35 Classes', icon: Code, color: 'from-orange-500/20 to-orange-600/10' },
    { label: '25 Projects', icon: Wrench, color: 'from-amber-500/20 to-amber-600/10' },
    { label: '30 Concepts', icon: Lightbulb, color: 'from-yellow-500/20 to-yellow-600/10' }
  ];

  const keyFeatures = [
    {
      icon: Smartphone,
      title: 'Mobile App Integration',
      description: 'Learn to control Arduino projects via Bluetooth and mobile applications, creating interactive IoT solutions'
    },
    {
      icon: Cpu,
      title: 'Sensor & Actuator Mastery',
      description: 'Master advanced sensor integration including motion, distance, and environmental sensors for smart automation'
    },
    {
      icon: Zap,
      title: 'Smart Home Automation',
      description: 'Build real-world IoT projects like smart doors, automated watering systems, and voice-controlled devices'
    }
  ];

  return (
    <div ref={containerRef} className="min-h-screen overflow-x-hidden bg-background text-foreground overflow-hidden relative" onClick={handleParticleBurst}>
      {/* Particle Burst Effects */}
      <AnimatePresence>
        {burstParticles.map(particle => (
          <ParticleBurst key={particle.id} x={particle.x} y={particle.y} />
        ))}
      </AnimatePresence>

      {/* Ultra-Enhanced Magical Background Elements - Orange/Amber Theme */}
      <motion.div
        className="fixed top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-orange-500/20 via-orange-400/8 to-transparent rounded-full blur-3xl"
        animate={{ 
          y: [0, 80, 0], 
          x: [0, 60, 0],
          scale: [1, 1.3, 1],
          rotate: [0, 180, 360]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-amber-500/15 via-orange-400/8 to-transparent rounded-full blur-3xl"
        animate={{ 
          y: [0, -80, 0], 
          x: [0, -60, 0],
          scale: [1, 1.25, 1],
          rotate: [360, 180, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div
        className="fixed top-1/2 left-1/2 w-[400px] h-[400px] bg-gradient-to-r from-yellow-500/12 to-orange-500/12 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.4, 1], 
          opacity: [0.2, 0.7, 0.2],
          rotate: [0, 360, 720],
          x: [-50, 50, -50],
          y: [-50, 50, -50]
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />
      <motion.div
        className="fixed top-1/4 right-1/4 w-[350px] h-[350px] bg-gradient-to-bl from-orange-500/10 to-amber-500/10 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
          rotate: [0, -180, -360]
        }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* Enhanced Floating Particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 40 }).map((_, i) => (
          <FloatingParticle
            key={i}
            delay={i * 0.08}
            duration={5 + Math.random() * 3}
          />
        ))}
      </div>

      {/* Header with Back Button - Ultra Enhanced */}
      <motion.div 
        className="relative pt-8 px-4 md:px-8 z-20"
        style={{ y: y1 }}
      >
        <div className="max-w-7xl mx-auto">
          <Link to="/curriculum">
            <MagneticButton>
              <motion.button
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-orange-500/20 to-orange-400/8 border border-orange-400/40 text-orange-300 hover:border-orange-400/60 hover:bg-gradient-to-r hover:from-orange-500/30 hover:to-orange-400/15 transition-all duration-300 group relative overflow-hidden"
                whileHover={{ scale: 1.12, x: -8 }}
                whileTap={{ scale: 0.88 }}
              >
                {/* Animated shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: [-100, 100] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div
                  animate={{ x: [0, -4, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                >
                  <ArrowLeft className="w-4 h-4 group-hover:text-orange-200 transition-colors" />
                </motion.div>
                <span className="relative">Back to Curriculum</span>
              </motion.button>
            </MagneticButton>
          </Link>
        </div>
      </motion.div>

      {/* Hero Section - Ultra Magical Enhanced */}
      <section className="relative pt-20 pb-28 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-center mb-16"
            style={{ y: y2 }}
          >
            {/* Level Badge - Ultra Animated */}
            <div className="inline-block mb-8">
              <motion.div
                className="flex items-center gap-3 px-5 py-3 rounded-full bg-gradient-to-r from-orange-500/25 to-orange-400/12 border border-orange-400/50 backdrop-blur-sm relative overflow-hidden group"
                whileHover={{ scale: 1.12, borderColor: 'rgba(249, 115, 22, 0.9)' }}
                animate={{ 
                  boxShadow: [
                    '0 0 20px rgba(249, 115, 22, 0.3)',
                    '0 0 40px rgba(249, 115, 22, 0.6)',
                    '0 0 20px rgba(249, 115, 22, 0.3)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {/* Animated background shine */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: [-150, 150] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                />
                <motion.div
                  className="w-2 h-2 rounded-full bg-orange-400"
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                />
                <span className="font-heading text-sm font-bold text-orange-300 tracking-wide relative z-10">INTERMEDIATE LEVEL • GRADES 8-12</span>
              </motion.div>
            </div>

            {/* Main Title - Ultra Enhanced with Gradient Animation */}
            <motion.h1 
              className="font-heading text-6xl sm:text-7xl md:text-8xl text-foreground mb-8 leading-tight font-bold tracking-tight relative"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.1 }}
            >
              Arduino Robotics
              <motion.span 
                className="block"
                animate={{ 
                  scale: [1, 1.05, 1],
                  y: [0, -10, 0]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <GradientText>Tinkerer</GradientText>
              </motion.span>
            </motion.h1>

            {/* Subtitle with Staggered Animation */}
            <motion.p 
              className="font-paragraph text-lg md:text-2xl text-foreground/75 max-w-4xl mx-auto mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3 }}
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
                    className="relative p-6 rounded-2xl border border-orange-400/30 bg-background/50 backdrop-blur-sm hover:border-orange-400/60 transition-all duration-300"
                    whileHover={{ y: -8, borderColor: 'rgba(249, 115, 22, 0.6)' }}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <motion.div
                        className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}`}
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity, delay: index * 0.3 }}
                      >
                        <stat.icon className="w-6 h-6 text-orange-400" />
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
      <section className="relative py-20 px-4 md:px-8 bg-gradient-to-b from-orange-500/8 via-background to-background">
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
                  className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-amber-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 4, repeat: Infinity, delay: index * 0.3 }}
                />
                
                <motion.div 
                  className="relative p-8 rounded-2xl border border-orange-400/20 bg-gradient-to-br from-orange-500/5 to-background hover:border-orange-400/40 transition-all duration-300"
                  whileHover={{ y: -12, scale: 1.02 }}
                >
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
                  >
                    <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-400/10 w-fit mb-4">
                      <feature.icon className="w-6 h-6 text-orange-400" />
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
      <section className="relative py-12 px-4 md:px-8">
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
              className="p-10 md:p-14 rounded-3xl border border-orange-400/30 bg-gradient-to-br from-orange-500/8 via-background to-background backdrop-blur-sm relative overflow-hidden group"
              whileHover={{ borderColor: 'rgba(249, 115, 22, 0.5)' }}
            >
              {/* Animated gradient background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-transparent to-amber-500/10"
                animate={{ x: [-100, 100] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
              
              <div className="relative z-10">
                <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-8 font-bold">What You'll Master</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                    {
                      title: 'IoT & Smart Devices',
                      desc: 'Build Internet of Things projects that connect to mobile apps and cloud services for real-world automation'
                    },
                    {
                      title: 'Sensor Integration',
                      desc: 'Master motion, distance, moisture, and environmental sensors for creating intelligent automated systems'
                    },
                    {
                      title: 'Mobile App Control',
                      desc: 'Learn Bluetooth communication and app development to control Arduino projects from smartphones'
                    },
                    {
                      title: 'Voice & AI Integration',
                      desc: 'Implement voice recognition and AI-powered features for hands-free control of smart devices'
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
                        className="w-1 bg-gradient-to-b from-orange-400 to-orange-400/30 rounded-full flex-shrink-0"
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
              9 Hands-On Projects
            </motion.h2>
            <p className="font-paragraph text-xl text-foreground/70 max-w-3xl mx-auto">
              Each project teaches IoT integration, mobile app control, and smart automation through creative, real-world applications
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
                  className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-400 via-orange-400/50 to-transparent"
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
                      className="font-heading text-xs font-bold text-orange-300 bg-gradient-to-r from-orange-500/20 to-orange-400/10 px-4 py-2 rounded-full border border-orange-400/30"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.15 }}
                    >
                      PROJECT {String(project.number).padStart(2, '0')}
                    </motion.span>
                  </motion.div>
                  
                  <motion.h3 
                    className="font-heading text-3xl md:text-4xl text-foreground mb-4 font-bold leading-tight"
                    animate={{ color: ['#FFFFFF', '#F97316', '#FFFFFF'] }}
                    transition={{ duration: 4, repeat: Infinity, delay: index * 0.2 }}
                  >
                    {project.title}
                  </motion.h3>
                  
                  <p className="font-paragraph text-lg text-foreground/80 mb-6 leading-relaxed">
                    <span className="text-orange-400 font-semibold">Objective:</span> {project.objective}
                  </p>
                  
                  <div className="mb-6">
                    <p className="font-heading text-sm font-bold text-orange-400 mb-4 uppercase tracking-wide">Learning Outcomes</p>
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
                            className="text-orange-400 font-bold text-lg leading-none flex-shrink-0"
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
                        className="absolute inset-0 bg-gradient-to-br from-orange-500/30 to-amber-500/20 rounded-3xl blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
                      />
                      
                      {/* Animated border */}
                      <motion.div
                        className="absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-r from-orange-500/60 via-orange-400/30 to-amber-500/30 bg-clip-border"
                        animate={{ 
                          backgroundPosition: ['0%', '100%', '0%'],
                          opacity: [0.3, 0.8, 0.3]
                        }}
                        transition={{ duration: 4, repeat: Infinity, delay: index * 0.2 }}
                      />
                      
                      <div className="relative rounded-3xl overflow-hidden border-2 border-orange-400/30 group-hover:border-orange-400/60 transition-all duration-300 bg-background/50 backdrop-blur-sm">
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
      <section className="relative py-28 px-4 md:px-8 bg-gradient-to-b from-background via-orange-500/5 to-background overflow-hidden">
        <motion.div 
          className="max-w-7xl mx-auto"
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
              className="absolute inset-0 bg-gradient-to-br from-orange-500/15 to-amber-500/10 rounded-3xl blur-2xl"
              animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 6, repeat: Infinity }}
            />
            
            <motion.div
              className="absolute -top-40 -right-40 w-80 h-80 bg-orange-500/20 rounded-full blur-3xl"
              animate={{ x: [0, 30, 0], y: [0, 30, 0] }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            
            <motion.div
              className="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-500/20 rounded-full blur-3xl"
              animate={{ x: [0, -30, 0], y: [0, -30, 0] }}
              transition={{ duration: 10, repeat: Infinity, delay: 1 }}
            />
            
            <div className="relative p-14 md:p-20 rounded-3xl border border-orange-400/40 bg-gradient-to-br from-orange-500/10 via-background to-background backdrop-blur-sm">
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
                Join learners building smart IoT projects with 9 hands-on projects that teach mobile app integration, sensor control, and voice-activated automation.
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
                    className="bg-gradient-to-r from-orange-500 to-amber-500 text-foreground font-heading font-bold px-10 py-4 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
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
                    className="bg-transparent text-orange-400 border-2 border-orange-400 font-heading font-bold px-10 py-4 rounded-xl text-lg hover:bg-gradient-to-r hover:from-orange-500/10 hover:to-orange-400/5 transition-all duration-300 relative overflow-hidden group"
                    whileHover={{ scale: 1.08, y: -4, borderColor: 'rgba(249, 115, 22, 0.8)' }}
                    whileTap={{ scale: 0.92 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-transparent to-orange-500/20"
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
