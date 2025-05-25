'use client';

type QuestionType = 'Flashcard' | 'Multiple Choice Question (MCQ)' | 'Fill-In';

interface QuestionPreviewProps {
  type: QuestionType;
  onAdd: () => void;
}

export default function QuestionPreview({ type, onAdd }: QuestionPreviewProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-8">
      <h2 className="text-lg font-medium mb-4">
        New Question: {type}
      </h2>
      {/* Question editor UI will go here based on the selected type */}
      <div className="mt-4 flex justify-end">
        <button
          type="button"
          onClick={onAdd}
          className="bg-teal-500 hover:bg-teal-600 text-white rounded-md px-4 py-2 text-sm font-medium"
        >
          Add Question
        </button>
      </div>
    </div>
  );
} 