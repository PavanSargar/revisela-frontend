'use client';

import Link from 'next/link';
import React from 'react';

import { ChevronRight } from 'lucide-react';

import ChevronRightIcon from '@/components/icons/chevron-right';

import { QuizSetItem } from '../library/components';

const RecentSection = () => {
  // Mock quiz sets data
  const recentQuizSets = [
    {
      id: '1',
      title: 'IB Calculus',
      description:
        'Designed for both SL and HL students, this set covers key topics such as limits, differentiation, and integration, along with their real-world applications.',
      tags: ['Maths', 'IB', 'Calculus'],
      creator: { name: 'Sam Smith', isCurrentUser: false },
      rating: 2,
      isBookmarked: false,
    },
    {
      id: '2',
      title: 'IB Calculus',
      description:
        'Designed for both SL and HL students, this set covers key topics such as limits, differentiation, and integration, along with their real-world applications.',
      tags: ['Maths', 'IB', 'Calculus'],
      creator: { name: 'You', isCurrentUser: true, shared: true },
      rating: 3,
      isBookmarked: false,
    },
    {
      id: '3',
      title: 'IB Calculus',
      description:
        'Designed for both SL and HL students, this set covers key topics such as limits, differentiation, and integration, along with their real-world applications.',
      tags: ['Maths', 'IB', 'Calculus'],
      creator: { name: 'Sam Smith', isCurrentUser: false },
      rating: 2,
      isBookmarked: true,
    },
  ];

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold text-[#444444]">Recent</h2>
          <ChevronRightIcon className="w-5 h-5" />
        </div>
        <Link
          href="/dashboard/recent"
          className="flex items-center text-[#0890A8]"
        >
          View all <ChevronRight size={20} />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {recentQuizSets.map((quizSet) => (
          <QuizSetItem
            key={quizSet.id}
            title={quizSet.title}
            description={quizSet.description}
            tags={quizSet.tags}
            creator={quizSet.creator}
            rating={quizSet.rating}
            isBookmarked={quizSet.isBookmarked}
          />
        ))}
      </div>
    </section>
  );
};

export default RecentSection;
