import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { ArrowLeft, BookOpen, Code, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';

export default function Module7Grade13Page() {
  const projects = [
    {
      number: 1,
      title: 'Introduction to Python - Printing Names',
      objective: 'Learn basic Python syntax by printing your name',
      learningOutcomes: [
        'Understand the "print" statement in Python',
        'Basic text output',
        'Become familiar with the coding environment'
      ],
      image: 'https://static.wixstatic.com/media/39909b_4b3ff1d0f8fd43d2a7a0711f4913cd41~mv2.png?id=python-project1'
    },
    {
      number: 2,
      title: 'Variables',
      objective: 'Use variables to count and display the number of letters in your name',
      learningOutcomes: [
        'Learn about variables',
        'Variable assignment',
        'String manipulation'
      ],
      image: 'https://static.wixstatic.com/media/39909b_954070a01ffa4cfbbc1961cc55f4b25d~mv2.png?id=python-project2'
    },
    {
      number: 3,
      title: 'Operators & Conditions',
      objective: 'Introduce operators and conditions to identify positive and negative numbers',
      learningOutcomes: [
        'Arithmetic operators',
        'Conditional statements with logics',
        'Number classification'
      ],
      image: 'https://static.wixstatic.com/media/39909b_59d26bc3fcaf4b6bbd93f3b1e93b3b99~mv2.png?id=python-project3'
    },
    {
      number: 4,
      title: 'Login Page',
      objective: 'Create a simple login page using operators and conditions',
      learningOutcomes: [
        'User input handling',
        'Conditions for login validation',
        'User authentication'
      ],
      image: 'https://static.wixstatic.com/media/39909b_afc8d4e74989410a901a6ee8d374e38e~mv2.png?id=python-project4'
    },
    {
      number: 5,
      title: 'For & While Loops',
      objective: 'Use loops to generate a multiplication table',
      learningOutcomes: [
        'Understand the "for" loop',
        'Practice iterating through numbers',
        'Loop control and iteration'
      ],
      image: 'https://static.wixstatic.com/media/39909b_798b95954ae7478aaef89a160e893dec~mv2.png?id=python-project5'
    },
    {
      number: 6,
      title: 'Return statement & Keyword arguments',
      objective: 'Learn return statement and keyword arguments in functions',
      learningOutcomes: [
        'Function return values',
        'Keyword arguments',
        'Enhancing flexibility in functions'
      ],
      image: 'https://static.wixstatic.com/media/39909b_19f439db730d4ab4a0a217bddd2f4d89~mv2.png?id=python-project6'
    },
    {
      number: 7,
      title: 'BMI Calculator',
      objective: 'Apply function concepts to create a BMI calculator',
      learningOutcomes: [
        'Advanced functions',
        'Formula application',
        'Result interpretation'
      ],
      image: 'https://static.wixstatic.com/media/39909b_596782102f4e46f589efd8f70db59ed9~mv2.png?id=python-project7'
    },
    {
      number: 8,
      title: 'Error Handling & Exceptions',
      objective: 'Introduce error handling through try-except statements',
      learningOutcomes: [
        'Recognizing common errors',
        'Handling exceptions',
        'Robust code development'
      ],
      image: 'https://static.wixstatic.com/media/39909b_c5ce897883c64505a566211b92aeed16~mv2.png?id=python-project8'
    },
    {
      number: 9,
      title: 'Code Comments',
      objective: 'Understand the importance of comments in code for readability',
      learningOutcomes: [
        'Writing effective comments',
        'Code documentation',
        'Collaborative coding'
      ],
      image: 'https://static.wixstatic.com/media/39909b_e4152f672b9c4decab2132c376025d19~mv2.png?id=python-project9'
    },
    {
      number: 10,
      title: 'Functions - Math Calculator',
      objective: 'Introduce functions by creating a math calculator',
      learningOutcomes: [
        'Function creation',
        'Parameter passing',
        'Modular programming'
      ],
      image: 'https://static.wixstatic.com/media/39909b_b25670542074459ea890ccf4fcda26fc~mv2.png?id=python-project10'
    },
    {
      number: 11,
      title: 'Sets Vowel Detector',
      objective: 'Sets by creating a program to detect vowels in a given text',
      learningOutcomes: [
        'Set creation',
        'Membership testing',
        'Unique element handling'
      ],
      image: 'https://static.wixstatic.com/media/39909b_9a57fa6e55a44f469546b0be2336e90e~mv2.png?id=python-project11'
    },
    {
      number: 12,
      title: 'Tuples Immutable Data',
      objective: 'Introduce tuples as an immutable data through a basic use',
      learningOutcomes: [
        'Understanding tuples',
        'Their immutability',
        'Use in data storage'
      ],
      image: 'https://static.wixstatic.com/media/39909b_6caf3295e9c24a6b85f91b8b2fca23c7~mv2.png?id=python-project12'
    },
    {
      number: 13,
      title: 'Dictionaries Contact Book',
      objective: 'Understand dictionaries by creating a simple contact book',
      learningOutcomes: [
        'Dictionary creation',
        'Key-value pairs',
        'Basic contact management'
      ],
      image: 'https://static.wixstatic.com/media/39909b_8f2d05f7a49c4a94b8313955f9773d0a~mv2.png?id=python-project13'
    },
    {
      number: 14,
      title: 'Lists and Indexing Shopping Calculator',
      objective: 'Explore lists, indexing by creating a shopping cart calculator',
      learningOutcomes: [
        'List manipulation',
        'Indexing',
        'Performing calculations on list elements'
      ],
      image: 'https://static.wixstatic.com/media/39909b_69f63bccfb614ad28a27c84eb7cd5c73~mv2.png?id=python-project14'
    }
  ];

  const stats = [
    { label: '25 Classes', icon: BookOpen },
    { label: '14 Projects', icon: Code },
    { label: '35 Concepts', icon: Lightbulb }
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground overflow-hidden relative">
      {/* Background Elements */}
      <motion.div
        className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"
        animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{ zIndex: 0 }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl pointer-events-none"
        animate={{ y: [0, -30, 0], x: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        style={{ zIndex: 0 }}
      />

      {/* Header with Back Button */}
      <div className="relative pt-8 px-4 md:px-8 z-30">
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
                <span className="font-paragraph text-sm text-primary font-semibold">MODULE 7</span>
              </motion.div>
            </div>

            <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl text-foreground mb-6 leading-tight">
              Edu Blocks Python Coding
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto mb-8">
              Python for kids introduces coding through visual, block-based programming, making complex concepts easier to understand. By experimenting with blocks, children can create programs without dealing with text-based syntax. This approach helps them grasp coding logic and structure in a playful, intuitive way.
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
                  <strong>Python helps children develop logical thinking skills</strong> by using a simple, visual block-based interface.
                </p>
              </div>
              <div className="flex gap-4">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <p className="font-paragraph text-foreground/80">
                  <strong>Through block-based coding, kids learn fundamental programming concepts</strong> like variables, loops, functions, and data structures.
                </p>
              </div>
              <div className="flex gap-4">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <p className="font-paragraph text-foreground/80">
                  <strong>It also encourages creativity</strong> allowing them to build interactive programs, games, and utilities they imagine.
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
              14 Engaging Projects
            </h2>
            <p className="font-paragraph text-lg text-foreground/70 max-w-3xl mx-auto">
              Build your Python coding skills through hands-on projects that combine learning with fun and creativity.
            </p>
          </motion.div>

          <div className="space-y-4">>
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
                    >
                      <Image
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        width={400}
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
      <section className="relative py-24 px-4 md:px-8 bg-gradient-to-b from-background via-primary/5 to-background z-20">
        <div className="max-w-7xl mx-auto relative z-20">
          <div className="p-12 md:p-16 rounded-3xl text-center glass-pane">
            <motion.h2
              className="font-heading text-4xl lg:text-5xl mb-6 text-foreground"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Ready to Learn Python?
            </motion.h2>
            <motion.p
              className="font-paragraph text-xl text-foreground/80 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Enroll in Module 7 and start your Python coding journey with block-based programming today!
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
