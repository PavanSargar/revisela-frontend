'use client';

import { useState } from 'react';
import { useForm, FormProvider, useFieldArray } from 'react-hook-form';
import { Plus } from 'lucide-react';
import CreateSetForm from './_components/create-quizset-form';
import CreateQuestionCard from './_components/create-question-card';
import QuestionTypeSelector from './_components/question-type-selector';
import QuestionPreview from './_components/question-preview';
import { QuizSetData, QuestionType } from './_components/types';

export default function CreateSetPage() {
  const methods = useForm<QuizSetData>({
    defaultValues: {
      title: '',
      description: '',
      tags: [],
      questions: []
    }
  });

  const { fields, append, insert, move } = useFieldArray({
    control: methods.control,
    name: 'questions'
  });

  const [selectedQuestionType, setSelectedQuestionType] = useState<QuestionType | null>(null);
  const [showTypeSelector, setShowTypeSelector] = useState(true);
  const [insertAtIndex, setInsertAtIndex] = useState<number | null>(null);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number | null>(null);

  const onSubmit = (data: QuizSetData) => {
    console.log('Form submitted:', data);
    // Here you would send the data to your API
  };

  const handleSelectQuestionType = (type: QuestionType) => {
    setSelectedQuestionType(type);
    setShowTypeSelector(false);
  };

  const handleAddQuestion = () => {
    if (selectedQuestionType) {
      if (insertAtIndex !== null && insertAtIndex >= 0 && insertAtIndex <= fields.length) {
        // Insert at specific position
        insert(insertAtIndex, { 
          type: selectedQuestionType,
          content: {} 
        });
      } else {
        // Append at the end
        append({ 
          type: selectedQuestionType,
          content: {} 
        });
      }
      
      // Reset state
      setSelectedQuestionType(null);
      setInsertAtIndex(null);
      setShowTypeSelector(false);
    }
  };

  const handleAddNewQuestion = (index: number) => {
    setInsertAtIndex(index);
    setShowTypeSelector(true);
    setActiveQuestionIndex(null);
  };

  const handleActivateQuestion = (index: number) => {
    setActiveQuestionIndex(index);
    setShowTypeSelector(false);
    setSelectedQuestionType(null);
  };

  const handleMoveQuestion = (oldIndex: number, newIndex: number) => {
    move(oldIndex, newIndex);
  };

  return (
    <FormProvider {...methods}>
      <main className="container mx-auto px-4 py-6">
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
          <CreateSetForm />
          
          {/* Question Type Selector */}
          {showTypeSelector && (
            <QuestionTypeSelector 
              onSelect={handleSelectQuestionType}
              title={insertAtIndex !== null 
                ? `Add Question at Position ${insertAtIndex + 1}` 
                : 'Select a question type!'}
            />
          )}
          
          {/* Selected Question Type Preview */}
          {selectedQuestionType && !showTypeSelector && (
            <QuestionPreview 
              type={selectedQuestionType} 
              onAdd={handleAddQuestion} 
            />
          )}
          
          {/* Question Cards */}
          {fields.length > 0 && (
            <CreateQuestionCard 
              questionFields={fields}
              activeQuestionIndex={activeQuestionIndex}
              onActivateQuestion={handleActivateQuestion}
              onAddNewQuestion={handleAddNewQuestion}
              onMoveQuestion={handleMoveQuestion}
            />
          )}
          
          {/* Add Question Button */}
          {!showTypeSelector && !selectedQuestionType && (
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => handleAddNewQuestion(fields.length)}
                className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full px-4 py-2 text-sm font-medium"
              >
                <Plus className="w-4 h-4" />
                Add Question
              </button>
            </div>
          )}
        </form>
      </main>
    </FormProvider>
  );
} 