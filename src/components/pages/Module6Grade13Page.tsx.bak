import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { ArrowLeft, BookOpen, Code, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';

export default function Module6Grade13Page() {
  const projects = [
    {
      number: 1,
      title: 'Facial Expressions',
      objective: 'Recognize and display different facial expressions using a simple machine learning model.',
      learningOutcomes: [
        'Image classification',
        'Understanding emotions',
        'ML model basics'
      ],
      image: 'https://static.wixstatic.com/media/39909b_e85aaa5f9ef04437b8706240f4248f6c~mv2.png?originWidth=384&originHeight=256'
    },
    {
      number: 2,
      title: 'Object Detection',
      objective: 'Train a model to identify and outline various objects in the surroundings.',
      learningOutcomes: [
        'Object detection concepts',
        'Basic computer vision',
        'Real-world applications'
      ],
      image: 'https://static.wixstatic.com/media/39909b_a20a0da2ebf04bc7b4bd0eb6600f6248~mv2.png?originWidth=384&originHeight=256'
    },
    {
      number: 3,
      title: 'Gesture Controlled Game',
      objective: 'Develop a game where movements of the user\'s body control the gameplay.',
      learningOutcomes: [
        'Gesture recognition',
        'Game development basics',
        'Interactive controls'
      ],
      image: 'https://static.wixstatic.com/media/39909b_702d9628b3f647bb9fce4f8bdafaf976~mv2.png?originWidth=384&originHeight=256'
    },
    {
      number: 4,
      title: 'Rock Paper Scissors',
      objective: 'Train a model to recognize hand gestures for the classic game of RPS.',
      learningOutcomes: [
        'Gesture classification',
        'Simple game implementation',
        'Hand pose detection'
      ],
      image: 'https://static.wixstatic.com/media/39909b_e865df3fb3cd4d33b2e5cb7c899a9e24~mv2.png?originWidth=384&originHeight=256'
    },
    {
      number: 5,
      title: 'Face Filters using Face Detection',
      objective: 'Apply fun filters to a person\'s face in real-time using face detection.',
      learningOutcomes: [
        'Real-time image processing',
        'Creative applications',
        'Face detection techniques'
      ],
      image: 'https://static.wixstatic.com/media/39909b_26af119495424eaf9328282cb5b2c698~mv2.png?originWidth=384&originHeight=256'
    },
    {
      number: 6,
      title: 'Attendance System using Facial Recognition',
      objective: 'Build a system that recognizes faces to automate attendance tracking.',
      learningOutcomes: [
        'Facial recognition',
        'Attendance management',
        'Database integration'
      ],
      image: 'https://static.wixstatic.com/media/39909b_04ed04994cc14622b86c435b5fd6ebec~mv2.png?originWidth=384&originHeight=256'
    },
    {
      number: 7,
      title: 'Smart Classroom AI Assistant',
      objective: 'Create a simple AI assistant for a virtual room to answer basic questions.',
      learningOutcomes: [
        'Natural Language Processing (NLP)',
        'AI assistant basics',
        'Question-answering systems'
      ],
      image: 'https://static.wixstatic.com/media/39909b_ebe65f82ad104a42a95ca20ef6373b44~mv2.png?originWidth=384&originHeight=256'
    },
    {
      number: 8,
      title: 'Face Lock System',
      objective: 'Develop a security system that unlocks based on facial recognition.',
      learningOutcomes: [
        'Biometric security',
        'Facial authentication',
        'Security concepts'
      ],
      image: 'https://static.wixstatic.com/media/39909b_6f22c9ede0ee4f6caf9d654393c822ea~mv2.png?originWidth=384&originHeight=256'
    },
    {
      number: 9,
      title: 'Virtual Pet',
      objective: 'Create a virtual pet that responds to the user\'s gestures and commands.',
      learningOutcomes: [
        'Pet behavior simulation',
        'Interactive applications',
        'Gesture-based control'
      ],
      image: 'https://static.wixstatic.com/media/39909b_538d30027f7e4459b7cb2222fd0a3dcb~mv2.png?originWidth=384&originHeight=256'
    },
    {
      number: 10,
      title: 'Hand Gestures by Image Recognition',
      objective: 'Recognize and interpret hand gestures for controlling devices.',
      learningOutcomes: [
        'Hand gesture recognition',
        'Application control',
        'Real-time detection'
      ],
      image: 'https://static.wixstatic.com/media/39909b_e55539d17ee147dd9894e6cf84e643b0~mv2.png?originWidth=384&originHeight=256'
    }
  ];

  const stats = [
    { label: '16 Classes', icon: BookOpen },
    { label: '10 Projects', icon: Code },
    { label: '20 Concepts', icon: Lightbulb }
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
                <span className="font-paragraph text-sm text-primary font-semibold">MODULE 6</span>
              </motion.div>
            </div>

            <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl text-foreground mb-6 leading-tight">
              Machine Learning for Kids
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto mb-8">
              Machine learning for kids simplifies complex concepts through fun and interactive activities. By engaging in creative projects like art or storytelling, children gain hands-on experience with algorithms. Practical examples make it easier for them to understand how machine learning applies to real-world situations.
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
                  <strong>Machine learning empowers children to build intelligent systems</strong> that can learn from data and make predictions without explicit programming.
                </p>
              </div>
              <div className="flex gap-4">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <p className="font-paragraph text-foreground/80">
                  <strong>Through hands-on projects, kids learn fundamental ML concepts</strong> like image classification, object detection, and pattern recognition in a fun and engaging way.
                </p>
              </div>
              <div className="flex gap-4">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <p className="font-paragraph text-foreground/80">
                  <strong>Real-world applications like facial recognition and gesture control</strong> show children how machine learning is transforming technology and society.
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
              10 Creative Projects
            </h2>
            <p className="font-paragraph text-lg text-foreground/70 max-w-3xl mx-auto">
              Build your machine learning skills through hands-on projects that combine learning with fun and creativity.
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
              Ready to Explore AI?
            </motion.h2>
            <motion.p
              className="font-paragraph text-xl text-foreground/80 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Enroll in Module 6 and start your machine learning journey with hands-on AI projects today!
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
