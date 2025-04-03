
import React from 'react';
import { 
  Square, 
  Circle, 
  Triangle, 
  Type, 
  Image, 
  Trash2, 
  MoveUp, 
  MoveDown, 
  RotateCcw,
  Download
} from 'lucide-react';
import { useInfographic } from '@/contexts/InfographicContext';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const Toolbar: React.FC = () => {
  const { 
    addElement, 
    removeElement, 
    selectedElementId, 
    changeElementZIndex,
    clearCanvas
  } = useInfographic();

  // Handle adding new elements
  const handleAddShape = (shape: 'rect' | 'circle' | 'triangle') => {
    addElement({
      type: 'shape',
      shape,
      x: 100,
      y: 100,
      width: 100,
      height: 100,
      color: shape === 'rect' ? '#4361EE' : shape === 'circle' ? '#F72585' : '#3F37C9'
    });
  };

  const handleAddText = () => {
    addElement({
      type: 'text',
      x: 100,
      y: 100,
      width: 200,
      height: 50,
      content: 'Double click to edit',
      color: '#212529'
    });
  };

  const handleAddImage = () => {
    // In a real app, this would open a file picker
    addElement({
      type: 'image',
      x: 100,
      y: 100,
      width: 200,
      height: 200,
      imageUrl: '/placeholder.svg'
    });
  };

  // Export the infographic as an image
  const handleExport = () => {
    // In a real implementation, this would use html2canvas or a similar library
    // to capture the canvas content and download it
    alert('Export functionality would be implemented here');
  };

  return (
    <div className="bg-white p-4 border-b border-gray-200 flex items-center space-x-2">
      <TooltipProvider>
        <div className="border-r pr-2 mr-2 flex space-x-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" onClick={() => handleAddShape('rect')}>
                <Square className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Add Rectangle</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" onClick={() => handleAddShape('circle')}>
                <Circle className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Add Circle</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" onClick={() => handleAddShape('triangle')}>
                <Triangle className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Add Triangle</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" onClick={handleAddText}>
                <Type className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Add Text</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" onClick={handleAddImage}>
                <Image className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Add Image</TooltipContent>
          </Tooltip>
        </div>

        {/* Element manipulation buttons (only enabled when an element is selected) */}
        <div className="border-r pr-2 mr-2 flex space-x-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="icon" 
                disabled={!selectedElementId}
                onClick={() => selectedElementId && removeElement(selectedElementId)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Delete Selected</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="icon" 
                disabled={!selectedElementId}
                onClick={() => selectedElementId && changeElementZIndex(selectedElementId, 'forward')}
              >
                <MoveUp className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Bring Forward</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="icon" 
                disabled={!selectedElementId}
                onClick={() => selectedElementId && changeElementZIndex(selectedElementId, 'backward')}
              >
                <MoveDown className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Send Backward</TooltipContent>
          </Tooltip>
        </div>

        {/* Canvas actions */}
        <div className="flex space-x-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" onClick={clearCanvas}>
                <RotateCcw className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Clear Canvas</TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" onClick={handleExport}>
                <Download className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Export Infographic</TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  );
};

export default Toolbar;
