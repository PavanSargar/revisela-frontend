'use client';

import React, { useState } from 'react';

import { Folder } from 'lucide-react';

import { useBookmarkedFolders } from '@/services/features/folders';
import { useBookmarkedQuizzes } from '@/services/features/quizzes';

import { Breadcrumb, BreadcrumbItem } from '@/components/ui/Breadcrumb';
import { FolderItem } from '@/components/ui/folder';

import { ROUTES } from '@/constants/routes';

import { QuizSetItem } from '../library/components';

export default function BookmarksPage() {
  const [currentFolder, setCurrentFolder] = useState('All Bookmarks');

  const { data: bookmarkedFolders = [], isLoading: foldersLoading } =
    useBookmarkedFolders();
  const { data: bookmarkedQuizzesResponse, isLoading: quizzesLoading } =
    useBookmarkedQuizzes();

  const bookmarkedQuizzes = bookmarkedQuizzesResponse?.data?.data || [];

  // Define breadcrumb items
  const breadcrumbItems: BreadcrumbItem[] = [
    {
      label: 'Bookmarked',
      href: ROUTES.DASHBOARD.BOOKMARKS,
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
          Bookmarked Folders
        </h2>

        {foldersLoading ? (
          <div className="p-4 bg-white rounded-lg border shadow-sm">
            <p className="text-gray-500">Loading bookmarked folders...</p>
          </div>
        ) : bookmarkedFolders.length === 0 ? (
          <div className="p-4 bg-white rounded-lg border shadow-sm">
            <p className="text-gray-500">No bookmarked folders found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {bookmarkedFolders.map((folder: any) => (
              <FolderItem
                key={folder._id}
                id={folder._id}
                name={folder.name}
                isBookmarked={true}
                onClick={() => setCurrentFolder(folder.name)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Quiz Sets Section */}
      <section>
        <h2 className="text-xl font-medium text-[#444444] mb-4">
          Bookmarked Quiz Sets
        </h2>

        {quizzesLoading ? (
          <div className="p-4 bg-white rounded-lg border shadow-sm">
            <p className="text-gray-500">Loading bookmarked quizzes...</p>
          </div>
        ) : bookmarkedQuizzes.length === 0 ? (
          <div className="p-4 bg-white rounded-lg border shadow-sm">
            <p className="text-gray-500">No bookmarked quizzes found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {bookmarkedQuizzes.map((quizSet: any) => (
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
                rating={quizSet.rating}
                isBookmarked={true}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
