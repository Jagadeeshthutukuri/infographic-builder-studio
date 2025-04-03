
import React from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface WelcomeScreenProps {
  onClose: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl overflow-hidden animate-slide-in">
        <div className="relative">
          <div className="absolute top-4 right-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className="rounded-full w-8 h-8 p-0" 
              onClick={onClose}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="bg-gradient-to-r from-infographic-purple to-infographic-blue p-8 text-white">
            <h1 className="text-3xl font-bold">Welcome to InfographStudio</h1>
            <p className="mt-2 opacity-90">Create stunning infographics in minutes, no design skills required!</p>
          </div>
          
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <FeatureCard 
                title="Drag & Drop" 
                description="Easily drag elements onto your canvas to create beautiful designs"
                icon={
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 5V19" stroke="#7E69AB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M19 12H5" stroke="#7E69AB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                }
              />
              
              <FeatureCard 
                title="Templates" 
                description="Start with professional templates for quick results"
                icon={
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="3" width="18" height="18" rx="2" stroke="#7E69AB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3 9H21" stroke="#7E69AB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 21V9" stroke="#7E69AB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                }
              />
              
              <FeatureCard 
                title="Export" 
                description="Download your creations to share with the world"
                icon={
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="#7E69AB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7 10L12 15L17 10" stroke="#7E69AB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 15V3" stroke="#7E69AB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                }
              />
            </div>
            
            <div className="flex justify-center">
              <Button 
                className="bg-gradient-to-r from-infographic-purple to-infographic-blue hover:opacity-90 transition-opacity" 
                size="lg"
                onClick={onClose}
              >
                Start Creating Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard: React.FC<{
  title: string;
  description: string;
  icon: React.ReactNode;
}> = ({ title, description, icon }) => {
  return (
    <div className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-md transition-shadow">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
};

export default WelcomeScreen;
