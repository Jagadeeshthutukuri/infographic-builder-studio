
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

  // Display a helper message if the canvas is empty
  const isEmpty = elements.length === 0;

  return (
    <div className="relative">
      {/* Canvas container with shadow and rounded corners */}
      <div 
        className="relative bg-white border border-gray-200 shadow-lg rounded-md overflow-hidden"
        style={{ width: canvasSize.width, height: canvasSize.height }}
      >
        {/* Grid background */}
        <div 
          className="absolute inset-0 bg-[linear-gradient(#ddd_1px,transparent_1px),linear-gradient(90deg,#ddd_1px,transparent_1px)] bg-[size:20px_20px]"
        />
        
        {/* Canvas content */}
        <div
          ref={canvasRef}
          className="relative w-full h-full z-10"
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
          
          {/* Empty state */}
          {isEmpty && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-4 opacity-50">
                <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <p className="text-lg font-medium">Your Canvas is Empty</p>
              <p className="text-sm max-w-xs text-center mt-2">
                Add shapes, text, or images from the toolbar above, or select a template from the sidebar
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* Canvas size indicator */}
      <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm text-xs text-gray-500 py-1 px-2 rounded shadow-sm border border-gray-200">
        {canvasSize.width} × {canvasSize.height}px
      </div>
    </div>
  );
};

export default Canvas;
