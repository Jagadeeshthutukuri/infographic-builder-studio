
import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Info, Github } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-infographic-blue text-white p-4 shadow-md">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-bold">Infographic Builder Studio</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
            <Info className="h-4 w-4 mr-2" />
            Help
          </Button>
          
          <Separator orientation="vertical" className="h-6 bg-white/30" />
          
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
            <Github className="h-4 w-4 mr-2" />
            GitHub
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
