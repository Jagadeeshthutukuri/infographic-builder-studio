
import React from 'react';
import { InfographicProvider } from '@/contexts/InfographicContext';
import Header from '@/components/Header';
import Toolbar from '@/components/Toolbar';
import Canvas from '@/components/Canvas';
import TemplateSidebar from '@/components/TemplateSidebar';
import PropertiesPanel from '@/components/PropertiesPanel';

const InfographicEditor: React.FC = () => {
  return (
    <InfographicProvider>
      <div className="flex flex-col h-screen bg-gray-100">
        <Header />
        
        <div className="flex-1 flex overflow-hidden">
          <TemplateSidebar />
          
          <div className="flex-1 flex flex-col overflow-hidden">
            <Toolbar />
            
            <div className="flex-1 overflow-auto p-6 flex items-center justify-center">
              <Canvas />
            </div>
          </div>
          
          <PropertiesPanel />
        </div>
      </div>
    </InfographicProvider>
  );
};

export default InfographicEditor;
