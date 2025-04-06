"use client";
import React, { useState } from "react";
import { Folder } from "lucide-react";
import { FolderItem, QuizSetItem } from "./components";
import { useQuizSets } from "@/services/features/library";
import { useFolders } from "@/services/features/folders";
import { Breadcrumb, BreadcrumbItem } from "@/components/ui/Breadcrumb";

export default function LibraryPage() {
  const [currentFolder, setCurrentFolder] = useState("Folder 1");
  const { data: quizSets, isLoading } = useQuizSets();

  // Mock folders data
  const folders = [
    { id: "1", name: "Folder 1" },
    { id: "2", name: "Folder 1" },
    { id: "3", name: "Folder 1" },
    { id: "4", name: "Folder 1" },
    { id: "5", name: "Folder 1" },
    { id: "6", name: "Folder 1" },
  ];

  // Mock quiz sets data (will be replaced with actual data from API)
  const mockQuizSets = [
    {
      id: "1",
      title: "IB Calculus",
      description:
        "Designed for both SL and HL students, this set covers key topics such as limits, differentiation, and integration, along with their real-world applications.",
      tags: ["Maths", "IB", "Calculus"],
      creator: { name: "Sam Smith", isCurrentUser: false },
      rating: 2,
      isBookmarked: true,
    },
    {
      id: "2",
      title: "IB Calculus",
      description:
        "Designed for both SL and HL students, this set covers key topics such as limits, differentiation, and integration, along with their real-world applications.",
      tags: ["Maths", "IB", "Calculus"],
      creator: { name: "You", isCurrentUser: true, shared: false },
      isBookmarked: false,
    },
    {
      id: "3",
      title: "IB Calculus",
      description:
        "Designed for both SL and HL students, this set covers key topics such as limits, differentiation, and integration, along with their real-world applications.",
      tags: ["Maths", "IB", "Calculus"],
      creator: { name: "You", isCurrentUser: true, shared: true },
      isBookmarked: false,
    },
    {
      id: "4",
      title: "IB Calculus",
      description:
        "Designed for both SL and HL students, this set covers key topics such as limits, differentiation, and integration, along with their real-world applications.",
      tags: ["Maths", "IB", "Calculus"],
      creator: { name: "Sam Smith", isCurrentUser: false },
      rating: 2,
      isBookmarked: true,
    },
    {
      id: "5",
      title: "IB Calculus",
      description:
        "Designed for both SL and HL students, this set covers key topics such as limits, differentiation, and integration, along with their real-world applications.",
      tags: ["Maths", "IB", "Calculus"],
      creator: { name: "You", isCurrentUser: true, shared: false },
      isBookmarked: false,
    },
    {
      id: "6",
      title: "IB Calculus",
      description:
        "Designed for both SL and HL students, this set covers key topics such as limits, differentiation, and integration, along with their real-world applications.",
      tags: ["Maths", "IB", "Calculus"],
      creator: { name: "You", isCurrentUser: true, shared: false },
      isBookmarked: false,
    },
  ];

  // Define breadcrumb items
  const breadcrumbItems: BreadcrumbItem[] = [
    {
      label: "My Library",
      href: "/library",
    },
    {
      label: currentFolder,
      icon: <Folder size={24} className="text-[#0890A8]" />,
      isCurrent: true,
    },
  ];

  return (
    <div className="p-6 ml-64">
      <div className="flex items-center gap-2 mb-8">
        <Breadcrumb items={breadcrumbItems} />
        <div className="flex items-center justify-center bg-yellow-100 h-8 w-8 rounded-full ml-2">
          <span className="text-yellow-800 font-medium">H</span>
        </div>
      </div>

      {/* Folders Section */}
      <section className="mb-8">
        <h2 className="text-xl font-medium text-[#444444] mb-4">Folders</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {folders.map((folder) => (
            <FolderItem
              key={folder.id}
              name={folder.name}
              onClick={() => setCurrentFolder(folder.name)}
            />
          ))}
        </div>
      </section>

      {/* Quiz Sets Section */}
      <section>
        <h2 className="text-xl font-medium text-[#444444] mb-4">Quiz Sets</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {mockQuizSets.map((quizSet) => (
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
