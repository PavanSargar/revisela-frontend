'use client';

import React, { useState } from 'react';

import { Folder } from 'lucide-react';

import { Breadcrumb, BreadcrumbItem } from '@/components/ui/Breadcrumb';
import { FolderItem } from '@/components/ui/folder';

import { QuizSetItem } from '../library/components';

export default function SharedPage() {
  const [currentFolder, setCurrentFolder] = useState('Shared Folder 1');

  // Mock folders data
  const folders = [
    { id: '1', name: 'Shared Folder 1', isBookmarked: true },
    { id: '2', name: 'Shared Folder 2', isBookmarked: false },
    { id: '3', name: 'Shared Folder 3', isBookmarked: true },
    { id: '4', name: 'Shared Folder 4', isBookmarked: false },
    { id: '5', name: 'Shared Folder 5', isBookmarked: false },
    { id: '6', name: 'Shared Folder 6', isBookmarked: true },
  ];

  // Mock shared quiz sets data
  const sharedQuizSets = [
    {
      id: '1',
      title: 'IB Calculus',
      description:
        'Designed for both SL and HL students, this set covers key topics such as limits, differentiation, and integration, along with their real-world applications.',
      tags: ['Maths', 'IB', 'Calculus'],
      creator: { name: 'Sam Smith', isCurrentUser: false },
      rating: 2,
      isBookmarked: true,
    },
    {
      id: '2',
      title: 'Biology Fundamentals',
      description:
        'A comprehensive set covering cell biology, genetics, ecology, and evolution with practice questions for each topic.',
      tags: ['Biology', 'Science', 'AP'],
      creator: { name: 'Emma Watson', isCurrentUser: false },
      rating: 4,
      isBookmarked: false,
    },
    {
      id: '3',
      title: 'World History',
      description:
        'From ancient civilizations to modern day events, this quiz set helps you master key historical facts and concepts.',
      tags: ['History', 'Social Studies', 'IB'],
      creator: { name: 'John Davis', isCurrentUser: false },
      rating: 3,
      isBookmarked: false,
    },
    {
      id: '4',
      title: 'Physics Mechanics',
      description:
        'Master the fundamentals of mechanics including motion, forces, energy, and momentum with this comprehensive quiz set.',
      tags: ['Physics', 'Science', 'Mechanics'],
      creator: { name: 'Robert Chen', isCurrentUser: false },
      rating: 5,
      isBookmarked: true,
    },
    {
      id: '5',
      title: 'Spanish Vocabulary',
      description:
        'Build your Spanish vocabulary with this extensive quiz set covering everyday topics, travel, business, and more.',
      tags: ['Spanish', 'Language', 'Vocabulary'],
      creator: { name: 'Maria Rodriguez', isCurrentUser: false },
      rating: 4,
      isBookmarked: false,
    },
    {
      id: '6',
      title: 'Chemistry Basics',
      description:
        'Review essential chemistry concepts including atomic structure, periodic trends, bonding, and chemical reactions.',
      tags: ['Chemistry', 'Science', 'AP'],
      creator: { name: 'David Kim', isCurrentUser: false },
      rating: 3,
      isBookmarked: false,
    },
  ];

  // Define breadcrumb items
  const breadcrumbItems: BreadcrumbItem[] = [
    {
      label: 'Shared With Me',
      href: '/dashboard/shared',
    },
    {
      label: currentFolder,
      icon: <Folder size={24} className="text-[#0890A8]" />,
      isCurrent: true,
    },
  ];

  return (
    <div className="">
      <div className="flex items-center gap-2 mb-8">
        <Breadcrumb items={breadcrumbItems} />
        <div className="flex items-center justify-center bg-yellow-100 h-8 w-8 rounded-full ml-2">
          <span className="text-yellow-800 font-medium">H</span>
        </div>
      </div>

      {/* Folders Section */}
      <section className="mb-8">
        <h2 className="text-xl font-medium text-[#444444] mb-4">
          Shared Folders
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {folders.map((folder) => (
            <FolderItem
              key={folder?.id}
              id={folder?.id}
              name={folder?.name}
              isBookmarked={folder?.isBookmarked}
              onClick={() => setCurrentFolder(folder?.name)}
            />
          ))}
        </div>
      </section>

      {/* Quiz Sets Section */}
      <section>
        <h2 className="text-xl font-medium text-[#444444] mb-4">
          Shared Quiz Sets
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {sharedQuizSets.map((quizSet) => (
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
    </div>
  );
}
