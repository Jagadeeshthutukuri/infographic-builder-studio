
import React, { useState, useEffect } from 'react';
import { useInfographic } from '@/contexts/InfographicContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { 
  Settings, 
  Move, 
  Palette, 
  Box, 
  Type as TypeIcon, 
  Image as ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  RotateCw,
  Copy,
  Layers,
  Group
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PropertiesPanel: React.FC = () => {
  const { 
    elements, 
    selectedElementId, 
    updateElement, 
    duplicateElement,
    groupElements,
    ungroupElements
  } = useInfographic();
  const selectedElement = elements.find(el => el.id === selectedElementId);
  
  const [text, setText] = useState('');
  const [color, setColor] = useState('#000000');
  const [width, setWidth] = useState<number>(100);
  const [height, setHeight] = useState<number>(100);
  const [fontSize, setFontSize] = useState<number>(16);
  const [rotation, setRotation] = useState<number>(0);
  
  // Update local state when selected element changes
  useEffect(() => {
    if (selectedElement) {
      setText(selectedElement.content || '');
      setColor(selectedElement.color || '#000000');
      setWidth(selectedElement.width);
      setHeight(selectedElement.height);
      setFontSize(selectedElement.fontSize || 16);
      setRotation(selectedElement.rotation || 0);
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

  // Handle font size change
  const handleFontSizeChange = (value: number[]) => {
    const newFontSize = value[0];
    setFontSize(newFontSize);
    if (selectedElementId && selectedElement?.type === 'text') {
      updateElement(selectedElementId, { fontSize: newFontSize });
    }
  };

  // Handle rotation change
  const handleRotationChange = (value: number[]) => {
    const newRotation = value[0];
    setRotation(newRotation);
    if (selectedElementId) {
      updateElement(selectedElementId, { rotation: newRotation });
    }
  };

  // Handle text alignment
  const handleTextAlign = (value: 'left' | 'center' | 'right') => {
    if (selectedElementId && selectedElement?.type === 'text') {
      updateElement(selectedElementId, { textAlign: value });
    }
  };

  // Handle font style
  const handleFontStyle = (style: 'normal' | 'italic') => {
    if (selectedElementId && selectedElement?.type === 'text') {
      updateElement(selectedElementId, { fontStyle: style });
    }
  };

  // Handle font weight
  const handleFontWeight = (weight: 'normal' | 'bold' | 'light') => {
    if (selectedElementId && selectedElement?.type === 'text') {
      updateElement(selectedElementId, { fontWeight: weight });
    }
  };

  // Handle duplicate
  const handleDuplicate = () => {
    if (selectedElementId) {
      duplicateElement(selectedElementId);
    }
  };

  // Handle group creation
  const handleCreateGroup = () => {
    // In a real implementation, you'd have a way to multi-select elements
    // Here we'll just group the selected element with the next one as a demo
    if (selectedElementId) {
      const selectedIndex = elements.findIndex(el => el.id === selectedElementId);
      if (selectedIndex >= 0 && selectedIndex < elements.length - 1) {
        const nextElement = elements[selectedIndex + 1];
        groupElements([selectedElementId, nextElement.id]);
      }
    }
  };

  // Handle ungroup
  const handleUngroup = () => {
    if (selectedElementId && selectedElement?.type === 'group') {
      ungroupElements(selectedElementId);
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
      case 'group':
        return <Group className="h-5 w-5 text-infographic-teal" />;
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
        
        {/* Quick actions */}
        <div className="flex items-center mt-3 space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={handleDuplicate}
          >
            <Copy className="h-3.5 w-3.5 mr-1" />
            Duplicate
          </Button>
          
          {selectedElement.type === 'group' ? (
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1"
              onClick={handleUngroup}
            >
              <Layers className="h-3.5 w-3.5 mr-1" />
              Ungroup
            </Button>
          ) : (
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1"
              onClick={handleCreateGroup}
            >
              <Group className="h-3.5 w-3.5 mr-1" />
              Group
            </Button>
          )}
        </div>
      </div>
      
      <ScrollArea className="flex-1">
        <Tabs defaultValue="style" className="w-full">
          <div className="px-4 pt-4">
            <TabsList className="w-full">
              <TabsTrigger value="style" className="flex-1">Style</TabsTrigger>
              <TabsTrigger value="position" className="flex-1">Position</TabsTrigger>
              {selectedElement.type === 'text' && (
                <TabsTrigger value="text" className="flex-1">Text</TabsTrigger>
              )}
            </TabsList>
          </div>
          
          <TabsContent value="position" className="p-4 space-y-6">
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
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="rotation" className="text-sm text-gray-600">
                      <RotateCw className="h-3.5 w-3.5 inline mr-1" />
                      Rotation
                    </Label>
                    <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">{rotation}°</span>
                  </div>
                  <Slider
                    id="rotation"
                    min={0}
                    max={360}
                    step={1}
                    value={[rotation]}
                    onValueChange={handleRotationChange}
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
          </TabsContent>
          
          <TabsContent value="style" className="p-4 space-y-6">
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
          </TabsContent>
          
          {selectedElement.type === 'text' && (
            <TabsContent value="text" className="p-4 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center mb-2">
                  <TypeIcon className="h-4 w-4 text-gray-500 mr-2" />
                  <h3 className="font-medium">Text Properties</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="text" className="text-sm text-gray-600">Content</Label>
                    <Input
                      id="text"
                      value={text}
                      onChange={handleTextChange}
                      className="h-8 text-sm"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="font-size" className="text-sm text-gray-600">Font Size</Label>
                      <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">{fontSize}px</span>
                    </div>
                    <Slider
                      id="font-size"
                      min={8}
                      max={72}
                      step={1}
                      value={[fontSize]}
                      onValueChange={handleFontSizeChange}
                      className="cursor-pointer"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="text-align" className="text-sm text-gray-600">Text Alignment</Label>
                    <div className="flex items-center space-x-2">
                      <Button
                        type="button"
                        variant={selectedElement.textAlign === 'left' ? 'default' : 'outline'}
                        size="sm"
                        className="flex-1"
                        onClick={() => handleTextAlign('left')}
                      >
                        <AlignLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        variant={selectedElement.textAlign === 'center' ? 'default' : 'outline'}
                        size="sm"
                        className="flex-1"
                        onClick={() => handleTextAlign('center')}
                      >
                        <AlignCenter className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        variant={selectedElement.textAlign === 'right' ? 'default' : 'outline'}
                        size="sm"
                        className="flex-1"
                        onClick={() => handleTextAlign('right')}
                      >
                        <AlignRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <div className="flex-1 space-y-2">
                      <Label htmlFor="font-weight" className="text-sm text-gray-600">Weight</Label>
                      <Select 
                        value={selectedElement.fontWeight || 'normal'} 
                        onValueChange={(value) => handleFontWeight(value as 'normal' | 'bold' | 'light')}
                      >
                        <SelectTrigger className="h-8 text-sm">
                          <SelectValue placeholder="Normal" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="normal">Normal</SelectItem>
                          <SelectItem value="bold">Bold</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex-1 space-y-2">
                      <Label htmlFor="font-style" className="text-sm text-gray-600">Style</Label>
                      <Select 
                        value={selectedElement.fontStyle || 'normal'} 
                        onValueChange={(value) => handleFontStyle(value as 'normal' | 'italic')}
                      >
                        <SelectTrigger className="h-8 text-sm">
                          <SelectValue placeholder="Normal" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="normal">Normal</SelectItem>
                          <SelectItem value="italic">Italic</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          )}
        </Tabs>
      </ScrollArea>
    </div>
  );
};

export default PropertiesPanel;
