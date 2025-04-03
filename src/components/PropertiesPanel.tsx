
import React, { useState, useEffect } from 'react';
import { useInfographic } from '@/contexts/InfographicContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Settings, Move, Palette, Box, Type as TypeIcon, Image as ImageIcon } from 'lucide-react';

const PropertiesPanel: React.FC = () => {
  const { elements, selectedElementId, updateElement } = useInfographic();
  const selectedElement = elements.find(el => el.id === selectedElementId);
  
  const [text, setText] = useState('');
  const [color, setColor] = useState('#000000');
  const [width, setWidth] = useState<number>(100);
  const [height, setHeight] = useState<number>(100);
  
  // Update local state when selected element changes
  useEffect(() => {
    if (selectedElement) {
      setText(selectedElement.content || '');
      setColor(selectedElement.color || '#000000');
      setWidth(selectedElement.width);
      setHeight(selectedElement.height);
    }
  }, [selectedElement]);

  // Handle text change
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    setText(newText);
    if (selectedElementId) {
      updateElement(selectedElementId, { content: newText });
    }
  };

  // Handle color change
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setColor(newColor);
    if (selectedElementId) {
      updateElement(selectedElementId, { color: newColor });
    }
  };

  // Handle width change
  const handleWidthChange = (value: number[]) => {
    const newWidth = value[0];
    setWidth(newWidth);
    if (selectedElementId) {
      updateElement(selectedElementId, { width: newWidth });
    }
  };

  // Handle height change
  const handleHeightChange = (value: number[]) => {
    const newHeight = value[0];
    setHeight(newHeight);
    if (selectedElementId) {
      updateElement(selectedElementId, { height: newHeight });
    }
  };

  // Get element icon based on type
  const getElementIcon = () => {
    if (!selectedElement) return null;
    
    switch (selectedElement.type) {
      case 'text':
        return <TypeIcon className="h-5 w-5 text-infographic-blue" />;
      case 'shape':
        return <Box className="h-5 w-5 text-infographic-purple" />;
      case 'image':
        return <ImageIcon className="h-5 w-5 text-infographic-pink" />;
      default:
        return null;
    }
  };

  // Predefined color palette
  const colorPalette = [
    '#4361EE', // blue
    '#7E69AB', // purple
    '#F72585', // pink
    '#38B2AC', // teal
    '#F97316', // orange
    '#FBBF24', // yellow
    '#10B981', // green
    '#212529', // dark gray
    '#6B7280', // gray
    '#F8F9FA'  // light gray
  ];

  if (!selectedElement) {
    return (
      <div className="w-64 bg-white border-l border-gray-200 p-4 h-full flex flex-col justify-center items-center text-gray-400">
        <Settings className="h-10 w-10 mb-4 opacity-30" />
        <p className="text-center font-medium">Properties Panel</p>
        <p className="text-xs text-center mt-2">Select an element on the canvas to customize it</p>
      </div>
    );
  }

  return (
    <div className="w-64 bg-white border-l border-gray-200 h-full overflow-hidden flex flex-col">
      <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-md bg-gray-100 flex items-center justify-center">
            {getElementIcon()}
          </div>
          <div>
            <h2 className="text-lg font-semibold capitalize">{selectedElement.type}</h2>
            <p className="text-xs text-gray-500">
              {selectedElement.shape ? `Shape: ${selectedElement.shape}` : 'Element Properties'}
            </p>
          </div>
        </div>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          <div className="space-y-4">
            <div className="flex items-center mb-2">
              <Move className="h-4 w-4 text-gray-500 mr-2" />
              <h3 className="font-medium">Dimensions & Position</h3>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="width" className="text-sm text-gray-600">Width</Label>
                  <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">{width}px</span>
                </div>
                <Slider
                  id="width"
                  min={10}
                  max={500}
                  step={1}
                  value={[width]}
                  onValueChange={handleWidthChange}
                  className="cursor-pointer"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="height" className="text-sm text-gray-600">Height</Label>
                  <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">{height}px</span>
                </div>
                <Slider
                  id="height"
                  min={10}
                  max={500}
                  step={1}
                  value={[height]}
                  onValueChange={handleHeightChange}
                  className="cursor-pointer"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="x-position" className="text-xs text-gray-600">X Position</Label>
                  <Input 
                    id="x-position"
                    value={Math.round(selectedElement.x)}
                    disabled
                    className="h-8 text-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="y-position" className="text-xs text-gray-600">Y Position</Label>
                  <Input 
                    id="y-position"
                    value={Math.round(selectedElement.y)}
                    disabled
                    className="h-8 text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <Separator />
          
          {selectedElement.type === 'text' && (
            <div className="space-y-4">
              <div className="flex items-center mb-2">
                <TypeIcon className="h-4 w-4 text-gray-500 mr-2" />
                <h3 className="font-medium">Text Content</h3>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="text" className="text-sm text-gray-600">Content</Label>
                <Input
                  id="text"
                  value={text}
                  onChange={handleTextChange}
                  className="h-8 text-sm"
                />
              </div>
            </div>
          )}
          
          {(selectedElement.type === 'text' || selectedElement.type === 'shape') && (
            <div className="space-y-4">
              <div className="flex items-center mb-2">
                <Palette className="h-4 w-4 text-gray-500 mr-2" />
                <h3 className="font-medium">Color</h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Input
                    id="color"
                    type="color"
                    value={color}
                    onChange={handleColorChange}
                    className="w-12 h-8 p-1 cursor-pointer"
                  />
                  <Input
                    value={color}
                    onChange={handleColorChange}
                    className="flex-1 h-8 text-sm"
                  />
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {colorPalette.map(paletteColor => (
                    <Button
                      key={paletteColor}
                      type="button"
                      className="w-6 h-6 p-0 rounded-full"
                      style={{ backgroundColor: paletteColor }}
                      onClick={() => {
                        setColor(paletteColor);
                        if (selectedElementId) {
                          updateElement(selectedElementId, { color: paletteColor });
                        }
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
          
          <Separator />
          
          <div className="space-y-2">
            <p className="text-xs text-gray-500">Element ID: {selectedElement.id}</p>
            <p className="text-xs text-gray-500">Z-Index: {selectedElement.zIndex}</p>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default PropertiesPanel;
