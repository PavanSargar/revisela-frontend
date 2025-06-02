'use client';

import React, { useState } from 'react';

import { Folder } from 'lucide-react';

import { useSharedContent } from '@/services/features/shared';

import { Breadcrumb, BreadcrumbItem } from '@/components/ui/Breadcrumb';
import { FolderItem } from '@/components/ui/folder';
import { LoadingSpinner } from '@/components/ui/loaders';

import { QuizSetItem } from '../library/components';

export default function SharedPage() {
  const [currentFolder, setCurrentFolder] = useState('Shared With Me');

  // Fetch shared content using the API
  const { data: sharedContent, isLoading, error } = useSharedContent();

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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-red-500 mb-2">Failed to load shared content</p>
          <p className="text-sm text-gray-500">Please try again later</p>
        </div>
      </div>
    );
  }

  const folders = sharedContent?.folders || [];
  const quizzes = sharedContent?.quizzes || [];

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
          Shared Folders ({sharedContent?.totalCount?.folders || 0})
        </h2>
        {folders.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {folders.map((folder) => (
              <FolderItem
                key={folder._id}
                id={folder._id}
                name={folder.name}
                isBookmarked={folder.isBookmarked}
                onClick={() => setCurrentFolder(folder.name)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No shared folders found</p>
          </div>
        )}
      </section>

      {/* Quiz Sets Section */}
      <section>
        <h2 className="text-xl font-medium text-[#444444] mb-4">
          Shared Quiz Sets ({sharedContent?.totalCount?.quizzes || 0})
        </h2>
        {quizzes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {quizzes.map((quiz) => (
              <QuizSetItem
                key={quiz._id}
                id={quiz._id}
                title={quiz.title}
                description={quiz.description || ''}
                tags={quiz.tags || []}
                creator={{
                  name: quiz.createdBy.name,
                  isCurrentUser: false,
                  shared: true,
                }}
                rating={0} // Rating not provided in API response
                isBookmarked={quiz.isBookmarked}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No shared quiz sets found</p>
          </div>
        )}
      </section>
    </div>
  );
}
