
import React, { useState, useRef, useEffect } from 'react';
import { useInfographic, InfographicElement } from '@/contexts/InfographicContext';

interface ElementProps {
  element: InfographicElement;
  isSelected: boolean;
}

const Element: React.FC<ElementProps> = ({ element, isSelected }) => {
  const { updateElement, selectElement } = useInfographic();
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const elementRef = useRef<HTMLDivElement>(null);

  // Handle element click
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    selectElement(element.id);
  };

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

  // Global mouse events for dragging
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
      const rect = elementRef.current?.parentElement?.getBoundingClientRect();
      if (rect) {
        const x = e.clientX - rect.left - dragOffset.x;
        const y = e.clientY - rect.top - dragOffset.y;
        
        updateElement(element.id, { x, y });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, element.id, updateElement]);

  // Render element based on type
  const renderElement = () => {
    switch (element.type) {
      case 'text':
        return (
          <div 
            className="w-full h-full flex items-center justify-center overflow-hidden"
            style={{ color: element.color || '#000000' }}
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
      default:
        return null;
    }
  };

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
        transition: isDragging ? 'none' : 'all 0.1s ease'
      }}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
    >
      {renderElement()}
    </div>
  );
};

export default Element;
