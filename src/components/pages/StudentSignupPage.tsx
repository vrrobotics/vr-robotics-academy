import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BaseCrudService } from '@/integrations';
import { StudentApprovals } from '@/entities';
import { EmailService } from '@/services/emailService';
import Footer from '@/components/Footer';
import { Lock } from 'lucide-react';
import Header from '@/components/Header';

// Extended interface to include password field for student approvals
interface StudentApprovalWithPassword extends StudentApprovals {
  password?: string;
}

export default function StudentSignupPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    age: '',
    gender: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGenderChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      gender: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Validate form
      if (!formData.fullName || !formData.email || !formData.phoneNumber || !formData.age || !formData.gender || !formData.password || !formData.confirmPassword) {
        setError('Please fill in all fields');
        setIsLoading(false);
        return;
      }

      // Validate passwords match
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        setIsLoading(false);
        return;
      }

      // Validate password length
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters');
        setIsLoading(false);
        return;
      }

      // Create student approval request
      const studentApprovalData: StudentApprovalWithPassword = {
        _id: crypto.randomUUID(),
        fullName: formData.fullName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        age: parseInt(formData.age),
        gender: formData.gender,
        password: formData.password,
        submissionDate: new Date(),
        status: 'pending',
      };

      console.log('[StudentSignup] Creating student approval request...');
      await BaseCrudService.create('studentapprovals', studentApprovalData);
      console.log('[StudentSignup] ✓ Student signup created successfully');

      // ✅ Send email notification to admin with student information
      console.log('[StudentSignup] Sending email notification to admin...');
      const emailResult = await EmailService.sendStudentRegistrationEmail({
        fullName: formData.fullName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        age: parseInt(formData.age),
        gender: formData.gender
      });

      if (emailResult.success) {
        console.log('[StudentSignup] ✓ Email notification sent successfully');
      } else {
        console.warn('[StudentSignup] ⚠ Email notification failed:', emailResult.error);
      }

      // Redirect to pricing page
      navigate('/program-fees');
    } catch (err) {
      console.error('Error submitting student signup:', err);
      setError('Failed to submit signup. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-20 pb-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl sm:text-5xl font-heading font-bold text-white">
              Join Our Learning Community
            </h1>
            <p className="text-lg font-paragraph text-gray-300">
              Sign up to start your VR robotics learning journey
            </p>
          </div>

          {/* Form Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-slate-800/50 backdrop-blur-sm border border-orange-500/20 rounded-2xl p-8 shadow-2xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-500/10 border border-red-500/30 rounded-lg p-4"
                >
                  <p className="text-red-400 font-paragraph">{error}</p>
                </motion.div>
              )}

              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-white font-paragraph">
                  Full Name *
                </Label>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="bg-slate-700/50 border-orange-500/30 text-white placeholder:text-gray-400 focus:border-orange-500"
                  required
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white font-paragraph">
                  Email Address *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="bg-slate-700/50 border-orange-500/30 text-white placeholder:text-gray-400 focus:border-orange-500"
                  required
                />
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <Label htmlFor="phoneNumber" className="text-white font-paragraph">
                  Phone Number *
                </Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="bg-slate-700/50 border-orange-500/30 text-white placeholder:text-gray-400 focus:border-orange-500"
                  required
                />
              </div>

              {/* Age */}
              <div className="space-y-2">
                <Label htmlFor="age" className="text-white font-paragraph">
                  Age *
                </Label>
                <Input
                  id="age"
                  name="age"
                  type="number"
                  placeholder="Enter your age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="bg-slate-700/50 border-orange-500/30 text-white placeholder:text-gray-400 focus:border-orange-500"
                  min="5"
                  max="120"
                  required
                />
              </div>

              {/* Gender */}
              <div className="space-y-2">
                <Label htmlFor="gender" className="text-white font-paragraph">
                  Gender *
                </Label>
                <Select value={formData.gender} onValueChange={handleGenderChange}>
                  <SelectTrigger className="bg-slate-700/50 border-orange-500/30 text-white">
                    <SelectValue placeholder="Select your gender" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-orange-500/30">
                    <SelectItem value="male" className="text-white">Male</SelectItem>
                    <SelectItem value="female" className="text-white">Female</SelectItem>
                    <SelectItem value="other" className="text-white">Other</SelectItem>
                    <SelectItem value="prefer-not-to-say" className="text-white">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white font-paragraph">
                  Password *
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 w-5 h-5 text-orange-500/50" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter a secure password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="bg-slate-700/50 border-orange-500/30 text-white placeholder:text-gray-400 focus:border-orange-500 pl-10"
                    required
                  />
                </div>
                <p className="text-xs text-gray-400 font-paragraph">Minimum 6 characters</p>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-white font-paragraph">
                  Confirm Password *
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 w-5 h-5 text-orange-500/50" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="bg-slate-700/50 border-orange-500/30 text-white placeholder:text-gray-400 focus:border-orange-500 pl-10"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 rounded-lg transition-all duration-300"
                >
                  {isLoading ? 'Submitting...' : 'Enroll Now'}
                </Button>
              </motion.div>

            </form>
          </motion.div>

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-slate-800/30 border border-orange-500/10 rounded-xl p-6 space-y-4"
          >
            <h3 className="text-lg font-heading font-semibold text-white">What happens next?</h3>
            <ul className="space-y-3 text-gray-300 font-paragraph">
              <li className="flex items-start gap-3">
                <span className="text-orange-500 font-bold">1.</span>
                <span>Submit your signup form and choose a course plan</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-500 font-bold">2.</span>
                <span>Our admin team will review your application</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-500 font-bold">3.</span>
                <span>Once approved, you'll receive login credentials</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-500 font-bold">4.</span>
                <span>Access your personal dashboard and start learning!</span>
              </li>
            </ul>
          </motion.div>
        </motion.div>
      </div>
      <Footer />
      </div>
    </>
  );
}
