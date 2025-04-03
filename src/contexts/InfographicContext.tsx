import React, { createContext, useContext, useState, useEffect } from 'react';

// Define element types
export type ElementType = 'text' | 'shape' | 'image' | 'group';

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
  rotation?: number;
  fontSize?: number;
  fontWeight?: 'normal' | 'bold' | 'light';
  fontStyle?: 'normal' | 'italic';
  textAlign?: 'left' | 'center' | 'right';
  groupIds?: string[]; // For grouped elements
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
  isEditingText: boolean;
  
  addElement: (element: Omit<InfographicElement, 'id' | 'zIndex'>) => void;
  updateElement: (id: string, updates: Partial<InfographicElement>) => void;
  removeElement: (id: string) => void;
  selectElement: (id: string | null) => void;
  changeElementZIndex: (id: string, direction: 'forward' | 'backward') => void;
  applyTemplate: (templateId: string) => void;
  clearCanvas: () => void;
  startTextEditing: () => void;
  finishTextEditing: () => void;
  groupElements: (elementIds: string[]) => void;
  ungroupElements: (groupId: string) => void;
  duplicateElement: (id: string) => void;
}

const InfographicContext = createContext<InfographicContextType | undefined>(undefined);

// Enhanced templates with more variety
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
        zIndex: 1,
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center'
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
      },
      {
        id: 'text-1',
        type: 'text',
        x: 250,
        y: 370,
        width: 100,
        height: 30,
        content: 'Category A',
        color: '#4361EE',
        zIndex: 1,
        textAlign: 'center'
      },
      {
        id: 'text-2',
        type: 'text',
        x: 550,
        y: 370,
        width: 100,
        height: 30,
        content: 'Category B',
        color: '#F72585',
        zIndex: 1,
        textAlign: 'center'
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
  },
  {
    id: 'timeline',
    name: 'Timeline',
    thumbnail: '/placeholder.svg',
    elements: [
      {
        id: 'title',
        type: 'text',
        x: 300,
        y: 50,
        width: 400,
        height: 50,
        content: 'Project Timeline',
        color: '#212529',
        zIndex: 3,
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center'
      },
      {
        id: 'line',
        type: 'shape',
        x: 150,
        y: 200,
        width: 700,
        height: 6,
        shape: 'rect',
        color: '#10B981',
        zIndex: 0
      },
      {
        id: 'point-1',
        type: 'shape',
        x: 150,
        y: 180,
        width: 40,
        height: 40,
        shape: 'circle',
        color: '#4361EE',
        zIndex: 1
      },
      {
        id: 'point-2',
        type: 'shape',
        x: 350,
        y: 180,
        width: 40,
        height: 40,
        shape: 'circle',
        color: '#7E69AB',
        zIndex: 1
      },
      {
        id: 'point-3',
        type: 'shape',
        x: 550,
        y: 180,
        width: 40,
        height: 40,
        shape: 'circle',
        color: '#F72585',
        zIndex: 1
      },
      {
        id: 'point-4',
        type: 'shape',
        x: 750,
        y: 180,
        width: 40,
        height: 40,
        shape: 'circle',
        color: '#F97316',
        zIndex: 1
      },
      {
        id: 'text-1',
        type: 'text',
        x: 130,
        y: 240,
        width: 80,
        height: 30,
        content: 'Phase 1',
        color: '#212529',
        zIndex: 2,
        textAlign: 'center'
      },
      {
        id: 'text-2',
        type: 'text',
        x: 330,
        y: 240,
        width: 80,
        height: 30,
        content: 'Phase 2',
        color: '#212529',
        zIndex: 2,
        textAlign: 'center'
      },
      {
        id: 'text-3',
        type: 'text',
        x: 530,
        y: 240,
        width: 80,
        height: 30,
        content: 'Phase 3',
        color: '#212529',
        zIndex: 2,
        textAlign: 'center'
      },
      {
        id: 'text-4',
        type: 'text',
        x: 730,
        y: 240,
        width: 80,
        height: 30,
        content: 'Phase 4',
        color: '#212529',
        zIndex: 2,
        textAlign: 'center'
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
  const [isEditingText, setIsEditingText] = useState(false);

  // Generate unique ID
  const generateId = () => `element-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  // Add new element
  const addElement = (element: Omit<InfographicElement, 'id' | 'zIndex'>) => {
    const maxZIndex = elements.length ? Math.max(...elements.map(el => el.zIndex)) : 0;
    const newElement = {
      ...element,
      id: generateId(),
      zIndex: maxZIndex + 1,
      rotation: element.rotation || 0
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
    // Check if it's a group and remove all children
    const element = elements.find(el => el.id === id);
    if (element?.type === 'group' && element.groupIds?.length) {
      // Remove all elements in the group
      setElements(prev => prev.filter(el => el.id !== id && !element.groupIds?.includes(el.id)));
    } else {
      setElements(prev => prev.filter(element => element.id !== id));
    }
    
    if (selectedElementId === id) {
      setSelectedElementId(null);
    }
  };

  // Select element
  const selectElement = (id: string | null) => {
    setSelectedElementId(id);
    if (!id) {
      setIsEditingText(false);
    }
  };

  // Text editing
  const startTextEditing = () => {
    setIsEditingText(true);
  };

  const finishTextEditing = () => {
    setIsEditingText(false);
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

  // Group elements
  const groupElements = (elementIds: string[]) => {
    if (elementIds.length < 2) return;

    // Create a group element
    const elementsToGroup = elements.filter(el => elementIds.includes(el.id));
    
    // Calculate group bounds
    const xs = elementsToGroup.map(el => el.x);
    const ys = elementsToGroup.map(el => el.y);
    const rights = elementsToGroup.map(el => el.x + el.width);
    const bottoms = elementsToGroup.map(el => el.y + el.height);
    
    const minX = Math.min(...xs);
    const minY = Math.min(...ys);
    const maxX = Math.max(...rights);
    const maxY = Math.max(...bottoms);
    
    const groupId = generateId();
    const maxZIndex = Math.max(...elementsToGroup.map(el => el.zIndex));
    
    // Create the group element
    const groupElement: InfographicElement = {
      id: groupId,
      type: 'group',
      x: minX,
      y: minY,
      width: maxX - minX,
      height: maxY - minY,
      zIndex: maxZIndex + 1,
      groupIds: elementIds
    };
    
    setElements(prev => [...prev, groupElement]);
    setSelectedElementId(groupId);
  };

  // Ungroup elements
  const ungroupElements = (groupId: string) => {
    const groupElement = elements.find(el => el.id === groupId);
    if (!groupElement || groupElement.type !== 'group' || !groupElement.groupIds) return;
    
    // Remove the group element but keep its children
    setElements(prev => prev.filter(el => el.id !== groupId));
    setSelectedElementId(null);
  };

  // Duplicate element
  const duplicateElement = (id: string) => {
    const elementToDuplicate = elements.find(el => el.id === id);
    if (!elementToDuplicate) return;
    
    const newElement = {
      ...elementToDuplicate,
      id: generateId(),
      x: elementToDuplicate.x + 20,
      y: elementToDuplicate.y + 20
    };
    
    setElements(prev => [...prev, newElement]);
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
        isEditingText,
        addElement,
        updateElement,
        removeElement,
        selectElement,
        changeElementZIndex,
        applyTemplate,
        clearCanvas,
        startTextEditing,
        finishTextEditing,
        groupElements,
        ungroupElements,
        duplicateElement
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
