
import React, { useState, useRef, useEffect } from 'react';
import { useInfographic, InfographicElement } from '@/contexts/InfographicContext';
import { RotateCw } from 'lucide-react';

interface ElementProps {
  element: InfographicElement;
  isSelected: boolean;
}

const Element: React.FC<ElementProps> = ({ element, isSelected }) => {
  const { 
    updateElement, 
    selectElement, 
    isEditingText,
    startTextEditing,
    finishTextEditing 
  } = useInfographic();
  
  const [isDragging, setIsDragging] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [editableText, setEditableText] = useState(element.content || '');
  const elementRef = useRef<HTMLDivElement>(null);
  const textInputRef = useRef<HTMLTextAreaElement>(null);

  // Handle element click
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isEditingText) {
      selectElement(element.id);
    }
  };

  // Double click for text editing
  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (element.type === 'text') {
      startTextEditing();
      if (textInputRef.current) {
        textInputRef.current.focus();
      }
    }
  };

  // Update text while editing
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditableText(e.target.value);
  };

  // Finish text editing
  const handleTextBlur = () => {
    finishTextEditing();
    updateElement(element.id, { content: editableText });
  };

  // Prevent propagation of keyboard events during text editing
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isEditingText) {
      e.stopPropagation();
      // Save on Enter key (without shift)
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        finishTextEditing();
        updateElement(element.id, { content: editableText });
      }
    }
  };

  // Update local text state when element content changes
  useEffect(() => {
    setEditableText(element.content || '');
  }, [element.content]);

  // Focus text input when editing starts
  useEffect(() => {
    if (isEditingText && element.type === 'text' && isSelected && textInputRef.current) {
      textInputRef.current.focus();
    }
  }, [isEditingText, isSelected, element.type]);

  // Drag start
  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (e.button !== 0) return; // Only left mouse button
    
    setIsDragging(true);
    const rect = elementRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  // Handle rotation
  const handleRotateMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsRotating(true);
  };

  // Global mouse events for dragging and rotating
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging && !isRotating) return;
      
      const rect = elementRef.current?.parentElement?.getBoundingClientRect();
      if (rect) {
        if (isDragging) {
          const x = e.clientX - rect.left - dragOffset.x;
          const y = e.clientY - rect.top - dragOffset.y;
          updateElement(element.id, { x, y });
        } else if (isRotating && elementRef.current) {
          const elementRect = elementRef.current.getBoundingClientRect();
          const elementCenterX = elementRect.left + elementRect.width / 2;
          const elementCenterY = elementRect.top + elementRect.height / 2;
          
          // Calculate angle between center of element and mouse position
          const angle = Math.atan2(
            e.clientY - elementCenterY,
            e.clientX - elementCenterX
          ) * (180 / Math.PI);
          
          updateElement(element.id, { rotation: angle });
        }
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsRotating(false);
    };

    if (isDragging || isRotating) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isRotating, dragOffset, element.id, updateElement]);

  // Render element based on type
  const renderElement = () => {
    switch (element.type) {
      case 'text':
        return isEditingText && isSelected ? (
          <textarea
            ref={textInputRef}
            className="w-full h-full resize-none bg-transparent border-none outline-none p-0 m-0 overflow-hidden"
            value={editableText}
            onChange={handleTextChange}
            onBlur={handleTextBlur}
            onKeyDown={handleKeyDown}
            style={{ 
              color: element.color || '#000000',
              fontSize: element.fontSize ? `${element.fontSize}px` : 'inherit',
              fontWeight: element.fontWeight || 'normal',
              fontStyle: element.fontStyle || 'normal',
              textAlign: element.textAlign || 'left'
            }}
          />
        ) : (
          <div 
            className="w-full h-full flex items-center justify-center overflow-hidden cursor-text"
            style={{ 
              color: element.color || '#000000',
              fontSize: element.fontSize ? `${element.fontSize}px` : 'inherit',
              fontWeight: element.fontWeight || 'normal',
              fontStyle: element.fontStyle || 'normal',
              textAlign: element.textAlign || 'left'
            }}
            onDoubleClick={handleDoubleClick}
          >
            {element.content}
          </div>
        );
      case 'shape':
        if (element.shape === 'circle') {
          return (
            <div 
              className="rounded-full w-full h-full"
              style={{ backgroundColor: element.color || '#4361EE' }}
            />
          );
        } else if (element.shape === 'triangle') {
          return (
            <div 
              className="w-0 h-0"
              style={{ 
                borderLeft: `${element.width / 2}px solid transparent`,
                borderRight: `${element.width / 2}px solid transparent`,
                borderBottom: `${element.height}px solid ${element.color || '#4361EE'}`
              }}
            />
          );
        } else {
          // Default rectangle
          return (
            <div 
              className="w-full h-full"
              style={{ backgroundColor: element.color || '#4361EE' }}
            />
          );
        }
      case 'image':
        return (
          <img 
            src={element.imageUrl || '/placeholder.svg'} 
            alt="Infographic element" 
            className="w-full h-full object-cover"
          />
        );
      case 'group':
        return (
          <div className="w-full h-full border-2 border-dashed border-gray-400 bg-transparent">
            {/* Optional: Show a label or icon for group */}
            <div className="absolute bottom-2 right-2 text-xs bg-white px-1 rounded">Group</div>
          </div>
        );
      default:
        return null;
    }
  };

  // Rotation control for selected elements
  const rotationControl = isSelected && element.type !== 'group' ? (
    <div 
      className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white rounded-full border border-infographic-blue flex items-center justify-center cursor-pointer hover:bg-gray-100 text-infographic-blue"
      onMouseDown={handleRotateMouseDown}
    >
      <RotateCw className="w-3 h-3" />
    </div>
  ) : null;

  return (
    <div
      ref={elementRef}
      className={`absolute ${isDragging ? 'cursor-grabbing' : 'cursor-grab'} ${
        isSelected ? 'ring-2 ring-infographic-blue ring-offset-2' : ''
      }`}
      style={{
        left: element.x,
        top: element.y,
        width: element.width,
        height: element.height,
        zIndex: element.zIndex,
        transform: element.rotation ? `rotate(${element.rotation}deg)` : 'none',
        transition: isDragging || isRotating ? 'none' : 'all 0.1s ease'
      }}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
    >
      {renderElement()}
      {rotationControl}
    </div>
  );
};

export default Element;
