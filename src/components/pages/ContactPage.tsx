import { motion } from 'framer-motion';
import { Mail, Phone, Clock } from 'lucide-react';
import { useState } from 'react';
import { messageService } from '@/services/messageService';
import { notificationService } from '@/components/NotificationBar';
import Header from '@/components/Header';
import BookDemoPopup from '@/components/BookDemoPopup';
import Footer from '@/components/Footer';
import RazorpayService from '@/services/razorpayService';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      notificationService.show('Please fill in all required fields', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      await messageService.sendMessage(
        formData.message,
        `Contact Form: ${formData.name}`,
        formData.name,
        formData.email,
        'contact'
      );
      
      notificationService.show('Message sent successfully! We\'ll get back to you soon.', 'success');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error('Failed to send message:', error);
      notificationService.show('Failed to send message. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <BookDemoPopup />
      <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      {/* Circuit Background */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(90deg, rgba(255, 140, 66, 0.1) 1px, transparent 1px),
            linear-gradient(rgba(255, 140, 66, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            className="font-heading text-5xl sm:text-6xl lg:text-7xl mb-8 text-primary"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Get in Touch
          </motion.h1>
          <motion.p
            className="font-paragraph text-lg sm:text-xl lg:text-2xl text-foreground/90 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Have questions? We're here to help you start your robotics journey!
          </motion.p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="relative py-16 px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
            {[
              {
                icon: Mail,
                title: 'Email Us',
                info: 'info@vrroboticsacademy.com',
                subinfo: 'support@vrroboticsacademy.com'
              },
              {
                icon: Phone,
                title: 'Call Us',
                info: '+91 7483430092',
                subinfo: 'Mon-Sat, 9AM-6PM'
              },
              {
                icon: Clock,
                title: 'Office Hours',
                info: '24/7',
                subinfo: 'Always Available'
              }
            ].map((contact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 sm:p-8 rounded-2xl text-center"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <div className="inline-flex p-4 rounded-xl mb-4 bg-primary/10">
                  <contact.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-heading text-xl mb-3 text-foreground">{contact.title}</h3>
                <p className="font-paragraph text-foreground/90 mb-1">{contact.info}</p>
                <p className="font-paragraph text-sm text-foreground/60">{contact.subinfo}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="relative py-16 px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 sm:p-10 rounded-3xl"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 140, 66, 0.2)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <h2 className="font-heading text-2xl sm:text-3xl mb-8 text-foreground">Send Us a Message</h2>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="font-paragraph text-foreground/80 mb-2 block">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-background/50 border border-foreground/20 text-foreground font-paragraph focus:outline-none focus:border-primary"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div>
                  <label className="font-paragraph text-foreground/80 mb-2 block">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-background/50 border border-foreground/20 text-foreground font-paragraph focus:outline-none focus:border-primary"
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div>
                  <label className="font-paragraph text-foreground/80 mb-2 block">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-background/50 border border-foreground/20 text-foreground font-paragraph focus:outline-none focus:border-primary"
                    placeholder="+91 7483430092"
                  />
                </div>
                <div>
                  <label className="font-paragraph text-foreground/80 mb-2 block">Message</label>
                  <textarea
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-background/50 border border-foreground/20 text-foreground font-paragraph focus:outline-none focus:border-primary resize-none"
                    placeholder="Tell us how we can help..."
                    required
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-primary-foreground font-heading font-semibold px-8 py-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </motion.button>
              </form>
            </motion.div>

            {/* Info Section */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="font-heading text-2xl sm:text-3xl mb-6 text-foreground">Why Contact Us?</h2>
                <div className="space-y-6">
                  {[
                    {
                      title: 'Schedule a Demo',
                      description: 'Experience our program firsthand with a complimentary demo session'
                    },
                    {
                      title: 'Ask Questions',
                      description: 'Get answers about curriculum, pricing, schedules, and more'
                    },
                    {
                      title: 'Discuss Custom Programs',
                      description: 'Explore tailored learning paths for your child\'s specific interests'
                    },
                    {
                      title: 'School Partnerships',
                      description: 'Learn about our programs for schools and educational institutions'
                    }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="p-6 rounded-2xl"
                      style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(10px)'
                      }}
                    >
                      <h3 className="font-heading text-lg sm:text-xl mb-2 text-secondary">{item.title}</h3>
                      <p className="font-paragraph text-foreground/70">{item.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20"
                style={{
                  border: '1px solid rgba(255, 140, 66, 0.2)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <h3 className="font-heading text-xl sm:text-2xl mb-4 text-foreground">Quick Response</h3>
                <p className="font-paragraph text-foreground/80 mb-4">
                  We typically respond to all inquiries within 24 hours during business days.
                </p>
                <motion.button
                  className="bg-secondary text-secondary-foreground font-heading font-semibold px-6 py-3 rounded-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleBookDemoPayment}
                >
                  Book Demo Instead
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
      </div>
    </>
  );
}
