import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { ArrowLeft, BookOpen, Code, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Module2DetailsPage() {
  // INDEPENDENT DATA - Module 2 Details Page (Grades 1-3)
  // Each project has a unique ID to prevent synchronization with other pages
  const projects = [
    {
      id: 'module2-details-project1',
      number: 1,
      title: 'Design a Name Key Chain',
      objective: 'Design a personalized 3D keychain using Tinkercad',
      learningOutcomes: [
        'Learn basic 3D modeling tools',
        'Understand text extrusion',
        'Explore customization and exporting designs'
      ],
      image: 'https://static.wixstatic.com/media/39909b_052a4330a2104445a0591b6f11c5dbdc~mv2.png?id=module2-details-project1'
    },
    {
      id: 'module2-details-project2',
      number: 2,
      title: 'Design a Logo',
      objective: 'Create a 3D representation of a logo using Tinkercad',
      learningOutcomes: [
        'Logo interpretation in 3D space',
        'Advanced shape manipulation',
        'Creative design skills'
      ],
      image: 'https://static.wixstatic.com/media/39909b_7b4224373e954178af710582ea11461d~mv2.png?id=module2-details-project2'
    },
    {
      id: 'module2-details-project3',
      number: 3,
      title: 'Design a Rubik\'s Cube',
      objective: 'Model a 3D version of a Rubik\'s Cube using Tinkercad',
      learningOutcomes: [
        'Complex geometric modeling',
        'Color and material application',
        'Precision in 3D design'
      ],
      image: 'https://static.wixstatic.com/media/39909b_01c6369fd15c4b3d8dbc74187ae03475~mv2.png?id=module2-details-project3'
    },
    {
      id: 'module2-details-project4',
      number: 4,
      title: 'Dual Letter Illusion',
      objective: 'Construct a 3D illusion using dual letters in Tinkercad',
      learningOutcomes: [
        'Optical illusion creation',
        'Spatial manipulation',
        'Letter integration'
      ],
      image: 'https://static.wixstatic.com/media/39909b_24e57e8511bc457c906ffcc5eb8d5f65~mv2.png?id=module2-details-project4'
    },
    {
      id: 'module2-details-project5',
      number: 5,
      title: 'Design a Snowman',
      objective: 'Create a 3D snowman character in Tinkercad',
      learningOutcomes: [
        '3D character modeling',
        'Shape assembly',
        'Seasonal design basics'
      ],
      image: 'https://static.wixstatic.com/media/39909b_e3e1427a4d094e5eaaae52479036c1e4~mv2.png?id=module2-details-project5'
    },
    {
      id: 'module2-details-project6',
      number: 6,
      title: 'Design a Halloween Pumpkin',
      objective: 'Design a 3D pumpkin with Halloween-themed elements in Tinkercad',
      learningOutcomes: [
        'Seasonal design basics',
        'Shape manipulation',
        'Thematic modeling with Tinkercad'
      ],
      image: 'https://static.wixstatic.com/media/39909b_c63af40739af4344a024fe20474651fd~mv2.png?id=module2-details-project6'
    },
    {
      id: 'module2-details-project7',
      number: 7,
      title: 'Design a House',
      objective: 'Create a 3D model of a house with architectural details',
      learningOutcomes: [
        'Architectural modeling',
        'Introduction to architectural design',
        'Basic structure creation'
      ],
      image: 'https://static.wixstatic.com/media/39909b_aac6a6db1fcd4a7384e839dd333c8ac7~mv2.png?id=module2-details-project7'
    },
    {
      id: 'module2-details-project8',
      number: 8,
      title: 'Design an Anime Character',
      objective: 'Copy a famous character in 3D, focusing on good proportions',
      learningOutcomes: [
        'Character modeling basics',
        'Precision in replicating designs',
        'Proportion and anatomy understanding'
      ],
      image: 'https://static.wixstatic.com/media/39909b_391542bc6d91445fad1581debeca3b13~mv2.png?id=module2-details-project8'
    },
    {
      id: 'module2-details-project9',
      number: 9,
      title: 'Design a Rocket',
      objective: 'Design a basic 3D model of a rocket using Tinkercad\'s core shapes and scaling',
      learningOutcomes: [
        'Introduction to aerospace design',
        'Streamlined shapes',
        'Basic aerodynamics'
      ],
      image: 'https://static.wixstatic.com/media/39909b_3224767f643e44f19eb0214058fb609d~mv2.png?id=module2-details-project9'
    },
    {
      id: 'module2-details-project10',
      number: 10,
      title: 'Design an F1 Car',
      objective: 'Create a basic 3D model of an F1 racing car in Tinkercad',
      learningOutcomes: [
        'Introduction to automotive design',
        'Basic aerodynamics',
        'Vehicle modeling fundamentals'
      ],
      image: 'https://static.wixstatic.com/media/39909b_e7f0d476ad3544d5ac9cf340803713ad~mv2.png?id=module2-details-project10'
    }
  ];

  const stats = [
    { label: '15 Classes', icon: BookOpen },
    { label: '10 Projects', icon: Code },
    { label: '20 Concepts', icon: Lightbulb }
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
                <span className="font-paragraph text-sm text-primary font-semibold">GRADES 1-3</span>
              </motion.div>
            </div>

            <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl text-foreground mb-6 leading-tight">
              Introduction to 3D Design
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto mb-8">
              Introduction to 3D design teaches young learners the fundamentals of digital design using Tinkercad. Through fun and creative projects, students discover how to transform their ideas into three-dimensional digital models.
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
                  <strong>Basic 3D design concepts</strong> including shapes, colors, and simple transformations in digital space.
                </p>
              </div>
              <div className="flex gap-4">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <p className="font-paragraph text-foreground/80">
                  <strong>Creative expression through digital tools</strong> allowing young designers to bring their imagination to life.
                </p>
              </div>
              <div className="flex gap-4">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <p className="font-paragraph text-foreground/80">
                  <strong>Problem-solving skills</strong> by designing solutions to creative challenges and design problems.
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
              10 Fun Design Projects
            </h2>
            <p className="font-paragraph text-lg text-foreground/70 max-w-3xl mx-auto">
              Explore your creativity with fun and engaging 3D design projects designed for young learners.
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
              Begin Your Design Journey
            </motion.h2>
            <motion.p
              className="font-paragraph text-xl text-foreground/80 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Enroll in Introduction to 3D Design and discover the joy of creating in three dimensions!
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
      <Footer />
    </div>
  );
}
