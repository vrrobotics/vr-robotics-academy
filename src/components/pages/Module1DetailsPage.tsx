import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { ArrowLeft, BookOpen, Code, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Module1DetailsPage() {
  const projects = [
    {
      number: 1,
      title: 'Introduction to Scratch and Catch the Bus',
      objective: 'Create a simple interactive game involving a moving object',
      learningOutcomes: [
        'Understand fundamental game mechanics',
        'Learn how to manage user input',
        'Explore basic animation using Scratch'
      ],
      image: 'https://static.wixstatic.com/media/39909b_bd229278cef549b7bc24b6f8debdefc7~mv2.png?id=module1-project1'
    },
    {
      number: 2,
      title: 'Silly Eyes',
      objective: 'Build a fun and engaging project featuring animated elements that respond to user actions',
      learningOutcomes: [
        'Learn animation techniques',
        'Understand how to implement user interaction',
        'Develop creative visual design skills'
      ],
      image: 'https://static.wixstatic.com/media/39909b_f392821826794026bc845edf3d301541~mv2.png?id=module1-project2'
    },
    {
      number: 3,
      title: 'Catching Game',
      objective: 'Develop a game where the player catches falling objects',
      learningOutcomes: [
        'Understand game dynamics',
        'Learn scoring mechanisms',
        'Implement user feedback'
      ],
      image: 'https://static.wixstatic.com/media/39909b_2d23c90aadde4590b3ef6667e61134db~mv2.png?id=module1-project3'
    },
    {
      number: 4,
      title: 'Balloon Pop',
      objective: 'Create a game where the player pops balloons with user input',
      learningOutcomes: [
        'Learn event-driven programming',
        'Understand game physics',
        'Implement visual effects'
      ],
      image: 'https://static.wixstatic.com/media/39909b_991b9a60bff6424bb96ebfbadb77d8da~mv2.png?id=module1-project4'
    },
    {
      number: 5,
      title: 'Grow a Dragon Fly',
      objective: 'Create an interactive project where a dragonfly grows in size',
      learningOutcomes: [
        'Understand animation scaling',
        'Learn user interaction',
        'Develop costume changes'
      ],
      image: 'https://static.wixstatic.com/media/39909b_e3eac5f75ac44baaa771c5292e14f2f0~mv2.png?id=module1-project5'
    },
    {
      number: 6,
      title: 'Don\'t Fall In',
      objective: 'Develop a game where the player navigates to avoid falling into a pit',
      learningOutcomes: [
        'Implement game physics',
        'Learn collision detection',
        'Develop user controls'
      ],
      image: 'https://static.wixstatic.com/media/39909b_d7e48324c43249508b4a35a9f89b882e~mv2.png?id=module1-project6'
    },
    {
      number: 7,
      title: 'Brain Game',
      objective: 'Create a game that challenges the player\'s cognitive skills and memory',
      learningOutcomes: [
        'Develop brain-testing puzzles',
        'Implement scoring systems',
        'Enhance user engagement'
      ],
      image: 'https://static.wixstatic.com/media/39909b_bb2e24cb6cd147229dd3f3ce522795c2~mv2.png?id=module1-project7'
    },
    {
      number: 8,
      title: 'Soccer Champ',
      objective: 'Build a sports game where the player can score goals',
      learningOutcomes: [
        'Implement sports game mechanics',
        'Learn user controls',
        'Develop scoring systems'
      ],
      image: 'https://static.wixstatic.com/media/39909b_00a2f1ad4d824ebbb48f1ba7cc66455f~mv2.png?id=module1-project8'
    },
    {
      number: 9,
      title: 'Paint Box',
      objective: 'Develop an interactive painting application',
      learningOutcomes: [
        'Implement drawing functionalities',
        'Learn color selection',
        'Develop interface design'
      ],
      image: 'https://static.wixstatic.com/media/39909b_87d3bdc768254534b394186e382360d1~mv2.png?id=module1-project9'
    },
    {
      number: 10,
      title: 'Boat Race',
      objective: 'Create a boat racing game where the player competes against opponents',
      learningOutcomes: [
        'Implement racing mechanics',
        'Learn opponent AI',
        'Develop level design'
      ],
      image: 'https://static.wixstatic.com/media/39909b_419c87788a0143d7ae168e0148f3fb1d~mv2.png?id=module1-project10'
    },
    {
      number: 11,
      title: 'Flappy Bird',
      objective: 'Replicate the popular Flappy Bird game with simple tap-to-fly mechanics',
      learningOutcomes: [
        'Understand side-scrolling mechanics',
        'Learn obstacle generation',
        'Implement score tracking'
      ],
      image: 'https://static.wixstatic.com/media/39909b_a7e95d7ec5e741a6b9cf7108930de9eb~mv2.png?id=module1-project11'
    },
    {
      number: 12,
      title: 'Airplane Shooter',
      objective: 'Implement interactive shooting mechanics and enemy behavior',
      learningOutcomes: [
        'Implement shooting mechanics',
        'Learn enemy AI',
        'Develop game progression'
      ],
      image: 'https://static.wixstatic.com/media/39909b_17be2e23c6524c96af438a33647d5981~mv2.png?id=module1-project12'
    }
  ];

  const stats = [
    { label: '50 Classes', icon: BookOpen },
    { label: '25 Projects', icon: Code },
    { label: '25 Concepts', icon: Lightbulb }
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground overflow-hidden">
      <Header />
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
                <span className="font-paragraph text-sm text-primary font-semibold">MODULE 1</span>
              </motion.div>
            </div>

            <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl text-foreground mb-6 leading-tight">
              Coding Fundamentals
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto mb-8">
              Master the basics of coding through interactive Scratch projects. Learn problem-solving skills, fundamental programming concepts, and creative game development.
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
                  <strong>Scratch helps children develop problem-solving skills</strong> by using a simple, visual interface.
                </p>
              </div>
              <div className="flex gap-4">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <p className="font-paragraph text-foreground/80">
                  <strong>Through block-based coding, kids learn fundamental programming concepts</strong> like loops and variables.
                </p>
              </div>
              <div className="flex gap-4">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <p className="font-paragraph text-foreground/80">
                  <strong>It also encourages creativity</strong> allowing them to build interactive stories, simulations, and games.
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
              25 Engaging Projects
            </h2>
            <p className="font-paragraph text-lg text-foreground/70 max-w-3xl mx-auto">
              Build your coding skills through hands-on projects that combine learning with fun and creativity.
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
              Ready to Start Coding?
            </motion.h2>
            <motion.p
              className="font-paragraph text-xl text-foreground/80 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Enroll in Module 1 and start your coding journey with Scratch today!
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
                  Book Demo
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
