
import React, { useState, useEffect } from 'react';
import { InfographicProvider } from '@/contexts/InfographicContext';
import Header from '@/components/Header';
import Toolbar from '@/components/Toolbar';
import Canvas from '@/components/Canvas';
import TemplateSidebar from '@/components/TemplateSidebar';
import PropertiesPanel from '@/components/PropertiesPanel';
import WelcomeScreen from '@/components/WelcomeScreen';
import { Toaster } from '@/components/ui/toaster';

const InfographicEditor: React.FC = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [propertiesPanelOpen, setPropertiesPanelOpen] = useState(true);
  
  // Check if this is the first visit
  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisitedInfographStudio');
    if (hasVisited) {
      setShowWelcome(false);
    } else {
      localStorage.setItem('hasVisitedInfographStudio', 'true');
    }
  }, []);

  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Toggle properties panel
  const togglePropertiesPanel = () => {
    setPropertiesPanelOpen(!propertiesPanelOpen);
  };

  return (
    <InfographicProvider>
      {showWelcome && <WelcomeScreen onClose={() => setShowWelcome(false)} />}
      
      <div className="flex flex-col h-screen bg-gray-50">
        <Header 
          onToggleSidebar={toggleSidebar} 
          onTogglePropertiesPanel={togglePropertiesPanel}
          sidebarOpen={sidebarOpen}
          propertiesPanelOpen={propertiesPanelOpen}
        />
        
        <div className="flex-1 flex overflow-hidden">
          {sidebarOpen && <TemplateSidebar />}
          
          <div className="flex-1 flex flex-col overflow-hidden">
            <Toolbar />
            
            <div className="flex-1 overflow-auto p-6 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
              <div className="animate-float">
                <Canvas />
              </div>
            </div>
          </div>
          
          {propertiesPanelOpen && <PropertiesPanel />}
        </div>
        
        <Toaster />
      </div>
    </InfographicProvider>
  );
};

export default InfographicEditor;
