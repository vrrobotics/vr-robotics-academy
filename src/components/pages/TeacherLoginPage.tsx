import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BaseCrudService } from '@/integrations';
import { TeacherApprovals } from '@/entities';
import { useAuthStore } from '@/stores/authStore';
import { useRoleStore } from '@/stores/roleStore';
import { Lock, Mail, BookOpen, AlertCircle, CheckCircle, Loader } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TeacherLoginPage() {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const { setRole, setUserId } = useRoleStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setIsLoading(true);

    try {
      // Validate form
      if (!formData.email || !formData.password) {
        setError('Please fill in all fields');
        setIsLoading(false);
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setError('Please enter a valid email address');
        setIsLoading(false);
        return;
      }

      console.log('[TeacherLoginPage] Attempting login for:', formData.email);

      // Fetch all teacher approvals
      const { items } = await BaseCrudService.getAll<TeacherApprovals>('teacherapprovals');
      
      // Find teacher with matching email and password
      const teacher = items?.find(
        (t: TeacherApprovals) => 
          t.teacherEmail === formData.email && 
          (t as any).password === formData.password &&
          t.approvalStatus === 'approved'
      );

      if (!teacher) {
        setError('Invalid email or password, or your account has not been approved yet');
        setIsLoading(false);
        return;
      }

      console.log('[TeacherLoginPage] ✓ Login successful for:', teacher.teacherFullName);

      setSuccessMessage(`✓ Welcome back, ${teacher.teacherFullName}! Redirecting to dashboard...`);
      
      // Store teacher info in auth store for app-wide access
      login({
        id: teacher._id || '',
        email: teacher.teacherEmail || '',
        fullName: teacher.teacherFullName || '',
        role: 'teacher',
        phoneNumber: teacher.teacherPhoneNumber,
      });

      // ✅ FIXED: Also initialize role store for RoleProtectedRoute
      setRole('teacher');
      setUserId(teacher._id || '');
      console.log('[TeacherLoginPage] ✓ Role store initialized for teacher:', teacher._id);

      // Also store in localStorage for session persistence
      localStorage.setItem('teacherSession', JSON.stringify({
        id: teacher._id,
        email: teacher.teacherEmail,
        name: teacher.teacherFullName,
        loginTime: new Date().toISOString(),
      }));

      // Redirect after 2 seconds
      setTimeout(() => {
        navigate('/teacher-dashboard');
      }, 2000);
    } catch (err) {
      console.error('Error during login:', err);
      setError('Failed to login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-20 pb-12">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 md:p-12"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full mb-4"
            >
              <BookOpen className="w-8 h-8 text-primary" />
            </motion.div>
            <h1 className="font-heading text-3xl font-bold text-white mb-2">
              Teacher Login
            </h1>
            <p className="font-paragraph text-slate-300">
              Access your teaching dashboard
            </p>
          </div>

          {/* Success Message */}
          {successMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-sm flex items-center gap-2"
            >
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
              {successMessage}
            </motion.div>
          )}

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm flex items-center gap-2"
            >
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              {error}
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Label htmlFor="email" className="text-white font-paragraph font-semibold mb-2 block">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-primary" />
                  Email Address
                </div>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-primary focus:ring-primary"
                required
              />
            </motion.div>

            {/* Password */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
            >
              <Label htmlFor="password" className="text-white font-paragraph font-semibold mb-2 block">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-primary" />
                  Password
                </div>
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-primary focus:ring-primary"
                required
              />
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="pt-4"
            >
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary hover:bg-primary/90 text-white font-heading font-semibold py-3 rounded-lg transition-all duration-200 neon-glow-primary flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  'Login to Dashboard'
                )}
              </Button>
            </motion.div>

            {/* Signup Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="text-center pt-4"
            >
              <p className="font-paragraph text-slate-400">
                Don't have an account?{' '}
                <a href="/teacher-signup" className="text-primary hover:text-primary/80 font-semibold transition-colors">
                  Sign up here
                </a>
              </p>
            </motion.div>
          </form>

          {/* Info Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 p-4 rounded-lg bg-slate-700/30 border border-slate-600/50"
          >
            <p className="font-paragraph text-xs text-slate-300">
              <span className="font-semibold text-primary">Note:</span> Your account must be approved by an administrator before you can login. Check your email for approval status.
            </p>
          </motion.div>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {[
            { title: 'Manage Classes', description: 'Create and manage your teaching classes' },
            { title: 'Track Progress', description: 'Monitor student progress and performance' },
          ].map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="bg-slate-800/30 border border-slate-700 rounded-lg p-6 text-center"
            >
              <h3 className="font-heading text-lg font-semibold text-white mb-2">{benefit.title}</h3>
              <p className="font-paragraph text-slate-400 text-sm">{benefit.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
      </div>
    <Footer />
    </>
  );
}
