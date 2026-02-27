import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useGamificationStore } from '@/stores/gamificationStore';
import { BaseCrudService } from '@/integrations';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GamifiedMissionMap from '@/components/GamifiedMissionMap';
import RobotAvatarCustomizer from '@/components/RobotAvatarCustomizer';
import XPLevelingSystem from '@/components/XPLevelingSystem';
import BadgesDisplay from '@/components/BadgesDisplay';

export default function GamifiedStudentDashboard() {
  const { playerProgress, setPlayerProgress, updateLoginStreak } = useGamificationStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializePlayer = async () => {
      try {
        // For now, create a default player progress
        // In production, this would fetch from a user-specific collection
        const defaultProgress = {
          userId: 'user-' + Math.random().toString(36).substr(2, 9),
          currentLevel: 1,
          totalXP: 0,
          xpForNextLevel: 100,
          unlockedMissions: ['mission-1'],
          completedMissions: [],
          currentAvatarSkin: 'skin-1',
          unlockedSkins: ['skin-1'],
          badges: [],
          lastLoginDate: new Date(),
          loginStreak: 1,
        };

        setPlayerProgress(defaultProgress);
        updateLoginStreak();
        setLoading(false);
      } catch (error) {
        console.error('Failed to initialize player:', error);
        setLoading(false);
      }
    };

    if (!playerProgress) {
      initializePlayer();
    } else {
      setLoading(false);
    }
  }, [playerProgress, setPlayerProgress, updateLoginStreak]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="w-full min-h-screen bg-gradient-to-b from-background to-secondary-foreground/20">
      {/* Header */}
      <motion.div
        className="bg-gradient-to-r from-primary/20 to-secondary/20 border-b border-primary/30 py-8 px-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-primary mb-2">Welcome, Student! 🎮</h1>
          <p className="text-gray-400">Continue your VR Robotics learning journey</p>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Level', value: playerProgress?.currentLevel, icon: '⭐' },
            { label: 'Total XP', value: playerProgress?.totalXP, icon: '✨' },
            { label: 'Missions', value: playerProgress?.completedMissions.length, icon: '🎯' },
            { label: 'Badges', value: playerProgress?.badges.length, icon: '🏆' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="bg-secondary-foreground border border-primary/30 rounded-lg p-4 text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="text-2xl mb-2">{stat.icon}</div>
              <p className="text-gray-400 text-sm">{stat.label}</p>
              <p className="text-2xl font-bold text-primary">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="missions" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-secondary-foreground border border-primary/30">
            <TabsTrigger value="missions">Missions</TabsTrigger>
            <TabsTrigger value="avatar">Avatar</TabsTrigger>
            <TabsTrigger value="xp">Progress</TabsTrigger>
            <TabsTrigger value="badges">Badges</TabsTrigger>
          </TabsList>

          {/* Missions Tab */}
          <TabsContent value="missions" className="mt-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <GamifiedMissionMap />
            </motion.div>
          </TabsContent>

          {/* Avatar Tab */}
          <TabsContent value="avatar" className="mt-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <RobotAvatarCustomizer />
            </motion.div>
          </TabsContent>

          {/* XP Tab */}
          <TabsContent value="xp" className="mt-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <XPLevelingSystem />
            </motion.div>
          </TabsContent>

          {/* Badges Tab */}
          <TabsContent value="badges" className="mt-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <BadgesDisplay />
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
    <Footer />
    </>
  );
}
