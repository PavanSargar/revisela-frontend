'use client';

import { GripVertical, Plus } from 'lucide-react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { QuestionType } from './types';

interface SortableQuestionCardProps {
  id: string;
  index: number;
  type: QuestionType;
  isActive: boolean;
  onActivate: () => void;
  onAddQuestion: () => void;
}

function SortableQuestionCard({
  id,
  index,
  type,
  isActive,
  onActivate,
  onAddQuestion,
}: SortableQuestionCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`border border-gray-200 rounded-lg bg-white mb-8 relative ${isActive ? 'ring-2 ring-teal-500' : ''}`}
    >
      <div className="p-4 flex items-start gap-4">
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing p-2 text-gray-400 hover:text-gray-600"
        >
          <GripVertical className="h-6 w-6" />
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <span className="w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center text-white text-sm mr-2">
                {index + 1}
              </span>
              <h3 className="font-medium">{type}</h3>
            </div>
            <button
              type="button"
              onClick={onActivate}
              className="text-sm text-teal-600 hover:text-teal-800"
            >
              Edit
            </button>
          </div>
          <div className="pl-8">
            <p className="text-gray-500 text-sm">Question content will appear here</p>
          </div>
        </div>
      </div>
      
      {/* Add button in center bottom */}
      <button
        type="button"
        onClick={onAddQuestion}
        className="absolute left-1/2 transform -translate-x-1/2 -bottom-4 bg-teal-500 hover:bg-teal-600 text-white rounded-full p-2 shadow-md"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
}

interface CreateQuestionCardProps {
  questionFields: Array<any>;
  activeQuestionIndex: number | null;
  onActivateQuestion: (index: number) => void;
  onAddNewQuestion: (index: number) => void;
  onMoveQuestion: (oldIndex: number, newIndex: number) => void;
}

export default function CreateQuestionCard({
  questionFields,
  activeQuestionIndex,
  onActivateQuestion,
  onAddNewQuestion,
  onMoveQuestion
}: CreateQuestionCardProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const oldIndex = questionFields.findIndex(field => field.id === active.id);
      const newIndex = questionFields.findIndex(field => field.id === over.id);
      
      onMoveQuestion(oldIndex, newIndex);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {questionFields.length > 0 && (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={questionFields.map(field => field.id)}
            strategy={verticalListSortingStrategy}
          >
            {questionFields.map((field, index) => (
              <SortableQuestionCard
                key={field.id}
                id={field.id}
                index={index}
                type={field.type}
                isActive={index === activeQuestionIndex}
                onActivate={() => onActivateQuestion(index)}
                onAddQuestion={() => onAddNewQuestion(index + 1)}
              />
            ))}
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
} 