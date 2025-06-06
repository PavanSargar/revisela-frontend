'use client';

import React, { useState } from 'react';

import {
  usePermanentlyDeleteFolder,
  useRestoreFolder,
  useTrashFolders,
} from '@/services/features/folders';
import {
  usePermanentlyDeleteQuiz,
  useRestoreQuiz,
  useTrashQuizzes,
} from '@/services/features/quizzes';

import { Button } from '@/components/ui';
import { FolderItem } from '@/components/ui/folder';
import { ContentLoader, GridSkeletonLoader } from '@/components/ui/loaders';
import { useToast } from '@/components/ui/toast';

import { QuizSetItem } from '../library/components';

export default function TrashPage() {
  const [isEmptyingTrash, setIsEmptyingTrash] = useState(false);

  // Fetch trash data
  const { data: trashFolders, isLoading: loadingFolders } = useTrashFolders();
  const { data: trashQuizSets, isLoading: loadingQuizzes } = useTrashQuizzes();
  const { toast } = useToast();

  // Mutations
  const restoreFolder = useRestoreFolder();
  const restoreQuiz = useRestoreQuiz();
  const deleteFolder = usePermanentlyDeleteFolder();
  const deleteQuiz = usePermanentlyDeleteQuiz();

  const handleEmptyTrash = async () => {
    setIsEmptyingTrash(true);

    try {
      // Delete all folders in trash
      if (trashFolders && trashFolders.length > 0) {
        await Promise.all(
          trashFolders.map((folder) => deleteFolder.mutateAsync(folder._id))
        );
      }

      // Delete all quizzes in trash
      if (trashQuizSets && trashQuizSets.length > 0) {
        await Promise.all(
          trashQuizSets.map((quiz) => deleteQuiz.mutateAsync(quiz.id))
        );
      }

      toast({
        title: 'Trash emptied successfully',
      });
    } catch (error) {
      toast({
        title: 'Failed to empty trash',
      });
      console.error(error);
    } finally {
      setIsEmptyingTrash(false);
    }
  };

  const handleRestoreFolder = (id: string) => {
    restoreFolder.mutate(id, {
      onSuccess: () => toast({ title: 'Folder restored successfully' }),
      onError: () => toast({ title: 'Failed to restore folder' }),
    });
  };

  const handleDeleteFolder = (id: string) => {
    deleteFolder.mutate(id, {
      onSuccess: () => toast({ title: 'Folder permanently deleted' }),
      onError: () => toast({ title: 'Failed to delete folder' }),
    });
  };

  const handleRestoreQuiz = (id: string) => {
    restoreQuiz.mutate(id, {
      onSuccess: () => toast({ title: 'Quiz restored successfully' }),
      onError: () => toast({ title: 'Failed to restore quiz' }),
    });
  };

  const handleDeleteQuiz = (id: string) => {
    deleteQuiz.mutate(id, {
      onSuccess: () => toast({ title: 'Quiz permanently deleted' }),
      onError: () => toast({ title: 'Failed to delete quiz' }),
    });
  };

  const isLoading = loadingFolders || loadingQuizzes;
  const isEmpty =
    (!trashFolders || trashFolders.length === 0) &&
    (!trashQuizSets || trashQuizSets.length === 0);

  return (
    <div className="">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h1 className="text-2xl font-semibold mb-1">Trash</h1>
          <p className="text-[#444444] mb-6">
            Items in Trash will be permanently deleted after 30 days.
          </p>
        </div>
        <Button
          className="bg-red-500 text-white"
          onClick={handleEmptyTrash}
          disabled={isEmptyingTrash || isEmpty}
        >
          {isEmptyingTrash ? 'Emptying...' : 'Empty Trash'}
        </Button>
      </div>

      {isLoading ? (
        <div className="py-4">
          <GridSkeletonLoader
            type="folder"
            count={3}
            columns={3}
            className="mb-8"
          />
          <GridSkeletonLoader type="quiz" count={3} columns={3} />
        </div>
      ) : isEmpty ? (
        <div className="text-center py-20 text-[#444444]">
          <p>No items in trash</p>
        </div>
      ) : (
        <>
          {/* Folders Section */}
          {trashFolders && trashFolders.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-medium text-[#444444] mb-4">
                Folders
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {trashFolders.map((folder) => (
                  <FolderItem
                    key={folder._id}
                    id={folder._id}
                    name={folder.name}
                    onRestore={() => handleRestoreFolder(folder._id)}
                    onDelete={() => handleDeleteFolder(folder._id)}
                    isInTrash
                    handleDeleteInParent
                  />
                ))}
              </div>
            </section>
          )}

          {/* Quiz Sets Section */}
          {trashQuizSets && trashQuizSets.length > 0 && (
            <section>
              <h2 className="text-xl font-medium text-[#444444] mb-4">
                Quiz Sets
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {trashQuizSets.map((quizSet) => (
                  <QuizSetItem
                    key={quizSet.id}
                    id={quizSet.id}
                    title={quizSet.title}
                    description={quizSet.description || ''}
                    tags={[]}
                    creator={{ name: 'You', isCurrentUser: true }}
                    rating={0}
                    isBookmarked={false}
                    onRestore={() => handleRestoreQuiz(quizSet.id)}
                    onDelete={() => handleDeleteQuiz(quizSet.id)}
                    isInTrash={true}
                  />
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}
