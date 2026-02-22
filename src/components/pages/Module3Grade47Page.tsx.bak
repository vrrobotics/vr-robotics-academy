import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { ArrowLeft, BookOpen, Code, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';

export default function Module3Grade47Page() {
  // INDEPENDENT DATA - Module 3 Grade 4-7 Page
  // Computing with Microbit - Isolated to prevent synchronization with other pages
  const projects = [
    {
      id: 'module3-g47-project1',
      number: 1,
      title: 'Introduction to Microbit and LEDs',
      objective: 'Get familiar with Microbit by programming it to control LEDs',
      learningOutcomes: [
        'Learn the fundamentals of microbit programming',
        'Explore LED control techniques',
        'Practice basic coding concepts'
      ],
      image: 'https://static.wixstatic.com/media/39909b_1a2b3c4d5e6f7g8h9i0j~mv2.png?id=module3-g47-project1'
    },
    {
      id: 'module3-g47-project2',
      number: 2,
      title: 'Microbit LED Patterns',
      objective: 'Program microbit devices to display flashing heart patterns and create shining sunbeam effects',
      learningOutcomes: [
        'Master advanced LED control techniques',
        'Create animated LED patterns',
        'Understand timing and sequencing'
      ],
      image: 'https://static.wixstatic.com/media/39909b_2b3c4d5e6f7g8h9i0j1k~mv2.png?id=module3-g47-project2'
    },
    {
      id: 'module3-g47-project3',
      number: 3,
      title: 'Conductivity Tester',
      objective: 'Build a conductivity tester to explore material conductivity',
      learningOutcomes: [
        'Understand basic circuit connections',
        'Learn about material conductivity',
        'Practice using Microbit sensors'
      ],
      image: 'https://static.wixstatic.com/media/39909b_3c4d5e6f7g8h9i0j1k2l~mv2.png?id=module3-g47-project3'
    },
    {
      id: 'module3-g47-project4',
      number: 4,
      title: 'LED Blink with Circuit',
      objective: 'Program a Microbit to create an LED blink with circuit',
      learningOutcomes: [
        'Master microbit programming',
        'Understand digital output',
        'Learn basic coding concepts'
      ],
      image: 'https://static.wixstatic.com/media/39909b_4d5e6f7g8h9i0j1k2l3m~mv2.png?id=module3-g47-project4'
    },
    {
      id: 'module3-g47-project5',
      number: 5,
      title: 'Touch Detection LED Control',
      objective: 'Implement touch detection to control Microbit\'s LED',
      learningOutcomes: [
        'Master touch sensor integration',
        'Develop interactive microbit electronics',
        'Understand sensor input handling'
      ],
      image: 'https://static.wixstatic.com/media/39909b_5e6f7g8h9i0j1k2l3m4n~mv2.png?id=module3-g47-project5'
    },
    {
      id: 'module3-g47-project6',
      number: 6,
      title: 'RGB Color Display',
      objective: 'Use Microbit to display different RGB colors on an LED',
      learningOutcomes: [
        'Explore RGB color mixing',
        'Understand RGB color values',
        'Master color control programming'
      ],
      image: 'https://static.wixstatic.com/media/39909b_6f7g8h9i0j1k2l3m4n5o~mv2.png?id=module3-g47-project6'
    },
    {
      id: 'module3-g47-project7',
      number: 7,
      title: 'Traffic Light System',
      objective: 'Simulate a traffic light system with Microbit for sequential control',
      learningOutcomes: [
        'Understand sequential control',
        'Learn traffic light logic',
        'Master timing and state management'
      ],
      image: 'https://static.wixstatic.com/media/39909b_7g8h9i0j1k2l3m4n5o6p~mv2.png?id=module3-g47-project7'
    },
    {
      id: 'module3-g47-project8',
      number: 8,
      title: 'Microbit Guitar',
      objective: 'Create a Microbit-based guitar with button-triggered sounds',
      learningOutcomes: [
        'Map button inputs to sounds',
        'Understand basic music programming',
        'Develop interactive sound systems'
      ],
      image: 'https://static.wixstatic.com/media/39909b_8h9i0j1k2l3m4n5o6p7q~mv2.png?id=module3-g47-project8'
    },
    {
      id: 'module3-g47-project9',
      number: 9,
      title: 'Automatic Street Lights',
      objective: 'Simulate an automatic street lights system using Microbit',
      learningOutcomes: [
        'Practice sequential programming',
        'Learn automation concepts',
        'Master sensor-based control'
      ],
      image: 'https://static.wixstatic.com/media/39909b_9i0j1k2l3m4n5o6p7q8r~mv2.png?id=module3-g47-project9'
    },
    {
      id: 'module3-g47-project10',
      number: 10,
      title: 'Servo Motor Control',
      objective: 'Connect Microbit to control a servo motor for basic motion',
      learningOutcomes: [
        'Learn servo motor fundamentals',
        'Master output control',
        'Understand motor programming'
      ],
      image: 'https://static.wixstatic.com/media/39909b_0j1k2l3m4n5o6p7q8r9s~mv2.png?id=module3-g47-project10'
    },
    {
      id: 'module3-g47-project11',
      number: 11,
      title: 'Temperature Sensor Display',
      objective: 'Use Microbit\'s temperature sensor to display temperature readings',
      learningOutcomes: [
        'Master temperature sensor usage',
        'Learn data display techniques',
        'Understand sensor calibration'
      ],
      image: 'https://static.wixstatic.com/media/39909b_1k2l3m4n5o6p7q8r9s0t~mv2.png?id=module3-g47-project11'
    },
    {
      id: 'module3-g47-project12',
      number: 12,
      title: 'Accelerometer Motion Detection',
      objective: 'Detect motion using Microbit\'s accelerometer and respond with actions',
      learningOutcomes: [
        'Understand accelerometer functionality',
        'Detect motion and orientation',
        'Create motion-responsive programs'
      ],
      image: 'https://static.wixstatic.com/media/39909b_2l3m4n5o6p7q8r9s0t1u~mv2.png?id=module3-g47-project12'
    },
    {
      id: 'module3-g47-project13',
      number: 13,
      title: 'Light Sensor Brightness Control',
      objective: 'Use light sensor to adjust LED brightness based on ambient light',
      learningOutcomes: [
        'Master light sensor integration',
        'Learn analog input handling',
        'Develop adaptive lighting systems'
      ],
      image: 'https://static.wixstatic.com/media/39909b_3m4n5o6p7q8r9s0t1u2v~mv2.png?id=module3-g47-project13'
    },
    {
      id: 'module3-g47-project14',
      number: 14,
      title: 'Sound Level Detector',
      objective: 'Create a sound level detector that responds to noise levels',
      learningOutcomes: [
        'Understand sound detection',
        'Learn threshold-based programming',
        'Develop responsive audio systems'
      ],
      image: 'https://static.wixstatic.com/media/39909b_4n5o6p7q8r9s0t1u2v3w~mv2.png?id=module3-g47-project14'
    },
    {
      id: 'module3-g47-project15',
      number: 15,
      title: 'Compass Navigation',
      objective: 'Use Microbit\'s compass to create a simple navigation system',
      learningOutcomes: [
        'Master compass sensor usage',
        'Learn directional programming',
        'Understand navigation concepts'
      ],
      image: 'https://static.wixstatic.com/media/39909b_5o6p7q8r9s0t1u2v3w4x~mv2.png?id=module3-g47-project15'
    },
    {
      id: 'module3-g47-project16',
      number: 16,
      title: 'Gesture Recognition',
      objective: 'Detect gestures using Microbit and trigger different actions',
      learningOutcomes: [
        'Understand gesture detection',
        'Learn event-driven programming',
        'Develop gesture-responsive systems'
      ],
      image: 'https://static.wixstatic.com/media/39909b_6p7q8r9s0t1u2v3w4x5y~mv2.png?id=module3-g47-project16'
    },
    {
      id: 'module3-g47-project17',
      number: 17,
      title: 'Radio Communication',
      objective: 'Use Microbit\'s radio feature to communicate between two devices',
      learningOutcomes: [
        'Master wireless communication',
        'Learn radio protocol basics',
        'Develop multi-device systems'
      ],
      image: 'https://static.wixstatic.com/media/39909b_7q8r9s0t1u2v3w4x5y6z~mv2.png?id=module3-g47-project17'
    },
    {
      id: 'module3-g47-project18',
      number: 18,
      title: 'Game Development',
      objective: 'Create a simple game using Microbit\'s LED matrix and buttons',
      learningOutcomes: [
        'Understand game mechanics',
        'Learn collision detection',
        'Master game state management'
      ],
      image: 'https://static.wixstatic.com/media/39909b_8r9s0t1u2v3w4x5y6z7a~mv2.png?id=module3-g47-project18'
    },
    {
      id: 'module3-g47-project19',
      number: 19,
      title: 'Data Logging System',
      objective: 'Create a system to log sensor data over time',
      learningOutcomes: [
        'Master data collection techniques',
        'Learn data storage concepts',
        'Understand data analysis basics'
      ],
      image: 'https://static.wixstatic.com/media/39909b_9s0t1u2v3w4x5y6z7a8b~mv2.png?id=module3-g47-project19'
    },
    {
      id: 'module3-g47-project20',
      number: 20,
      title: 'Capstone Project - Smart Home System',
      objective: 'Build a complete smart home system combining multiple sensors and controls',
      learningOutcomes: [
        'Integrate multiple sensors and actuators',
        'Develop complex automation logic',
        'Create a complete IoT solution'
      ],
      image: 'https://static.wixstatic.com/media/39909b_0t1u2v3w4x5y6z7a8b9c~mv2.png?id=module3-g47-project20'
    }
  ];

  const stats = [
    { label: '40 Classes', icon: BookOpen },
    { label: '20 Projects', icon: Code },
    { label: '35 Concepts', icon: Lightbulb }
  ];

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

      {/* Header with Back Button */}
      <div className="relative pt-8 px-4 md:px-8 z-20">
        <div className="max-w-7xl mx-auto">
          <Link to="/curriculum">
            <motion.button
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Curriculum
            </motion.button>
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-16 pb-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="inline-block mb-6">
              <motion.div
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30"
                whileHover={{ scale: 1.05 }}
              >
                <span className="font-paragraph text-sm text-primary font-semibold">MODULE 3 • GRADES 4-7</span>
              </motion.div>
            </div>

            <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl text-foreground mb-6 leading-tight">
              Computing with Microbit
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto mb-8">
              Master microbit programming and sensor integration. Learn to build interactive electronics, automate systems, and create smart devices through hands-on projects that develop real engineering skills.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-6 md:gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className="font-heading text-lg font-semibold text-foreground">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="relative py-16 px-4 md:px-8 bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 md:p-12 rounded-2xl border border-primary/20 bg-primary/5"
          >
            <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-6">What You'll Learn</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <p className="font-paragraph text-foreground/80">
                  <strong>Master microbit programming fundamentals</strong> through visual block-based coding and Python integration.
                </p>
              </div>
              <div className="flex gap-4">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <p className="font-paragraph text-foreground/80">
                  <strong>Integrate multiple sensors and actuators</strong> to build interactive electronics and smart systems.
                </p>
              </div>
              <div className="flex gap-4">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <p className="font-paragraph text-foreground/80">
                  <strong>Develop automation and IoT solutions</strong> that respond to environmental conditions and user inputs.
                </p>
              </div>
              <div className="flex gap-4">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <p className="font-paragraph text-foreground/80">
                  <strong>Build problem-solving and engineering skills</strong> through hands-on projects and real-world applications.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="relative py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-4">
              20 Progressive Projects
            </h2>
            <p className="font-paragraph text-lg text-foreground/70 max-w-3xl mx-auto">
              Build your microbit skills through hands-on projects that combine learning with fun and creativity.
            </p>
          </motion.div>

          <div className="space-y-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}
              >
                {/* Content */}
                <div className="flex-1">
                  <div className="inline-block mb-3">
                    <span className="font-heading text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                      PROJECT {project.number}
                    </span>
                  </div>
                  <h3 className="font-heading text-2xl md:text-3xl text-foreground mb-3">
                    {project.title}
                  </h3>
                  <p className="font-paragraph text-foreground/80 mb-4">
                    <strong>Objective:</strong> {project.objective}
                  </p>
                  <div className="mb-4">
                    <p className="font-paragraph text-sm font-semibold text-primary mb-2">Learning Outcomes:</p>
                    <ul className="space-y-2">
                      {project.learningOutcomes.map((outcome, idx) => (
                        <li key={idx} className="flex gap-2 font-paragraph text-foreground/80">
                          <span className="text-primary">•</span>
                          {outcome}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Image */}
                {project.image && (
                  <div className="flex-1 flex justify-center items-center">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="rounded-2xl overflow-hidden border-2 border-primary/20 bg-primary/5"
                      style={{ height: '330px', width: '500px' }}
                    >
                      <Image
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        width={500}
                      />
                    </motion.div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-4 md:px-8 bg-gradient-to-b from-background via-primary/5 to-background">
        <div className="max-w-7xl mx-auto">
          <div className="p-12 md:p-16 rounded-3xl text-center glass-pane">
            <motion.h2
              className="font-heading text-4xl lg:text-5xl mb-6 text-foreground"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Ready to Master Microbit?
            </motion.h2>
            <motion.p
              className="font-paragraph text-xl text-foreground/80 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Join learners building interactive electronics and smart systems with 20 hands-on microbit projects.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row flex-wrap justify-center gap-4"
            >
              <Link to="/student-signup">
                <motion.button
                  className="bg-gradient-to-r from-primary to-primary/80 text-white font-heading font-bold px-8 py-3 rounded-lg hover:shadow-lg transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Enroll Now
                </motion.button>
              </Link>
              <Link to="/demo-booking">
                <motion.button
                  className="bg-transparent text-primary border-2 border-primary font-heading font-bold px-8 py-3 rounded-lg hover:bg-primary/10 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Book a Demo
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
