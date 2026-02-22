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

export default function Module12Grade812Page() {
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
      title: 'Introduction to Web Development',
      objective: 'Understand the basics of HTML, CSS, and JavaScript and their roles in creating dynamic and interactive web pages',
      learningOutcomes: [
        'Knowledge of web technologies and their roles',
        'Understanding how HTML, CSS, and JavaScript work together',
        'Creating dynamic and interactive web pages'
      ],
      image: 'https://static.wixstatic.com/media/39909b_c77ba2d262fd40beaab464f7e9b41a33~mv2.png?originWidth=448&originHeight=384'
    },
    {
      number: 2,
      title: 'Variables, Data Types, and Operators',
      objective: 'Learn how to declare variables, understand different data types, and perform operations using operators',
      learningOutcomes: [
        'Declaring variables using var, let, and const',
        'Understanding different data types (strings, numbers, booleans, arrays, objects)',
        'Performing operations using operators'
      ],
      image: 'https://static.wixstatic.com/media/39909b_48ab414bca6a464192fc48ca28ec96a1~mv2.png?originWidth=448&originHeight=384'
    },
    {
      number: 3,
      title: 'Control Flow: If Statements, Loops',
      objective: 'Master control flow using conditional statements and loops to direct code execution',
      learningOutcomes: [
        'Using if statements for decision-making',
        'Implementing loops (for, while, do-while)',
        'Controlling the flow of code execution'
      ],
      image: 'https://static.wixstatic.com/media/39909b_83562583d3df448fa144c2e71295ee39~mv2.png?originWidth=448&originHeight=384'
    },
    {
      number: 4,
      title: 'Functions & Scope',
      objective: 'Learn how to create reusable functions and understand variable scope and its impact on code',
      learningOutcomes: [
        'Creating and calling functions',
        'Understanding function parameters and return values',
        'Grasping variable scope and accessibility'
      ],
      image: 'https://static.wixstatic.com/media/39909b_a577c00967b04180ae756722fe8373e0~mv2.png?originWidth=448&originHeight=384'
    },
    {
      number: 5,
      title: 'Document Object Model (DOM)',
      objective: 'Learn how to manipulate HTML documents dynamically using the DOM and JavaScript',
      learningOutcomes: [
        'Understanding the DOM structure and hierarchy',
        'Selecting and manipulating HTML elements',
        'Dynamically updating web page content'
      ],
      image: 'https://static.wixstatic.com/media/39909b_23ffa6c5e24242559ec0a6f96b8e84a1~mv2.png?originWidth=448&originHeight=384'
    },
    {
      number: 6,
      title: 'Asynchronous JavaScript',
      objective: 'Master asynchronous coding using callbacks, promises, and async/await for responsive applications',
      learningOutcomes: [
        'Understanding callbacks and their use cases',
        'Working with promises for better code flow',
        'Using async/await for cleaner asynchronous code'
      ],
      image: 'https://static.wixstatic.com/media/39909b_80271eeaf7a64f31bd88d334e077d046~mv2.png?originWidth=448&originHeight=384'
    },
    {
      number: 7,
      title: 'Error Handling',
      objective: 'Understand techniques for identifying, catching, and handling errors in JavaScript applications',
      learningOutcomes: [
        'Using try-catch blocks for error handling',
        'Understanding different error types',
        'Improving code reliability and debugging'
      ],
      image: 'https://static.wixstatic.com/media/39909b_ccd4c86c4fec473c8858b62c969c5a83~mv2.png?originWidth=448&originHeight=384'
    },
    {
      number: 8,
      title: 'ES6+ Features',
      objective: 'Familiarize with modern JavaScript features introduced in ECMAScript 6 and beyond',
      learningOutcomes: [
        'Using arrow functions and template literals',
        'Destructuring and spread operators',
        'Classes and modern syntax for enhanced readability'
      ],
      image: 'https://static.wixstatic.com/media/39909b_75157adedb444e15986e5761c4922f67~mv2.png?originWidth=448&originHeight=384'
    },
    {
      number: 9,
      title: 'JavaScript Libraries and Frameworks',
      objective: 'Explore popular JavaScript libraries and frameworks that accelerate web development',
      learningOutcomes: [
        'Understanding the role of libraries in development',
        'Exploring popular frameworks like React, Vue, and Angular',
        'Accelerating development with pre-built solutions'
      ],
      image: 'https://static.wixstatic.com/media/39909b_3569716d3a204912933ce410b1c81823~mv2.png?originWidth=448&originHeight=384'
    },
    {
      number: 10,
      title: 'Version Control with Git',
      objective: 'Learn the fundamentals of version control using Git for collaborative development',
      learningOutcomes: [
        'Tracking changes with Git commits',
        'Creating and managing branches',
        'Collaborating and managing project versions'
      ],
      image: 'https://static.wixstatic.com/media/39909b_0d0e39a2327c42d2b72f5805c94fc0c2~mv2.png?originWidth=448&originHeight=384'
    },
    {
      number: 11,
      title: 'Countdown App',
      objective: 'Apply JavaScript fundamentals to create an interactive countdown timer application',
      learningOutcomes: [
        'Implementing user interface with HTML and CSS',
        'Handling user interactions and events',
        'Managing time and updating the DOM dynamically'
      ],
      image: 'https://static.wixstatic.com/media/39909b_20aa7d3d7e854bdf90e8cf1d0bf8fadc~mv2.png?originWidth=448&originHeight=384'
    }
  ];

  const stats = [
    { label: '32 Classes', icon: BookOpen, color: 'from-orange-500/20 to-orange-600/10' },
    { label: '25 Projects', icon: Code, color: 'from-amber-500/20 to-amber-600/10' },
    { label: '45 Concepts', icon: Lightbulb, color: 'from-yellow-500/20 to-yellow-600/10' }
  ];

  const keyFeatures = [
    {
      icon: Rocket,
      title: 'Complete JavaScript Mastery',
      description: 'Master JavaScript from fundamentals to advanced concepts with comprehensive coverage of ES6+ features and modern development practices'
    },
    {
      icon: Cpu,
      title: 'Interactive Web Applications',
      description: 'Build responsive, interactive web applications that respond to user input and dynamically update content in real-time'
    },
    {
      icon: Code,
      title: 'Professional Development Skills',
      description: 'Learn industry-standard practices including version control, error handling, and working with popular frameworks and libraries'
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
              Web Development
              <motion.span 
                className="block"
                animate={{ 
                  scale: [1, 1.05, 1],
                  y: [0, -10, 0]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <GradientText>JavaScript</GradientText>
              </motion.span>
            </motion.h1>

            {/* Subtitle with Staggered Animation */}
            <motion.p 
              className="font-paragraph text-lg md:text-2xl text-foreground/75 max-w-4xl mx-auto mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3 }}
            >
              Master JavaScript to build dynamic, interactive web applications. Start with fundamental concepts like variables, functions, and events, then progress to advanced topics like asynchronous programming and modern frameworks. Create responsive, engaging web experiences that respond to user interactions.
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
                      title: 'JavaScript Fundamentals',
                      desc: 'Master variables, data types, operators, and control flow for solid programming foundations'
                    },
                    {
                      title: 'DOM Manipulation & Events',
                      desc: 'Learn to interact with HTML documents and handle user events for dynamic web pages'
                    },
                    {
                      title: 'Asynchronous Programming',
                      desc: 'Master callbacks, promises, and async/await for responsive, efficient applications'
                    },
                    {
                      title: 'Modern JavaScript & Frameworks',
                      desc: 'Explore ES6+ features and popular frameworks to accelerate your development workflow'
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
              11 Progressive Projects
            </motion.h2>
            <p className="font-paragraph text-xl text-foreground/70 max-w-3xl mx-auto">
              Each project builds on previous concepts, advancing from basic JavaScript syntax to building complete interactive applications
            </p>
          </motion.div>

          <div className="space-y-12">
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
                      
                      <div className="relative rounded-3xl overflow-hidden border-2 border-secondary/30 group-hover:border-secondary/60 transition-all duration-300 bg-background/50 backdrop-blur-sm">
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
      <section className="relative py-28 px-4 md:px-8 bg-gradient-to-b from-background via-secondary/5 to-background overflow-hidden">
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
                Ready to Master JavaScript?
              </motion.h2>
              
              <motion.p
                className="font-paragraph text-xl text-foreground/75 mb-12 max-w-3xl mx-auto text-center leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                Join learners mastering JavaScript with 11 engaging projects that build professional web development skills and create dynamic, interactive, responsive web applications.
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
