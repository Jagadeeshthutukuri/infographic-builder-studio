
import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Info, Github, Share2, Save, FileJson } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-infographic-purple to-infographic-blue p-4 shadow-md">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="bg-white rounded-full p-2 shadow-sm">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L5 6V18L12 22L19 18V6L12 2Z" stroke="#4361EE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 22V14" stroke="#4361EE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M19 6L12 14L5 6" stroke="#4361EE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 className="text-xl font-bold text-white">Infograph<span className="text-gray-100 font-light">Studio</span></h1>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="secondary" size="sm" className="bg-white/10 text-white hover:bg-white/20 border-none">
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
          
          <Button variant="secondary" size="sm" className="bg-white/10 text-white hover:bg-white/20 border-none">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          
          <Button variant="secondary" size="sm" className="bg-white/10 text-white hover:bg-white/20 border-none">
            <FileJson className="h-4 w-4 mr-2" />
            Export
          </Button>
          
          <Separator orientation="vertical" className="h-6 bg-white/30" />
          
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 border-none">
            <Info className="h-4 w-4 mr-2" />
            Help
          </Button>
          
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 border-none">
            <Github className="h-4 w-4 mr-2" />
            GitHub
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
