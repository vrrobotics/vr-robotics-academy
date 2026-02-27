import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { BaseCrudService } from '@/integrations';
import { CertificateExamples } from '@/entities';
import { Award, CheckCircle, Star, Trophy } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RazorpayService from '@/services/razorpayService';

// Professional SVG Certificate Generator with Levels
const CertificateSVG = ({ name, index = 0 }: { name: string; index?: number }) => {
  const safeIndex = (index ?? 0) % 4;
  
  // Different levels for each certificate
  const levels = [
    { 
      level: 'BEGINNER', 
      stars: 1,
      primary: '#1e3a8a', 
      secondary: '#3b82f6', 
      accent: '#fbbf24',
      darkAccent: '#d97706'
    },
    { 
      level: 'ADVANCED', 
      stars: 3,
      primary: '#581c87', 
      secondary: '#a855f7', 
      accent: '#fbbf24',
      darkAccent: '#dc2626'
    },
    { 
      level: 'SPECIALIST', 
      stars: 2,
      primary: '#92400e', 
      secondary: '#d97706', 
      accent: '#fef3c7',
      darkAccent: '#f59e0b'
    },
    { 
      level: 'MASTER ELITE', 
      stars: 5,
      primary: '#7f1d1d', 
      secondary: '#ef4444', 
      accent: '#fcd34d',
      darkAccent: '#f59e0b'
    }
  ];
  
  const cert = levels[safeIndex];

  return (
    <svg viewBox="0 0 960 640" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        {/* Professional Gradients */}
        <linearGradient id={`bgGrad${safeIndex}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: cert.primary, stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: cert.secondary, stopOpacity: 0.95 }} />
        </linearGradient>
        
        {/* Gold Seal Gradient */}
        <radialGradient id={`goldGrad${safeIndex}`}>
          <stop offset="0%" style={{ stopColor: '#fef08a', stopOpacity: 1 }} />
          <stop offset="70%" style={{ stopColor: cert.accent, stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: cert.darkAccent, stopOpacity: 1 }} />
        </radialGradient>

        {/* Texture Pattern */}
        <pattern id={`texture${safeIndex}`} x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
          <circle cx="50" cy="50" r="1" fill="white" opacity="0.08" />
          <circle cx="10" cy="20" r="0.5" fill="white" opacity="0.04" />
          <circle cx="80" cy="80" r="0.5" fill="white" opacity="0.04" />
        </pattern>

        {/* Filter for depth */}
        <filter id={`shadow${safeIndex}`}>
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
        </filter>
      </defs>

      {/* Main Background */}
      <rect width="960" height="640" fill={`url(#bgGrad${safeIndex})`} />
      <rect width="960" height="640" fill={`url(#texture${safeIndex})`} />

      {/* Premium Outer Border - Gold/Accent */}
      <rect x="25" y="25" width="910" height="590" fill="none" stroke={cert.accent} strokeWidth="4" rx="20" />
      
      {/* Inner Elegant Border */}
      <rect x="40" y="40" width="880" height="560" fill="none" stroke="white" strokeWidth="2" opacity="0.4" rx="15" />
      <rect x="45" y="45" width="870" height="550" fill="none" stroke="white" strokeWidth="0.5" opacity="0.2" rx="13" />

      {/* Decorative Corner Elements - Top */}
      <g opacity="0.7">
        <path d="M 90 70 Q 80 70 80 80" fill="none" stroke={cert.accent} strokeWidth="3" />
        <path d="M 70 90 Q 70 80 80 80" fill="none" stroke={cert.accent} strokeWidth="3" />
        
        <path d="M 870 70 Q 880 70 880 80" fill="none" stroke={cert.accent} strokeWidth="3" />
        <path d="M 890 90 Q 890 80 880 80" fill="none" stroke={cert.accent} strokeWidth="3" />
      </g>

      {/* Decorative Corner Elements - Bottom */}
      <g opacity="0.7">
        <path d="M 90 570 Q 80 570 80 560" fill="none" stroke={cert.accent} strokeWidth="3" />
        <path d="M 70 550 Q 70 560 80 560" fill="none" stroke={cert.accent} strokeWidth="3" />
        
        <path d="M 870 570 Q 880 570 880 560" fill="none" stroke={cert.accent} strokeWidth="3" />
        <path d="M 890 550 Q 890 560 880 560" fill="none" stroke={cert.accent} strokeWidth="3" />
      </g>

      {/* Top Ornamental Line */}
      <line x1="100" y1="95" x2="860" y2="95" stroke={cert.accent} strokeWidth="1" opacity="0.5" />

      {/* Level Badge - Top Right */}
      <g>
        <circle cx="850" cy="90" r="40" fill={cert.accent} filter={`url(#shadow${safeIndex})`} />
        <circle cx="850" cy="90" r="35" fill="none" stroke="white" strokeWidth="2" />
        <text x="850" y="85" fontSize="18" fontWeight="bold" textAnchor="middle" fill={cert.primary} fontFamily="Georgia, serif">
          {cert.level.split(' ')[0]}
        </text>
        <text x="850" y="100" fontSize="11" fontWeight="600" textAnchor="middle" fill={cert.primary} fontFamily="Georgia, serif">
          {cert.level.includes(' ') ? cert.level.split(' ')[1] : 'TIER'}
        </text>
      </g>

      {/* CERTIFICATE text - With style */}
      <text x="480" y="150" fontSize="64" fontWeight="bold" textAnchor="middle" fill="white" fontFamily="Georgia, serif" letterSpacing="4">
        CERTIFICATE
      </text>

      {/* OF COMPLETION */}
      <text x="480" y="220" fontSize="52" fontWeight="600" textAnchor="middle" fill={cert.accent} fontFamily="Georgia, serif" letterSpacing="3">
        OF COMPLETION
      </text>

      {/* Dividing Line */}
      <line x1="150" y1="245" x2="810" y2="245" stroke={cert.accent} strokeWidth="2" opacity="0.6" />
      <line x1="160" y1="250" x2="800" y2="250" stroke="white" strokeWidth="0.5" opacity="0.3" />

      {/* Presented To (smaller text) */}
      <text x="480" y="285" fontSize="13" textAnchor="middle" fill="white" fontFamily="Georgia, serif" opacity="0.9" letterSpacing="2">
        IS PROUDLY PRESENTED TO
      </text>

      {/* Certificate Name - Main Achievement */}
      <text x="480" y="345" fontSize="40" fontWeight="bold" textAnchor="middle" fill={cert.accent} fontFamily="Georgia, serif">
        {name.length > 40 ? name.substring(0, 37) + '...' : name}
      </text>

      {/* Star Rating for Level */}
      <g transform="translate(480, 380)">
        {Array.from({ length: 5 }).map((_, i) => (
          <g key={i} transform={`translate(${(i - 2) * 30}, 0)`}>
            {i < cert.stars ? (
              <path d="M0,-8 L2,-2 L8,-1 L3,3 L5,9 L0,6 L-5,9 L-3,3 L-8,-1 L-2,-2 Z" fill={cert.accent} />
            ) : (
              <path d="M0,-8 L2,-2 L8,-1 L3,3 L5,9 L0,6 L-5,9 L-3,3 L-8,-1 L-2,-2 Z" fill="white" opacity="0.2" />
            )}
          </g>
        ))}
      </g>

      {/* Achievement Details */}
      <text x="480" y="450" fontSize="12" textAnchor="middle" fill="white" fontFamily="Georgia, serif" opacity="0.85">
        For Excellence in STEM Innovation &amp; Robotics Mastery
      </text>

      {/* Signature Lines */}
      <g fontSize="11" fontFamily="Georgia, serif" fill="white" opacity="0.8">
        {/* Left Signature */}
        <line x1="150" y1="510" x2="320" y2="510" stroke="white" strokeWidth="1" opacity="0.5" />
        <text x="235" y="530" textAnchor="middle" fontSize="10">Director of Academics</text>
        
        {/* Right Signature */}
        <line x1="640" y1="510" x2="810" y2="510" stroke="white" strokeWidth="1" opacity="0.5" />
        <text x="725" y="530" textAnchor="middle" fontSize="10">Executive Director</text>
      </g>

      {/* Official Seal - Bottom Right */}
      <g transform="translate(800, 550)">
        {/* Outer Circle */}
        <circle cx="0" cy="0" r="55" fill={`url(#goldGrad${safeIndex})`} filter={`url(#shadow${safeIndex})`} />
        <circle cx="0" cy="0" r="50" fill="none" stroke="white" strokeWidth="2" opacity="0.8" />
        
        {/* Inner Circle */}
        <circle cx="0" cy="0" r="42" fill="none" stroke="white" strokeWidth="1.5" opacity="0.6" />
        
        {/* VRA Text */}
        <text x="0" y="-8" fontSize="16" fontWeight="bold" textAnchor="middle" fill={cert.primary} fontFamily="Georgia, serif">
          VRA
        </text>
        <text x="0" y="10" fontSize="9" fontWeight="600" textAnchor="middle" fill={cert.primary} fontFamily="Georgia, serif" letterSpacing="1">
          OFFICIAL
        </text>

        {/* Rosette Design around seal */}
        {Array.from({ length: 12 }).map((_, i) => (
          <circle 
            key={i}
            cx={Math.cos((i * 30 - 90) * Math.PI / 180) * 48} 
            cy={Math.sin((i * 30 - 90) * Math.PI / 180) * 48}
            r="3" 
            fill={cert.accent}
            opacity="0.7"
          />
        ))}
      </g>

      {/* Certificate Number - Bottom Left */}
      <text x="70" y="595" fontSize="9" fill="white" fontFamily="Arial, sans-serif" opacity="0.6" letterSpacing="2">
        CERT. No. VRA-{String(2026000 + (safeIndex + 1) * 1000).slice(-6)}
      </text>

      {/* Academy Name - Bottom Center */}
      <text x="480" y="620" fontSize="16" fontWeight="bold" textAnchor="middle" fill={cert.accent} fontFamily="Georgia, serif" letterSpacing="2">
        VR ROBOTICS ACADEMY
      </text>
      <text x="480" y="635" fontSize="11" textAnchor="middle" fill="white" fontFamily="Georgia, serif" opacity="0.8">
        Excellence in Advanced Technology Education
      </text>
    </svg>
  );
};

// Beautiful certificate design component
const CertificateCard = ({ cert, index }: { cert: CertificateExamples; index: number }) => {
  return (
    <motion.div
      key={cert._id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="p-8 rounded-3xl"
      style={{
        background: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 145, 0.2)',
        backdropFilter: 'blur(10px)'
      }}
    >
      {/* Certificate Preview */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ delay: index * 0.1 + 0.1 }}
        className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6"
        style={{
          border: '2px solid rgba(255, 255, 145, 0.3)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
        }}
      >
        {cert.certificateImage ? (
          <img
            src={cert.certificateImage}
            alt={cert.certificateName || 'Certificate'}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <CertificateSVG name={cert.certificateName || 'Certificate'} index={index} />
        )}
      </motion.div>

      {/* Certificate Details */}
      <h3 className="font-heading text-2xl mb-4 text-foreground">
        {cert.certificateName}
      </h3>

      {cert.certificateDescription && (
        <p className="font-paragraph text-lg text-foreground/80 mb-4 leading-relaxed">
          {cert.certificateDescription}
        </p>
      )}

      <div className="space-y-2">
        {cert.awardedFor && (
          <div className="flex items-start gap-2">
            <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-1" />
            <div>
              <span className="font-paragraph text-sm text-foreground/60">Awarded for:</span>
              <p className="font-paragraph text-sm text-foreground">{cert.awardedFor}</p>
            </div>
          </div>
        )}
        {cert.recipientType && (
          <div className="flex items-start gap-2">
            <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-1" />
            <div>
              <span className="font-paragraph text-sm text-foreground/60">Recipient:</span>
              <p className="font-paragraph text-sm text-foreground">{cert.recipientType}</p>
            </div>
          </div>
        )}
        {cert.issuingAuthority && (
          <div className="flex items-start gap-2">
            <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-1" />
            <div>
              <span className="font-paragraph text-sm text-foreground/60">Issued by:</span>
              <p className="font-paragraph text-sm text-primary">{cert.issuingAuthority}</p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<CertificateExamples[]>([]);
  const [loading, setLoading] = useState(true);

  const handleBookDemoPayment = async () => {
    try {
      await RazorpayService.initiateDemo1DollarPayment(
        (response) => {
          console.log('Demo payment successful:', response);
        },
        (error) => {
          console.error('Demo payment failed:', error);
        }
      );
    } catch (error) {
      console.error('Error initiating demo payment:', error);
    }
  };

  // Default example certificates for GitHub Pages static deployment
  const defaultCertificates: CertificateExamples[] = [
    {
      _id: 'default-1',
      certificateName: 'Robotics Foundation Program',
      certificateDescription: 'Foundation-level completion certificate for core robotics concepts, sensors, and basic automation.',
      awardedFor: 'Successfully completed the Robotics Foundation Program conducted by VR Robotics.',
      recipientType: 'Students (Foundation Level)',
      issuingAuthority: 'VR Robotics Academy',
      certificateImage: 'https://res.cloudinary.com/dicfqwlfq/image/upload/v1772162051/80efe18f-d7fc-4038-91ac-b3292c172160_shxwie.png'
    },
    {
      _id: 'default-2',
      certificateName: 'Robotics Basic Program',
      certificateDescription: 'Basic program completion certificate focused on robotics fundamentals, creativity, and practical learning.',
      awardedFor: 'Successfully completed the Robotics Basic Program conducted by VR Robotics.',
      recipientType: 'Students (Basic Level)',
      issuingAuthority: 'VR Robotics Academy',
      certificateImage: 'https://res.cloudinary.com/dicfqwlfq/image/upload/v1772162050/3ab992d9-f900-465f-b419-24e107461a2d_qs75nh.png'
    },
    {
      _id: 'default-3',
      certificateName: 'Robotics Standard Program',
      certificateDescription: 'Standard program completion certificate covering structured robotics learning and real project execution.',
      awardedFor: 'Successfully completed the Robotics Standard Program conducted by VR Robotics.',
      recipientType: 'Students (Standard Level)',
      issuingAuthority: 'VR Robotics Academy',
      certificateImage: 'https://res.cloudinary.com/dicfqwlfq/image/upload/v1772162042/a7d152ab-82b9-4771-a9b3-384389c67596_ooa6gd.png'
    },
    {
      _id: 'default-4',
      certificateName: 'Robotics Advanced Program',
      certificateDescription: 'Advanced program completion certificate for higher-level robotics thinking, execution, and innovation.',
      awardedFor: 'Successfully completed the Robotics Advanced Program conducted by VR Robotics.',
      recipientType: 'Students (Advanced Level)',
      issuingAuthority: 'VR Robotics Academy',
      certificateImage: 'https://res.cloudinary.com/dicfqwlfq/image/upload/v1772162051/aaaf5be5-b182-4daf-90d6-568636a4eb87_twohy3.png'
    }
  ];

  useEffect(() => {
    loadCertificates();
  }, []);

  const loadCertificates = async () => {
    setLoading(true);
    const { items } = await BaseCrudService.getAll<CertificateExamples>('certificateexamples');

    // Always show the 4 requested program certificates first, then append any additional DB certificates.
    const defaultNameSet = new Set(defaultCertificates.map((cert) => cert.certificateName?.toLowerCase().trim()));
    const additionalCertificates = (items || []).filter(
      (cert) => !defaultNameSet.has(cert.certificateName?.toLowerCase().trim() || '')
    );

    setCertificates([...defaultCertificates, ...additionalCertificates]);
    setLoading(false);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      {/* Circuit Background */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(90deg, rgba(216, 255, 145, 0.1) 1px, transparent 1px),
            linear-gradient(rgba(216, 255, 145, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Hero Section */}
      <section className="relative py-24 px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            className="inline-flex p-6 rounded-2xl mb-8 bg-primary/10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Award className="w-16 h-16 text-primary" />
          </motion.div>
          <motion.h1
            className="font-heading text-6xl lg:text-7xl mb-8 text-primary"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              textShadow: '0 0 30px rgba(216, 255, 145, 0.4)'
            }}
          >
            Certificates & Recognition
          </motion.h1>
          <motion.p
            className="font-paragraph text-xl lg:text-2xl text-foreground/90 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Celebrate achievements with industry-recognized certificates that showcase your skills
          </motion.p>
        </div>
      </section>

      {/* Certificate Benefits */}
      <section className="relative py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              {
                title: 'Skills Verification',
                description: 'Demonstrate mastery of robotics, coding, and engineering concepts with verified credentials recognized by educators and industry'
              },
              {
                title: 'Academic & Career Advancement',
                description: 'Strengthen your resume and college applications with professional certifications that showcase your technical expertise'
              },
              {
                title: 'Continuous Learning Path',
                description: 'Progress through multiple skill levels from Beginner to Master Elite, building career-ready competencies at your pace'
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 rounded-2xl text-center"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <CheckCircle className="w-12 h-12 text-secondary mx-auto mb-4" />
                <h3 className="font-heading text-2xl mb-3 text-foreground">{benefit.title}</h3>
                <p className="font-paragraph text-foreground/70">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificate Examples */}
      <section className="relative py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="font-heading text-5xl text-center mb-16 text-secondary"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              textShadow: '0 0 30px rgba(255, 211, 158, 0.4)'
            }}
          >
            Certificate Examples
          </motion.h2>

          {loading ? (
            <div className="grid md:grid-cols-2 gap-12">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="p-8 rounded-3xl animate-pulse"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <div className="aspect-[4/3] bg-foreground/10 rounded-2xl mb-6" />
                  <div className="h-6 bg-foreground/10 rounded mb-4" />
                  <div className="h-4 bg-foreground/10 rounded" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-12">
              {certificates.map((cert, index) => (
                <CertificateCard key={cert._id} cert={cert} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* How to Earn */}
      <section className="relative py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="font-heading text-5xl text-center mb-16 text-primary"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              textShadow: '0 0 30px rgba(216, 255, 145, 0.4)'
            }}
          >
            How to Earn Your Certificate
          </motion.h2>

          <div className="grid lg:grid-cols-4 gap-8">
            {[
              {
                step: '1',
                title: 'Complete Modules',
                description: 'Finish all lessons and projects in your chosen curriculum path'
              },
              {
                step: '2',
                title: 'Build Projects',
                description: 'Create and demonstrate working robotics projects'
              },
              {
                step: '3',
                title: 'Pass Assessment',
                description: 'Show your skills through practical tests and presentations'
              },
              {
                step: '4',
                title: 'Receive Certificate',
                description: 'Get your official certificate and celebrate your achievement!'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative p-8 rounded-2xl"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <div className="absolute -top-4 left-8 w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                  <span className="font-heading text-2xl text-primary-foreground">{item.step}</span>
                </div>
                <h3 className="font-heading text-xl mb-3 mt-4 text-foreground">{item.title}</h3>
                <p className="font-paragraph text-foreground/70">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="p-16 rounded-3xl text-center"
            style={{
              background: 'linear-gradient(135deg, rgba(216, 255, 145, 0.1), rgba(255, 211, 158, 0.1))',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <motion.h2
              className="font-heading text-4xl lg:text-5xl mb-6 text-foreground"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Start Your Journey to Certification
            </motion.h2>
            <motion.p
              className="font-paragraph text-xl text-foreground/80 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Join VR Robotics Academy and earn certificates that showcase your skills!
            </motion.p>
            <motion.button
              className="bg-primary text-primary-foreground font-heading font-semibold px-8 py-4 rounded-[10px]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBookDemoPayment}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Book Demo
            </motion.button>
          </div>
        </div>
      </section>
      </div>
    <Footer />
    </>
  );
}
