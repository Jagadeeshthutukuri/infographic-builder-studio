
import React, { useRef } from 'react';
import { useInfographic, InfographicElement } from '@/contexts/InfographicContext';
import Element from '@/components/Element';

const Canvas: React.FC = () => {
  const { 
    canvasSize, 
    elements, 
    selectedElementId, 
    selectElement 
  } = useInfographic();
  
  const canvasRef = useRef<HTMLDivElement>(null);

  // Handle canvas click (deselect when clicking the canvas background)
  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === canvasRef.current) {
      selectElement(null);
    }
  };

  // Sort elements by z-index for proper rendering
  const sortedElements = [...elements].sort((a, b) => a.zIndex - b.zIndex);

  return (
    <div 
      ref={canvasRef}
      className="relative bg-white border border-gray-200 shadow-md overflow-hidden"
      style={{ width: canvasSize.width, height: canvasSize.height }}
      onClick={handleCanvasClick}
    >
      {/* Render all elements */}
      {sortedElements.map(element => (
        <Element 
          key={element.id}
          element={element}
          isSelected={element.id === selectedElementId}
        />
      ))}
    </div>
  );
};

export default Canvas;
