import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BaseCrudService } from '@/integrations';
import { TeacherApprovals } from '@/entities';
import { Lock, Mail, Phone, User, BookOpen, Upload, X, FileText, AlertCircle, CheckCircle } from 'lucide-react';

interface DocumentFile {
  name: string;
  content: string; // base64 encoded content
  type: string;
  size: number;
}

// Extended interface to include password field for teacher approvals
interface TeacherApprovalWithPassword extends TeacherApprovals {
  password?: string;
  submittedDocuments?: string; // JSON stringified array of DocumentFile objects
}

export default function TeacherSignupPage() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [uploadError, setUploadError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [uploadedDocuments, setUploadedDocuments] = useState<DocumentFile[]>([]);
  const [formData, setFormData] = useState({
    teacherFullName: '',
    teacherEmail: '',
    teacherPhoneNumber: '',
    experience: '',
    qualifications: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleExperienceChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      experience: value
    }));
  };

  const handleDocumentUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    setUploadError('');
    // Account for base64 encoding overhead (~33% increase)
    // To support 2MB files after encoding, limit to 1.5MB before encoding
    const maxFileSize = 1.5 * 1024 * 1024; // 1.5MB max file size (becomes ~2MB when base64 encoded)
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (file.size > maxFileSize) {
        setUploadError(`File "${file.name}" is too large. Maximum size is 1.5MB.`);
        continue;
      }

      if (!allowedTypes.includes(file.type)) {
        setUploadError(`File "${file.name}" has an unsupported format. Please upload PDF, JPG, PNG, or DOC files.`);
        continue;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        const base64Content = content.split(',')[1];

        setUploadedDocuments(prev => [...prev, {
          name: file.name,
          content: base64Content,
          type: file.type,
          size: file.size,
        }]);

        console.log('[TeacherSignupPage] ✓ Document uploaded:', file.name);
      };

      reader.onerror = () => {
        setUploadError(`Failed to read file "${file.name}"`);
      };

      reader.readAsDataURL(file);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeDocument = (index: number) => {
    setUploadedDocuments(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('Coming soon!!!!');
    setSuccessMessage('');
    setIsLoading(false);
    return;

    try {
      // Validate form
      if (!formData.teacherFullName || !formData.teacherEmail || !formData.teacherPhoneNumber || !formData.experience || !formData.qualifications || !formData.password || !formData.confirmPassword) {
        setError('Please fill in all fields');
        setIsLoading(false);
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.teacherEmail)) {
        setError('Please enter a valid email address');
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

      // Validate at least one document is uploaded
      if (uploadedDocuments.length === 0) {
        setError('Please upload at least one certificate or document');
        setIsLoading(false);
        return;
      }

      // Create teacher approval request with documents
      const teacherApprovalData: TeacherApprovalWithPassword = {
        _id: crypto.randomUUID(),
        teacherFullName: formData.teacherFullName,
        teacherEmail: formData.teacherEmail,
        teacherPhoneNumber: formData.teacherPhoneNumber,
        password: formData.password,
        submissionDate: new Date(),
        approvalStatus: 'pending',
        submittedDocumentNames: JSON.stringify(uploadedDocuments.map(doc => doc.name)),
        submittedDocuments: JSON.stringify(uploadedDocuments),
      };

      console.log('[TeacherSignupPage] Creating teacher approval record with', uploadedDocuments.length, 'documents');
      
      await BaseCrudService.create('teacherapprovals', teacherApprovalData);

      console.log('[TeacherSignupPage] ✓ Teacher approval record created successfully');

      setSuccessMessage('✓ Your application has been submitted successfully! You will receive an email once the admin reviews your application.');
      
      // Reset form
      setFormData({
        teacherFullName: '',
        teacherEmail: '',
        teacherPhoneNumber: '',
        experience: '',
        qualifications: '',
        password: '',
        confirmPassword: '',
      });
      setUploadedDocuments([]);

      // Redirect after 3 seconds
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (err) {
      console.error('Error submitting teacher signup:', err);
      setError('Failed to submit signup. Please try again.');
    } finally {
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
            <h1 className="font-heading text-4xl font-bold text-white mb-2">
              Join Our Teaching Team
            </h1>
            <p className="font-paragraph text-slate-300">
              Share your expertise and inspire the next generation of robotics innovators
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
            {/* Full Name */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Label htmlFor="teacherFullName" className="text-white font-paragraph font-semibold mb-2 block">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-primary" />
                  Full Name
                </div>
              </Label>
              <Input
                id="teacherFullName"
                name="teacherFullName"
                type="text"
                placeholder="Enter your full name"
                value={formData.teacherFullName}
                onChange={handleInputChange}
                className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-primary focus:ring-primary"
                required
              />
            </motion.div>

            {/* Email */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
            >
              <Label htmlFor="teacherEmail" className="text-white font-paragraph font-semibold mb-2 block">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-primary" />
                  Email Address
                </div>
              </Label>
              <Input
                id="teacherEmail"
                name="teacherEmail"
                type="email"
                placeholder="Enter your email"
                value={formData.teacherEmail}
                onChange={handleInputChange}
                className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-primary focus:ring-primary"
                required
              />
            </motion.div>

            {/* Phone Number */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Label htmlFor="teacherPhoneNumber" className="text-white font-paragraph font-semibold mb-2 block">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-primary" />
                  Phone Number
                </div>
              </Label>
              <Input
                id="teacherPhoneNumber"
                name="teacherPhoneNumber"
                type="tel"
                placeholder="Enter your phone number"
                value={formData.teacherPhoneNumber}
                onChange={handleInputChange}
                className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-primary focus:ring-primary"
                required
              />
            </motion.div>

            {/* Experience Level */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 }}
            >
              <Label htmlFor="experience" className="text-white font-paragraph font-semibold mb-2 block">
                Teaching Experience
              </Label>
              <Select value={formData.experience} onValueChange={handleExperienceChange}>
                <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                  <SelectValue placeholder="Select your experience level" />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  <SelectItem value="beginner">Beginner (0-2 years)</SelectItem>
                  <SelectItem value="intermediate">Intermediate (2-5 years)</SelectItem>
                  <SelectItem value="experienced">Experienced (5+ years)</SelectItem>
                </SelectContent>
              </Select>
            </motion.div>

            {/* Qualifications */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Label htmlFor="qualifications" className="text-white font-paragraph font-semibold mb-2 block">
                Qualifications & Expertise
              </Label>
              <textarea
                id="qualifications"
                name="qualifications"
                placeholder="Tell us about your qualifications and areas of expertise"
                value={formData.qualifications}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 rounded-lg focus:border-primary focus:ring-primary focus:outline-none resize-none"
                required
              />
            </motion.div>

            {/* Document Upload Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 }}
              className="p-6 rounded-lg border-2 border-dashed border-primary/30 bg-primary/5"
            >
              <h3 className="font-heading text-sm text-white mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Upload Certificates & Documents
              </h3>
              <p className="font-paragraph text-xs text-slate-300 mb-4">
                Please upload your certificates and profile documents for verification. Accepted formats: PDF, JPG, PNG, DOC (Max 1.5MB each)
              </p>

              {uploadError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 font-paragraph text-xs flex items-center gap-2"
                >
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {uploadError}
                </motion.div>
              )}

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isLoading}
                className="w-full mb-4 px-4 py-3 rounded-lg bg-primary/20 border border-primary/40 text-primary hover:bg-primary/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-paragraph text-sm flex items-center justify-center gap-2"
              >
                <Upload className="w-4 h-4" />
                {isLoading ? 'Processing...' : 'Choose Files'}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                onChange={handleDocumentUpload}
                className="hidden"
                aria-label="Upload documents"
              />

              {uploadedDocuments.length > 0 && (
                <div className="space-y-2">
                  <p className="font-paragraph text-xs text-slate-300 font-semibold">
                    Uploaded Documents ({uploadedDocuments.length}):
                  </p>
                  {uploadedDocuments.map((doc, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center justify-between p-3 rounded-lg bg-slate-700/50 border border-slate-600"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <FileText className="w-4 h-4 text-primary flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="font-paragraph text-xs text-white truncate">{doc.name}</p>
                          <p className="font-paragraph text-xs text-slate-400">{(doc.size / 1024).toFixed(2)} KB</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeDocument(index)}
                        className="p-1 hover:bg-red-500/20 rounded transition-colors flex-shrink-0"
                        aria-label="Remove document"
                      >
                        <X className="w-4 h-4 text-red-400" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Password */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
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
                placeholder="Create a password (min. 6 characters)"
                value={formData.password}
                onChange={handleInputChange}
                className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-primary focus:ring-primary"
                required
              />
            </motion.div>

            {/* Confirm Password */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.45 }}
            >
              <Label htmlFor="confirmPassword" className="text-white font-paragraph font-semibold mb-2 block">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-primary" />
                  Confirm Password
                </div>
              </Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-primary focus:ring-primary"
                required
              />
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="pt-4"
            >
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary hover:bg-primary/90 text-white font-heading font-semibold py-3 rounded-lg transition-all duration-200 neon-glow-primary"
              >
                {isLoading ? 'Creating Account...' : 'Create Teacher Account'}
              </Button>
            </motion.div>

          </form>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            { title: 'Flexible Schedule', description: 'Teach at your own pace and schedule' },
            { title: 'Competitive Pay', description: 'Earn competitive compensation for your expertise' },
            { title: 'Growing Community', description: 'Join a community of passionate educators' },
          ].map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
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
