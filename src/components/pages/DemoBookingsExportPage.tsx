import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, RefreshCw, Calendar, Users, FileText, CheckCircle } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { DemoSessions } from '@/entities';
import { ExcelExportService } from '@/services/excelExportService';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function DemoBookingsExportPage() {
  const [demoBookings, setDemoBookings] = useState<DemoSessions[]>([]);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [lastExported, setLastExported] = useState<string | null>(null);
  const [autoExportEnabled, setAutoExportEnabled] = useState(false);
  const [exportInterval, setExportInterval] = useState(24); // hours
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Load demo bookings on mount
  useEffect(() => {
    loadDemoBookings();
    
    // Check if auto-export was previously enabled
    const savedSettings = localStorage.getItem('excelExportSettings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setAutoExportEnabled(settings.autoExportEnabled);
      setExportInterval(settings.exportInterval);
    }

    // Load last export time
    const lastExp = localStorage.getItem('lastExcelExport');
    if (lastExp) {
      setLastExported(lastExp);
    }

    // Auto-refresh when page comes into focus
    const handleFocus = () => {
      console.log('[DemoBookingsExport] Page gained focus, refreshing data...');
      loadDemoBookings();
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  // Set up auto-export if enabled
  useEffect(() => {
    if (!autoExportEnabled) return;

    const intervalMs = exportInterval * 60 * 60 * 1000; // Convert hours to ms
    const interval = setInterval(() => {
      performExport();
    }, intervalMs);

    console.log(`[DemoBookingsExport] Auto-export enabled every ${exportInterval} hours`);

    return () => clearInterval(interval);
  }, [autoExportEnabled, exportInterval]);

  const loadDemoBookings = async () => {
    try {
      setLoading(true);
      console.log('[DemoBookingsExport] Loading demo bookings...');
      const result = await BaseCrudService.getAll<DemoSessions>('demosessions');
      console.log('[DemoBookingsExport] Fetched result:', result);
      const bookings = result.items || [];
      setDemoBookings(bookings);
      console.log(`[DemoBookingsExport] Loaded ${bookings.length} demo bookings`);
    } catch (error) {
      console.error('[DemoBookingsExport] Error loading demo bookings:', error);
      setMessage({ type: 'error', text: `Failed to load demo bookings: ${error instanceof Error ? error.message : 'Unknown error'}` });
    } finally {
      setLoading(false);
    }
  };

  const performExport = async () => {
    try {
      setExporting(true);
      console.log('[DemoBookingsExport] Starting export...');
      
      // Refresh data first
      await loadDemoBookings();
      
      // Export to Excel
      const result = await ExcelExportService.exportDemoSessions(demoBookings);
      
      if (result.success) {
        const now = new Date().toLocaleString();
        setLastExported(now);
        localStorage.setItem('lastExcelExport', now);
        
        // Also save backup to localStorage
        ExcelExportService.saveToLocalStorage(demoBookings);
        
        setMessage({ type: 'success', text: `✓ Exported ${demoBookings.length} demo bookings` });
        
        // Auto-hide message after 5 seconds
        setTimeout(() => setMessage(null), 5000);
      } else {
        setMessage({ type: 'error', text: result.error || 'Export failed' });
      }
    } catch (error) {
      console.error('[DemoBookingsExport] Error during export:', error);
      setMessage({ type: 'error', text: 'Export failed' });
    } finally {
      setExporting(false);
    }
  };

  const handleExport = async () => {
    await performExport();
  };

  const handleAutoExportToggle = () => {
    const newState = !autoExportEnabled;
    setAutoExportEnabled(newState);
    
    // Save settings
    const settings = {
      autoExportEnabled: newState,
      exportInterval: exportInterval
    };
    localStorage.setItem('excelExportSettings', JSON.stringify(settings));
    
    setMessage({ 
      type: 'success', 
      text: newState 
        ? `Auto-export enabled (every ${exportInterval} hours)` 
        : 'Auto-export disabled' 
    });
    
    setTimeout(() => setMessage(null), 5000);
  };

  const handleIntervalChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newInterval = parseInt(e.target.value);
    setExportInterval(newInterval);
    
    // Update settings
    const settings = {
      autoExportEnabled,
      exportInterval: newInterval
    };
    localStorage.setItem('excelExportSettings', JSON.stringify(settings));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="inline-block mb-4"
          >
            <RefreshCw className="w-12 h-12 text-primary" />
          </motion.div>
          <p className="font-paragraph text-foreground/70">Loading demo bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background pt-20 pb-12">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="font-heading text-4xl md:text-5xl text-primary mb-4">
              Demo Bookings Export
            </h1>
            <p className="font-paragraph text-lg text-foreground/70">
              Download and manage all demo booking registrations in Excel format
            </p>
          </motion.div>

          {/* Status Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Total Bookings Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-6"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-paragraph text-foreground/60 mb-2">Total Bookings</p>
                  <h2 className="font-heading text-5xl text-primary">{demoBookings.length}</h2>
                </div>
                <Users className="w-12 h-12 text-primary/30" />
              </div>
            </motion.div>

            {/* Last Exported Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/20 rounded-2xl p-6"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-paragraph text-foreground/60 mb-2">Last Exported</p>
                  <h2 className="font-heading text-lg text-secondary">
                    {lastExported ? new Date(lastExported).toLocaleDateString() : 'Never'}
                  </h2>
                  <p className="font-paragraph text-sm text-foreground/50 mt-1">
                    {lastExported ? new Date(lastExported).toLocaleTimeString() : 'N/A'}
                  </p>
                </div>
                <Calendar className="w-12 h-12 text-secondary/30" />
              </div>
            </motion.div>

            {/* Auto-Export Status Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`bg-gradient-to-br ${
                autoExportEnabled 
                  ? 'from-green-500/10 to-green-500/5 border-green-500/20' 
                  : 'from-foreground/5 to-foreground/10 border-foreground/20'
              } border rounded-2xl p-6`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-paragraph text-foreground/60 mb-2">Auto-Export</p>
                  <h2 className={`font-heading text-lg ${autoExportEnabled ? 'text-green-500' : 'text-foreground/50'}`}>
                    {autoExportEnabled ? 'Enabled' : 'Disabled'}
                  </h2>
                  {autoExportEnabled && (
                    <p className="font-paragraph text-sm text-green-500/70 mt-1">
                      Every {exportInterval} hour{exportInterval !== 1 ? 's' : ''}
                    </p>
                  )}
                </div>
                <CheckCircle className={`w-12 h-12 ${autoExportEnabled ? 'text-green-500/30' : 'text-foreground/10'}`} />
              </div>
            </motion.div>
          </div>

          {/* Message Alert */}
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`mb-8 p-4 rounded-xl border ${
                message.type === 'success'
                  ? 'bg-green-500/10 border-green-500/30 text-green-600'
                  : 'bg-red-500/10 border-red-500/30 text-red-600'
              }`}
            >
              {message.text}
            </motion.div>
          )}

          {/* Export Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-foreground/5 to-foreground/10 border border-foreground/20 rounded-2xl p-8 mb-8"
          >
            <h3 className="font-heading text-2xl mb-6">Export Options</h3>
            
            <div className="space-y-6">
              {/* Manual Export */}
              <div>
                <h4 className="font-heading text-lg mb-3">Manual Download</h4>
                <p className="font-paragraph text-foreground/70 mb-4">
                  Download all demo bookings as a CSV file (opens in Excel, Google Sheets, etc.)
                </p>
                <div className="flex gap-3 flex-wrap">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => loadDemoBookings()}
                    disabled={loading}
                    className="flex items-center gap-3 bg-secondary text-secondary-foreground font-heading font-semibold px-6 py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-secondary/90"
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        Refreshing...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="w-5 h-5" />
                        Refresh Data
                      </>
                    )}
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleExport}
                    disabled={exporting || demoBookings.length === 0}
                    className="flex items-center gap-3 bg-primary text-primary-foreground font-heading font-semibold px-6 py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90"
                  >
                    {exporting ? (
                      <>
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        Exporting...
                      </>
                    ) : (
                      <>
                        <Download className="w-5 h-5" />
                        Download Excel (CSV)
                      </>
                    )}
                  </motion.button>
                </div>
              </div>

              {/* Auto-Export Settings */}
              <div className="border-t border-foreground/10 pt-6">
                <h4 className="font-heading text-lg mb-3">Auto-Export Setup</h4>
                <p className="font-paragraph text-foreground/70 mb-4">
                  Automatically export data at regular intervals. Files are saved locally and can be imported into your Excel workbook.
                </p>
                
                <div className="space-y-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={autoExportEnabled}
                      onChange={handleAutoExportToggle}
                      className="w-5 h-5 rounded border-2 border-primary/30"
                    />
                    <span className="font-paragraph text-foreground">
                      Enable automatic exports
                    </span>
                  </label>

                  {autoExportEnabled && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="ml-8"
                    >
                      <label className="font-paragraph text-foreground/70 mb-2 block">
                        Export frequency:
                      </label>
                      <select
                        value={exportInterval}
                        onChange={handleIntervalChange}
                        className="px-4 py-2 rounded-lg bg-background border border-foreground/20 text-foreground font-paragraph"
                      >
                        <option value={1}>Every 1 hour</option>
                        <option value={4}>Every 4 hours</option>
                        <option value={8}>Every 8 hours</option>
                        <option value={24}>Every 24 hours (daily)</option>
                        <option value={72}>Every 3 days</option>
                      </select>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Data Preview */}
          {demoBookings.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-foreground/5 to-foreground/10 border border-foreground/20 rounded-2xl p-8"
            >
              <h3 className="font-heading text-2xl mb-6">Recent Bookings Preview</h3>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-foreground/20">
                      <th className="text-left py-3 px-4 font-heading text-foreground">Student</th>
                      <th className="text-left py-3 px-4 font-heading text-foreground">Parent</th>
                      <th className="text-left py-3 px-4 font-heading text-foreground">Email</th>
                      <th className="text-left py-3 px-4 font-heading text-foreground">Preferred Date</th>
                      <th className="text-left py-3 px-4 font-heading text-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {demoBookings.slice(0, 10).map((booking, index) => (
                      <motion.tr
                        key={booking._id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b border-foreground/10 hover:bg-foreground/5"
                      >
                        <td className="py-3 px-4 font-paragraph text-foreground">
                          {booking.childName}
                        </td>
                        <td className="py-3 px-4 font-paragraph text-foreground">
                          {booking.parentName}
                        </td>
                        <td className="py-3 px-4 font-paragraph text-foreground/70">
                          {booking.parentEmail}
                        </td>
                        <td className="py-3 px-4 font-paragraph text-foreground">
                          {booking.preferredDate ? new Date(booking.preferredDate).toLocaleDateString() : 'N/A'}
                        </td>
                        <td className="py-3 px-4 font-paragraph">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            booking.status === 'completed'
                              ? 'bg-green-500/20 text-green-500'
                              : 'bg-yellow-500/20 text-yellow-500'
                          }`}>
                            {booking.status}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {demoBookings.length > 10 && (
                <p className="font-paragraph text-foreground/60 mt-4 text-center">
                  Showing 10 of {demoBookings.length} bookings. Download to see all records.
                </p>
              )}
            </motion.div>
          )}

          {/* Empty State */}
          {demoBookings.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <FileText className="w-16 h-16 text-foreground/20 mx-auto mb-4" />
              <p className="font-paragraph text-xl text-foreground/70">
                No demo bookings yet
              </p>
            </motion.div>
          )}
        </div>
      </div>
    <Footer />
    </>
  );
}
