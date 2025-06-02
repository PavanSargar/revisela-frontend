import React, { useState } from 'react';

import {
  Bookmark,
  Copy,
  Edit,
  ExternalLink,
  RefreshCw,
  Share,
  Trash2,
} from 'lucide-react';

import { useBookmarkQuiz, useDeleteQuiz } from '@/services/features/quizzes';

import { ConfirmationModal } from '@/components/modals';
import { ActionDropdown, BookmarkToggleButton } from '@/components/ui';
import { useToast } from '@/components/ui/toast';

interface QuizSetItemProps {
  id?: string;
  title: string;
  description: string;
  tags: string[];
  creator: {
    name: string;
    isCurrentUser: boolean;
    shared?: boolean;
  };
  rating?: number;
  isBookmarked?: boolean;
  isInTrash?: boolean;
  onRestore?: (id: string) => void;
  onDelete?: (id: string) => void;
  handleDeleteInParent?: boolean;
}

const QuizSetItem: React.FC<QuizSetItemProps> = ({
  id = '',
  title,
  description,
  tags,
  creator,
  rating = 0,
  isBookmarked = false,
  isInTrash = false,
  onRestore,
  onDelete,
  handleDeleteInParent = false,
}) => {
  const [removeModalOpen, setRemoveModalOpen] = useState(false);
  const deleteQuiz = useDeleteQuiz();
  const bookmarkQuiz = useBookmarkQuiz();
  const { toast } = useToast();

  const handleRemove = () => {
    if (handleDeleteInParent && onDelete) {
      setRemoveModalOpen(false);
      onDelete(id);
      return;
    }

    // If not in trash, move to trash (soft delete)
    if (!isInTrash) {
      deleteQuiz.mutate(id, {
        onSuccess: () => {
          setRemoveModalOpen(false);
          toast({
            title: 'Quiz moved to trash',
          });
          if (onDelete) onDelete(id);
        },
        onError: (error) => {
          setRemoveModalOpen(false);
          toast({
            title: 'Failed to move quiz to trash',
          });
          console.error('Failed to delete quiz:', error);
        },
      });
    }
  };

  const toggleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!id) return;

    bookmarkQuiz.mutate(
      { quizId: id, bookmarked: !isBookmarked },
      {
        onSuccess: () => {
          toast({
            title: isBookmarked ? 'Bookmark removed' : 'Bookmark added',
          });
        },
        onError: (error) => {
          toast({
            title: 'Failed to update bookmark',
          });
          console.error('Failed to update bookmark:', error);
        },
      }
    );
  };

  const isLoading = !handleDeleteInParent && !isInTrash && deleteQuiz.isPending;

  return (
    <>
      <div className="p-4 border rounded-lg bg-white hover:shadow-md cursor-pointer">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center gap-2">
            <span className="bg-yellow-100 text-yellow-800 rounded-sm px-1 text-sm">
              📝
            </span>
            <h3 className="font-medium text-[#444444]">{title}</h3>
          </div>
          <div className="flex items-center gap-2">
            {!isInTrash && (
              <>
                <BookmarkToggleButton
                  isBookmarked={isBookmarked}
                  onClick={toggleBookmark}
                />
              </>
            )}
            {isInTrash ? (
              <div className="flex items-center gap-1">
                {onRestore && (
                  <button
                    className="text-green-500 p-1 hover:bg-gray-100 rounded"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRestore(id);
                    }}
                    title="Restore"
                  >
                    <RefreshCw size={16} />
                  </button>
                )}
                {onDelete && (
                  <button
                    className="text-red-500 p-1 hover:bg-gray-100 rounded"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(id);
                    }}
                    title="Delete permanently"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            ) : (
              <ActionDropdown
                items={[
                  {
                    label: 'Edit',
                    icon: <Edit size={16} />,
                    onClick: (e) => {
                      console.log('Edit quiz set:', id);
                    },
                  },
                  {
                    label: 'Duplicate',
                    icon: <Copy size={16} />,
                    onClick: (e) => {
                      console.log('Duplicate quiz set:', id);
                    },
                  },
                  {
                    label: 'Share',
                    icon: <Share size={16} />,
                    onClick: (e) => {
                      console.log('Share quiz set:', id);
                    },
                  },
                  {
                    label: 'Open in new tab',
                    icon: <ExternalLink size={16} />,
                    onClick: (e) => {
                      console.log('Open quiz set in new tab:', id);
                    },
                  },
                  {
                    label: 'Move to trash',
                    icon: <Trash2 size={16} />,
                    onClick: (e) => {
                      e.stopPropagation();
                      setRemoveModalOpen(true);
                    },
                  },
                ]}
              />
            )}
          </div>
        </div>

        <p className="text-sm text-[#444444] mb-3">{description}</p>

        <div className="flex gap-2 flex-wrap mb-3">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-gray-100 text-[#444444] px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center">
          <div className="h-8 w-8 bg-gray-200 rounded-full mr-2 flex items-center justify-center text-gray-500">
            {creator.name.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-medium">{creator.name}</p>
            {!creator.isCurrentUser && (
              <p className="text-xs text-gray-500">
                {creator.shared ? 'Just Shared' : 'Not Shared'}
              </p>
            )}
            {rating > 0 && (
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="text-yellow-400">
                    {i < rating ? '★' : '☆'}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={removeModalOpen}
        onOpenChange={setRemoveModalOpen}
        title="Move Quiz to Trash"
        description="Are you sure you want to move this quiz to trash?"
        confirmText="Move to Trash"
        confirmButtonClass="bg-red-500 hover:bg-red-600 text-white"
        onConfirm={handleRemove}
        isLoading={isLoading}
      />
    </>
  );
};

export default QuizSetItem;
