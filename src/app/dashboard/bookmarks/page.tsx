"use client";
import React, { useState } from "react";
import { Folder } from "lucide-react";
import { QuizSetItem } from "../library/components";
import { FolderItem } from "@/components/ui/folder";
import { Breadcrumb, BreadcrumbItem } from "@/components/ui/Breadcrumb";
import { ROUTES } from "@/constants/routes";

export default function BookmarksPage() {
  const [currentFolder, setCurrentFolder] = useState("Bookmarked Folder 1");

  // Mock folders data
  const folders = [
    { id: "1", name: "Bookmarked Folder 1" },
    { id: "2", name: "Bookmarked Folder 2" },
    { id: "3", name: "Bookmarked Folder 3" },
    { id: "4", name: "Bookmarked Folder 4" },
    { id: "5", name: "Bookmarked Folder 5" },
    { id: "6", name: "Bookmarked Folder 6" },
  ];

  // Mock bookmarked quiz sets data
  const bookmarkedQuizSets = [
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
      id: "4",
      title: "Physics Mechanics",
      description:
        "Master the fundamentals of mechanics including motion, forces, energy, and momentum with this comprehensive quiz set.",
      tags: ["Physics", "Science", "Mechanics"],
      creator: { name: "Robert Chen", isCurrentUser: false },
      rating: 5,
      isBookmarked: true,
    },
    {
      id: "7",
      title: "English Literature",
      description:
        "Explore classic and contemporary literature with questions about famous authors, literary devices, and critical analysis.",
      tags: ["English", "Literature", "AP"],
      creator: { name: "Jane Austen", isCurrentUser: false },
      rating: 4,
      isBookmarked: true,
    },
    {
      id: "8",
      title: "Computer Science Principles",
      description:
        "Review fundamental concepts in computing including algorithms, data structures, and programming paradigms.",
      tags: ["CS", "Programming", "Technology"],
      creator: { name: "Alan Turing", isCurrentUser: false },
      rating: 5,
      isBookmarked: true,
    },
  ];

  // Define breadcrumb items
  const breadcrumbItems: BreadcrumbItem[] = [
    {
      label: "Bookmarked",
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {folders.map((folder) => (
            <FolderItem
              key={folder.id}
              id={folder.id}
              name={folder.name}
              onClick={() => setCurrentFolder(folder.name)}
            />
          ))}
        </div>
      </section>

      {/* Quiz Sets Section */}
      <section>
        <h2 className="text-xl font-medium text-[#444444] mb-4">
          Bookmarked Quiz Sets
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {bookmarkedQuizSets.map((quizSet) => (
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
