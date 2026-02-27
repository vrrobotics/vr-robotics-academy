import { motion } from 'framer-motion';
import { useState } from 'react';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function StudentApplicationPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    gender: '',
    phoneNumber: '',
    email: '',
    interests: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validate form data
      if (!formData.fullName || !formData.age || !formData.gender || !formData.phoneNumber || !formData.email || !formData.interests) {
        setError('Please fill in all fields');
        setLoading(false);
        return;
      }

      // Create application record using actual Supabase column names (lowercase)
      const applicationData = {
        _id: crypto.randomUUID(),
        fullname: formData.fullName,
        age: parseInt(formData.age, 10),
        gender: formData.gender,
        phonenumber: formData.phoneNumber,
        email: formData.email,
        interests: formData.interests,
        submissiondate: new Date().toISOString(),
        status: 'pending',
        approvaldate: null,
        approvedbyadmin: null,
        rejectionreason: null
      };

      const { error: insertError } = await supabase
        .from('studentapprovals')
        .insert([applicationData]);

      if (insertError) {
        setError(`Could not save. ${insertError.message}`);
        setLoading(false);
        return;
      }
      setSubmitted(true);
      setFormData({
        fullName: '',
        age: '',
        gender: '',
        phoneNumber: '',
        email: '',
        interests: ''
      });

      // Redirect after 3 seconds
      setTimeout(() => {
        window.location.href = '/admission-process';
      }, 3000);
    } catch (err) {
      console.error('Application submit failed:', err);
      setError('Something went wrong while saving. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <style>{`
        select option {
          background-color: #1a1a1a;
          color: #ffffff;
        }
        select option:checked {
          background-color: #ff6c00;
          color: #ffffff;
        }
      `}</style>
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

      {/* Back Button */}
      <div className="relative z-10 pt-8 px-8">
        <motion.button
          onClick={() => window.history.back()}
          className="inline-flex items-center gap-2 text-secondary hover:text-primary transition-colors"
          whileHover={{ x: -5 }}
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-heading font-semibold">Back</span>
        </motion.button>
      </div>

      {/* Hero Section */}
      <section className="relative py-16 px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            className="font-heading text-5xl lg:text-6xl mb-6 text-primary"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Student Application
          </motion.h1>
          <motion.p
            className="font-paragraph text-xl text-foreground/80 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Tell us about yourself and your interest in VR Robotics
          </motion.p>
        </div>
      </section>

      {/* Form Section */}
      <section className="relative py-16 px-8">
        <div className="max-w-2xl mx-auto">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-12 rounded-3xl text-center"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(216, 255, 145, 0.3)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="mb-6 flex justify-center"
              >
                <CheckCircle className="w-20 h-20 text-primary" />
              </motion.div>
              <h2 className="font-heading text-3xl mb-4 text-foreground">Application Submitted!</h2>
              <p className="font-paragraph text-lg text-foreground/80 mb-6">
                Thank you for applying to our VR Robotics Academy. We've received your application and will review it shortly. You'll receive an email confirmation at <span className="text-primary font-semibold">{formData.email}</span>.
              </p>
              <p className="font-paragraph text-foreground/70">
                Redirecting you back to the admission page...
              </p>
            </motion.div>
          ) : (
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-10 rounded-3xl"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(216, 255, 145, 0.2)',
                backdropFilter: 'blur(10px)'
              }}
            >
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 rounded-lg bg-red-500/20 border border-red-500/50 text-red-200"
                >
                  {error}
                </motion.div>
              )}

              <div className="space-y-6">
                {/* Full Name */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <label className="block font-heading text-lg mb-2 text-foreground">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your child's full name"
                    className="w-full px-4 py-3 rounded-lg bg-foreground/10 border border-foreground/20 text-foreground placeholder-foreground/50 focus:outline-none focus:border-primary transition-colors"
                    required
                  />
                </motion.div>

                {/* Age */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  <label className="block font-heading text-lg mb-2 text-foreground">
                    Age *
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="Enter age (8-16)"
                    min="8"
                    max="16"
                    className="w-full px-4 py-3 rounded-lg bg-foreground/10 border border-foreground/20 text-foreground placeholder-foreground/50 focus:outline-none focus:border-primary transition-colors"
                    required
                  />
                </motion.div>

                {/* Gender */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <label className="block font-heading text-lg mb-2 text-foreground">
                    Gender *
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-foreground/10 border border-foreground/20 text-foreground focus:outline-none focus:border-primary transition-colors"
                    required
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </motion.div>

                {/* Contact Number */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  <label className="block font-heading text-lg mb-2 text-foreground">
                    Contact Number *
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Enter contact number"
                    className="w-full px-4 py-3 rounded-lg bg-foreground/10 border border-foreground/20 text-foreground placeholder-foreground/50 focus:outline-none focus:border-primary transition-colors"
                    required
                  />
                </motion.div>

                {/* Email */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <label className="block font-heading text-lg mb-2 text-foreground">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email address"
                    className="w-full px-4 py-3 rounded-lg bg-foreground/10 border border-foreground/20 text-foreground placeholder-foreground/50 focus:outline-none focus:border-primary transition-colors"
                    required
                  />
                </motion.div>

                {/* Student Interests */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                >
                  <label className="block font-heading text-lg mb-2 text-foreground">
                    Student Interests *
                  </label>
                  <textarea
                    name="interests"
                    value={formData.interests}
                    onChange={handleChange}
                    placeholder="Tell us about your child's interests in robotics, technology, or what they hope to achieve..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-foreground/10 border border-foreground/20 text-foreground placeholder-foreground/50 focus:outline-none focus:border-primary transition-colors resize-none"
                    required
                  />
                </motion.div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-primary text-primary-foreground font-heading font-semibold py-4 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Applying...' : 'Apply Now'}
                </motion.button>

                <p className="text-center font-paragraph text-foreground/60 text-sm">
                  * All fields are required
                </p>
              </div>
            </motion.form>
          )}
        </div>
      </section>
      </div>
    <Footer />
    </>
  );
}
