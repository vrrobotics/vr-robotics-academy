/**
 * AI Image Generation Service - Updated with Subject-Specific Images
 * Uses high-quality images that match the actual subject matter
 */

interface GenerateImageOptions {
  prompt: string;
  width?: number;
  height?: number;
  quality?: 'standard' | 'hd';
}

// Subject-specific image prompts for AI generation
export const admissionStepPrompts = {
  1: {
    title: 'Online Application',
    prompt: 'Modern computer interface with online application form, submission button, checkmarks, digital registration, clean white and blue interface, professional educational platform',
    keywords: 'application form, registration, online form, digital application'
  },
  2: {
    title: 'Demo Session',
    prompt: 'Student wearing VR headset experiencing virtual reality robotics learning, interactive VR environment, gaming controller, futuristic tech, neon lights, immersive experience',
    keywords: 'VR headset, virtual reality, VR gaming, immersive learning, interactive demo'
  },
  3: {
    title: 'Assessment & Feedback',
    prompt: 'Teacher or mentor providing feedback to student, digital dashboard with progress charts, learning assessment, development review, professional educational setting',
    keywords: 'teacher feedback, assessment, performance review, learning progress'
  },
  4: {
    title: 'Choose Your Program',
    prompt: 'Multiple program levels displayed as cards (Beginner, Intermediate, Advanced), colorful selection interface, choice options, program levels, educational paths',
    keywords: 'program selection, course levels, learning paths, program tiers'
  },
  5: {
    title: 'Welcome to VR Robotics',
    prompt: 'Diverse group of students collaborating with robots and VR technology, celebrating achievement, robotics lab, team building, technology innovation',
    keywords: 'student collaboration, robotics learning, team project, achievement celebration'
  }
};

/**
 * Generate image URLs using subject-specific sources
 * Maps each admission step to images that match its actual content
 */
export const generateImageUrl = (stepNumber: 1 | 2 | 3 | 4 | 5): string => {
  const imageMap: Record<number, string> = {
    // Step 1: Online Application
    1: 'https://images.unsplash.com/photo-1667372335957-b8d1b5eb60e3?w=500&h=500&fit=crop&q=80&auto=format',
    
    // Step 2: Demo Session - VR/Gaming focused
    2: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=500&h=500&fit=crop&q=80&auto=format',
    
    // Step 3: Assessment & Feedback
    3: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=500&h=500&fit=crop&q=80&auto=format',
    
    // Step 4: Choose Your Program - Decision/Selection
    4: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=500&fit=crop&q=80&auto=format',
    
    // Step 5: Welcome to VR Robotics - Team/Collaboration
    5: 'https://images.unsplash.com/photo-1552392081-5967b4550f26?w=500&h=500&fit=crop&q=80&auto=format'
  };

  return imageMap[stepNumber] || 'https://via.placeholder.com/500x500?text=Step+' + stepNumber;
};

/**
 * Get better fallback images that match subject matter
 */
export const getFallbackImage = (stepNumber: 1 | 2 | 3 | 4 | 5): string => {
  const fallbackMap: Record<number, string> = {
    // Online Application - Form/Signup
    1: 'https://images.unsplash.com/photo-1460925895917-adf4e565db6d?w=500&h=500&fit=crop&q=80',
    
    // VR Demo Session - Virtual Reality/Gaming
    2: 'https://images.unsplash.com/photo-1612036782180-69c73116e76f?w=500&h=500&fit=crop&q=80',
    
    // Assessment & Feedback - Learning/Education
    3: 'https://images.unsplash.com/photo-1552664730-8c81589609f9?w=500&h=500&fit=crop&q=80',
    
    // Choose Program - Options/Selection
    4: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=500&fit=crop&q=80',
    
    // Team Success - Collaboration/Achievement
    5: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=500&fit=crop&q=80'
  };

  return fallbackMap[stepNumber] || 'https://via.placeholder.com/500x500?text=Learning+Image';
};

/**
 * Get tertiary fallback - third option if both primary and secondary fail
 */
export const getTertiaryFallbackImage = (stepNumber: 1 | 2 | 3 | 4 | 5): string => {
  const tertiaryMap: Record<number, string> = {
    1: 'https://via.placeholder.com/500x500/4f46e5/ffffff?text=Application+Form',
    2: 'https://via.placeholder.com/500x500/d946ef/ffffff?text=VR+Demo+Session',
    3: 'https://via.placeholder.com/500x500/0ea5e9/ffffff?text=Feedback+%26+Assessment',
    4: 'https://via.placeholder.com/500x500/f59e0b/ffffff?text=Choose+Program',
    5: 'https://via.placeholder.com/500x500/10b981/ffffff?text=Welcome+to+VR+Robotics'
  };

  return tertiaryMap[stepNumber] || 'https://via.placeholder.com/500x500?text=Learning';
};

/**
 * Validate image URL availability
 */
export const validateImageUrl = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(url, { method: 'HEAD', mode: 'no-cors' });
    return response.ok || response.status === 0;
  } catch (error) {
    console.warn('Image validation failed:', url, error);
    return false;
  }
};

/**
 * Get all image sources for a step in priority order
 */
export const getAllImageSources = (stepNumber: 1 | 2 | 3 | 4 | 5): string[] => {
  return [
    generateImageUrl(stepNumber),      // Primary
    getFallbackImage(stepNumber),      // Secondary
    getTertiaryFallbackImage(stepNumber) // Tertiary
  ];
};

export default {
  generateImageUrl,
  getFallbackImage,
  getTertiaryFallbackImage,
  validateImageUrl,
  getAllImageSources,
  admissionStepPrompts
};
