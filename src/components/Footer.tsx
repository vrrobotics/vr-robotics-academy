import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, Phone, Facebook, Twitter, Instagram, Linkedin, Zap } from 'lucide-react';
import { Image } from '@/components/ui/image';

export default function Footer() {
  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Curriculum', path: '/curriculum' },
    { name: 'Certificates', path: '/certificates' }
  ];

  const resources = [
    { name: 'Why VR Robotics', path: '/why-vr-robotics' },
    { name: 'What Kids Learn', path: '/what-kids-learn' },
    { name: 'How We Build', path: '/how-kids-build' },
    { name: 'Admission Process', path: '/admission-process' }
  ];

  const support = [
    { name: 'Contact Us', path: '/contact' },
    { name: 'Book Demo', path: '/demo-booking' },
    { name: 'FAQ', path: '#' },
    { name: 'Support Center', path: '#' }
  ];

  const socialLinks = [
    { icon: Facebook, url: '#', label: 'Facebook' },
    { icon: Twitter, url: '#', label: 'Twitter' },
    { icon: Instagram, url: '#', label: 'Instagram' },
    { icon: Linkedin, url: '#', label: 'LinkedIn' }
  ];

  const footerLinks = [
    { name: 'Privacy Policy', path: '#' },
    { name: 'Terms of Service', path: '#' },
    { name: 'Cookie Policy', path: '#' }
  ];

  return (
    <footer className="relative bg-background mt-0 overflow-hidden w-full">
      {/* Animated background elements */}
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full mix-blend-multiply filter blur-3xl opacity-5"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div className="relative max-w-[100rem] mx-auto px-6 sm:px-8 md:px-12 py-16 sm:py-20 md:py-24">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Link to="/">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="mb-6 flex items-center"
              >
                <Image
                  src="https://res.cloudinary.com/dicfqwlfq/image/upload/v1764505259/VR_Robotics_Logo_upscaled_1_rrrrn8.png"
                  alt="VR Robotics Academy Logo"
                  width={140}
                  className="h-auto w-[140px] sm:w-[160px]"
                />
              </motion.div>
            </Link>
            <p className="font-paragraph text-sm text-foreground/70 mb-6 leading-relaxed">
              Empowering the next generation of innovators through robotics, coding, and VR education.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  aria-label={social.label}
                  className="p-2 rounded-lg bg-foreground/5 border border-foreground/10 hover:border-secondary/30"
                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 140, 66, 0.1)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-4 h-4 text-foreground/70" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="font-heading text-lg font-bold text-foreground mb-6 flex items-center gap-2">
              <Zap className="w-5 h-5 text-secondary" />
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="font-paragraph text-sm text-foreground/70 hover:text-secondary transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="font-heading text-lg font-bold text-foreground mb-6">Resources</h3>
            <ul className="space-y-3">
              {resources.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="font-paragraph text-sm text-foreground/70 hover:text-secondary transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="font-heading text-lg font-bold text-foreground mb-6">Support</h3>
            <ul className="space-y-3">
              {support.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="font-paragraph text-sm text-foreground/70 hover:text-secondary transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Contact Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 py-12 border-y border-foreground/10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex items-start gap-4"
          >
            <div className="p-3 rounded-lg bg-secondary/10 border border-secondary/20 mt-1">
              <Mail className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <p className="font-heading font-bold text-foreground mb-1">Email Us</p>
              <p className="font-paragraph text-sm text-foreground/70">info@vrroboticsacademy.com</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex items-start gap-4"
          >
            <div className="p-3 rounded-lg bg-secondary/10 border border-secondary/20 mt-1">
              <Phone className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <p className="font-heading font-bold text-foreground mb-1">Call Us</p>
              <a href="tel:+917483430092" className="font-paragraph text-sm text-foreground/70 hover:text-secondary transition-colors">
                +91 7483430092
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom Footer */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="font-paragraph text-xs sm:text-sm text-foreground/60">
            © {new Date().getFullYear()} VR Robotics Academy. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center md:justify-end gap-6">
            {footerLinks.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                className="font-paragraph text-xs sm:text-sm text-foreground/60 hover:text-secondary transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Made with love */}
        <motion.div
          className="text-center mt-8 pt-8 border-t border-foreground/10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="font-paragraph text-xs sm:text-sm text-foreground/60">
            Made with <span className="text-secondary">❤</span> by the VR Robotics Academy Team
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
