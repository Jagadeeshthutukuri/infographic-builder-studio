
import React, { createContext, useContext, useState, useEffect } from 'react';

// Define element types
export type ElementType = 'text' | 'shape' | 'image';

export interface InfographicElement {
  id: string;
  type: ElementType;
  x: number;
  y: number;
  width: number;
  height: number;
  content?: string;
  color?: string;
  shape?: 'circle' | 'rect' | 'triangle';
  imageUrl?: string;
  zIndex: number;
}

export interface Template {
  id: string;
  name: string;
  thumbnail: string;
  elements: InfographicElement[];
}

interface InfographicContextType {
  canvasSize: { width: number; height: number };
  elements: InfographicElement[];
  selectedElementId: string | null;
  templates: Template[];
  activeTemplate: Template | null;
  
  addElement: (element: Omit<InfographicElement, 'id' | 'zIndex'>) => void;
  updateElement: (id: string, updates: Partial<InfographicElement>) => void;
  removeElement: (id: string) => void;
  selectElement: (id: string | null) => void;
  changeElementZIndex: (id: string, direction: 'forward' | 'backward') => void;
  applyTemplate: (templateId: string) => void;
  clearCanvas: () => void;
}

const InfographicContext = createContext<InfographicContextType | undefined>(undefined);

// Basic templates
const defaultTemplates: Template[] = [
  {
    id: 'blank',
    name: 'Blank Canvas',
    thumbnail: '/placeholder.svg',
    elements: []
  },
  {
    id: 'data-comparison',
    name: 'Data Comparison',
    thumbnail: '/placeholder.svg',
    elements: [
      {
        id: 'title',
        type: 'text',
        x: 300,
        y: 50,
        width: 400,
        height: 50,
        content: 'Data Comparison',
        color: '#212529',
        zIndex: 1
      },
      {
        id: 'shape-1',
        type: 'shape',
        x: 200,
        y: 150,
        width: 200,
        height: 200,
        shape: 'circle',
        color: '#4361EE',
        zIndex: 0
      },
      {
        id: 'shape-2',
        type: 'shape',
        x: 500,
        y: 150,
        width: 200,
        height: 200,
        shape: 'circle',
        color: '#F72585',
        zIndex: 0
      }
    ]
  },
  {
    id: 'process-flow',
    name: 'Process Flow',
    thumbnail: '/placeholder.svg',
    elements: [
      {
        id: 'title',
        type: 'text',
        x: 300,
        y: 50,
        width: 400,
        height: 50,
        content: 'Process Flow',
        color: '#212529',
        zIndex: 2
      },
      {
        id: 'step-1',
        type: 'shape',
        x: 150,
        y: 150,
        width: 150,
        height: 100,
        shape: 'rect',
        color: '#4361EE',
        zIndex: 0
      },
      {
        id: 'step-2',
        type: 'shape',
        x: 400,
        y: 150,
        width: 150,
        height: 100,
        shape: 'rect',
        color: '#3F37C9',
        zIndex: 0
      },
      {
        id: 'step-3',
        type: 'shape',
        x: 650,
        y: 150,
        width: 150,
        height: 100,
        shape: 'rect',
        color: '#F72585',
        zIndex: 0
      },
      {
        id: 'text-1',
        type: 'text',
        x: 175,
        y: 190,
        width: 100,
        height: 30,
        content: 'Step 1',
        color: '#FFFFFF',
        zIndex: 1
      },
      {
        id: 'text-2',
        type: 'text',
        x: 425,
        y: 190,
        width: 100,
        height: 30,
        content: 'Step 2',
        color: '#FFFFFF',
        zIndex: 1
      },
      {
        id: 'text-3',
        type: 'text',
        x: 675,
        y: 190,
        width: 100,
        height: 30,
        content: 'Step 3',
        color: '#FFFFFF',
        zIndex: 1
      }
    ]
  }
];

export const InfographicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [canvasSize, setCanvasSize] = useState({ width: 1000, height: 600 });
  const [elements, setElements] = useState<InfographicElement[]>([]);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const [templates] = useState<Template[]>(defaultTemplates);
  const [activeTemplate, setActiveTemplate] = useState<Template | null>(defaultTemplates[0]);

  // Generate unique ID
  const generateId = () => `element-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  // Add new element
  const addElement = (element: Omit<InfographicElement, 'id' | 'zIndex'>) => {
    const maxZIndex = elements.length ? Math.max(...elements.map(el => el.zIndex)) : 0;
    const newElement = {
      ...element,
      id: generateId(),
      zIndex: maxZIndex + 1
    };
    setElements(prev => [...prev, newElement]);
  };

  // Update element
  const updateElement = (id: string, updates: Partial<InfographicElement>) => {
    setElements(prev => 
      prev.map(element => 
        element.id === id ? { ...element, ...updates } : element
      )
    );
  };

  // Remove element
  const removeElement = (id: string) => {
    setElements(prev => prev.filter(element => element.id !== id));
    if (selectedElementId === id) {
      setSelectedElementId(null);
    }
  };

  // Select element
  const selectElement = (id: string | null) => {
    setSelectedElementId(id);
  };

  // Change element z-index
  const changeElementZIndex = (id: string, direction: 'forward' | 'backward') => {
    const element = elements.find(el => el.id === id);
    if (!element) return;

    setElements(prev => {
      const sorted = [...prev].sort((a, b) => a.zIndex - b.zIndex);
      const index = sorted.findIndex(el => el.id === id);
      
      if (direction === 'forward' && index < sorted.length - 1) {
        // Swap with the next element
        const nextZIndex = sorted[index + 1].zIndex;
        sorted[index + 1].zIndex = sorted[index].zIndex;
        sorted[index].zIndex = nextZIndex;
      } else if (direction === 'backward' && index > 0) {
        // Swap with the previous element
        const prevZIndex = sorted[index - 1].zIndex;
        sorted[index - 1].zIndex = sorted[index].zIndex;
        sorted[index].zIndex = prevZIndex;
      }
      
      return sorted;
    });
  };

  // Apply template
  const applyTemplate = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setElements(template.elements);
      setActiveTemplate(template);
    }
  };

  // Clear canvas
  const clearCanvas = () => {
    setElements([]);
    setSelectedElementId(null);
    setActiveTemplate(templates[0]);
  };

  return (
    <InfographicContext.Provider
      value={{
        canvasSize,
        elements,
        selectedElementId,
        templates,
        activeTemplate,
        addElement,
        updateElement,
        removeElement,
        selectElement,
        changeElementZIndex,
        applyTemplate,
        clearCanvas
      }}
    >
      {children}
    </InfographicContext.Provider>
  );
};

export const useInfographic = () => {
  const context = useContext(InfographicContext);
  if (context === undefined) {
    throw new Error('useInfographic must be used within an InfographicProvider');
  }
  return context;
};
