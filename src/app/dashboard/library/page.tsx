'use client';

import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { useQuizSets } from '@/services/features/library';

import { FolderExplorer, FolderProvider } from '@/components/ui/folder';
import { GridSkeletonLoader } from '@/components/ui/loaders';
import { useToast } from '@/components/ui/toast';

import { ROUTES } from '@/constants/routes';

import { QuizSetItem } from './components';

export default function LibraryPage() {
  const searchParams = useSearchParams();
  const folderId = searchParams.get('folderId') || undefined;
  const { toast } = useToast();

  const [currentFolderId, setCurrentFolderId] = useState<string | undefined>(
    folderId
  );
  const {
    data: quizSets,
    isLoading: isQuizSetsLoading,
    refetch,
  } = useQuizSets(currentFolderId, {
    refetchOnMount: true,
  });

  // Update currentFolderId when URL parameter changes
  useEffect(() => {
    setCurrentFolderId(folderId);
  }, [folderId]);

  // Handle folder navigation
  const handleFolderClick = (folderId: string) => {
    setCurrentFolderId(folderId);
  };

  // Handle quiz deletion
  const handleQuizDeleted = async () => {
    toast({
      title: 'Quiz moved to trash',
    });
    refetch();
  };

  return (
    <FolderProvider
      initialFolderId={folderId}
      rootName="My Library"
      rootPath={ROUTES.DASHBOARD.LIBRARY}
    >
      <FolderExplorer
        title="Folders"
        onFolderClick={handleFolderClick}
        renderContent={(folderId) => (
          <section>
            <h2 className="text-xl font-medium text-[#444444] mb-4">
              Quiz Sets
            </h2>
            {isQuizSetsLoading ? (
              <GridSkeletonLoader type="quiz" count={6} columns={3} />
            ) : quizSets && quizSets.results.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {quizSets?.results?.map((quizSet) => (
                  <QuizSetItem
                    key={quizSet?._id}
                    id={quizSet?._id}
                    title={quizSet?.title}
                    description={quizSet?.description || ''}
                    tags={quizSet?.tags || []}
                    creator={
                      quizSet?.creator || {
                        name: 'User',
                        isCurrentUser: true,
                        shared: false,
                      }
                    }
                    rating={quizSet?.rating || 0}
                    isBookmarked={quizSet?.isBookmarked || false}
                    onDelete={handleQuizDeleted}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-gray-500">
                No quiz sets found in this {folderId ? 'folder' : 'library'}
              </div>
            )}
          </section>
        )}
      />
    </FolderProvider>
  );
}
