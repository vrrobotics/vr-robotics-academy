import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { ArrowLeft, BookOpen, Code, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';

export default function Module5Grade13Page() {
  const projects = [
    {
      number: 1,
      title: 'Animation of 2D Game Sprite',
      objective: 'Create an app that features a 2D sprite with animated movements.',
      learningOutcomes: [
        'Introduction to sprite animation',
        'Event-driven programming',
        'Animation timing and sequencing'
      ],
      image: 'https://static.wixstatic.com/media/39909b_a59defa46d14479d9df24cfbef912fff~mv2.png?originWidth=384&originHeight=256'
    },
    {
      number: 2,
      title: 'Countdown Timer',
      objective: 'Develop a mobile app with a countdown timer for time management.',
      learningOutcomes: [
        'Timer implementation',
        'Time-based events',
        'User interface design'
      ],
      image: 'https://static.wixstatic.com/media/39909b_2404fbce385a49f3b971e759a7517a54~mv2.png?originWidth=384&originHeight=256'
    },
    {
      number: 3,
      title: 'Music App',
      objective: 'Build a simple music app, allowing users to play and control music tracks.',
      learningOutcomes: [
        'Media playback control',
        'User interface design',
        'Audio management'
      ],
      image: 'https://static.wixstatic.com/media/39909b_ccc0b8fd533b48efbf9d9665c5033e43~mv2.png?originWidth=384&originHeight=256'
    },
    {
      number: 4,
      title: 'Age Calculator App',
      objective: 'Create an app that calculates a user\'s age based on the input birthdate.',
      learningOutcomes: [
        'Date manipulation',
        'Input processing',
        'Result display'
      ],
      image: 'https://static.wixstatic.com/media/39909b_a37843c1a1d24e658ba4ae60bfd59ee1~mv2.png?originWidth=384&originHeight=256'
    },
    {
      number: 5,
      title: 'Kidz Quiz App',
      objective: 'Develop an interactive quiz app, focusing on engaging questions and responses.',
      learningOutcomes: [
        'Quiz logic',
        'User input processing',
        'Feedback mechanisms'
      ],
      image: 'https://static.wixstatic.com/media/39909b_0c321f5da28d401192ac5f2e3be41653~mv2.png?originWidth=384&originHeight=256'
    },
    {
      number: 6,
      title: 'Gallery Locker App',
      objective: 'Develop a privacy-focused mobile app, that allows users to secure and access their photo gallery.',
      learningOutcomes: [
        'Security concepts',
        'File management',
        'User authentication'
      ],
      image: 'https://static.wixstatic.com/media/39909b_9258981fe8e04971bdb6e3e0021e4ec0~mv2.png?originWidth=384&originHeight=256'
    },
    {
      number: 7,
      title: 'Drawing App',
      objective: 'Build a drawing app, providing users with basic drawing tools and features.',
      learningOutcomes: [
        'Touch-based drawing',
        'Color selection',
        'Canvas manipulation'
      ],
      image: 'https://static.wixstatic.com/media/39909b_e6290a7324614a0b8e8e3e6bb8bdae3c~mv2.png?originWidth=384&originHeight=256'
    },
    {
      number: 8,
      title: 'Barcode Scanner App',
      objective: 'Create an app to scan and interpret barcodes, display information.',
      learningOutcomes: [
        'Barcode scanning integration',
        'Data extraction',
        'Information display'
      ],
      image: 'https://static.wixstatic.com/media/39909b_bad511efef8c4291b50801ec942d4e28~mv2.png?originWidth=384&originHeight=256'
    },
    {
      number: 9,
      title: 'Weather App',
      objective: 'Develop an app that displays real-time weather information based on user location.',
      learningOutcomes: [
        'API integration',
        'Location-based services',
        'Data presentation'
      ],
      image: 'https://static.wixstatic.com/media/39909b_8938a2492941440eb8df96f9f3c41450~mv2.png?originWidth=384&originHeight=256'
    }
  ];

  const stats = [
    { label: '25 Classes', icon: BookOpen },
    { label: '9 Projects', icon: Code },
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
                <span className="font-paragraph text-sm text-primary font-semibold">MODULE 5</span>
              </motion.div>
            </div>

            <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl text-foreground mb-6 leading-tight">
              Mobile App Development
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto mb-8">
              Thunkable simplifies mobile app development through visual, block-based coding. Making it easy for kids to design user interfaces and build app logic without needing traditional programming skills. With real-time testing, children can instantly preview their apps on mobile devices, promoting an engaging and hands-on learning experience.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 md:gap-12">
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
                  <strong>Thunkable empowers children to build real mobile apps</strong> using a visual, block-based interface that requires no traditional coding knowledge.
                </p>
              </div>
              <div className="flex gap-4">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <p className="font-paragraph text-foreground/80">
                  <strong>Through hands-on app development, kids learn fundamental programming concepts</strong> like event handling, user input processing, and data management.
                </p>
              </div>
              <div className="flex gap-4">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <p className="font-paragraph text-foreground/80">
                  <strong>Real-time testing and instant mobile preview</strong> allow children to see their creations come to life immediately, fostering creativity and problem-solving skills.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="relative py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-4">
              9 Creative Projects
            </h2>
            <p className="font-paragraph text-lg text-foreground/70 max-w-3xl mx-auto">
              Build your mobile app development skills through hands-on projects that combine learning with fun and creativity.
            </p>
          </motion.div>

          <div className="space-y-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.number}
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
                  <div className="flex-1">
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
              Ready to Build Apps?
            </motion.h2>
            <motion.p
              className="font-paragraph text-xl text-foreground/80 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Enroll in Module 5 and start your mobile app development journey with Thunkable today!
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
                  className="bg-primary text-primary-foreground font-heading font-semibold px-8 py-4 rounded-lg text-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Enroll Now
                </motion.button>
              </Link>
              <Link to="/demo-booking">
                <motion.button
                  className="bg-transparent text-primary border-2 border-primary font-heading font-semibold px-8 py-4 rounded-lg text-lg"
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 140, 66, 0.1)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  Book Free Demo
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
