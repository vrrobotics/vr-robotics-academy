import { motion, useScroll, useTransform, useMotionTemplate, AnimatePresence } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { ArrowLeft, BookOpen, Code, Lightbulb, Zap, Target, Sparkles, Rocket, Cpu } from 'lucide-react';
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

export default function Module7Grade812Page() {
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
      title: 'OpenCV Installing and Computer Vision Basics',
      objective: 'Install OpenCV on Raspberry Pi and grasp fundamental concepts',
      learningOutcomes: [
        'Successful installation of OpenCV on Raspberry Pi',
        'Understanding essential computer vision principles',
        'Setting up the development environment'
      ],
      image: 'https://static.wixstatic.com/media/39909b_7646d3a78d0143f88d5d83d2ae79fe2a~mv2.png?originWidth=448&originHeight=320'
    },
    {
      number: 2,
      title: 'Writing Text on the Live Camera',
      objective: 'Overlay dynamic text on live camera feed using OpenCV',
      learningOutcomes: [
        'Integration of dynamic elements in computer vision projects',
        'Real-time text rendering on video streams',
        'Camera feed manipulation'
      ],
      image: 'https://static.wixstatic.com/media/39909b_b8d9215c57b044fab7ad6a9d77a68552~mv2.png?originWidth=448&originHeight=320'
    },
    {
      number: 3,
      title: 'VECTOR Hand Distance Measurement',
      objective: 'Measure the distance between hands using OpenCV',
      learningOutcomes: [
        'Hand tracking and distance calculation using CV',
        'Hand gesture recognition fundamentals',
        'Vector mathematics in computer vision'
      ],
      image: 'https://static.wixstatic.com/media/39909b_01172fc4895f41878ab672fb5c052352~mv2.png?originWidth=448&originHeight=320'
    },
    {
      number: 4,
      title: '22 Eye Blink Counter',
      objective: 'Create an eye blink counter using CV for monitoring eye activity',
      learningOutcomes: [
        'Eye detection and tracking',
        'Blink counting algorithm implementation',
        'Real-time facial feature detection'
      ],
      image: 'https://static.wixstatic.com/media/39909b_631e232a45e74a29bdfb1c87df8ed283~mv2.png?originWidth=448&originHeight=320'
    },
    {
      number: 5,
      title: 'Finger Counter',
      objective: 'Build a finger counting system using OpenCV for recognizing hand gestures',
      learningOutcomes: [
        'Hand and finger segmentation',
        'Gesture recognition in computer vision',
        'Real-time hand analysis'
      ],
      image: 'https://static.wixstatic.com/media/39909b_1835c59015e644bfa11641b3961e3316~mv2.png?originWidth=448&originHeight=320'
    },
    {
      number: 6,
      title: 'Traffic Sign Classification',
      objective: 'Implement a system for recognizing traffic signs using OpenCV',
      learningOutcomes: [
        'Image classification techniques',
        'Integration of machine learning for traffic sign recognition',
        'Real-world object detection applications'
      ],
      image: 'https://static.wixstatic.com/media/39909b_bc7c90098b634d6198398a7c5ee0cbaa~mv2.png?originWidth=448&originHeight=320'
    },
    {
      number: 7,
      title: 'Parking Space Counter',
      objective: 'Develop a system to monitor and manage parking availability',
      learningOutcomes: [
        'Object detection in real-world scenarios',
        'Parking space occupancy tracking',
        'Practical AI applications in smart cities'
      ],
      image: 'https://static.wixstatic.com/media/39909b_c62323803b894e59a96c792dad46384b~mv2.png?originWidth=448&originHeight=320'
    },
    {
      number: 8,
      title: 'Virtual Calculator',
      objective: 'Create a virtual calculator and read hand-drawn digits',
      learningOutcomes: [
        'Image processing for digit recognition',
        'Building interactive apps with CV',
        'Handwriting recognition algorithms'
      ],
      image: 'https://static.wixstatic.com/media/39909b_af204cc4c6ab41efaeb1a642fe722df3~mv2.png?originWidth=448&originHeight=320'
    },
    {
      number: 9,
      title: 'ChatGPT Integrating with PI',
      objective: 'Integrate ChatGPT for conversational AI capabilities',
      learningOutcomes: [
        'API integration with ChatGPT',
        'Building a conversational interface',
        'Combining vision and language AI'
      ],
      image: 'https://static.wixstatic.com/media/39909b_b91fa43030ba49efa71566846c68b8cc~mv2.png?originWidth=448&originHeight=320'
    },
    {
      number: 10,
      title: 'Gesture Controlled Lamp',
      objective: 'Build a lamp that responds to hand gestures using Pi',
      learningOutcomes: [
        'Gesture recognition in real-time',
        'Hardware integration with CV',
        'IoT and computer vision integration'
      ],
      image: 'https://static.wixstatic.com/media/39909b_24612f5e393e42b28d42b9c312c89ff4~mv2.png?originWidth=448&originHeight=320'
    }
  ];

  const stats = [
    { label: '30 Classes', icon: BookOpen, color: 'from-orange-500/20 to-orange-600/10' },
    { label: '25 Projects', icon: Code, color: 'from-amber-500/20 to-amber-600/10' },
    { label: '35 Concepts', icon: Lightbulb, color: 'from-yellow-500/20 to-yellow-600/10' }
  ];

  const keyFeatures = [
    {
      icon: Rocket,
      title: 'Image Recognition & Detection',
      description: 'Master computer vision fundamentals through hands-on projects involving image filters, object detection, and visual recognition tasks'
    },
    {
      icon: Cpu,
      title: 'Machine Learning Integration',
      description: 'Learn how machines perceive and understand the world through pattern recognition and intelligent decision-making algorithms'
    },
    {
      icon: Code,
      title: 'Real-World Applications',
      description: 'Build practical AI solutions from traffic sign recognition to gesture control, applying computer vision to solve real-world problems'
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

      {/* Ultra-Enhanced Magical Background Elements */}
      <motion.div
        className="fixed top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-secondary/20 via-secondary/8 to-transparent rounded-full blur-3xl"
        animate={{ 
          y: [0, 80, 0], 
          x: [0, 60, 0],
          scale: [1, 1.3, 1],
          rotate: [0, 180, 360]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-primary/15 via-secondary/8 to-transparent rounded-full blur-3xl"
        animate={{ 
          y: [0, -80, 0], 
          x: [0, -60, 0],
          scale: [1, 1.25, 1],
          rotate: [360, 180, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div
        className="fixed top-1/2 left-1/2 w-[400px] h-[400px] bg-gradient-to-r from-secondary/12 to-primary/12 rounded-full blur-3xl"
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
        className="fixed top-1/4 right-1/4 w-[350px] h-[350px] bg-gradient-to-bl from-secondary/10 to-primary/10 rounded-full blur-3xl"
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
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-secondary/20 to-secondary/8 border border-secondary/40 text-secondary hover:border-secondary/60 hover:bg-gradient-to-r hover:from-secondary/30 hover:to-secondary/15 transition-all duration-300 group relative overflow-hidden"
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
                  <ArrowLeft className="w-4 h-4 group-hover:text-secondary transition-colors" />
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
                className="flex items-center gap-3 px-5 py-3 rounded-full bg-gradient-to-r from-secondary/25 to-secondary/12 border border-secondary/50 backdrop-blur-sm relative overflow-hidden group"
                whileHover={{ scale: 1.12, borderColor: 'rgba(255, 179, 102, 0.9)' }}
                animate={{ 
                  boxShadow: [
                    '0 0 20px rgba(255, 179, 102, 0.3)',
                    '0 0 40px rgba(255, 179, 102, 0.6)',
                    '0 0 20px rgba(255, 179, 102, 0.3)'
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
                  className="w-2 h-2 rounded-full bg-secondary"
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                />
                <span className="font-heading text-sm font-bold text-secondary tracking-wide relative z-10">ADVANCED LEVEL • GRADES 8-12</span>
              </motion.div>
            </div>

            {/* Main Title - Ultra Enhanced with Gradient Animation */}
            <motion.h1 
              className="font-heading text-6xl sm:text-7xl md:text-8xl text-foreground mb-8 leading-tight font-bold tracking-tight relative"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.1 }}
            >
              Computer Vision &
              <motion.span 
                className="block"
                animate={{ 
                  scale: [1, 1.05, 1],
                  y: [0, -10, 0]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <GradientText>AI Robotics</GradientText>
              </motion.span>
            </motion.h1>

            {/* Subtitle with Staggered Animation */}
            <motion.p 
              className="font-paragraph text-lg md:text-2xl text-foreground/75 max-w-4xl mx-auto mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3 }}
            >
              Explore how machines perceive the world through image recognition and object detection. Learn the fundamentals of artificial intelligence and pattern recognition to understand how machines learn and make decisions. Engage in hands-on projects involving computer vision, from designing image filters to training machine learning models for visual recognition tasks.
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
                      title: 'Computer Vision Fundamentals',
                      desc: 'Master image processing, feature detection, and visual recognition using OpenCV and advanced algorithms'
                    },
                    {
                      title: 'Machine Learning Integration',
                      desc: 'Learn how to train and deploy ML models for pattern recognition and intelligent decision-making'
                    },
                    {
                      title: 'Real-Time Processing',
                      desc: 'Develop applications that process video streams and camera feeds in real-time for instant analysis'
                    },
                    {
                      title: 'Practical AI Applications',
                      desc: 'Build real-world solutions from gesture recognition to traffic sign detection and smart automation'
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
            className="text-center mb-20"
            style={{ y: y3 }}
          >
            <motion.h2
              className="font-heading text-5xl md:text-6xl text-foreground mb-6 font-bold"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              10 Progressive Projects
            </motion.h2>
            <p className="font-paragraph text-xl text-foreground/70 max-w-3xl mx-auto">
              Each project builds on previous concepts, advancing from basic computer vision to sophisticated AI applications
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
                          transition={{ delay: idx * 0.05 }}
                        >
                          <motion.span 
                            className="text-secondary font-bold flex-shrink-0 mt-1"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity, delay: idx * 0.1 }}
                          >
                            ✓
                          </motion.span>
                          <span>{outcome}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>

                {/* Image */}
                <motion.div 
                  className="flex-1 relative group/image"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.1 }}
                >
                  <motion.div
                    className="relative rounded-2xl overflow-hidden border border-secondary/30 group-hover/image:border-secondary/60 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      width={500}
                    />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-secondary/20 to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300"
                      animate={{ opacity: [0, 0.3, 0] }}
                      transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
                    />
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-12 md:p-16 rounded-3xl text-center bg-gradient-to-br from-secondary/10 to-primary/10 border border-secondary/30 relative overflow-hidden group"
          >
            {/* Animated background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-secondary/5 via-transparent to-primary/5"
              animate={{ x: [-100, 100] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
            
            <div className="relative z-10">
              <motion.h2
                className="font-heading text-4xl lg:text-5xl mb-6 text-foreground font-bold"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                Ready to Master Computer Vision & AI?
              </motion.h2>
              <motion.p
                className="font-paragraph text-xl text-foreground/80 mb-8 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                Start your journey into artificial intelligence and computer vision with hands-on projects that teach you how machines see and understand the world.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex flex-col sm:flex-row flex-wrap justify-center gap-4"
              >
                <Link to="/curriculum">
                  <motion.button
                    className="bg-primary text-primary-foreground font-heading font-semibold px-8 py-4 rounded-lg text-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Back to Curriculum
                  </motion.button>
                </Link>
                <Link to="/demo-booking">
                  <motion.button
                    className="bg-transparent text-secondary border-2 border-secondary font-heading font-semibold px-8 py-4 rounded-lg text-lg hover:bg-secondary/10 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Book a Demo
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
    </>
  );
}
