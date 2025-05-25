export type QuestionType = 'Flashcard' | 'Multiple Choice Question (MCQ)' | 'Fill-In';

export interface QuizSetData {
  title: string;
  description: string;
  tags: string[];
  questions: Array<{
    type: QuestionType;
    content: any;
  }>;
} 