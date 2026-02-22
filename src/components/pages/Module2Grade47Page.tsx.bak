import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { ArrowLeft, BookOpen, Code, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';

export default function Module2Grade47Page() {
  // INDEPENDENT DATA - Module 2 Grade 4-7 specific projects
  // Tinkercad 3D Design projects
  const projects = [
    {
      id: 'module2-g47-project1',
      number: 1,
      title: 'Basic 3D Shapes',
      objective: 'Learn to create and manipulate basic 3D shapes in Tinkercad',
      learningOutcomes: [
        'Understand 3D coordinate system',
        'Master basic shape creation',
        'Learn shape manipulation tools'
      ],
      image: 'https://static.wixstatic.com/media/39909b_7a1c2d3e4f5g6h7i8j9k~mv2.png?id=module2-g47-project1'
    },
    {
      id: 'module2-g47-project2',
      number: 2,
      title: 'Combining Shapes',
      objective: 'Combine multiple shapes to create complex 3D models',
      learningOutcomes: [
        'Learn shape grouping and alignment',
        'Understand Boolean operations',
        'Create composite designs'
      ],
      image: 'https://static.wixstatic.com/media/39909b_8b2c3d4e5f6g7h8i9j0k~mv2.png?id=module2-g47-project2'
    },
    {
      id: 'module2-g47-project3',
      number: 3,
      title: 'Custom Containers',
      objective: 'Design custom containers and boxes with specific dimensions',
      learningOutcomes: [
        'Work with precise measurements',
        'Create hollow structures',
        'Design functional containers'
      ],
      image: 'https://static.wixstatic.com/media/39909b_9c3d4e5f6g7h8i9j0k1l~mv2.png?id=module2-g47-project3'
    },
    {
      id: 'module2-g47-project4',
      number: 4,
      title: 'Decorative Objects',
      objective: 'Create decorative 3D objects and artistic designs',
      learningOutcomes: [
        'Explore creative design possibilities',
        'Learn aesthetic principles in 3D design',
        'Develop artistic skills'
      ],
      image: 'https://static.wixstatic.com/media/39909b_0d4e5f6g7h8i9j0k1l2m~mv2.png?id=module2-g47-project4'
    },
    {
      id: 'module2-g47-project5',
      number: 5,
      title: 'Mechanical Parts',
      objective: 'Design mechanical parts and components for assembly',
      learningOutcomes: [
        'Understand mechanical design principles',
        'Create interlocking parts',
        'Design for 3D printing'
      ],
      image: 'https://static.wixstatic.com/media/39909b_1e5f6g7h8i9j0k1l2m3n~mv2.png?id=module2-g47-project5'
    },
    {
      id: 'module2-g47-project6',
      number: 6,
      title: 'Jewelry Design',
      objective: 'Create custom jewelry pieces using 3D design tools',
      learningOutcomes: [
        'Learn jewelry design principles',
        'Work with fine details',
        'Understand material constraints'
      ],
      image: 'https://static.wixstatic.com/media/39909b_2f6g7h8i9j0k1l2m3n4o~mv2.png?id=module2-g47-project6'
    },
    {
      id: 'module2-g47-project7',
      number: 7,
      title: 'Architectural Models',
      objective: 'Design miniature architectural structures and buildings',
      learningOutcomes: [
        'Understand architectural principles',
        'Create scaled models',
        'Learn spatial planning'
      ],
      image: 'https://static.wixstatic.com/media/39909b_3g7h8i9j0k1l2m3n4o5p~mv2.png?id=module2-g47-project7'
    },
    {
      id: 'module2-g47-project8',
      number: 8,
      title: 'Functional Prototypes',
      objective: 'Design functional prototypes for real-world applications',
      learningOutcomes: [
        'Combine form and function',
        'Iterate on designs',
        'Prepare for 3D printing'
      ],
      image: 'https://static.wixstatic.com/media/39909b_4h8i9j0k1l2m3n4o5p6q~mv2.png?id=module2-g47-project8'
    },
    {
      id: 'module2-g47-project9',
      number: 9,
      title: 'Assembly Design',
      objective: 'Create multi-part assemblies that fit together',
      learningOutcomes: [
        'Design interconnected parts',
        'Understand tolerances',
        'Create assembly instructions'
      ],
      image: 'https://static.wixstatic.com/media/39909b_5i9j0k1l2m3n4o5p6q7r~mv2.png?id=module2-g47-project9'
    },
    {
      id: 'module2-g47-project10',
      number: 10,
      title: 'Final Portfolio Project',
      objective: 'Design a complete project showcasing all learned skills',
      learningOutcomes: [
        'Integrate all design concepts',
        'Create professional-quality models',
        'Present design portfolio'
      ],
      image: 'https://static.wixstatic.com/media/39909b_6j0k1l2m3n4o5p6q7r8s~mv2.png?id=module2-g47-project10'
    }
  ];

  const stats = [
    { label: '22 Classes', icon: BookOpen },
    { label: '15 Projects', icon: Code },
    { label: '28 Concepts', icon: Lightbulb }
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
                <span className="font-paragraph text-sm text-primary font-semibold">GRADES 4-7</span>
              </motion.div>
            </div>

            <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl text-foreground mb-6 leading-tight">
              Tinkercad 3D Design
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto mb-8">
              Master the art and science of 3D design with Tinkercad. This module teaches you how to create, modify, and optimize 3D models for various applications. From simple shapes to complex assemblies, learn professional 3D design skills that are used in engineering, product design, and manufacturing.
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
                  <strong>Tinkercad makes 3D design accessible to everyone</strong> with an intuitive, browser-based interface that requires no installation or prior experience.
                </p>
              </div>
              <div className="flex gap-4">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <p className="font-paragraph text-foreground/80">
                  <strong>Learn professional design principles</strong> including shape manipulation, Boolean operations, and precision measurements used in real-world engineering.
                </p>
              </div>
              <div className="flex gap-4">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <p className="font-paragraph text-foreground/80">
                  <strong>Create designs ready for 3D printing and manufacturing</strong> by understanding tolerances, material constraints, and production-ready specifications.
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
              10 Hands-On Projects
            </h2>
            <p className="font-paragraph text-lg text-foreground/70 max-w-3xl mx-auto">
              Master 3D design through practical projects that teach you everything from basic shapes to complex assemblies and production-ready designs.
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
              Ready to Design?
            </motion.h2>
            <motion.p
              className="font-paragraph text-xl text-foreground/80 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Enroll in Tinkercad 3D Design and start creating professional 3D models for engineering, product design, and manufacturing!
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
