import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BaseCrudService } from '@/integrations';
import { CurriculumModules } from '@/entities';
import { ArrowLeft, BookOpen, Lightbulb, Clock } from 'lucide-react';
import { Image } from '@/components/ui/image';
import Module4DetailsPage from './Module4DetailsPage';
import Module5DetailsPage from './Module5DetailsPage';
import Module6DetailsPage from './Module6DetailsPage';
import Module7DetailsPage from './Module7DetailsPage';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ModuleDetailsPage() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();
  const [module, setModule] = useState<CurriculumModules | null>(null);
  const [loading, setLoading] = useState(true);

  // Redirect to specific module pages if they exist
  if (moduleId === 'g1-3-module-4') {
    return <Module4DetailsPage />;
  }
  if (moduleId === 'g1-3-module-5') {
    return <Module5DetailsPage />;
  }
  if (moduleId === 'g1-3-module-6') {
    return <Module6DetailsPage />;
  }
  if (moduleId === 'g1-3-module-7') {
    return <Module7DetailsPage />;
  }

  // Fallback module data for modules that might not be fully populated in CMS
  const fallbackModules: Record<string, CurriculumModules> = {
    'g1-3-module-4': {
      _id: 'g1-3-module-4',
      moduleNumber: 4,
      moduleName: 'Microbit Robotics',
      classCount: 65,
      projectCount: 40,
      conceptCount: 95,
      gradeLevel: 'Grades 1-3',
      shortDescription: 'Advanced microbit programming and robotics projects',
      detailedDescription: 'Master advanced microbit programming and robotics. This comprehensive module teaches students how to program microbit devices with advanced logic. Students will integrate sensors and actuators, build autonomous robots, understand motor control and movement, implement collision detection and obstacle avoidance, create robot communication systems, and participate in robotics competitions. Students will build and program robots that can respond to their environment, solve real-world problems, and compete in robotics challenges.',
      learningOutcomes: 'Program microbit devices with advanced logic\nIntegrate sensors and actuators\nBuild autonomous robots\nUnderstand motor control and movement\nImplement collision detection and obstacle avoidance\nCreate robot communication systems\nParticipate in robotics competitions\nDebug and optimize robot performance',
      difficultyLevel: 'Intermediate',
      cardImage: 'https://static.wixstatic.com/media/39909b_c10f582f625446f1914091328542ec2c~mv2.png?originWidth=320&originHeight=192'
    },
    'g1-3-module-5': {
      _id: 'g1-3-module-5',
      moduleNumber: 5,
      moduleName: 'Mobile App Development',
      classCount: 25,
      projectCount: 12,
      conceptCount: 35,
      gradeLevel: 'Grades 1-3',
      shortDescription: 'Create simple mobile applications and games',
      detailedDescription: 'Master mobile app development with visual block-based coding. This module teaches students how to design user interfaces and build logic without needing traditional programming skills. Students will create interactive apps, implement user input handling, design engaging interfaces, build games and utilities, integrate multimedia, and deploy applications. Through hands-on projects, you\'ll learn app design principles including user interface design, event handling, and data management. Build real-world applications that solve problems and provide value, from games to productivity tools and utility apps.',
      learningOutcomes: 'Design user interfaces for mobile apps\\nImplement event-driven programming\\nHandle user input and interactions\\nCreate interactive games and utilities\\nIntegrate multimedia elements\\nManage app data and storage\\nDeploy and test applications\\nOptimize app performance',
      difficultyLevel: 'Beginner',
      cardImage: 'https://static.wixstatic.com/media/39909b_1f817c8e95a440c6a56964f85cf37c9f~mv2.png?originWidth=320&originHeight=192'
    }
  };

  useEffect(() => {
    loadModule();
  }, [moduleId]);

  const loadModule = async () => {
    if (!moduleId) return;
    setLoading(true);
    
    try {
      // Try to fetch from CMS first
      const moduleData = await BaseCrudService.getById<CurriculumModules>('curriculummodules', moduleId);
      
      if (moduleData && moduleData._id) {
        // CMS data found, use it
        setModule(moduleData);
      } else if (fallbackModules[moduleId]) {
        // CMS data not found, use fallback
        setModule(fallbackModules[moduleId]);
      } else {
        // No data found anywhere
        setModule(null);
      }
    } catch (error) {
      // Error fetching from CMS, try fallback
      if (fallbackModules[moduleId]) {
        setModule(fallbackModules[moduleId]);
      } else {
        setModule(null);
      }
    }
    
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen overflow-x-hidden bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
          <p className="font-paragraph text-foreground/70">Loading module details...</p>
        </div>
      </div>
    );
  }

  if (!module) {
    return (
      <div className="min-h-screen overflow-x-hidden bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <p className="font-paragraph text-foreground/70 mb-4">Module not found</p>
          <button
            onClick={() => navigate('/curriculum')}
            className="px-6 py-2 bg-primary text-background rounded-lg hover:bg-primary/90 transition-colors"
          >
            Back to Curriculum
          </button>
        </div>
      </div>
    );
  }

  const getDifficultyColor = (level?: string) => {
    switch (level?.toLowerCase()) {
      case 'beginner':
        return 'bg-primary/20 text-primary border-primary/50';
      case 'intermediate':
        return 'bg-secondary/20 text-secondary border-secondary/50';
      case 'advanced':
        return 'bg-cyan-400/20 text-cyan-400 border-cyan-400/50';
      default:
        return 'bg-foreground/10 text-foreground border-foreground/30';
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen overflow-x-hidden bg-background text-foreground overflow-hidden">
      {/* Background Elements */}
      <motion.div
        className="fixed top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
        animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="fixed bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"
        animate={{ y: [0, -30, 0], x: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Header */}
      <section className="relative pt-20 pb-12 px-4 md:px-8 border-b border-foreground/10">
        <div className="max-w-7xl mx-auto">
          <motion.button
            onClick={() => navigate('/curriculum')}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-6 font-paragraph"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Curriculum
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <span className={`px-4 py-2 rounded-full border font-heading text-sm font-bold ${getDifficultyColor(module.difficultyLevel)}`}>
                {module.difficultyLevel?.toUpperCase() || 'LEVEL'}
              </span>
              {module.moduleNumber && (
                <span className="font-heading text-sm font-bold text-primary">
                  MODULE {module.moduleNumber}
                </span>
              )}
            </div>
            <h1 className="font-heading text-5xl md:text-6xl text-foreground mb-4 leading-tight">
              {module.moduleName}
            </h1>
            <p className="font-paragraph text-xl text-foreground/70 max-w-3xl">
              {module.shortDescription}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Module Info */}
            <div className="lg:col-span-2 space-y-8">
              {/* Detailed Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 rounded-2xl border border-foreground/10 bg-gradient-to-br from-foreground/5 to-transparent"
              >
                <div className="flex items-center gap-3 mb-4">
                  <BookOpen className="w-6 h-6 text-primary" />
                  <h2 className="font-heading text-2xl text-foreground">About This Module</h2>
                </div>
                <p className="font-paragraph text-foreground/80 leading-relaxed whitespace-pre-wrap">
                  {module.detailedDescription}
                </p>
              </motion.div>

              {/* Learning Outcomes */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="p-8 rounded-2xl border border-foreground/10 bg-gradient-to-br from-foreground/5 to-transparent"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Lightbulb className="w-6 h-6 text-secondary" />
                  <h2 className="font-heading text-2xl text-foreground">What Kids Learn</h2>
                </div>
                <div className="space-y-3">
                  {module.learningOutcomes?.split('\n').filter(item => item.trim()).map((outcome, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-start gap-3 p-4 rounded-lg bg-primary/5 border border-primary/20"
                    >
                      <span className="text-primary font-bold mt-1 flex-shrink-0">✓</span>
                      <span className="font-paragraph text-foreground/80">{outcome.trim()}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Featured Projects Section */}
              {module.moduleNumber === 4 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="space-y-6"
                >
                  <h2 className="font-heading text-3xl text-foreground">Featured Projects</h2>
                  
                  {/* Project 1 */}
                  <div className="p-8 rounded-2xl border border-foreground/10 bg-gradient-to-br from-foreground/5 to-transparent">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <span className="inline-block px-3 py-1 rounded-full bg-primary/20 border border-primary/50 text-primary font-heading text-xs font-bold mb-3">PROJECT 1</span>
                        <h3 className="font-heading text-2xl text-foreground">Introduction to Microbit and LEDs</h3>
                      </div>
                    </div>
                    <p className="font-paragraph text-foreground/80 mb-4">
                      Get familiar with Microbit by programming it to control LEDs. Learn the fundamentals of microbit programming, explore LED control, and practice basic coding concepts.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 rounded-lg bg-primary/10 text-primary text-sm font-paragraph">LED Control</span>
                      <span className="px-3 py-1 rounded-lg bg-primary/10 text-primary text-sm font-paragraph">Basic Programming</span>
                      <span className="px-3 py-1 rounded-lg bg-primary/10 text-primary text-sm font-paragraph">Microbit Fundamentals</span>
                    </div>
                  </div>

                  {/* Project 2 */}
                  <div className="p-8 rounded-2xl border border-foreground/10 bg-gradient-to-br from-foreground/5 to-transparent">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <span className="inline-block px-3 py-1 rounded-full bg-secondary/20 border border-secondary/50 text-secondary font-heading text-xs font-bold mb-3">PROJECT 2</span>
                        <h3 className="font-heading text-2xl text-foreground">Flashing Heart & Shining Sunbeam</h3>
                      </div>
                    </div>
                    <p className="font-paragraph text-foreground/80 mb-4">
                      Progress to Microbit LED patterns. Program microbit devices to display flashing heart patterns and create shining sunbeam effects using advanced LED control techniques.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 rounded-lg bg-secondary/10 text-secondary text-sm font-paragraph">LED Patterns</span>
                      <span className="px-3 py-1 rounded-lg bg-secondary/10 text-secondary text-sm font-paragraph">Animation</span>
                      <span className="px-3 py-1 rounded-lg bg-secondary/10 text-secondary text-sm font-paragraph">Advanced Control</span>
                    </div>
                  </div>

                  {/* Project 3 */}
                  <div className="p-8 rounded-2xl border border-foreground/10 bg-gradient-to-br from-foreground/5 to-transparent">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <span className="inline-block px-3 py-1 rounded-full bg-primary/20 border border-primary/50 text-primary font-heading text-xs font-bold mb-3">PROJECT 3</span>
                        <h3 className="font-heading text-2xl text-foreground">Conductivity Tester</h3>
                      </div>
                    </div>
                    <p className="font-paragraph text-foreground/80 mb-4">
                      Build a conductivity tester to explore material conductivity. Understand basic circuit connections, learn about material conductivity, and practice using Microbit sensors.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 rounded-lg bg-primary/10 text-primary text-sm font-paragraph">Circuit Connections</span>
                      <span className="px-3 py-1 rounded-lg bg-primary/10 text-primary text-sm font-paragraph">Sensor Integration</span>
                      <span className="px-3 py-1 rounded-lg bg-primary/10 text-primary text-sm font-paragraph">Material Science</span>
                    </div>
                  </div>

                  {/* Project 4 */}
                  <div className="p-8 rounded-2xl border border-foreground/10 bg-gradient-to-br from-foreground/5 to-transparent">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <span className="inline-block px-3 py-1 rounded-full bg-secondary/20 border border-secondary/50 text-secondary font-heading text-xs font-bold mb-3">PROJECT 4</span>
                        <h3 className="font-heading text-2xl text-foreground">Paper Circuits</h3>
                      </div>
                    </div>
                    <p className="font-paragraph text-foreground/80 mb-4">
                      Create a paper circuit for hands-on circuit exploration. Basic understanding of circuits, express creativity in circuit design, and learn circuit fundamentals.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 rounded-lg bg-secondary/10 text-secondary text-sm font-paragraph">Circuit Design</span>
                      <span className="px-3 py-1 rounded-lg bg-secondary/10 text-secondary text-sm font-paragraph">Hands-on Learning</span>
                      <span className="px-3 py-1 rounded-lg bg-secondary/10 text-secondary text-sm font-paragraph">Creative Design</span>
                    </div>
                  </div>

                  {/* Project 5 */}
                  <div className="p-8 rounded-2xl border border-foreground/10 bg-gradient-to-br from-foreground/5 to-transparent">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <span className="inline-block px-3 py-1 rounded-full bg-primary/20 border border-primary/50 text-primary font-heading text-xs font-bold mb-3">PROJECT 5</span>
                        <h3 className="font-heading text-2xl text-foreground">LED Blink</h3>
                      </div>
                    </div>
                    <p className="font-paragraph text-foreground/80 mb-4">
                      Program a Microbit to create an LED blink with circuit. Microbit programming, digital output, and basic coding concepts.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 rounded-lg bg-primary/10 text-primary text-sm font-paragraph">LED Programming</span>
                      <span className="px-3 py-1 rounded-lg bg-primary/10 text-primary text-sm font-paragraph">Digital Output</span>
                      <span className="px-3 py-1 rounded-lg bg-primary/10 text-primary text-sm font-paragraph">Basic Coding</span>
                    </div>
                  </div>

                  {/* Project 6 */}
                  <div className="p-8 rounded-2xl border border-foreground/10 bg-gradient-to-br from-foreground/5 to-transparent">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <span className="inline-block px-3 py-1 rounded-full bg-secondary/20 border border-secondary/50 text-secondary font-heading text-xs font-bold mb-3">PROJECT 6</span>
                        <h3 className="font-heading text-2xl text-foreground">Button Control LED</h3>
                      </div>
                    </div>
                    <p className="font-paragraph text-foreground/80 mb-4">
                      Develop a circuit where a button press controls an LED. Button interface and control LEDs based on user input.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 rounded-lg bg-secondary/10 text-secondary text-sm font-paragraph">Button Input</span>
                      <span className="px-3 py-1 rounded-lg bg-secondary/10 text-secondary text-sm font-paragraph">Control Logic</span>
                      <span className="px-3 py-1 rounded-lg bg-secondary/10 text-secondary text-sm font-paragraph">User Interface</span>
                    </div>
                  </div>

                  {/* Project 7 */}
                  <div className="p-8 rounded-2xl border border-foreground/10 bg-gradient-to-br from-foreground/5 to-transparent">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <span className="inline-block px-3 py-1 rounded-full bg-primary/20 border border-primary/50 text-primary font-heading text-xs font-bold mb-3">PROJECT 7</span>
                        <h3 className="font-heading text-2xl text-foreground">Touch Detection LED</h3>
                      </div>
                    </div>
                    <p className="font-paragraph text-foreground/80 mb-4">
                      Implement touch detection to control Microbit's LED. Touch sensor integration, interactive microbit electronics.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 rounded-lg bg-primary/10 text-primary text-sm font-paragraph">Touch Sensors</span>
                      <span className="px-3 py-1 rounded-lg bg-primary/10 text-primary text-sm font-paragraph">Sensor Integration</span>
                      <span className="px-3 py-1 rounded-lg bg-primary/10 text-primary text-sm font-paragraph">Interactive Design</span>
                    </div>
                  </div>

                  {/* Project 8 */}
                  <div className="p-8 rounded-2xl border border-foreground/10 bg-gradient-to-br from-foreground/5 to-transparent">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <span className="inline-block px-3 py-1 rounded-full bg-secondary/20 border border-secondary/50 text-secondary font-heading text-xs font-bold mb-3">PROJECT 8</span>
                        <h3 className="font-heading text-2xl text-foreground">RGB Colors</h3>
                      </div>
                    </div>
                    <p className="font-paragraph text-foreground/80 mb-4">
                      Use Microbit to display different RGB colors on an LED. Explore RGB color mixing, understand RGB color values.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 rounded-lg bg-secondary/10 text-secondary text-sm font-paragraph">RGB Colors</span>
                      <span className="px-3 py-1 rounded-lg bg-secondary/10 text-secondary text-sm font-paragraph">Color Mixing</span>
                      <span className="px-3 py-1 rounded-lg bg-secondary/10 text-secondary text-sm font-paragraph">LED Control</span>
                    </div>
                  </div>

                  {/* Project 9 */}
                  <div className="p-8 rounded-2xl border border-foreground/10 bg-gradient-to-br from-foreground/5 to-transparent">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <span className="inline-block px-3 py-1 rounded-full bg-primary/20 border border-primary/50 text-primary font-heading text-xs font-bold mb-3">PROJECT 9</span>
                        <h3 className="font-heading text-2xl text-foreground">Traffic Lights</h3>
                      </div>
                    </div>
                    <p className="font-paragraph text-foreground/80 mb-4">
                      Simulate a traffic light system with Microbit for sequential control. Understand sequential control, learn traffic light logic.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 rounded-lg bg-primary/10 text-primary text-sm font-paragraph">Sequential Control</span>
                      <span className="px-3 py-1 rounded-lg bg-primary/10 text-primary text-sm font-paragraph">Logic Programming</span>
                      <span className="px-3 py-1 rounded-lg bg-primary/10 text-primary text-sm font-paragraph">Real-world Application</span>
                    </div>
                  </div>

                  {/* Project 10 */}
                  <div className="p-8 rounded-2xl border border-foreground/10 bg-gradient-to-br from-foreground/5 to-transparent">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <span className="inline-block px-3 py-1 rounded-full bg-secondary/20 border border-secondary/50 text-secondary font-heading text-xs font-bold mb-3">PROJECT 10</span>
                        <h3 className="font-heading text-2xl text-foreground">Microbit Guitar</h3>
                      </div>
                    </div>
                    <p className="font-paragraph text-foreground/80 mb-4">
                      Create a Microbit-based guitar with button-triggered sounds. Map button inputs to sounds, understand basic music programming.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 rounded-lg bg-secondary/10 text-secondary text-sm font-paragraph">Sound Programming</span>
                      <span className="px-3 py-1 rounded-lg bg-secondary/10 text-secondary text-sm font-paragraph">Button Mapping</span>
                      <span className="px-3 py-1 rounded-lg bg-secondary/10 text-secondary text-sm font-paragraph">Music Logic</span>
                    </div>
                  </div>

                  {/* Project 11 */}
                  <div className="p-8 rounded-2xl border border-foreground/10 bg-gradient-to-br from-foreground/5 to-transparent">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <span className="inline-block px-3 py-1 rounded-full bg-primary/20 border border-primary/50 text-primary font-heading text-xs font-bold mb-3">PROJECT 11</span>
                        <h3 className="font-heading text-2xl text-foreground">Automatic Street LED</h3>
                      </div>
                    </div>
                    <p className="font-paragraph text-foreground/80 mb-4">
                      Simulate an automatic street lights system using Microbit. Practice sequential programming, learn automation concepts.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 rounded-lg bg-primary/10 text-primary text-sm font-paragraph">Automation</span>
                      <span className="px-3 py-1 rounded-lg bg-primary/10 text-primary text-sm font-paragraph">Sequential Logic</span>
                      <span className="px-3 py-1 rounded-lg bg-primary/10 text-primary text-sm font-paragraph">Smart Systems</span>
                    </div>
                  </div>

                  {/* Project 12 */}
                  <div className="p-8 rounded-2xl border border-foreground/10 bg-gradient-to-br from-foreground/5 to-transparent">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <span className="inline-block px-3 py-1 rounded-full bg-secondary/20 border border-secondary/50 text-secondary font-heading text-xs font-bold mb-3">PROJECT 12</span>
                        <h3 className="font-heading text-2xl text-foreground">Servo Motor Control</h3>
                      </div>
                    </div>
                    <p className="font-paragraph text-foreground/80 mb-4">
                      Connect Microbit to control a servo motor for basic motion. Learn servo motors, output control, and mechanical understanding.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 rounded-lg bg-secondary/10 text-secondary text-sm font-paragraph">Motor Control</span>
                      <span className="px-3 py-1 rounded-lg bg-secondary/10 text-secondary text-sm font-paragraph">Output Control</span>
                      <span className="px-3 py-1 rounded-lg bg-secondary/10 text-secondary text-sm font-paragraph">Mechanical Systems</span>
                    </div>
                  </div>

                  {/* Project 13 */}
                  <div className="p-8 rounded-2xl border border-foreground/10 bg-gradient-to-br from-foreground/5 to-transparent">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <span className="inline-block px-3 py-1 rounded-full bg-primary/20 border border-primary/50 text-primary font-heading text-xs font-bold mb-3">PROJECT 13</span>
                        <h3 className="font-heading text-2xl text-foreground">Clap Robot</h3>
                      </div>
                    </div>
                    <p className="font-paragraph text-foreground/80 mb-4">
                      Program a robot to respond to claps for various actions. Learn sound detection, understand how sound sensors work.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 rounded-lg bg-primary/10 text-primary text-sm font-paragraph">Sound Detection</span>
                      <span className="px-3 py-1 rounded-lg bg-primary/10 text-primary text-sm font-paragraph">Sensor Integration</span>
                      <span className="px-3 py-1 rounded-lg bg-primary/10 text-primary text-sm font-paragraph">Robot Control</span>
                    </div>
                  </div>

                  {/* Project 14 */}
                  <div className="p-8 rounded-2xl border border-foreground/10 bg-gradient-to-br from-foreground/5 to-transparent">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <span className="inline-block px-3 py-1 rounded-full bg-secondary/20 border border-secondary/50 text-secondary font-heading text-xs font-bold mb-3">PROJECT 14</span>
                        <h3 className="font-heading text-2xl text-foreground">Smart Dustbin</h3>
                      </div>
                    </div>
                    <p className="font-paragraph text-foreground/80 mb-4">
                      Build a Microbit-controlled dustbin with automatic lid opening. Integrate sensors for object detection, understand automation.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 rounded-lg bg-secondary/10 text-secondary text-sm font-paragraph">Sensor Integration</span>
                      <span className="px-3 py-1 rounded-lg bg-secondary/10 text-secondary text-sm font-paragraph">Object Detection</span>
                      <span className="px-3 py-1 rounded-lg bg-secondary/10 text-secondary text-sm font-paragraph">Smart Automation</span>
                    </div>
                  </div>

                  {/* Project 15 */}
                  <div className="p-8 rounded-2xl border border-foreground/10 bg-gradient-to-br from-foreground/5 to-transparent">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <span className="inline-block px-3 py-1 rounded-full bg-primary/20 border border-primary/50 text-primary font-heading text-xs font-bold mb-3">PROJECT 15</span>
                        <h3 className="font-heading text-2xl text-foreground">Autopilot Robot</h3>
                      </div>
                    </div>
                    <p className="font-paragraph text-foreground/80 mb-4">
                      Develop a Microbit robot with autopilot capabilities using sensors. Integrate multiple sensors for navigation, practice complex programming.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 rounded-lg bg-primary/10 text-primary text-sm font-paragraph">Multiple Sensors</span>
                      <span className="px-3 py-1 rounded-lg bg-primary/10 text-primary text-sm font-paragraph">Navigation</span>
                      <span className="px-3 py-1 rounded-lg bg-primary/10 text-primary text-sm font-paragraph">Complex Programming</span>
                    </div>
                  </div>

                  {/* Project 16 */}
                  <div className="p-8 rounded-2xl border border-foreground/10 bg-gradient-to-br from-foreground/5 to-transparent">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <span className="inline-block px-3 py-1 rounded-full bg-secondary/20 border border-secondary/50 text-secondary font-heading text-xs font-bold mb-3">PROJECT 16</span>
                        <h3 className="font-heading text-2xl text-foreground">Program a Notice Board</h3>
                      </div>
                    </div>
                    <p className="font-paragraph text-foreground/80 mb-4">
                      Develop a digital notice board using programming. Digital signage, text display, and dynamic content management.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 rounded-lg bg-secondary/10 text-secondary text-sm font-paragraph">Digital Display</span>
                      <span className="px-3 py-1 rounded-lg bg-secondary/10 text-secondary text-sm font-paragraph">Text Management</span>
                      <span className="px-3 py-1 rounded-lg bg-secondary/10 text-secondary text-sm font-paragraph">Dynamic Content</span>
                    </div>
                  </div>

                  {/* Project 17 */}
                  <div className="p-8 rounded-2xl border border-foreground/10 bg-gradient-to-br from-foreground/5 to-transparent">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <span className="inline-block px-3 py-1 rounded-full bg-primary/20 border border-primary/50 text-primary font-heading text-xs font-bold mb-3">PROJECT 17</span>
                        <h3 className="font-heading text-2xl text-foreground">Mobile Controlled Plant Watering System</h3>
                      </div>
                    </div>
                    <p className="font-paragraph text-foreground/80 mb-4">
                      Create an automated plant watering system using a mobile app. Sensor data with mobile app integration, plant automation.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 rounded-lg bg-primary/10 text-primary text-sm font-paragraph">Mobile Integration</span>
                      <span className="px-3 py-1 rounded-lg bg-primary/10 text-primary text-sm font-paragraph">Sensor Data</span>
                      <span className="px-3 py-1 rounded-lg bg-primary/10 text-primary text-sm font-paragraph">Automation</span>
                    </div>
                  </div>

                  {/* Project 18 */}
                  <div className="p-8 rounded-2xl border border-foreground/10 bg-gradient-to-br from-foreground/5 to-transparent">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <span className="inline-block px-3 py-1 rounded-full bg-secondary/20 border border-secondary/50 text-secondary font-heading text-xs font-bold mb-3">PROJECT 18</span>
                        <h3 className="font-heading text-2xl text-foreground">Keypad Calculator</h3>
                      </div>
                    </div>
                    <p className="font-paragraph text-foreground/80 mb-4">
                      Create a calculator using a keypad for numerical input. Learn calculator logic, keypad mapping, and user-friendly interfaces.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 rounded-lg bg-secondary/10 text-secondary text-sm font-paragraph">Keypad Input</span>
                      <span className="px-3 py-1 rounded-lg bg-secondary/10 text-secondary text-sm font-paragraph">Calculator Logic</span>
                      <span className="px-3 py-1 rounded-lg bg-secondary/10 text-secondary text-sm font-paragraph">User Interface</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Right Column - Quick Info */}
            <div className="space-y-6">
              {/* Module Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="sticky top-32 space-y-4"
              >
                <div className="p-6 rounded-2xl border border-foreground/10 bg-gradient-to-br from-primary/10 to-transparent">
                  <div className="flex items-center gap-3 mb-3">
                    <Clock className="w-5 h-5 text-primary" />
                    <h3 className="font-heading text-lg text-foreground">Duration</h3>
                  </div>
                  <p className="font-paragraph text-foreground/80">{module.moduleNumber ? `Module ${module.moduleNumber}` : 'Self-paced'}</p>
                </div>

                <div className="p-6 rounded-2xl border border-foreground/10 bg-gradient-to-br from-secondary/10 to-transparent">
                  <div className="flex items-center gap-3 mb-3">
                    <BookOpen className="w-5 h-5 text-secondary" />
                    <h3 className="font-heading text-lg text-foreground">Difficulty</h3>
                  </div>
                  <p className="font-paragraph text-foreground/80 capitalize">{module.difficultyLevel || 'Not specified'}</p>
                </div>

                {/* Back Button */}
                <motion.button
                  onClick={() => navigate('/curriculum')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-6 py-3 bg-primary text-background rounded-lg hover:bg-primary/90 transition-colors font-paragraph font-semibold"
                >
                  Back to Curriculum
                </motion.button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      </div>
    <Footer />
    </>
  );
}
