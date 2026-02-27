import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore, type UserRole } from '@/stores/authStore';
import { useRoleStore } from '@/stores/roleStore';
import Header from '@/components/Header';
import { Mail, Lock, User, AlertCircle, CheckCircle, Upload, X, FileText, Loader, Clock } from 'lucide-react';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Image } from '@/components/ui/image';
import Footer from '@/components/Footer';
import { teacherRegistrationService } from '@/services/teacherRegistrationService';
import { EmailService } from '@/services/emailService';
import { TeacherApprovalService } from '@/services/teacherApprovalService';
import { BaseCrudService } from '@/integrations';
import { StudentApprovals } from '@/entities';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Extended interface to include password field for student approvals
interface StudentApprovalWithPassword extends StudentApprovals {
  password?: string;
}

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const { setRole, setUserId } = useRoleStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [videoLoading, setVideoLoading] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const videoTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Signup state
  const [isSignupMode, setIsSignupMode] = useState(false);
  const [signupType, setSignupType] = useState<'teacher' | 'student'>('teacher');
  
  // Teacher signup state
  const [teacherSignupData, setTeacherSignupData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
  });
  
  // Student signup state
  const [studentSignupData, setStudentSignupData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    age: '',
    gender: '',
    password: '',
    confirmPassword: '',
  });
  
  const [signupError, setSignupError] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(false);

  // Document upload state (for teachers)
  const [uploadedDocuments, setUploadedDocuments] = useState<Array<{
    name: string;
    content: string;
    type: string;
    size: number;
  }>>([]);
  const [uploadError, setUploadError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showResultPopup, setShowResultPopup] = useState(false);
  const [isSubmittingDocuments, setIsSubmittingDocuments] = useState(false);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (videoTimeoutRef.current) {
        clearTimeout(videoTimeoutRef.current);
      }
    };
  }, []);

  // Handle video playback with fallback timeout
  const handleVideoPlay = () => {
    setVideoLoading(false);
    setVideoError(false);
    
    if (videoTimeoutRef.current) {
      clearTimeout(videoTimeoutRef.current);
    }
    videoTimeoutRef.current = setTimeout(() => {
      navigate('/student-dashboard-final');
    }, 15000);
  };

  const handleVideoEnded = () => {
    if (videoTimeoutRef.current) {
      clearTimeout(videoTimeoutRef.current);
    }
    navigate('/student-dashboard-final');
  };

  const handleVideoError = () => {
    setVideoError(true);
    setVideoLoading(false);
    if (videoTimeoutRef.current) {
      clearTimeout(videoTimeoutRef.current);
    }
    videoTimeoutRef.current = setTimeout(() => {
      navigate('/student-dashboard-final');
    }, 2000);
  };

  // ============================================================================
  // STUDENT SIGNUP HANDLER
  // ============================================================================
  const handleStudentSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignupError('');
    setIsLoading(true);

    try {
      if (!studentSignupData.fullName || !studentSignupData.email || !studentSignupData.phoneNumber || !studentSignupData.age || !studentSignupData.gender || !studentSignupData.password || !studentSignupData.confirmPassword) {
        setSignupError('Please fill in all fields');
        setIsLoading(false);
        return;
      }

      if (studentSignupData.password !== studentSignupData.confirmPassword) {
        setSignupError('Passwords do not match');
        setIsLoading(false);
        return;
      }

      if (studentSignupData.password.length < 6) {
        setSignupError('Password must be at least 6 characters');
        setIsLoading(false);
        return;
      }

      const studentApprovalData: StudentApprovalWithPassword = {
        _id: crypto.randomUUID(),
        fullName: studentSignupData.fullName,
        email: studentSignupData.email,
        phoneNumber: studentSignupData.phoneNumber,
        age: parseInt(studentSignupData.age),
        gender: studentSignupData.gender,
        password: studentSignupData.password,
        submissionDate: new Date(),
        status: 'pending',
      };

      await BaseCrudService.create('studentapprovals', studentApprovalData);

      setSignupSuccess(true);
      setIsLoading(false);
      setShowResultPopup(true);

      setTimeout(() => {
        setIsSignupMode(false);
        setSignupType('teacher');
        setEmail('');
        setPassword('');
        setStudentSignupData({ fullName: '', email: '', phoneNumber: '', age: '', gender: '', password: '', confirmPassword: '' });
        setSignupSuccess(false);
        setShowResultPopup(false);
      }, 5000);
    } catch (err: any) {
      setSignupError(err.message || 'Failed to submit signup. Please try again.');
      setIsLoading(false);
    }
  };

  // ============================================================================
  // TEACHER SIGNUP HANDLER
  // ============================================================================
  const handleTeacherSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignupError('');
    setIsLoading(true);

    if (!teacherSignupData.fullName || !teacherSignupData.email || !teacherSignupData.password || !teacherSignupData.confirmPassword) {
      setSignupError('Please fill in all required fields');
      setIsLoading(false);
      return;
    }

    if (teacherSignupData.password !== teacherSignupData.confirmPassword) {
      setSignupError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (teacherSignupData.password.length < 6) {
      setSignupError('Password must be at least 6 characters');
      setIsLoading(false);
      return;
    }

    if (uploadedDocuments.length === 0) {
      setSignupError('Please upload at least one document (certificate or profile document)');
      setIsLoading(false);
      return;
    }

    try {
      setIsSubmittingDocuments(true);
      console.log('[LoginPage] Creating approval record...');
      
      const documentNames = uploadedDocuments.map(doc => doc.name);
      await TeacherApprovalService.createApprovalRecord({
        email: teacherSignupData.email,
        fullName: teacherSignupData.fullName,
        phoneNumber: teacherSignupData.phoneNumber,
        documentNames,
        documents: uploadedDocuments,
      });

      console.log('[LoginPage] ✓ Approval record created');

      console.log('[LoginPage] Sending documents to admin email...');
      
      const emailResult = await EmailService.sendTeacherRegistrationEmail({
        fullName: teacherSignupData.fullName,
        email: teacherSignupData.email,
        phoneNumber: teacherSignupData.phoneNumber,
        documents: uploadedDocuments,
      });

      if (!emailResult.success) {
        throw new Error(emailResult.error || 'Failed to send documents');
      }

      console.log('[LoginPage] ✓ Documents sent to admin successfully');

      await EmailService.sendTeacherConfirmationEmail(teacherSignupData.email, teacherSignupData.fullName);

      const newTeacher = await teacherRegistrationService.registerTeacher({
        fullName: teacherSignupData.fullName,
        email: teacherSignupData.email,
        password: teacherSignupData.password,
        phoneNumber: teacherSignupData.phoneNumber,
      });

      console.log('[LoginPage] ✓ Teacher registered with pending approval status');

      setSignupSuccess(true);
      setIsSubmittingDocuments(false);
      setIsLoading(false);
      setShowResultPopup(true);

      setTimeout(() => {
        setIsSignupMode(false);
        setEmail('');
        setPassword('');
        setTeacherSignupData({ fullName: '', email: '', password: '', confirmPassword: '', phoneNumber: '' });
        setUploadedDocuments([]);
        setUploadError('');
        setSignupSuccess(false);
        setShowResultPopup(false);
      }, 5000);
    } catch (err: any) {
      setSignupError(err.message || 'Failed to register. Please try again.');
      setIsSubmittingDocuments(false);
      setIsLoading(false);
    }
  };

  // ============================================================================
  // TEACHER LOGIN HANDLER
  // ============================================================================
  const handleTeacherLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!email || !password) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    try {
      const isApproved = await TeacherApprovalService.isTeacherApproved(email);
      
      if (!isApproved) {
        setError('Your registration is pending admin approval. Please wait for approval before logging in. You will receive an email once approved.');
        setIsLoading(false);
        return;
      }

      const teacher = await teacherRegistrationService.loginTeacher({
        email,
        password,
      });

      login(teacher);
      setRole('teacher');
      setUserId(teacher.id);

      setIsLoading(false);
      navigate('/teacher-dashboard');
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
      setIsLoading(false);
    }
  };

  // ============================================================================
  // DOCUMENT UPLOAD HANDLER
  // ============================================================================
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

        console.log('[LoginPage] ✓ Document uploaded:', file.name);
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

  // ============================================================================
  // GENERIC LOGIN HANDLER (for students and admins)
  // ============================================================================
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!email || !password) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    // Admin credentials - only specific emails with their passwords
    const adminCredentials: Record<string, string> = {
      'abhinavneeraj.bade@gmail.com': '27Sep@2006',
      'md@vrroboticsacademy.com': 'hello',
      'admin1@example.com': 'password1',
      'admin2@example.com': 'password2',
      'admin3@example.com': 'password3',
      'admin4@example.com': 'password4',
    };

    const mockUsers: Record<UserRole, any> = {
      student: {
        id: 'student-001',
        email: 'student@example.com',
        fullName: 'Alex Johnson',
        role: 'student',
        batchId: 'BATCH-2024-001',
        profilePicture: 'https://static.wixstatic.com/media/39909b_89e3599a26764b688a340f83117f5bd0~mv2.png?originWidth=128&originHeight=128'
      },
      teacher: {
        id: 'teacher-001',
        email: 'teacher@example.com',
        fullName: 'Sarah Williams',
        role: 'teacher',
        batchId: 'BATCH-2024-001',
        profilePicture: 'https://static.wixstatic.com/media/39909b_5c1f0d8e195f42a5ae1dd411bee94719~mv2.png?originWidth=128&originHeight=128'
      },
      admin: {
        id: 'admin-001',
        email: email,
        fullName: 'Admin User',
        role: 'admin',
        profilePicture: 'https://static.wixstatic.com/media/39909b_04440d938e604c3ab39af70fd368b794~mv2.png?originWidth=128&originHeight=128'
      }
    };

    // Check if email is admin credential
    if (adminCredentials[email]) {
      // Handle admin login with credential validation
      if (adminCredentials[email] !== password) {
        setError('Invalid password. Access denied.');
        setIsLoading(false);
        return;
      }

      setTimeout(() => {
        login(mockUsers['admin']);
        setRole('admin');
        setUserId(mockUsers['admin'].id);
        setIsLoading(false);
        navigate('/admin-dashboard');
      }, 1000);
    } else {
      // Handle student login with password validation from database
      try {
        const { items: approvals } = await BaseCrudService.getAll<StudentApprovalWithPassword>('studentapprovals');
        
        // Find student by email and status
        const student = approvals.find(
          approval => approval.email === email && approval.status === 'approved'
        );

        if (!student) {
          setError('Student not found or not approved. Please check your email or contact support.');
          setIsLoading(false);
          return;
        }

        // Validate password
        if (student.password !== password) {
          setError('Invalid password. Please try again.');
          setIsLoading(false);
          return;
        }

        // Login successful
        const studentUser = {
          id: student._id,
          email: student.email,
          fullName: student.fullName,
          role: 'student' as const,
          batchId: '',
          profilePicture: 'https://static.wixstatic.com/media/39909b_89e3599a26764b688a340f83117f5bd0~mv2.png?originWidth=128&originHeight=128'
        };

        // Set role and user ID immediately, then show video
        login(studentUser);
        setRole('student');
        setUserId(student._id);
        setIsLoading(false);
        setShowVideo(true);
      } catch (err) {
        console.error('Error during login:', err);
        setError('Login failed. Please try again.');
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen overflow-x-hidden bg-background text-foreground flex items-center justify-center px-8">
      {/* Video Overlay */}
      {showVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 bg-black flex items-center justify-center"
        >
          {videoLoading && !videoError && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-10">
              <LoadingSpinner />
            </div>
          )}

          {videoError && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-10">
              <div className="text-center">
                <p className="text-white text-lg mb-4">Loading dashboard...</p>
                <LoadingSpinner />
              </div>
            </div>
          )}

          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay
            playsInline
            preload="auto"
            onCanPlay={handleVideoPlay}
            onEnded={handleVideoEnded}
            onError={handleVideoError}
            onLoadedData={() => setVideoLoading(false)}
          >
            <source src="https://res.cloudinary.com/dicfqwlfq/video/upload/v1764482526/hacker_wallpaper_video_download_-_on-line_1080p_h264_odwffk.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </motion.div>
      )}

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

      {/* Animated Background Shapes */}
      <motion.div
        className="absolute top-20 right-20 w-64 h-64 rounded-full bg-primary opacity-10 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-secondary opacity-10 blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
      />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            className="inline-flex mb-6"
            whileHover={{ scale: 1.08 }}
          >
            <Image
              src="https://res.cloudinary.com/dicfqwlfq/image/upload/v1764506603/logo_vc6lpc.png"
              alt="VR Robotics Academy Logo"
              width={120}
              className="h-auto"
            />
          </motion.div>
          <h1 className="font-heading text-4xl mb-2 text-foreground"
            style={{
              textShadow: '0 0 30px rgba(216, 255, 145, 0.4)'
            }}
          >
            VR Robotics Academy
          </h1>
          <p className="font-paragraph text-foreground/70">
            {isSignupMode ? 'Registration' : 'Multi-Role Learning Platform'}
          </p>
        </div>



        {/* ============================================================================ */}
        {/* SIGNUP MODE - ROLE SELECTION */}
        {/* ============================================================================ */}
        {isSignupMode && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 rounded-3xl mb-6"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(216, 255, 145, 0.2)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <h2 className="font-heading text-lg text-foreground mb-4 text-center">
              Choose Signup Type
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {(['teacher', 'student'] as const).map((type) => (
                <motion.button
                  key={type}
                  onClick={() => setSignupType(type)}
                  className={`p-3 rounded-lg font-heading text-sm capitalize transition-all ${
                    signupType === type
                      ? 'bg-primary text-primary-foreground border-2 border-primary'
                      : 'bg-foreground/5 text-foreground/70 border-2 border-foreground/20'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {type === 'teacher' ? 'Teacher' : 'Student'}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* ============================================================================ */}
        {/* STUDENT SIGNUP FORM */}
        {/* ============================================================================ */}
        {isSignupMode && signupType === 'student' && (
          <motion.form
            onSubmit={handleStudentSignup}
            className="p-8 rounded-3xl"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(216, 255, 145, 0.2)',
              backdropFilter: 'blur(10px)'
            }}
          >
            {signupSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 font-paragraph text-sm flex items-center gap-2"
              >
                <CheckCircle className="w-5 h-5" />
                Registration successful! Redirecting...
              </motion.div>
            )}

            {signupError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 font-paragraph text-sm flex items-center gap-2"
              >
                <AlertCircle className="w-5 h-5" />
                {signupError}
              </motion.div>
            )}

            {/* Full Name */}
            <div className="mb-6">
              <label className="font-paragraph text-foreground/80 mb-2 block text-sm">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-3.5 w-5 h-5 text-primary/50" />
                <input
                  type="text"
                  value={studentSignupData.fullName}
                  onChange={(e) => setStudentSignupData({ ...studentSignupData, fullName: e.target.value })}
                  placeholder="John Doe"
                  className="w-full pl-12 pr-4 py-3 rounded-lg bg-background/50 border border-foreground/20 text-foreground font-paragraph focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            {/* Email */}
            <div className="mb-6">
              <label className="font-paragraph text-foreground/80 mb-2 block text-sm">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 w-5 h-5 text-primary/50" />
                <input
                  type="email"
                  value={studentSignupData.email}
                  onChange={(e) => setStudentSignupData({ ...studentSignupData, email: e.target.value })}
                  placeholder="your@email.com"
                  className="w-full pl-12 pr-4 py-3 rounded-lg bg-background/50 border border-foreground/20 text-foreground font-paragraph focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div className="mb-6">
              <label className="font-paragraph text-foreground/80 mb-2 block text-sm">
                Phone Number
              </label>
              <input
                type="tel"
                value={studentSignupData.phoneNumber}
                onChange={(e) => setStudentSignupData({ ...studentSignupData, phoneNumber: e.target.value })}
                placeholder="+91 7483430092"
                className="w-full px-4 py-3 rounded-lg bg-background/50 border border-foreground/20 text-foreground font-paragraph focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            {/* Age */}
            <div className="mb-6">
              <label className="font-paragraph text-foreground/80 mb-2 block text-sm">
                Age
              </label>
              <input
                type="number"
                value={studentSignupData.age}
                onChange={(e) => setStudentSignupData({ ...studentSignupData, age: e.target.value })}
                placeholder="Enter your age"
                className="w-full px-4 py-3 rounded-lg bg-background/50 border border-foreground/20 text-foreground font-paragraph focus:outline-none focus:border-primary transition-colors"
                min="5"
                max="120"
              />
            </div>

            {/* Gender */}
            <div className="mb-6">
              <label className="font-paragraph text-foreground/80 mb-2 block text-sm">
                Gender
              </label>
              <Select value={studentSignupData.gender} onValueChange={(value) => setStudentSignupData({ ...studentSignupData, gender: value })}>
                <SelectTrigger className="bg-background/50 border-foreground/20 text-foreground">
                  <SelectValue placeholder="Select your gender" />
                </SelectTrigger>
                <SelectContent className="bg-background border-foreground/20">
                  <SelectItem value="male" className="text-foreground">Male</SelectItem>
                  <SelectItem value="female" className="text-foreground">Female</SelectItem>
                  <SelectItem value="other" className="text-foreground">Other</SelectItem>
                  <SelectItem value="prefer-not-to-say" className="text-foreground">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Password Field */}
            <div className="mb-6">
              <label className="font-paragraph text-foreground/80 mb-2 block text-sm">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 w-5 h-5 text-primary/50" />
                <input
                  type="password"
                  value={studentSignupData.password}
                  onChange={(e) => setStudentSignupData({ ...studentSignupData, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3 rounded-lg bg-background/50 border border-foreground/20 text-foreground font-paragraph focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <p className="text-xs text-foreground/60 mt-2 font-paragraph">Minimum 6 characters</p>
            </div>

            {/* Confirm Password Field */}
            <div className="mb-8">
              <label className="font-paragraph text-foreground/80 mb-2 block text-sm">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 w-5 h-5 text-primary/50" />
                <input
                  type="password"
                  value={studentSignupData.confirmPassword}
                  onChange={(e) => setStudentSignupData({ ...studentSignupData, confirmPassword: e.target.value })}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3 rounded-lg bg-background/50 border border-foreground/20 text-foreground font-paragraph focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading || signupSuccess}
              className="w-full bg-primary text-primary-foreground font-heading font-semibold py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed mb-4"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                boxShadow: '0 0 20px rgba(216, 255, 145, 0.3)'
              }}
            >
              {isLoading ? 'Submitting...' : 'Enroll Now'}
            </motion.button>

            {/* Back Button */}
            <div className="text-center">
              <motion.button
                type="button"
                onClick={() => {
                  setIsSignupMode(false);
                  setSignupError('');
                  setSignupSuccess(false);
                  setStudentSignupData({ fullName: '', email: '', phoneNumber: '', age: '', gender: '', password: '', confirmPassword: '' });
                }}
                className="font-heading text-primary hover:text-secondary transition-colors text-sm"
                whileHover={{ x: 4 }}
              >
                Back to Login →
              </motion.button>
            </div>
          </motion.form>
        )}

        {/* ============================================================================ */}
        {/* TEACHER SIGNUP FORM */}
        {/* ============================================================================ */}
        {isSignupMode && signupType === 'teacher' && (
          <motion.form
            onSubmit={handleTeacherSignup}
            className="p-8 rounded-3xl"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(216, 255, 145, 0.2)',
              backdropFilter: 'blur(10px)'
            }}
          >
            {signupSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 font-paragraph text-sm flex items-center gap-2"
              >
                <CheckCircle className="w-5 h-5" />
                Registration successful! Redirecting...
              </motion.div>
            )}

            {signupError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 font-paragraph text-sm flex items-center gap-2"
              >
                <AlertCircle className="w-5 h-5" />
                {signupError}
              </motion.div>
            )}

            {/* Full Name Field */}
            <div className="mb-6">
              <label className="font-paragraph text-foreground/80 mb-2 block text-sm">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-3.5 w-5 h-5 text-primary/50" />
                <input
                  type="text"
                  value={teacherSignupData.fullName}
                  onChange={(e) => setTeacherSignupData({ ...teacherSignupData, fullName: e.target.value })}
                  placeholder="John Doe"
                  className="w-full pl-12 pr-4 py-3 rounded-lg bg-background/50 border border-foreground/20 text-foreground font-paragraph focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="mb-6">
              <label className="font-paragraph text-foreground/80 mb-2 block text-sm">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 w-5 h-5 text-primary/50" />
                <input
                  type="email"
                  value={teacherSignupData.email}
                  onChange={(e) => setTeacherSignupData({ ...teacherSignupData, email: e.target.value })}
                  placeholder="your@email.com"
                  className="w-full pl-12 pr-4 py-3 rounded-lg bg-background/50 border border-foreground/20 text-foreground font-paragraph focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            {/* Phone Number Field */}
            <div className="mb-6">
              <label className="font-paragraph text-foreground/80 mb-2 block text-sm">
                Phone Number (Optional)
              </label>
              <input
                type="tel"
                value={teacherSignupData.phoneNumber}
                onChange={(e) => setTeacherSignupData({ ...teacherSignupData, phoneNumber: e.target.value })}
                placeholder="+91 7483430092"
                className="w-full px-4 py-3 rounded-lg bg-background/50 border border-foreground/20 text-foreground font-paragraph focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            {/* Password Field */}
            <div className="mb-6">
              <label className="font-paragraph text-foreground/80 mb-2 block text-sm">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 w-5 h-5 text-primary/50" />
                <input
                  type="password"
                  value={teacherSignupData.password}
                  onChange={(e) => setTeacherSignupData({ ...teacherSignupData, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3 rounded-lg bg-background/50 border border-foreground/20 text-foreground font-paragraph focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="mb-8">
              <label className="font-paragraph text-foreground/80 mb-2 block text-sm">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 w-5 h-5 text-primary/50" />
                <input
                  type="password"
                  value={teacherSignupData.confirmPassword}
                  onChange={(e) => setTeacherSignupData({ ...teacherSignupData, confirmPassword: e.target.value })}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3 rounded-lg bg-background/50 border border-foreground/20 text-foreground font-paragraph focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            {/* DOCUMENT UPLOAD SECTION */}
            <div className="mb-8 p-6 rounded-lg border-2 border-dashed border-primary/30 bg-primary/5">
              <h3 className="font-heading text-sm text-foreground mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Upload Documents
              </h3>
              <p className="font-paragraph text-xs text-foreground/60 mb-4">
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
                disabled={isLoading || isSubmittingDocuments}
                className="w-full mb-4 px-4 py-3 rounded-lg bg-primary/20 border border-primary/40 text-primary hover:bg-primary/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-paragraph text-sm flex items-center justify-center gap-2"
              >
                <Upload className="w-4 h-4" />
                {isLoading || isSubmittingDocuments ? 'Processing...' : 'Choose Files'}
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
                  <p className="font-paragraph text-xs text-foreground/70 font-semibold">
                    Uploaded Documents ({uploadedDocuments.length}):
                  </p>
                  {uploadedDocuments.map((doc, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center justify-between p-3 rounded-lg bg-foreground/5 border border-foreground/10"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <FileText className="w-4 h-4 text-primary flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="font-paragraph text-xs text-foreground truncate">{doc.name}</p>
                          <p className="font-paragraph text-xs text-foreground/50">{(doc.size / 1024).toFixed(2)} KB</p>
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
            </div>

            {/* Signup Button */}
            <motion.button
              type="submit"
              disabled={isLoading || isSubmittingDocuments || signupSuccess}
              className="w-full bg-primary text-primary-foreground font-heading font-semibold py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed mb-4 flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                boxShadow: '0 0 20px rgba(216, 255, 145, 0.3)'
              }}
            >
              {isSubmittingDocuments ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  Submitting Documents...
                </>
              ) : isLoading ? (
                'Creating Account...'
              ) : (
                'Sign Up'
              )}
            </motion.button>

            {/* Back Button */}
            <div className="text-center">
              <motion.button
                type="button"
                onClick={() => {
                  setIsSignupMode(false);
                  setSignupError('');
                  setSignupSuccess(false);
                  setUploadedDocuments([]);
                  setUploadError('');
                  setTeacherSignupData({ fullName: '', email: '', password: '', confirmPassword: '', phoneNumber: '' });
                }}
                className="font-heading text-primary hover:text-secondary transition-colors text-sm"
                whileHover={{ x: 4 }}
              >
                Back to Login →
              </motion.button>
            </div>
          </motion.form>
        )}

        {/* ============================================================================ */}
        {/* LOGIN FORM */}
        {/* ============================================================================ */}
        {!isSignupMode && (
          <motion.form
            onSubmit={handleLogin}
            className="p-8 rounded-3xl"
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
                className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 font-paragraph text-sm flex items-center gap-2"
              >
                <AlertCircle className="w-5 h-5" />
                {error}
              </motion.div>
            )}

            {/* Email Field */}
            <div className="mb-6">
              <label className="font-paragraph text-foreground/80 mb-2 block text-sm">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 w-5 h-5 text-primary/50" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full pl-12 pr-4 py-3 rounded-lg bg-background/50 border border-foreground/20 text-foreground font-paragraph focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="mb-8">
              <label className="font-paragraph text-foreground/80 mb-2 block text-sm">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 w-5 h-5 text-primary/50" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3 rounded-lg bg-background/50 border border-foreground/20 text-foreground font-paragraph focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            {/* Demo Credentials */}
            <div className="mb-8 p-4 rounded-lg bg-secondary/10 border border-secondary/20">
              <p className="font-heading text-xs text-secondary mb-2">Demo Credentials:</p>
              <p className="font-paragraph text-xs text-foreground/70">
                <strong>Admin:</strong> abhinavneeraj.bade@gmail.com / 27Sep@2006<br />
                <strong>Student:</strong> Use your registered email and password to log in.<br />
                If you don't have an account yet, <button type="button" onClick={() => { setIsSignupMode(true); setError(''); setEmail(''); setPassword(''); }} className="text-orange-500 hover:text-orange-400 font-semibold">sign up here</button>.
              </p>
            </div>

            {/* Login Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-primary-foreground font-heading font-semibold py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed mb-4"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                boxShadow: '0 0 20px rgba(216, 255, 145, 0.3)'
              }}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </motion.button>

            {/* Signup Link */}
            <div className="text-center">
              <p className="font-paragraph text-foreground/70 text-sm mb-2">
                Don't have an account?
              </p>
              <motion.button
                type="button"
                onClick={() => {
                  setIsSignupMode(true);
                  setError('');
                  setEmail('');
                  setPassword('');
                }}
                className="font-heading text-primary hover:text-secondary transition-colors text-sm"
                whileHover={{ x: 4 }}
              >
                Sign Up Here →
              </motion.button>
            </div>
          </motion.form>
        )}

        {/* Back to Home */}
        <div className="text-center mt-6">
          <motion.a
            href="/"
            className="font-paragraph text-foreground/70 hover:text-primary transition-colors"
            whileHover={{ x: -4 }}
          >
            ← Back to Home
          </motion.a>
        </div>
      </motion.div>

      {/* ============================================================================ */}
      {/* RESULT POPUP */}
      {/* ============================================================================ */}
      {showResultPopup && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setShowResultPopup(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md mx-4 p-8 rounded-2xl bg-gradient-to-br from-background to-background/80 border border-primary/30"
            style={{
              boxShadow: '0 0 40px rgba(255, 106, 0, 0.3)'
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowResultPopup(false)}
              className="absolute top-4 right-4 p-2 hover:bg-foreground/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-foreground/60" />
            </button>

            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', damping: 20 }}
              className="flex justify-center mb-6"
            >
              <div className="w-16 h-16 rounded-full bg-green-500/20 border-2 border-green-500/40 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
            </motion.div>

            {/* Title */}
            <h2 className="font-heading text-2xl text-foreground text-center mb-4">
              Registration Submitted!
            </h2>

            {/* Message */}
            <div className="space-y-4 mb-8">
              <p className="font-paragraph text-foreground/80 text-center">
                Your registration has been successfully submitted for review.
              </p>
              
              {/* Pending Approval Box */}
              <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                <div className="flex items-center gap-3 mb-2">
                  <Clock className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                  <p className="font-heading text-sm text-yellow-400">
                    Pending Admin Approval
                  </p>
                </div>
                <p className="font-paragraph text-xs text-yellow-300/80">
                  Your account is currently under review. You will receive an email notification once the admin approves your registration.
                </p>
              </div>

              {/* 24 Hour Timeline */}
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/30">
                <p className="font-heading text-sm text-primary text-center mb-2">
                  ⏱️ Expected Review Time: 24 Hours
                </p>
                <p className="font-paragraph text-xs text-foreground/60 text-center">
                  We'll review your information and contact you at <strong>{studentSignupData.email || teacherSignupData.email}</strong>
                </p>
              </div>

              {/* Cannot Login Yet */}
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30">
                <p className="font-paragraph text-xs text-red-400">
                  ⚠️ You cannot log in until your registration is approved. Please wait for the approval email.
                </p>
              </div>
            </div>

            {/* Redirect Message */}
            <p className="font-paragraph text-xs text-foreground/50 text-center mb-4">
              Redirecting to login page in a moment...
            </p>

            {/* Loading Indicator */}
            <motion.div
              animate={{ scaleX: [0, 1] }}
              transition={{ duration: 5, ease: 'easeInOut' }}
              className="h-1 bg-gradient-to-r from-primary to-secondary rounded-full"
              style={{ transformOrigin: 'left' }}
            />
          </motion.div>
        </motion.div>
      )}
    </div>
    <Footer />
    </>
  );
}
