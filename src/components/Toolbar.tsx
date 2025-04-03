
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
  Download,
  Camera,
  Layers,
  Palette
} from 'lucide-react';
import { useInfographic } from '@/contexts/InfographicContext';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Separator } from '@/components/ui/separator';

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
    const colors = {
      rect: '#4361EE',
      circle: '#F72585',
      triangle: '#7E69AB'
    };
    
    addElement({
      type: 'shape',
      shape,
      x: 100,
      y: 100,
      width: 100,
      height: 100,
      color: colors[shape]
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
    <div className="bg-white p-3 border-b border-gray-200 flex items-center space-x-2 shadow-sm">
      <TooltipProvider delayDuration={300}>
        <div className="flex items-center space-x-1 bg-gray-50 rounded-md p-1 mr-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-md h-8 w-8 text-gray-700 hover:bg-white hover:text-infographic-blue" onClick={() => handleAddShape('rect')}>
                <Square className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">Add Rectangle</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-md h-8 w-8 text-gray-700 hover:bg-white hover:text-infographic-purple" onClick={() => handleAddShape('circle')}>
                <Circle className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">Add Circle</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-md h-8 w-8 text-gray-700 hover:bg-white hover:text-infographic-pink" onClick={() => handleAddShape('triangle')}>
                <Triangle className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">Add Triangle</TooltipContent>
          </Tooltip>
        </div>

        <div className="flex items-center space-x-1 bg-gray-50 rounded-md p-1 mr-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-md h-8 w-8 text-gray-700 hover:bg-white hover:text-infographic-blue" onClick={handleAddText}>
                <Type className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">Add Text</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-md h-8 w-8 text-gray-700 hover:bg-white hover:text-infographic-blue" onClick={handleAddImage}>
                <Image className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">Add Image</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-md h-8 w-8 text-gray-700 hover:bg-white hover:text-infographic-blue">
                <Palette className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">Color Palette</TooltipContent>
          </Tooltip>
        </div>

        <Separator orientation="vertical" className="h-8 mx-1" />

        {/* Element manipulation buttons (only enabled when an element is selected) */}
        <div className="flex items-center space-x-1 bg-gray-50 rounded-md p-1 mr-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-md h-8 w-8 text-gray-700 hover:bg-white hover:text-red-500"
                disabled={!selectedElementId}
                onClick={() => selectedElementId && removeElement(selectedElementId)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">Delete Selected</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-md h-8 w-8 text-gray-700 hover:bg-white hover:text-infographic-blue"
                disabled={!selectedElementId}
                onClick={() => selectedElementId && changeElementZIndex(selectedElementId, 'forward')}
              >
                <MoveUp className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">Bring Forward</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                className="rounded-md h-8 w-8 text-gray-700 hover:bg-white hover:text-infographic-blue"
                disabled={!selectedElementId}
                onClick={() => selectedElementId && changeElementZIndex(selectedElementId, 'backward')}
              >
                <MoveDown className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">Send Backward</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                className="rounded-md h-8 w-8 text-gray-700 hover:bg-white hover:text-infographic-blue"
                disabled={!selectedElementId}
              >
                <Layers className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">Manage Layers</TooltipContent>
          </Tooltip>
        </div>

        <Separator orientation="vertical" className="h-8 mx-1" />

        {/* Canvas actions */}
        <div className="flex items-center space-x-1 bg-gray-50 rounded-md p-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-md h-8 w-8 text-gray-700 hover:bg-white hover:text-amber-500" onClick={clearCanvas}>
                <RotateCcw className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">Clear Canvas</TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-md h-8 w-8 text-gray-700 hover:bg-white hover:text-green-500">
                <Camera className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">Take Screenshot</TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-md h-8 w-8 text-gray-700 hover:bg-white hover:text-infographic-blue" onClick={handleExport}>
                <Download className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">Export Infographic</TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  );
};

export default Toolbar;
