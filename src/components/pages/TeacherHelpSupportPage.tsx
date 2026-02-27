import { useState } from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, MessageSquare, Phone, Mail, ChevronDown } from 'lucide-react';
import TeacherPortalLayout from './TeacherPortalLayout';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export default function TeacherHelpSupportPage() {
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const faqs: FAQItem[] = [
    {
      id: '1',
      question: 'How do I update my profile information?',
      answer: 'You can update your profile information by going to the "My Profile" section. Click the "Edit Profile" button and make the necessary changes. Remember to save your changes.'
    },
    {
      id: '2',
      question: 'How can I schedule a demo class?',
      answer: 'Navigate to the "Demo Management" section and click "Schedule New Demo". Fill in the required details such as date, time, and number of students. Your demo will be scheduled accordingly.'
    },
    {
      id: '3',
      question: 'What is the process for requesting leave?',
      answer: 'Go to "Leave Management" and click "Request New Leave". Select the type of leave, dates, and provide a reason. Your request will be reviewed and you\'ll receive a notification once it\'s approved or rejected.'
    },
    {
      id: '4',
      question: 'How do I view my payout history?',
      answer: 'Visit the "Payout" section to view your complete payout history. You can see all completed payouts, pending amounts, and download invoices for completed transactions.'
    },
    {
      id: '5',
      question: 'How can I access my training courses?',
      answer: 'Go to "My Training" to see all available courses. You can enroll in new courses, continue in-progress courses, or download certificates for completed courses.'
    },
    {
      id: '6',
      question: 'What should I do if I forget my password?',
      answer: 'Click on "Forgot Password" on the login page. Enter your email address and you\'ll receive instructions to reset your password. Follow the link in the email to create a new password.'
    }
  ];

  return (
    <TeacherPortalLayout pageTitle="Help & Support">
      <div className="space-y-6">
        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-xl bg-gradient-to-br from-foreground/5 to-foreground/10 border border-foreground/10 hover:border-primary/40 transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-center gap-3 mb-4">
              <Mail className="w-6 h-6 text-primary" />
              <h4 className="font-heading text-lg text-foreground">Email Support</h4>
            </div>
            <p className="font-paragraph text-foreground/70 mb-4">
              Send us an email and we'll respond within 24 hours
            </p>
            <p className="font-paragraph text-primary font-medium">support@example.com</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-6 rounded-xl bg-gradient-to-br from-foreground/5 to-foreground/10 border border-foreground/10 hover:border-primary/40 transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-center gap-3 mb-4">
              <Phone className="w-6 h-6 text-primary" />
              <h4 className="font-heading text-lg text-foreground">Phone Support</h4>
            </div>
            <p className="font-paragraph text-foreground/70 mb-4">
              Call us during business hours (9 AM - 6 PM)
            </p>
            <p className="font-paragraph text-primary font-medium">+91 7483430092</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-6 rounded-xl bg-gradient-to-br from-foreground/5 to-foreground/10 border border-foreground/10 hover:border-primary/40 transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-center gap-3 mb-4">
              <MessageSquare className="w-6 h-6 text-primary" />
              <h4 className="font-heading text-lg text-foreground">Live Chat</h4>
            </div>
            <p className="font-paragraph text-foreground/70 mb-4">
              Chat with our support team in real-time
            </p>
            <p className="font-paragraph text-primary font-medium">Available 24/7</p>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-3 mb-6">
            <HelpCircle className="w-6 h-6 text-primary" />
            <h3 className="font-heading text-2xl text-foreground">Frequently Asked Questions</h3>
          </div>

          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.05 }}
              className="rounded-xl bg-gradient-to-br from-foreground/5 to-foreground/10 border border-foreground/10 overflow-hidden"
            >
              <button
                onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                className="w-full p-6 flex items-center justify-between hover:bg-foreground/5 transition-all duration-300"
              >
                <p className="font-heading text-lg text-foreground text-left">{faq.question}</p>
                <motion.div
                  animate={{ rotate: expandedFAQ === faq.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 text-primary" />
                </motion.div>
              </button>

              {expandedFAQ === faq.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-6 pb-6 border-t border-foreground/10"
                >
                  <p className="font-paragraph text-foreground/70">{faq.answer}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Submit Ticket */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="p-8 rounded-xl bg-gradient-to-br from-foreground/5 to-foreground/10 border border-foreground/10"
        >
          <h3 className="font-heading text-2xl text-foreground mb-6">Didn't find what you're looking for?</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block font-paragraph text-sm text-foreground/70 mb-2">
                Subject
              </label>
              <input
                type="text"
                placeholder="Describe your issue"
                className="w-full px-4 py-2 rounded-lg bg-foreground/10 border border-foreground/20 text-foreground placeholder-foreground/40 focus:outline-none focus:border-primary/40 transition-all duration-300 font-paragraph"
              />
            </div>

            <div>
              <label className="block font-paragraph text-sm text-foreground/70 mb-2">
                Message
              </label>
              <textarea
                placeholder="Tell us more about your issue..."
                rows={5}
                className="w-full px-4 py-2 rounded-lg bg-foreground/10 border border-foreground/20 text-foreground placeholder-foreground/40 focus:outline-none focus:border-primary/40 transition-all duration-300 font-paragraph resize-none"
              />
            </div>

            <button className="w-full px-6 py-3 rounded-lg bg-primary/20 border border-primary/40 text-primary hover:bg-primary/30 transition-all duration-300 font-paragraph font-medium">
              Submit Support Ticket
            </button>
          </div>
        </motion.div>
      </div>
    </TeacherPortalLayout>
  );
}
