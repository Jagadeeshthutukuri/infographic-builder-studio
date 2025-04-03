
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
  Palette,
  Copy,
  Group,
  Scissors,
  Save,
  ZoomIn,
  ZoomOut,
  MousePointer
} from 'lucide-react';
import { useInfographic } from '@/contexts/InfographicContext';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

const Toolbar: React.FC = () => {
  const { 
    addElement, 
    removeElement, 
    selectedElementId,
    changeElementZIndex,
    clearCanvas,
    duplicateElement,
    elements,
    groupElements,
    ungroupElements
  } = useInfographic();
  
  const { toast } = useToast();

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
    
    toast({
      title: 'Shape Added',
      description: `A new ${shape} shape has been added to your canvas.`,
      duration: 2000
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
      color: '#212529',
      fontSize: 16,
      fontWeight: 'normal',
      textAlign: 'left'
    });
    
    toast({
      title: 'Text Added',
      description: 'Double-click on the text to edit it.',
      duration: 2000
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
    
    toast({
      title: 'Image Added',
      description: 'A placeholder image has been added. In a full app, you would be able to upload your own images.',
      duration: 3000
    });
  };

  // Handle grouping elements
  const handleGroupElements = () => {
    // In a real app, you'd have multi-select capability
    // For this demo, we'll group the selected element with the next element
    if (selectedElementId) {
      const selectedIndex = elements.findIndex(el => el.id === selectedElementId);
      if (selectedIndex >= 0 && selectedIndex < elements.length - 1) {
        const nextElement = elements[selectedIndex + 1];
        groupElements([selectedElementId, nextElement.id]);
        
        toast({
          title: 'Elements Grouped',
          description: 'Selected elements have been grouped together.',
          duration: 2000
        });
      } else {
        toast({
          title: 'Cannot Group',
          description: 'You need at least two elements to create a group.',
          variant: 'destructive',
          duration: 2000
        });
      }
    }
  };

  // Handle ungrouping elements
  const handleUngroupElements = () => {
    if (selectedElementId) {
      const element = elements.find(el => el.id === selectedElementId);
      if (element?.type === 'group') {
        ungroupElements(selectedElementId);
        
        toast({
          title: 'Group Disbanded',
          description: 'The group has been split into individual elements.',
          duration: 2000
        });
      } else {
        toast({
          title: 'Not a Group',
          description: 'The selected element is not a group.',
          variant: 'destructive',
          duration: 2000
        });
      }
    }
  };

  // Handle duplicating element
  const handleDuplicateElement = () => {
    if (selectedElementId) {
      duplicateElement(selectedElementId);
      
      toast({
        title: 'Element Duplicated',
        description: 'A copy of the selected element has been created.',
        duration: 2000
      });
    }
  };

  // Export the infographic as an image
  const handleExport = () => {
    // In a real implementation, this would use html2canvas or a similar library
    // to capture the canvas content and download it
    toast({
      title: 'Export Functionality',
      description: 'In a full implementation, this would export your infographic as an image.',
      duration: 3000
    });
  };

  // Save the project
  const handleSave = () => {
    // In a real implementation, this would save to a database or local storage
    toast({
      title: 'Project Saved',
      description: 'Your project has been saved successfully.',
      duration: 2000
    });
  };

  return (
    <div className="bg-white p-3 border-b border-gray-200 flex items-center space-x-2 shadow-sm">
      <TooltipProvider delayDuration={300}>
        {/* Selection Tool */}
        <div className="bg-gray-50 rounded-md p-1 mr-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-md h-8 w-8 text-gray-700 hover:bg-white hover:text-infographic-blue">
                <MousePointer className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">Selection Tool</TooltipContent>
          </Tooltip>
        </div>
        
        {/* Shapes */}
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

        {/* Content elements */}
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
                className="rounded-md h-8 w-8 text-gray-700 hover:bg-white hover:text-infographic-teal"
                disabled={!selectedElementId}
                onClick={handleDuplicateElement}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">Duplicate Element</TooltipContent>
          </Tooltip>
        </div>

        {/* Group operations */}
        <div className="flex items-center space-x-1 bg-gray-50 rounded-md p-1 mr-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                className="rounded-md h-8 w-8 text-gray-700 hover:bg-white hover:text-infographic-blue"
                disabled={!selectedElementId}
                onClick={handleGroupElements}
              >
                <Group className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">Group Elements</TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                className="rounded-md h-8 w-8 text-gray-700 hover:bg-white hover:text-infographic-blue"
                disabled={!selectedElementId}
                onClick={handleUngroupElements}
              >
                <Scissors className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">Ungroup Elements</TooltipContent>
          </Tooltip>
        </div>

        <Separator orientation="vertical" className="h-8 mx-1" />

        {/* Zoom controls */}
        <div className="flex items-center space-x-1 bg-gray-50 rounded-md p-1 mr-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-md h-8 w-8 text-gray-700 hover:bg-white hover:text-infographic-blue">
                <ZoomIn className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">Zoom In</TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-md h-8 w-8 text-gray-700 hover:bg-white hover:text-infographic-blue">
                <ZoomOut className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">Zoom Out</TooltipContent>
          </Tooltip>
        </div>

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
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-md h-8 w-8 text-gray-700 hover:bg-white hover:text-infographic-teal" onClick={handleSave}>
                <Save className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">Save Project</TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  );
};

export default Toolbar;
