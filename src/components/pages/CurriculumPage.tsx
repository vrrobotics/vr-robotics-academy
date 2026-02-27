import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Image } from '@/components/ui/image';
import { BaseCrudService } from '@/integrations';
import { CurriculumModules } from '@/entities';
import { BookOpen, Clock, Target, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function CurriculumPage() {
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
      cardImage: 'https://static.wixstatic.com/media/39909b_c2fce7c185ca40cda61f7289ce6d7c79~mv2.png?originWidth=320&originHeight=192'
    }
  ];

  // Grades 4-7 Complete Learning Path modules
  const grades4to7Modules = [
    {
      _id: 'g4-7-module-1',
      moduleNumber: 1,
      moduleName: 'Scratch Programming',
      classCount: 25,
      projectCount: 12,
      conceptCount: 27,
      gradeLevel: 'Grades 4-7',
      shortDescription: 'Learn visual programming with Scratch and create interactive projects',
      cardImage: 'https://static.wixstatic.com/media/39909b_db46ae002af5471dbcf982c016ba60e1~mv2.png?originWidth=768&originHeight=448'
    },
    {
      _id: 'g4-7-module-2',
      moduleNumber: 2,
      moduleName: 'Tinkercad 3D Design',
      classCount: 22,
      projectCount: 15,
      conceptCount: 28,
      gradeLevel: 'Grades 4-7',
      shortDescription: 'Master 3D design and modeling with Tinkercad',
      cardImage: 'https://static.wixstatic.com/media/39909b_3b4271d4ec5b4c7d9b3d83e14ed5f3f0~mv2.png?originWidth=768&originHeight=448'
    },
    {
      _id: 'g4-7-module-3',
      moduleNumber: 3,
      moduleName: 'Machine Learning for Kids',
      classCount: 16,
      projectCount: 10,
      conceptCount: 20,
      gradeLevel: 'Grades 4-7',
      shortDescription: 'Introduction to AI and machine learning concepts for young learners',
      cardImage: 'https://static.wixstatic.com/media/39909b_6a318465233c46bf8190dbb78f322b02~mv2.png?originWidth=768&originHeight=448'
    },
    {
      _id: 'g4-7-module-4',
      moduleNumber: 4,
      moduleName: 'Arduino Robotics Beginner',
      classCount: 30,
      projectCount: 25,
      conceptCount: 40,
      gradeLevel: 'Grades 4-7',
      shortDescription: 'Start your Arduino robotics journey with fundamental concepts',
      cardImage: 'https://static.wixstatic.com/media/39909b_8c0c5e88fb8749a0bcea9dbdf8cefa05~mv2.png?originWidth=768&originHeight=448'
    },
    {
      _id: 'g4-7-module-5',
      moduleNumber: 5,
      moduleName: 'Arduino Robotics Tinkerer',
      classCount: 38,
      projectCount: 25,
      conceptCount: 45,
      gradeLevel: 'Grades 4-7',
      shortDescription: 'Advanced Arduino robotics with complex projects and applications',
      cardImage: 'https://static.wixstatic.com/media/39909b_531cf077bf3c4b62bc5b782b593ba97b~mv2.png?originWidth=768&originHeight=448'
    },
    {
      _id: 'g4-7-module-6',
      moduleNumber: 6,
      moduleName: 'Robotics App Development',
      classCount: 15,
      projectCount: 10,
      conceptCount: 27,
      gradeLevel: 'Grades 4-7',
      shortDescription: 'Develop mobile apps to control and interact with robots',
      cardImage: 'https://static.wixstatic.com/media/39909b_aa12d38e1ac443d39f80f6e91e2ee1a4~mv2.png?originWidth=768&originHeight=448'
    },

    {
      _id: 'g4-7-module-8',
      moduleNumber: 8,
      moduleName: 'Python Programming',
      classCount: 25,
      projectCount: 20,
      conceptCount: 30,
      gradeLevel: 'Grades 4-7',
      shortDescription: 'Learn professional programming with Python language',
      cardImage: 'https://static.wixstatic.com/media/39909b_2dd239d518d14a53a8eb2fc42d42f276~mv2.png?originWidth=768&originHeight=448'
    },
    {
      _id: 'g4-7-module-8',
      moduleNumber: 8,
      moduleName: 'Python Automation',
      classCount: 17,
      projectCount: 10,
      conceptCount: 21,
      gradeLevel: 'Grades 4-7',
      shortDescription: 'Automate tasks and create intelligent scripts with Python',
      cardImage: 'https://static.wixstatic.com/media/39909b_026696832c9947218f5c1a01c863cf86~mv2.png?originWidth=768&originHeight=448'
    },
    {
      _id: 'g4-7-module-9',
      moduleNumber: 9,
      moduleName: 'Arduino + Python Computer Vision',
      classCount: 23,
      projectCount: 15,
      conceptCount: 30,
      gradeLevel: 'Grades 4-7',
      shortDescription: 'Combine Arduino and Python for advanced computer vision projects',
      cardImage: 'https://static.wixstatic.com/media/39909b_e0646b8985cf4025a89000ee00028ac7~mv2.png?originWidth=768&originHeight=448'
    }
  ];

  // Grades 8-12 Complete Learning Path modules
  const grades8to12Modules = [
    {
      _id: 'g8-12-module-1',
      moduleNumber: 1,
      moduleName: 'Scratch Programming',
      classCount: 15,
      projectCount: 10,
      conceptCount: 25,
      gradeLevel: 'Grades 8-12',
      shortDescription: 'Advanced visual programming with Scratch for game and animation development',
      cardImage: 'https://static.wixstatic.com/media/39909b_37fdef3a51294a44862bdacd37250a47~mv2.png?originWidth=768&originHeight=448'
    },
    {
      _id: 'g8-12-module-2',
      moduleNumber: 2,
      moduleName: 'Arduino Robotics Beginner',
      classCount: 30,
      projectCount: 25,
      conceptCount: 28,
      gradeLevel: 'Grades 8-12',
      shortDescription: 'Comprehensive Arduino robotics fundamentals for high school students',
      cardImage: 'https://static.wixstatic.com/media/39909b_990065e09bd448108f855516374a5ff4~mv2.png?originWidth=768&originHeight=448'
    },
    {
      _id: 'g8-12-module-3',
      moduleNumber: 3,
      moduleName: 'Arduino Robotics Tinkerer',
      classCount: 35,
      projectCount: 25,
      conceptCount: 30,
      gradeLevel: 'Grades 8-12',
      shortDescription: 'Advanced Arduino robotics with sophisticated sensor integration and control systems',
      cardImage: 'https://static.wixstatic.com/media/39909b_dbf09d6bc858402ca2831114cc2ac958~mv2.png?originWidth=768&originHeight=448'
    },
    {
      _id: 'g8-12-module-4',
      moduleNumber: 4,
      moduleName: 'Robotics App Development',
      classCount: 15,
      projectCount: 10,
      conceptCount: 27,
      gradeLevel: 'Grades 8-12',
      shortDescription: 'Develop professional mobile applications for robot control and interaction',
      cardImage: 'https://static.wixstatic.com/media/39909b_aa12d38e1ac443d39f80f6e91e2ee1a4~mv2.png?originWidth=768&originHeight=448'
    },
    {
      _id: 'g8-12-module-5',
      moduleNumber: 5,
      moduleName: 'Python Programming',
      classCount: 20,
      projectCount: 24,
      conceptCount: 30,
      gradeLevel: 'Grades 8-12',
      shortDescription: 'Professional Python programming for data structures and algorithms',
      cardImage: 'https://static.wixstatic.com/media/39909b_be73c41ff38e4beaa9ae1477a3f84f67~mv2.png?originWidth=768&originHeight=448'
    },
    {
      _id: 'g8-12-module-6',
      moduleNumber: 6,
      moduleName: 'Advanced Python Coding',
      classCount: 25,
      projectCount: 25,
      conceptCount: 35,
      gradeLevel: 'Grades 8-12',
      shortDescription: 'Master advanced Python concepts including OOP, design patterns, and optimization',
      cardImage: 'https://static.wixstatic.com/media/39909b_35ea9f6a9c244df1baed805b777020e6~mv2.png?originWidth=768&originHeight=448'
    },
    {
      _id: 'g8-12-module-7',
      moduleNumber: 7,
      moduleName: 'Computer Vision & AI Robotics',
      classCount: 30,
      projectCount: 25,
      conceptCount: 35,
      gradeLevel: 'Grades 8-12',
      shortDescription: 'Advanced computer vision and AI integration with robotics systems',
      cardImage: 'https://static.wixstatic.com/media/39909b_cd2da88b308c4e47a62a7a97cdc6104b~mv2.png?originWidth=768&originHeight=448'
    },
    {
      _id: 'g8-12-module-8',
      moduleNumber: 8,
      moduleName: 'Pi Robotics Tinkerer',
      classCount: 32,
      projectCount: 25,
      conceptCount: 33,
      gradeLevel: 'Grades 8-12',
      shortDescription: 'Advanced Raspberry Pi robotics with GPIO control and sensor integration',
      cardImage: 'https://static.wixstatic.com/media/39909b_9f9d4fc72b93443887c0da19753791f4~mv2.png?originWidth=768&originHeight=448'
    },
    {
      _id: 'g8-12-module-9',
      moduleNumber: 9,
      moduleName: 'Pi Robotics Inventor',
      classCount: 23,
      projectCount: 15,
      conceptCount: 25,
      gradeLevel: 'Grades 8-12',
      shortDescription: 'Creative Raspberry Pi robotics projects for innovation and invention',
      cardImage: 'https://static.wixstatic.com/media/39909b_b8306b98e6a049bb8cde1588baabee1e~mv2.png?originWidth=768&originHeight=448'
    },
    {
      _id: 'g8-12-module-10',
      moduleNumber: 10,
      moduleName: 'Web Development HTML & HTML5',
      classCount: 18,
      projectCount: 15,
      conceptCount: 22,
      gradeLevel: 'Grades 8-12',
      shortDescription: 'Master HTML and HTML5 for semantic web development',
      cardImage: 'https://static.wixstatic.com/media/39909b_2a653f407a52450ab34fb4a44747c3ba~mv2.png?originWidth=768&originHeight=448'
    },
    {
      _id: 'g8-12-module-11',
      moduleNumber: 11,
      moduleName: 'Web Development CSS',
      classCount: 20,
      projectCount: 15,
      conceptCount: 35,
      gradeLevel: 'Grades 8-12',
      shortDescription: 'Professional CSS styling, layouts, and responsive design techniques',
      cardImage: 'https://static.wixstatic.com/media/39909b_ca1ecfe7696a4d83a2d7a94d51bba21f~mv2.png?originWidth=768&originHeight=448'
    },
    {
      _id: 'g8-12-module-12',
      moduleNumber: 12,
      moduleName: 'Web Development JavaScript',
      classCount: 32,
      projectCount: 25,
      conceptCount: 45,
      gradeLevel: 'Grades 8-12',
      shortDescription: 'Advanced JavaScript for interactive web applications and DOM manipulation',
      cardImage: 'https://static.wixstatic.com/media/39909b_356ad0b7cef446c7b04d71c4d58c8ff5~mv2.png?originWidth=768&originHeight=448'
    }
  ];

  useEffect(() => {
    loadModules();
  }, []);

  const loadModules = async () => {
    setLoading(true);
    const { items } = await BaseCrudService.getAll<CurriculumModules>('curriculummodules');
    
    // Merge CMS items with local fallback data for modules that might not be fully populated in CMS
    const allModuleIds = new Set<string>();
    const moduleMap = new Map<string, CurriculumModules>();
    
    // Add all local modules to the map first (as fallback)
    [...grades1to3Modules, ...grades4to7Modules, ...grades8to12Modules].forEach(mod => {
      moduleMap.set(mod._id, mod as CurriculumModules);
      allModuleIds.add(mod._id);
    });
    
    // Override with CMS items (which have priority)
    items.forEach(item => {
      moduleMap.set(item._id, item);
      allModuleIds.add(item._id);
    });
    
    // Convert map to array and sort by module number
    const sortedModules = Array.from(moduleMap.values())
      .sort((a, b) => (a.moduleNumber || 0) - (b.moduleNumber || 0));
    
    setModules(sortedModules);
    setLoading(false);
  };

  const ModuleCard = ({ module, colorClass, isSecondary }: { module: any; colorClass: string; isSecondary?: boolean }) => {
    // Determine the link based on module ID - Each module has a stable, isolated URL
    const getModuleLink = (moduleId: string, moduleName?: string) => {
      // Map module IDs to actual routes
      const moduleRoutes: Record<string, string> = {
        'g1-3-module-1': '/module-1',
        'g4-7-module-1': '/module-1-grade-4-7',
        'g8-12-module-1': '/module-1-grade-8-12',
        'g1-3-module-2': '/module-2',
        'g4-7-module-2': '/module-2-grade-4-7',
        'g8-12-module-2': '/module-2-grade-8-12',
        'g1-3-module-3': '/module-3',
        'g4-7-module-3': '/module-3-grade-4-7',
        'g8-12-module-3': '/module-3-grade-8-12',
        'g1-3-module-4': '/module-4',
        'g4-7-module-4': '/module-4',
        'g8-12-module-4': '/module-4-grade-8-12',
        'g1-3-module-5': '/module-5',
        'g4-7-module-5': '/module-5-grade-4-7',
        'g8-12-module-5': '/module-5-grade-8-12',
        'g1-3-module-6': '/module-6',
        'g4-7-module-6': '/module-6',
        'g8-12-module-6': '/module-6-grade-8-12',
        'g1-3-module-7': '/module-7',
        'g4-7-module-7': '/module-7',
        'g8-12-module-7': '/module-7-grade-8-12',
        'g4-7-module-8': '/module-8',
        'g8-12-module-8': '/module-8-grade-8-12',
        'g8-12-module-9': '/module-9-grade-8-12',
        'g8-12-module-10': '/module-10-grade-8-12',
        'g8-12-module-11': '/module-11-grade-8-12',
        'g8-12-module-12': '/module-12-grade-8-12',
      };

      // Special case for Python Programming
      if (moduleName === 'Python Programming' && moduleId === 'g4-7-module-8') {
        return '/python-programming';
      }

      return moduleRoutes[moduleId] || `/module-1`;
    };

    // Determine colors based on grade level
    const primaryColor = isSecondary ? '#FFB366' : '#FF8C42';
    const primaryColorLight = isSecondary ? 'rgba(255, 179, 102, 0.2)' : 'rgba(255, 140, 66, 0.2)';
    const primaryColorMedium = isSecondary ? 'rgba(255, 179, 102, 0.4)' : 'rgba(255, 140, 66, 0.4)';

    return (
      <Link to={getModuleLink(module._id, module.moduleName)}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ y: -12 }}
          className={`relative group overflow-hidden rounded-2xl border-2 ${colorClass} transition-all duration-300 cursor-pointer`}
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
                <span className="font-paragraph text-sm text-primary font-semibold">Complete Learning Path</span>
              </motion.div>
            </div>

            <h1 className="font-heading text-6xl sm:text-7xl md:text-8xl text-foreground mb-6 leading-tight"
              style={{ textShadow: '0 0 30px rgba(255, 140, 66, 0.5)' }}
            >
              Complete Curriculum
            </h1>
            <p className="font-paragraph text-xl md:text-2xl text-foreground/80 max-w-4xl mx-auto">
              Comprehensive modules for all grade levels (1-12), building robotics, coding, and engineering skills from fundamentals to advanced topics
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
            <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-6">What You'll Learn</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <p className="font-paragraph text-foreground/80">
                  <strong>Our curriculum helps children develop problem-solving skills</strong> by using simple, visual interfaces and hands-on projects.
                </p>
              </div>
              <div className="flex gap-4">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <p className="font-paragraph text-foreground/80">
                  <strong>Through block-based coding and 3D design, kids learn fundamental programming concepts</strong> like loops, variables, and spatial reasoning.
                </p>
              </div>
              <div className="flex gap-4">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <p className="font-paragraph text-foreground/80">
                  <strong>It also encourages creativity and innovation</strong> allowing them to build interactive games, 3D models, robots, and real-world solutions.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Info Section */}
      <section className="relative py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: BookOpen,
                title: '25 Modules',
                description: 'Complete curriculum covering robotics, coding, and creative design for all grade levels'
              },
              {
                icon: Clock,
                title: 'Age-Appropriate',
                description: 'Designed specifically for grades 1-12 with engaging, hands-on learning at every level'
              },
              {
                icon: Target,
                title: 'Progressive Skills',
                description: 'Build confidence from basic concepts to advanced robotics and AI projects'
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

      {/* Grades 1-3 Complete Learning Path Section */}
      <section className="relative py-24 px-4 md:px-8 bg-gradient-to-b from-background via-primary/5 to-background">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center mb-12"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 border-2 border-primary/50">
              <span className="font-heading text-sm font-bold text-primary">📚 GRADES 1-3</span>
              <div className="w-1 h-1 rounded-full bg-primary" />
              <span className="font-paragraph text-sm text-foreground/80">Complete Learning Path</span>
            </div>
          </motion.div>

          <div className="relative mb-16">
            <div className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-5xl md:text-6xl text-foreground mb-4">
              Grades 1-3 Complete Learning Path
            </h2>
            <p className="font-paragraph text-xl text-foreground/70 max-w-3xl mx-auto">
              Comprehensive modules designed for young learners, building foundational robotics, coding, and creative skills.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
            {grades1to3Modules.map((module, index) => (
              <ModuleCard key={module._id} module={module} colorClass="border-primary/50 hover:border-primary" />
            ))}
          </div>
        </div>
      </section>

      {/* Grades 4-7 Complete Learning Path Section */}
      <section className="relative py-24 px-4 md:px-8 bg-gradient-to-b from-background via-secondary/5 to-background">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center mb-12"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-secondary/20 to-primary/20 border-2 border-secondary/50">
              <span className="font-heading text-sm font-bold text-secondary">📚 GRADES 4-7</span>
              <div className="w-1 h-1 rounded-full bg-secondary" />
              <span className="font-paragraph text-sm text-foreground/80">Complete Learning Path</span>
            </div>
          </motion.div>

          <div className="relative mb-16">
            <div className="h-1 bg-gradient-to-r from-transparent via-secondary to-transparent" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-secondary" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-5xl md:text-6xl text-foreground mb-4">
              Grades 4-7 Complete Learning Path
            </h2>
            <p className="font-paragraph text-xl text-foreground/70 max-w-3xl mx-auto">
              Advanced modules for intermediate learners, mastering programming, robotics, and creative technologies.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
            {grades4to7Modules.map((module, index) => (
              <ModuleCard key={module._id} module={module} colorClass="border-secondary/50 hover:border-secondary" isSecondary={true} />
            ))}
          </div>
        </div>
      </section>

      {/* Grades 8-12 Complete Learning Path Section */}
      <section className="relative py-24 px-4 md:px-8 bg-gradient-to-b from-background via-primary/5 to-background">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center mb-12"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 border-2 border-primary/50">
              <span className="font-heading text-sm font-bold text-primary">📚 GRADES 8-12</span>
              <div className="w-1 h-1 rounded-full bg-primary" />
              <span className="font-paragraph text-sm text-foreground/80">Complete Learning Path</span>
            </div>
          </motion.div>

          <div className="relative mb-16">
            <div className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-5xl md:text-6xl text-foreground mb-4">
              Grades 8-12 Complete Learning Path
            </h2>
            <p className="font-paragraph text-xl text-foreground/70 max-w-3xl mx-auto">
              Advanced modules for high school students, mastering professional programming, robotics, AI, and web development.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
            {grades8to12Modules.map((module, index) => (
              <ModuleCard key={module._id} module={module} colorClass="border-primary/50 hover:border-primary" />
            ))}
          </div>
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
              Ready to Start Your Learning Journey?
            </motion.h2>
            <motion.p
              className="font-paragraph text-xl text-foreground/80 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Book a demo, explore our admission process, or view pricing options to get started!
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
      <Footer />
    </div>
  );
}
