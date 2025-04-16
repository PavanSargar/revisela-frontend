"use client";
import React, { useState, useEffect } from "react";
import { Folder, Plus } from "lucide-react";
import { FolderItem, QuizSetItem } from "./components";
import { useQuizSets } from "@/services/features/library";
import { useFolders } from "@/services/features/folders";
import { Breadcrumb, BreadcrumbItem } from "@/components/ui/Breadcrumb";
import { ROUTES } from "@/constants/routes";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui";
import { CreateFolderModal } from "@/components/modals";

export default function LibraryPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const parentId = searchParams.get("folderId") || undefined;

  const [currentFolderName, setCurrentFolderName] = useState("My Library");
  const [breadcrumbPath, setBreadcrumbPath] = useState<BreadcrumbItem[]>([]);
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);

  // Fetch folders using the API
  const { data: folders, isLoading: isFoldersLoading } = useFolders(parentId);
  const { data: quizSets, isLoading: isQuizSetsLoading } =
    useQuizSets(parentId);
  // Update breadcrumb when folder changes
  useEffect(() => {
    if (!parentId) {
      // Root level
      setBreadcrumbPath([
        {
          label: "My Library",
          href: ROUTES.DASHBOARD.LIBRARY,
        },
      ]);
      setCurrentFolderName("My Library");
    } else {
      // Fetch the current folder details if needed
      // For now, use the folder name from the folder list
      const currentFolder = folders?.find((f) => f?._id === parentId);
      if (currentFolder) {
        setCurrentFolderName(currentFolder.name);

        // Add current folder to breadcrumb
        setBreadcrumbPath([
          {
            label: "My Library",
            href: ROUTES.DASHBOARD.LIBRARY,
          },
          {
            label: currentFolder.name,
            href: `${ROUTES.DASHBOARD.LIBRARY}?folderId=${parentId}`,
            icon: <Folder size={20} className="text-[#0890A8]" />,
            isCurrent: true,
          },
        ]);
      }
    }
  }, [parentId, folders]);

  // Navigate to folder on double click
  const handleFolderClick = (folderId: string, folderName: string) => {
    router.push(`${ROUTES.DASHBOARD.LIBRARY}?folderId=${folderId}`);
  };

  return (
    <div className="">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <Breadcrumb items={breadcrumbPath} />
          <div className="flex items-center justify-center bg-yellow-100 h-8 w-8 rounded-full ml-2">
            <span className="text-yellow-800 font-medium">H</span>
          </div>
        </div>

        <Button
          onClick={() => setIsFolderModalOpen(true)}
          className="flex items-center gap-2 bg-[#0890A8] text-white"
        >
          <Plus size={16} />
          New Folder
        </Button>
      </div>

      {/* Folders Section */}
      <section className="mb-8">
        <h2 className="text-xl font-medium text-[#444444] mb-4">Folders</h2>
        {isFoldersLoading ? (
          <div className="text-center py-4">Loading folders...</div>
        ) : folders && folders.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {folders.map((folder) => (
              <FolderItem
                key={folder?._id}
                name={folder.name}
                onClick={() => handleFolderClick(folder?._id, folder.name)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-4 text-gray-500">
            {parentId
              ? "This folder is empty"
              : "You don't have any folders yet"}
          </div>
        )}
      </section>

      {/* Quiz Sets Section */}
      <section>
        <h2 className="text-xl font-medium text-[#444444] mb-4">Quiz Sets</h2>
        {isQuizSetsLoading ? (
          <div className="text-center py-4">Loading quiz sets...</div>
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
            No quiz sets found in this {parentId ? "folder" : "library"}
          </div>
        )}
      </section>

      {/* Create Folder Modal */}
      <CreateFolderModal
        isOpen={isFolderModalOpen}
        onOpenChange={setIsFolderModalOpen}
        parentId={parentId}
        onSuccess={() => {
          // Refresh folders after creating a new one
        }}
      />
    </div>
  );
}
