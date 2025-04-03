
import React from 'react';
import { useInfographic } from '@/contexts/InfographicContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sparkles } from 'lucide-react';

const TemplateSidebar: React.FC = () => {
  const { templates, applyTemplate, activeTemplate } = useInfographic();

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full overflow-hidden flex flex-col">
      <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
        <h2 className="text-lg font-semibold flex items-center">
          <Sparkles className="w-4 h-4 mr-2 text-infographic-purple" />
          Templates
        </h2>
        <p className="text-sm text-gray-500">Start with a professionally designed template</p>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-4 grid gap-4">
          {templates.map(template => (
            <Card 
              key={template.id}
              className={`overflow-hidden cursor-pointer transition-all hover:shadow-md ${
                activeTemplate?.id === template.id 
                  ? 'ring-2 ring-infographic-blue shadow-sm' 
                  : 'hover:ring-1 hover:ring-infographic-blue/50'
              }`}
              onClick={() => applyTemplate(template.id)}
            >
              <CardContent className="p-2">
                <div className="aspect-video bg-gray-100 mb-2 flex items-center justify-center overflow-hidden rounded-sm">
                  <img 
                    src={template.thumbnail} 
                    alt={template.name}
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium">{template.name}</p>
                  {activeTemplate?.id === template.id && (
                    <span className="bg-infographic-blue/10 text-infographic-blue text-xs px-2 py-0.5 rounded-full">
                      Active
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
      
      <div className="p-3 border-t border-gray-200 bg-gray-50">
        <Button 
          variant="outline" 
          className="w-full justify-center text-gray-600 hover:text-infographic-blue hover:border-infographic-blue/50"
        >
          Browse More Templates
        </Button>
      </div>
    </div>
  );
};

export default TemplateSidebar;
