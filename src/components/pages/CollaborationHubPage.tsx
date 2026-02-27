import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CollaborativeGradingWorkspace from '@/components/dashboard/CollaborativeGradingWorkspace';
import InteractiveCharts from '@/components/dashboard/InteractiveCharts';
import ScheduledReports from '@/components/dashboard/ScheduledReports';
import { Users, BarChart3, Clock } from 'lucide-react';

export default function CollaborationHubPage() {
  const [activeTab, setActiveTab] = useState('collaboration');

  return (
    <>
      <Header />
      <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-background via-secondary-foreground/5 to-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border-b border-primary/20 py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-heading font-bold text-white mb-2">
            Collaboration Hub
          </h1>
          <p className="text-gray-400">
            Real-time collaboration, advanced visualizations, and automated reporting
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-secondary-foreground/10 border border-primary/20 p-1 rounded-lg">
            <TabsTrigger 
              value="collaboration"
              className="data-[state=active]:bg-primary data-[state=active]:text-white text-gray-400 hover:text-white transition-colors"
            >
              <Users className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Collaboration</span>
            </TabsTrigger>
            <TabsTrigger 
              value="visualizations"
              className="data-[state=active]:bg-primary data-[state=active]:text-white text-gray-400 hover:text-white transition-colors"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Visualizations</span>
            </TabsTrigger>
            <TabsTrigger 
              value="reporting"
              className="data-[state=active]:bg-primary data-[state=active]:text-white text-gray-400 hover:text-white transition-colors"
            >
              <Clock className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Reporting</span>
            </TabsTrigger>
          </TabsList>

          {/* Collaboration Tab */}
          <TabsContent value="collaboration" className="mt-6">
            <CollaborativeGradingWorkspace />
          </TabsContent>

          {/* Visualizations Tab */}
          <TabsContent value="visualizations" className="mt-6">
            <InteractiveCharts />
          </TabsContent>

          {/* Reporting Tab */}
          <TabsContent value="reporting" className="mt-6">
            <ScheduledReports />
          </TabsContent>
        </Tabs>

        {/* Quick Stats */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-secondary-foreground/10 border border-primary/20 rounded-lg p-6">
            <div className="text-gray-400 text-sm mb-2">Active Collaborations</div>
            <div className="text-3xl font-bold text-primary">12</div>
            <p className="text-gray-500 text-xs mt-2">Teachers grading together</p>
          </div>

          <div className="bg-secondary-foreground/10 border border-primary/20 rounded-lg p-6">
            <div className="text-gray-400 text-sm mb-2">Real-time Updates</div>
            <div className="text-3xl font-bold text-blue-400">847</div>
            <p className="text-gray-500 text-xs mt-2">Updates this week</p>
          </div>

          <div className="bg-secondary-foreground/10 border border-primary/20 rounded-lg p-6">
            <div className="text-gray-400 text-sm mb-2">Scheduled Reports</div>
            <div className="text-3xl font-bold text-green-400">8</div>
            <p className="text-gray-500 text-xs mt-2">Active automations</p>
          </div>

          <div className="bg-secondary-foreground/10 border border-primary/20 rounded-lg p-6">
            <div className="text-gray-400 text-sm mb-2">Avg Response Time</div>
            <div className="text-3xl font-bold text-yellow-400">2.3s</div>
            <p className="text-gray-500 text-xs mt-2">Real-time performance</p>
          </div>
        </div>

        {/* Features Overview */}
        <div className="mt-12 space-y-6">
          <h2 className="text-2xl font-heading font-bold text-white">Phase 10 Features</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: 'Real-time Collaboration',
                description: 'Grade submissions together with live updates and comments',
                icon: '👥'
              },
              {
                title: 'Interactive Charts',
                description: 'Zoom, pan, and interact with data visualizations',
                icon: '📊'
              },
              {
                title: 'Scheduled Reports',
                description: 'Automate report generation and email delivery',
                icon: '📧'
              },
              {
                title: 'Performance Heatmaps',
                description: 'Visualize student performance across metrics',
                icon: '🔥'
              },
              {
                title: 'Comparative Analytics',
                description: 'Compare students, classes, and batches',
                icon: '📈'
              },
              {
                title: 'Predictive Insights',
                description: 'AI-powered predictions and recommendations',
                icon: '🤖'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-secondary-foreground/10 border border-primary/20 rounded-lg p-4 hover:bg-secondary-foreground/20 transition-colors"
              >
                <div className="text-3xl mb-2">{feature.icon}</div>
                <h3 className="text-white font-semibold mb-1">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* System Status */}
        <div className="mt-12 bg-green-500/10 border border-green-500/30 rounded-lg p-6">
          <h3 className="text-white font-semibold mb-4">System Status</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Real-time Collaboration</span>
              <span className="text-green-400 font-semibold">✓ Operational</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Data Visualizations</span>
              <span className="text-green-400 font-semibold">✓ Operational</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Automated Reporting</span>
              <span className="text-green-400 font-semibold">✓ Operational</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">System Performance</span>
              <span className="text-green-400 font-semibold">✓ Optimal</span>
            </div>
          </div>
        </div>
      </div>
      </div>
    <Footer />
    </>
  );
}
