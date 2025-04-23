"use client";
import React, { useEffect, useState } from "react";
import { QuizSetItem } from "./components";
import { useQuizSets } from "@/services/features/library";
import { ROUTES } from "@/constants/routes";
import { FolderProvider, FolderExplorer } from "@/components/ui/folder";
import { GridSkeletonLoader } from "@/components/ui/loaders";
import { useSearchParams } from "next/navigation";

export default function LibraryPage() {
  const searchParams = useSearchParams();
  const folderId = searchParams.get("folderId") || undefined;

  const [currentFolderId, setCurrentFolderId] = useState<string | undefined>(
    folderId
  );
  const { data: quizSets, isLoading: isQuizSetsLoading } =
    useQuizSets(currentFolderId);

  // Update currentFolderId when URL parameter changes
  useEffect(() => {
    setCurrentFolderId(folderId);
  }, [folderId]);

  // Handle folder navigation
  const handleFolderClick = (folderId: string) => {
    setCurrentFolderId(folderId);
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
                    title={quizSet?.title}
                    description={quizSet?.description}
                    tags={quizSet?.tags || []}
                    creator={{
                      name: "Pawan",
                      isCurrentUser: true,
                      shared: false,
                    }}
                    rating={quizSet?.rating}
                    isBookmarked={quizSet?.isBookmarked}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-gray-500">
                No quiz sets found in this {folderId ? "folder" : "library"}
              </div>
            )}
          </section>
        )}
      />
    </FolderProvider>
  );
}
