
import React, { useState, useEffect } from 'react';
import { useInfographic } from '@/contexts/InfographicContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

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

  if (!selectedElement) {
    return (
      <div className="w-64 bg-white border-l border-gray-200 p-4 h-full">
        <p className="text-gray-500 text-center">Select an element to edit its properties</p>
      </div>
    );
  }

  return (
    <div className="w-64 bg-white border-l border-gray-200 h-full overflow-hidden flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold">Properties</h2>
        <p className="text-sm text-gray-500">Edit selected element</p>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          <div className="space-y-2">
            <h3 className="font-medium">Element Type</h3>
            <p className="text-sm capitalize">{selectedElement.type}</p>
            {selectedElement.shape && (
              <p className="text-sm capitalize">Shape: {selectedElement.shape}</p>
            )}
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <h3 className="font-medium">Dimensions</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="width">Width: {width}px</Label>
                </div>
                <Slider
                  id="width"
                  min={10}
                  max={500}
                  step={1}
                  value={[width]}
                  onValueChange={handleWidthChange}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="height">Height: {height}px</Label>
                </div>
                <Slider
                  id="height"
                  min={10}
                  max={500}
                  step={1}
                  value={[height]}
                  onValueChange={handleHeightChange}
                />
              </div>
            </div>
          </div>
          
          <Separator />
          
          {selectedElement.type === 'text' && (
            <div className="space-y-2">
              <Label htmlFor="text">Text Content</Label>
              <Input
                id="text"
                value={text}
                onChange={handleTextChange}
              />
            </div>
          )}
          
          {(selectedElement.type === 'text' || selectedElement.type === 'shape') && (
            <div className="space-y-2">
              <Label htmlFor="color">Color</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="color"
                  type="color"
                  value={color}
                  onChange={handleColorChange}
                  className="w-12 h-8 p-1"
                />
                <Input
                  value={color}
                  onChange={handleColorChange}
                  className="flex-1"
                />
              </div>
            </div>
          )}
          
          <Separator />
          
          <div className="space-y-2">
            <h3 className="font-medium">Position</h3>
            <p className="text-sm">X: {Math.round(selectedElement.x)}px</p>
            <p className="text-sm">Y: {Math.round(selectedElement.y)}px</p>
            <p className="text-sm">Z-Index: {selectedElement.zIndex}</p>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default PropertiesPanel;
