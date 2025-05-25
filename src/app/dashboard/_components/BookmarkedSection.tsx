'use client';

import Link from 'next/link';
import React from 'react';

import { ChevronRight } from 'lucide-react';

import { useBookmarkedQuizzes } from '@/services/features/quizzes';

import ChevronRightIcon from '@/components/icons/chevron-right';

import { ROUTES } from '@/constants/routes';

import { QuizSetItem } from '../library/components';

const BookmarkedSection = () => {
  const { data: bookmarkedQuizzesResponse, isLoading } = useBookmarkedQuizzes();
  const bookmarkedQuizzes = bookmarkedQuizzesResponse?.data?.data || [];

  // If no bookmarked quizzes, don't render this section
  if (!isLoading && bookmarkedQuizzes.length === 0) {
    return null;
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold text-[#444444]">Bookmarked</h2>
          <ChevronRightIcon className="w-5 h-5" />
        </div>
        <Link
          href="/dashboard/bookmarks"
          className="flex items-center text-[#0890A8]"
        >
          View all <ChevronRight size={20} />
        </Link>
      </div>

      {isLoading ? (
        <div className="p-4 bg-white rounded-lg border shadow-sm">
          <p className="text-gray-500">Loading bookmarked quizzes...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {bookmarkedQuizzes.slice(0, 3).map((quizSet: any) => (
            <QuizSetItem
              key={quizSet._id}
              id={quizSet._id}
              title={quizSet.title}
              description={quizSet.description || ''}
              tags={quizSet.tags || []}
              creator={{
                name: quizSet.createdBy?.name || 'Unknown',
                isCurrentUser: false,
              }}
              isBookmarked={true}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default BookmarkedSection;
