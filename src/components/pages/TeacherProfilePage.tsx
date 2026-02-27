import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/stores/authStore';
import { Upload, Check, AlertCircle, X, Calendar, Play } from 'lucide-react';
import TeacherPortalLayout from './TeacherPortalLayout';
import { Image } from '@/components/ui/image';
import { teacherRegistrationService } from '@/services/teacherRegistrationService';
import { BaseCrudService } from '@/integrations';
import { UpcomingClasses } from '@/entities';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';

interface ProfileData {
  fullName: string;
  email: string;
  phone: string;
  department: string;
  bio: string;
  profilePhoto: string | null;
}

interface UploadStatus {
  type: 'idle' | 'uploading' | 'success' | 'error';
  message: string;
}

export default function TeacherProfilePage() {
  const { user } = useAuthStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [assignedClasses, setAssignedClasses] = useState<UpcomingClasses[]>([]);
  const [classesLoading, setClassesLoading] = useState(false);
  
  // ============================================================================
  // STATE MANAGEMENT - Initialize from auth store to persist across refreshes
  // ============================================================================
  const [profileData, setProfileData] = useState<ProfileData>({
    fullName: user?.fullName || 'Sarah Williams',
    email: user?.email || 'sarah.williams@example.com',
    phone: '+91 7483430092',
    department: 'STEM Education',
    bio: 'Passionate educator with 8+ years of experience in robotics and VR education.',
    profilePhoto: user?.profilePicture || null
  });

  const [isEditing, setIsEditing] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>({ type: 'idle', message: '' });
  const [tempData, setTempData] = useState<ProfileData>(profileData);

  // ============================================================================
  // LOAD ASSIGNED CLASSES FOR THIS TEACHER
  // ============================================================================
  useEffect(() => {
    const loadAssignedClasses = async () => {
      try {
        if (!user?.fullName) return;
        
        setClassesLoading(true);
        const { items } = await BaseCrudService.getAll<UpcomingClasses>('upcomingclasses');
        if (Array.isArray(items)) {
          // Filter classes assigned to this teacher
          const teacherClasses = items.filter(c => c.assignedTeacherName === user.fullName);
          console.log(`[TeacherProfilePage] ✓ Loaded ${teacherClasses.length} assigned classes`);
          setAssignedClasses(teacherClasses);
        }
        setClassesLoading(false);
      } catch (error) {
        console.error('[TeacherProfilePage] Error loading assigned classes:', error);
        setClassesLoading(false);
      }
    };

    loadAssignedClasses();
  }, [user?.fullName]);

  // ============================================================================
  // SYNC WITH AUTH STORE - Update local state when auth store changes
  // ============================================================================
  useEffect(() => {
    if (user) {
      setProfileData(prev => ({
        ...prev,
        fullName: user.fullName || prev.fullName,
        email: user.email || prev.email,
        profilePhoto: user.profilePicture || prev.profilePhoto
      }));
      console.log('[TeacherProfilePage] ✓ Synced with auth store. Profile picture:', user.profilePicture);
    }
  }, [user?.profilePicture, user?.fullName, user?.email]);

  // ============================================================================
  // FILE UPLOAD HANDLER - Secure and user-friendly
  // ============================================================================
  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    if (!file) {
      console.log('[TeacherProfilePage] No file selected');
      return;
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setUploadStatus({
        type: 'error',
        message: 'Please upload a JPG, PNG, or WebP image'
      });
      console.warn('[TeacherProfilePage] Invalid file type:', file.type);
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      setUploadStatus({
        type: 'error',
        message: 'File size must be less than 5MB'
      });
      console.warn('[TeacherProfilePage] File too large:', file.size);
      return;
    }

    // Simulate file upload
    setUploadStatus({ type: 'uploading', message: 'Uploading photo...' });
    console.log('[TeacherProfilePage] Starting file upload:', file.name);

    try {
      // In a real application, you would upload to a server here
      // For now, we'll create a local URL for preview
      const reader = new FileReader();
      
      reader.onload = async (e) => {
        const imageUrl = e.target?.result as string;
        
        // Update local state
        setProfileData(prev => ({
          ...prev,
          profilePhoto: imageUrl
        }));
        setTempData(prev => ({
          ...prev,
          profilePhoto: imageUrl
        }));
        
        // Update the auth store to sync sidebar profile image
        const { updateProfilePicture } = useAuthStore.getState();
        updateProfilePicture(imageUrl);
        
        // ============================================================================
        // PERSIST TO DATABASE - Save profile picture to teacher's record
        // ============================================================================
        if (user?.id) {
          try {
            await teacherRegistrationService.updateProfilePicture(user.id, imageUrl);
            console.log('[TeacherProfilePage] ✓ Profile picture saved to database');
          } catch (dbError) {
            console.error('[TeacherProfilePage] Failed to save to database:', dbError);
            // Continue anyway - the image is still in memory and auth store
          }
        }
        
        setUploadStatus({
          type: 'success',
          message: 'Photo uploaded successfully!'
        });
        console.log('[TeacherProfilePage] ✓ File upload successful');
        
        // Clear status after 3 seconds
        setTimeout(() => {
          setUploadStatus({ type: 'idle', message: '' });
        }, 3000);
      };

      reader.onerror = () => {
        setUploadStatus({
          type: 'error',
          message: 'Failed to read file'
        });
        console.error('[TeacherProfilePage] File read error');
      };

      reader.readAsDataURL(file);
    } catch (error) {
      setUploadStatus({
        type: 'error',
        message: 'Upload failed. Please try again.'
      });
      console.error('[TeacherProfilePage] Upload error:', error);
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // ============================================================================
  // EDIT MODE HANDLERS
  // ============================================================================
  const handleEditClick = () => {
    setIsEditing(true);
    setTempData(profileData);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTempData(profileData);
  };

  const handleSave = () => {
    console.log('[TeacherProfilePage] Saving profile data:', tempData);
    setProfileData(tempData);
    setIsEditing(false);
    
    // Update the auth store to sync sidebar profile information
    const { updateUserProfile } = useAuthStore.getState();
    console.log('[TeacherProfilePage] Updating auth store with:', {
      fullName: tempData.fullName,
      email: tempData.email,
      phoneNumber: tempData.phone,
    });
    updateUserProfile({
      fullName: tempData.fullName,
      email: tempData.email,
      phoneNumber: tempData.phone,
    });
    
    // Verify the update was successful
    const updatedUser = useAuthStore.getState().user;
    console.log('[TeacherProfilePage] ✓ Auth store updated. New user data:', updatedUser);
    
    setUploadStatus({
      type: 'success',
      message: 'Profile updated successfully!'
    });
    setTimeout(() => {
      setUploadStatus({ type: 'idle', message: '' });
    }, 3000);
  };

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setTempData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <TeacherPortalLayout pageTitle="My Profile">
      <div className="space-y-6">
        {/* ====================================================================
            PROFILE HEADER SECTION
            ==================================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 rounded-xl bg-gradient-to-br from-foreground/5 to-foreground/10 border border-foreground/10"
        >
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
            {/* Profile Photo Section */}
            <div className="flex flex-col items-center gap-4">
              {/* Photo Display */}
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="relative"
              >
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center overflow-hidden border-4 border-primary/40">
                  {profileData.profilePhoto ? (
                    <Image src={profileData.profilePhoto} alt={profileData.fullName} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-5xl font-heading font-bold text-background">
                      {profileData.fullName.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
              </motion.div>

              {/* Upload Button */}
              <div className="flex flex-col gap-2 w-full">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadStatus.type === 'uploading'}
                  className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary/20 border border-primary/40 text-primary hover:bg-primary/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-paragraph text-sm"
                >
                  <Upload className="w-4 h-4" />
                  {uploadStatus.type === 'uploading' ? 'Uploading...' : 'Upload Photo'}
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleFileSelect}
                  className="hidden"
                  aria-label="Upload profile photo"
                />
                <p className="text-xs text-foreground/50 text-center">
                  JPG, PNG or WebP • Max 5MB
                </p>
              </div>

              {/* Upload Status Message */}
              {uploadStatus.type !== 'idle' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-paragraph w-full ${
                    uploadStatus.type === 'success'
                      ? 'bg-green-500/20 border border-green-500/40 text-green-400'
                      : uploadStatus.type === 'error'
                      ? 'bg-red-500/20 border border-red-500/40 text-red-400'
                      : 'bg-blue-500/20 border border-blue-500/40 text-blue-400'
                  }`}
                >
                  {uploadStatus.type === 'success' && <Check className="w-4 h-4 flex-shrink-0" />}
                  {uploadStatus.type === 'error' && <AlertCircle className="w-4 h-4 flex-shrink-0" />}
                  <span className="text-center flex-1">{uploadStatus.message}</span>
                </motion.div>
              )}
            </div>

            {/* Profile Info Section */}
            <div className="flex-1 w-full">
              <div className="space-y-4">
                <div>
                  <h2 className="font-heading text-3xl text-foreground mb-1">
                    {profileData.fullName}
                  </h2>
                  <p className="font-paragraph text-foreground/60">Teacher</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-paragraph text-xs text-foreground/50 uppercase tracking-wide mb-1">
                      Email
                    </p>
                    <p className="font-paragraph text-foreground">{profileData.email}</p>
                  </div>
                  <div>
                    <p className="font-paragraph text-xs text-foreground/50 uppercase tracking-wide mb-1">
                      Phone
                    </p>
                    <p className="font-paragraph text-foreground">{profileData.phone}</p>
                  </div>
                  <div>
                    <p className="font-paragraph text-xs text-foreground/50 uppercase tracking-wide mb-1">
                      Department
                    </p>
                    <p className="font-paragraph text-foreground">{profileData.department}</p>
                  </div>
                </div>

                {/* Edit Button */}
                <div className="pt-4">
                  <button
                    onClick={handleEditClick}
                    disabled={isEditing}
                    className="px-6 py-2 rounded-lg bg-primary/20 border border-primary/40 text-primary hover:bg-primary/30 transition-all duration-300 disabled:opacity-50 font-paragraph text-sm"
                  >
                    {isEditing ? 'Editing...' : 'Edit Profile'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ====================================================================
            PROFILE DETAILS SECTION
            ==================================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-8 rounded-xl bg-gradient-to-br from-foreground/5 to-foreground/10 border border-foreground/10"
        >
          <h3 className="font-heading text-2xl text-foreground mb-6">Professional Information</h3>

          {isEditing ? (
            // Edit Mode
            <div className="space-y-6">
              <div>
                <label className="block font-paragraph text-sm text-foreground/70 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={tempData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-foreground/10 border border-foreground/20 text-foreground placeholder-foreground/40 focus:outline-none focus:border-primary/40 transition-all duration-300 font-paragraph"
                  placeholder="Full Name"
                />
              </div>

              <div>
                <label className="block font-paragraph text-sm text-foreground/70 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={tempData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-foreground/10 border border-foreground/20 text-foreground placeholder-foreground/40 focus:outline-none focus:border-primary/40 transition-all duration-300 font-paragraph"
                  placeholder="Email"
                />
              </div>

              <div>
                <label className="block font-paragraph text-sm text-foreground/70 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  value={tempData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-foreground/10 border border-foreground/20 text-foreground placeholder-foreground/40 focus:outline-none focus:border-primary/40 transition-all duration-300 font-paragraph"
                  placeholder="Phone"
                />
              </div>

              <div>
                <label className="block font-paragraph text-sm text-foreground/70 mb-2">
                  Department
                </label>
                <input
                  type="text"
                  value={tempData.department}
                  onChange={(e) => handleInputChange('department', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-foreground/10 border border-foreground/20 text-foreground placeholder-foreground/40 focus:outline-none focus:border-primary/40 transition-all duration-300 font-paragraph"
                  placeholder="Department"
                />
              </div>

              <div>
                <label className="block font-paragraph text-sm text-foreground/70 mb-2">
                  Bio
                </label>
                <textarea
                  value={tempData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg bg-foreground/10 border border-foreground/20 text-foreground placeholder-foreground/40 focus:outline-none focus:border-primary/40 transition-all duration-300 font-paragraph resize-none"
                  placeholder="Tell us about yourself..."
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSave}
                  className="flex-1 px-6 py-3 rounded-lg bg-primary/20 border border-primary/40 text-primary hover:bg-primary/30 transition-all duration-300 font-paragraph font-medium flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  Save Changes
                </button>
                <button
                  onClick={handleCancel}
                  className="flex-1 px-6 py-3 rounded-lg bg-foreground/10 border border-foreground/20 text-foreground hover:bg-foreground/20 transition-all duration-300 font-paragraph font-medium flex items-center justify-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            // View Mode
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="font-paragraph text-xs text-foreground/50 uppercase tracking-wide mb-2">
                    Full Name
                  </p>
                  <p className="font-paragraph text-foreground">{profileData.fullName}</p>
                </div>
                <div>
                  <p className="font-paragraph text-xs text-foreground/50 uppercase tracking-wide mb-2">
                    Email
                  </p>
                  <p className="font-paragraph text-foreground">{profileData.email}</p>
                </div>
                <div>
                  <p className="font-paragraph text-xs text-foreground/50 uppercase tracking-wide mb-2">
                    Phone
                  </p>
                  <p className="font-paragraph text-foreground">{profileData.phone}</p>
                </div>
                <div>
                  <p className="font-paragraph text-xs text-foreground/50 uppercase tracking-wide mb-2">
                    Department
                  </p>
                  <p className="font-paragraph text-foreground">{profileData.department}</p>
                </div>
              </div>

              <div>
                <p className="font-paragraph text-xs text-foreground/50 uppercase tracking-wide mb-2">
                  Bio
                </p>
                <p className="font-paragraph text-foreground leading-relaxed">{profileData.bio}</p>
              </div>
            </div>
          )}
        </motion.div>

        {/* ====================================================================
            UPCOMING CLASSES SECTION
            ==================================================================== */}
        {assignedClasses.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-8 rounded-xl bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20"
          >
            <h3 className="font-heading text-2xl text-foreground mb-6 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-green-400" />
              Your Upcoming Classes
            </h3>
            
            {classesLoading ? (
              <div className="text-center py-8">
                <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
                <p className="font-paragraph text-foreground/60">Loading your classes...</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {assignedClasses.map((upcomingClass) => (
                  <Card key={upcomingClass._id} className="bg-gray-900/50 border-gray-800 p-4">
                    <h4 className="font-heading text-lg text-foreground mb-2">
                      {upcomingClass.classTitle}
                    </h4>
                    <p className="text-sm text-gray-400 mb-3 line-clamp-2">
                      {upcomingClass.classDescription}
                    </p>
                    <div className="space-y-2 mb-4 text-sm">
                      <p className="text-gray-400">
                        <span className="text-foreground/70">Category:</span> {upcomingClass.courseCategory}
                      </p>
                      <p className="text-gray-400">
                        <span className="text-foreground/70">Level:</span> {upcomingClass.difficultyLevel}
                      </p>
                      {upcomingClass.scheduledDateTime && (
                        <p className="text-gray-400">
                          <span className="text-foreground/70">Scheduled:</span> {format(new Date(upcomingClass.scheduledDateTime), 'MMM dd, yyyy HH:mm')}
                        </p>
                      )}
                    </div>
                    <Button
                      onClick={() => window.open(upcomingClass.liveClassLink, '_blank')}
                      className="w-full bg-green-600 hover:bg-green-700 flex items-center justify-center gap-2"
                      size="sm"
                    >
                      <Play className="w-4 h-4" />
                      Teach Class
                    </Button>
                  </Card>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* ====================================================================
            ACCOUNT SETTINGS SECTION
            ==================================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-8 rounded-xl bg-gradient-to-br from-foreground/5 to-foreground/10 border border-foreground/10"
        >
          <h3 className="font-heading text-2xl text-foreground mb-6">Account Settings</h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-foreground/5 border border-foreground/10">
              <div>
                <p className="font-paragraph font-medium text-foreground">Change Password</p>
                <p className="font-paragraph text-sm text-foreground/60">Update your password regularly for security</p>
              </div>
              <button className="px-4 py-2 rounded-lg bg-primary/20 border border-primary/40 text-primary hover:bg-primary/30 transition-all duration-300 font-paragraph text-sm">
                Change
              </button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-foreground/5 border border-foreground/10">
              <div>
                <p className="font-paragraph font-medium text-foreground">Two-Factor Authentication</p>
                <p className="font-paragraph text-sm text-foreground/60">Add an extra layer of security to your account</p>
              </div>
              <button className="px-4 py-2 rounded-lg bg-primary/20 border border-primary/40 text-primary hover:bg-primary/30 transition-all duration-300 font-paragraph text-sm">
                Enable
              </button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-foreground/5 border border-foreground/10">
              <div>
                <p className="font-paragraph font-medium text-foreground">Email Notifications</p>
                <p className="font-paragraph text-sm text-foreground/60">Manage your notification preferences</p>
              </div>
              <button className="px-4 py-2 rounded-lg bg-primary/20 border border-primary/40 text-primary hover:bg-primary/30 transition-all duration-300 font-paragraph text-sm">
                Manage
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </TeacherPortalLayout>
  );
}
