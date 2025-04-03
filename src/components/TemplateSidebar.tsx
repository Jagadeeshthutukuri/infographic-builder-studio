
import React from 'react';
import { useInfographic } from '@/contexts/InfographicContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

const TemplateSidebar: React.FC = () => {
  const { templates, applyTemplate, activeTemplate } = useInfographic();

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full overflow-hidden flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold">Templates</h2>
        <p className="text-sm text-gray-500">Choose a template to start with</p>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-4 grid gap-4">
          {templates.map(template => (
            <Card 
              key={template.id}
              className={`overflow-hidden cursor-pointer transition-all hover:ring-2 hover:ring-infographic-blue ${
                activeTemplate?.id === template.id ? 'ring-2 ring-infographic-blue' : ''
              }`}
              onClick={() => applyTemplate(template.id)}
            >
              <CardContent className="p-2">
                <div className="aspect-video bg-gray-100 mb-2 flex items-center justify-center overflow-hidden">
                  <img 
                    src={template.thumbnail} 
                    alt={template.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-sm font-medium">{template.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default TemplateSidebar;
