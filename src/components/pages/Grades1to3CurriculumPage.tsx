import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Image } from '@/components/ui/image';
import { BaseCrudService } from '@/integrations';
import { CurriculumModules } from '@/entities';
import { BookOpen, Clock, Target, ArrowRight, Sparkles, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Grades1to3CurriculumPage() {
  const [modules, setModules] = useState<CurriculumModules[]>([]);
  const [loading, setLoading] = useState(true);

  // Grades 1-3 Complete Learning Path modules
  const grades1to3Modules = [
    {
      _id: 'g1-3-module-1',
      moduleNumber: 1,
      moduleName: 'Coding Fundamentals',
      classCount: 20,
      projectCount: 12,
      conceptCount: 25,
      gradeLevel: 'Grades 1-3',
      shortDescription: 'Learn the basics of coding and programming concepts',
      detailedDescription: 'Start your coding journey with fundamental programming concepts. Learn about sequences, loops, and basic logic through visual, interactive lessons designed for young learners.',
      cardImage: 'https://static.wixstatic.com/media/39909b_24ced95455d14b8f876ad3dbec783974~mv2.png?originWidth=320&originHeight=192'
    },
    {
      _id: 'g1-3-module-2',
      moduleNumber: 2,
      moduleName: 'TinkerCad 3D Design',
      classCount: 18,
      projectCount: 10,
      conceptCount: 20,
      gradeLevel: 'Grades 1-3',
      shortDescription: 'Master 3D design and modeling with TinkerCad',
      detailedDescription: 'Explore the world of 3D design using TinkerCad. Create amazing 3D models, learn spatial reasoning, and bring your imagination to life with digital design tools.',
      cardImage: 'https://static.wixstatic.com/media/39909b_bf99b8e26ec947d49c16622d2a91f58f~mv2.png?originWidth=320&originHeight=192'
    },
    {
      _id: 'g1-3-module-3',
      moduleNumber: 3,
      moduleName: 'Computing with Microbit',
      classCount: 40,
      projectCount: 19,
      conceptCount: 65,
      gradeLevel: 'Grades 1-3',
      shortDescription: 'Explore computing and microbit programming',
      detailedDescription: 'Discover the power of microcomputers with BBC Microbit. Program interactive devices, create games, and learn electronics through hands-on projects.',
      cardImage: 'https://static.wixstatic.com/media/39909b_6b97d5859d65419881e58dab0c41716a~mv2.png?originWidth=320&originHeight=192'
    },
    {
      _id: 'g1-3-module-4',
      moduleNumber: 4,
      moduleName: 'Microbit Robotics',
      classCount: 65,
      projectCount: 16,
      conceptCount: 95,
      gradeLevel: 'Grades 1-3',
      shortDescription: 'Advanced microbit programming and robotics projects',
      detailedDescription: 'Build and program robots using Microbit. Learn robotics fundamentals, sensor integration, and create autonomous robots that respond to their environment.',
      cardImage: 'https://static.wixstatic.com/media/39909b_c10f582f625446f1914091328542ec2c~mv2.png?originWidth=320&originHeight=192'
    },
    {
      _id: 'g1-3-module-5',
      moduleNumber: 5,
      moduleName: 'Mobile App Development',
      classCount: 25,
      projectCount: 9,
      conceptCount: 35,
      gradeLevel: 'Grades 1-3',
      shortDescription: 'Create simple mobile applications and games',
      detailedDescription: 'Design and develop simple mobile apps and games. Learn app development basics and create interactive applications that you can share with friends and family.',
      cardImage: 'https://static.wixstatic.com/media/39909b_1f817c8e95a440c6a56964f85cf37c9f~mv2.png?originWidth=320&originHeight=192'
    },
    {
      _id: 'g1-3-module-6',
      moduleNumber: 6,
      moduleName: 'Machine Learning for Kids',
      classCount: 16,
      projectCount: 10,
      conceptCount: 20,
      gradeLevel: 'Grades 1-3',
      shortDescription: 'Introduction to AI and machine learning concepts',
      detailedDescription: 'Explore the exciting world of artificial intelligence and machine learning. Understand how computers learn and create AI-powered projects in a fun, accessible way.',
      cardImage: 'https://static.wixstatic.com/media/39909b_97133375f59543d28c58e8d6fb45b182~mv2.png?originWidth=320&originHeight=192'
    },
    {
      _id: 'g1-3-module-7',
      moduleNumber: 7,
      moduleName: 'Edu Blocks Python Coding',
      classCount: 25,
      projectCount: 14,
      conceptCount: 35,
      gradeLevel: 'Grades 1-3',
      shortDescription: 'Learn Python coding with visual block-based programming',
      detailedDescription: 'Transition from visual programming to Python. Learn professional programming language basics using block-based visual tools that make coding accessible and fun.',
      cardImage: 'https://static.wixstatic.com/media/39909b_c2fce7c185ca40cda61f7289ce6d7c79~mv2.png?originWidth=320&originHeight=192'
    }
  ];

  useEffect(() => {
    loadModules();
  }, []);

  const loadModules = async () => {
    setLoading(true);
    const { items } = await BaseCrudService.getAll<CurriculumModules>('curriculummodules');
    
    // Filter for Grades 1-3 modules and merge with local data
    const moduleMap = new Map<string, CurriculumModules>();
    
    // Add all local modules to the map first (as fallback)
    grades1to3Modules.forEach(mod => {
      moduleMap.set(mod._id, mod as CurriculumModules);
    });
    
    // Override with CMS items (which have priority)
    items.forEach(item => {
      if (item.gradeLevel === 'Grades 1-3' || grades1to3Modules.some(m => m._id === item._id)) {
        moduleMap.set(item._id, item);
      }
    });
    
    // Convert map to array and sort by module number
    const sortedModules = Array.from(moduleMap.values())
      .sort((a, b) => (a.moduleNumber || 0) - (b.moduleNumber || 0));
    
    setModules(sortedModules);
    setLoading(false);
  };

  const ModuleCard = ({ module }: { module: any }) => {
    const primaryColor = '#FF8C42';
    const primaryColorLight = 'rgba(255, 140, 66, 0.2)';
    const primaryColorMedium = 'rgba(255, 140, 66, 0.4)';

    return (
      <Link to={`/curriculum/${module._id}`}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ y: -12 }}
          className="relative group overflow-hidden rounded-2xl border-2 border-primary/50 hover:border-primary transition-all duration-300 cursor-pointer"
        >
          {/* Background */}
          <div 
            className="absolute inset-0 bg-gradient-to-br via-background to-background"
            style={{
              backgroundImage: `linear-gradient(to bottom right, ${primaryColorLight}, rgba(15, 15, 15, 0.5), rgb(15, 15, 15))`
            }}
          />
          
          {/* Image Container */}
          {module.cardImage && (
            <div 
              className="relative overflow-hidden"
              style={{ 
                height: '160px',
                backgroundImage: `linear-gradient(to bottom right, ${primaryColorMedium}, rgba(255, 179, 102, 0.4))`
              }}
            >
              <Image
                src={module.cardImage}
                alt={module.moduleName || 'Module'}
                className="w-full h-full object-cover"
                width={800}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            </div>
          )}

          {/* Content */}
          <div className="relative p-6 z-10">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="font-heading text-2xl font-bold text-foreground">{module.moduleName}</h4>
              </div>
            </div>
            
            {/* Module Stats */}
            <div className="space-y-2 mb-6">
              {module.classCount !== undefined && (
                <div className="flex items-center gap-2 font-paragraph text-foreground/80">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: primaryColor }} />
                  <span>{module.classCount}+ Classes</span>
                </div>
              )}
              {module.projectCount !== undefined && (
                <div className="flex items-center gap-2 font-paragraph text-foreground/80">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: primaryColor }} />
                  <span>{module.projectCount}+ Projects</span>
                </div>
              )}
              {module.conceptCount !== undefined && (
                <div className="flex items-center gap-2 font-paragraph text-foreground/80">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: primaryColor }} />
                  <span>{module.conceptCount} Concepts</span>
                </div>
              )}
            </div>

            {/* Learn More Button */}
            <button 
              className="inline-flex items-center gap-2 px-4 py-2 border rounded-lg transition-colors font-paragraph text-sm font-semibold"
              style={{
                borderColor: primaryColor,
                color: primaryColor,
                backgroundColor: `${primaryColorLight}`
              }}
            >
              Learn More
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Neon border effect */}
            <div 
              className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                backgroundImage: `linear-gradient(to right, transparent, ${primaryColor}, transparent)`
              }}
            />
          </div>
        </motion.div>
      </Link>
    );
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

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <div className="inline-block mb-6">
              <motion.div
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30"
                whileHover={{ scale: 1.05 }}
              >
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="font-paragraph text-sm text-primary font-semibold">Grades 1-3 Learning Path</span>
              </motion.div>
            </div>

            <h1 className="font-heading text-6xl sm:text-7xl md:text-8xl text-foreground mb-6 leading-tight">
              Grades 1-3 Curriculum
            </h1>
            <p className="font-paragraph text-xl md:text-2xl text-foreground/80 max-w-4xl mx-auto">
              Comprehensive learning modules designed specifically for young learners (Grades 1-3), building foundational robotics, coding, and creative skills through engaging, age-appropriate projects.
            </p>
          </motion.div>
        </div>
      </section>

      {/* What You'll Learn Section */}
      <section className="relative py-16 px-4 md:px-8 bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 md:p-12 rounded-2xl border border-primary/20 bg-primary/5"
          >
            <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-6">What Your Child Will Learn</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <p className="font-paragraph text-foreground/80">
                  <strong>Foundational Coding Skills</strong> through visual, block-based programming that makes coding accessible and fun for young learners.
                </p>
              </div>
              <div className="flex gap-4">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <p className="font-paragraph text-foreground/80">
                  <strong>Problem-Solving & Logical Thinking</strong> by working through hands-on projects that encourage creative thinking and systematic problem-solving.
                </p>
              </div>
              <div className="flex gap-4">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <p className="font-paragraph text-foreground/80">
                  <strong>3D Design & Robotics Basics</strong> using industry-standard tools like TinkerCad and Microbit to build real projects and robots.
                </p>
              </div>
              <div className="flex gap-4">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <p className="font-paragraph text-foreground/80">
                  <strong>Creativity & Innovation</strong> by designing games, apps, and interactive projects that showcase their unique ideas and imagination.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Curriculum Highlights Section */}
      <section className="relative py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: BookOpen,
                title: '7 Modules',
                description: 'Progressive curriculum covering coding, 3D design, robotics, and AI fundamentals'
              },
              {
                icon: Award,
                title: 'Age-Appropriate',
                description: 'Specially designed for grades 1-3 with engaging, hands-on learning activities'
              },
              {
                icon: Target,
                title: 'Skill Building',
                description: 'Build confidence from basic concepts to creating interactive projects and robots'
              }
            ].map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 rounded-2xl text-center glass-pane"
              >
                <div className="inline-flex p-4 rounded-xl mb-4 bg-primary/10 border border-primary/20">
                  <info.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-heading text-2xl mb-3 text-foreground">{info.title}</h3>
                <p className="font-paragraph text-foreground/70">{info.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modules Grid Section */}
      <section className="relative py-24 px-4 md:px-8 bg-gradient-to-b from-background via-primary/5 to-background">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-5xl md:text-6xl text-foreground mb-4">
              Our 7 Learning Modules
            </h2>
            <p className="font-paragraph text-xl text-foreground/70 max-w-3xl mx-auto">
              Each module is carefully designed to build skills progressively, from basic coding concepts to advanced robotics and AI.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {modules.map((module, index) => (
              <ModuleCard key={module._id} module={module} />
            ))}
          </div>
        </div>
      </section>

      {/* Learning Path Section */}
      <section className="relative py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-12 md:p-16 rounded-3xl glass-pane border border-primary/20"
          >
            <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-8">Your Learning Journey</h2>
            
            <div className="space-y-6">
              {[
                {
                  number: '1',
                  title: 'Start with Coding Fundamentals',
                  description: 'Learn basic programming concepts through visual, interactive lessons designed for young learners.'
                },
                {
                  number: '2',
                  title: 'Explore 3D Design & Robotics',
                  description: 'Create 3D models with TinkerCad and build your first robots using Microbit technology.'
                },
                {
                  number: '3',
                  title: 'Create Apps & Games',
                  description: 'Develop simple mobile applications and interactive games that you can share with friends.'
                },
                {
                  number: '4',
                  title: 'Discover AI & Machine Learning',
                  description: 'Explore artificial intelligence concepts and create AI-powered projects in a fun, accessible way.'
                },
                {
                  number: '5',
                  title: 'Master Python Basics',
                  description: 'Transition to professional programming with Python using visual block-based tools.'
                }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-6 items-start"
                >
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary text-primary-foreground font-heading font-bold text-lg">
                      {step.number}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading text-xl text-foreground mb-2">{step.title}</h3>
                    <p className="font-paragraph text-foreground/70">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="p-12 md:p-16 rounded-3xl text-center glass-pane">
            <motion.h2
              className="font-heading text-4xl lg:text-5xl mb-6 text-foreground"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Ready to Start Your Child's Learning Journey?
            </motion.h2>
            <motion.p
              className="font-paragraph text-xl text-foreground/80 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Book a demo, explore our admission process, or view pricing options to get started with our Grades 1-3 curriculum!
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row flex-wrap justify-center gap-4"
            >
              <Link to="/demo-booking">
                <motion.button
                  className="bg-primary text-primary-foreground font-heading font-semibold px-8 py-4 rounded-lg text-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Book Demo
                </motion.button>
              </Link>
              <Link to="/admission-process">
                <motion.button
                  className="bg-transparent text-primary border-2 border-primary font-heading font-semibold px-8 py-4 rounded-lg text-lg"
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 140, 66, 0.1)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  Admission Process
                </motion.button>
              </Link>
              <Link to="/program-fees">
                <motion.button
                  className="bg-secondary/10 text-secondary border-2 border-secondary font-heading font-semibold px-8 py-4 rounded-lg text-lg"
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 179, 102, 0.15)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Pricing
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
      </div>
    <Footer />
    </>
  );
}
