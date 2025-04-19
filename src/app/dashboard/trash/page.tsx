"use client";
import React, { useState } from "react";
import { QuizSetItem } from "../library/components";
import { Button } from "@/components/ui";
import { FolderItem } from "@/components/ui/folder";
export default function TrashPage() {
  const [isEmptyingTrash, setIsEmptyingTrash] = useState(false);

  // Mock folders data
  const trashFolders = [
    { id: "1", name: "Folder 1" },
    { id: "2", name: "Folder 1" },
    { id: "3", name: "Folder 1" },
    { id: "4", name: "Folder 1" },
    { id: "5", name: "Folder 1" },
    { id: "6", name: "Folder 1" },
  ];

  // Mock quiz sets data
  const trashQuizSets = [
    {
      id: "1",
      title: "IB Calculus",
      description:
        "Designed for both SL and HL students, this set covers key topics such as limits, differentiation, and integration, along with their real-world applications.",
      tags: ["Maths", "IB", "Calculus"],
      creator: { name: "Sam Smith", isCurrentUser: false },
      rating: 2,
      isBookmarked: false,
    },
    {
      id: "2",
      title: "IB Calculus",
      description:
        "Designed for both SL and HL students, this set covers key topics such as limits, differentiation, and integration, along with their real-world applications.",
      tags: ["Maths", "IB", "Calculus"],
      creator: { name: "Sam Smith", isCurrentUser: false },
      rating: 2,
      isBookmarked: false,
    },
    {
      id: "3",
      title: "IB Calculus",
      description:
        "Designed for both SL and HL students, this set covers key topics such as limits, differentiation, and integration, along with their real-world applications.",
      tags: ["Maths", "IB", "Calculus"],
      creator: { name: "John Doe", isCurrentUser: false },
      rating: 2,
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
      isBookmarked: false,
    },
    {
      id: "5",
      title: "IB Calculus",
      description:
        "Designed for both SL and HL students, this set covers key topics such as limits, differentiation, and integration, along with their real-world applications.",
      tags: ["Maths", "IB", "Calculus"],
      creator: { name: "John Doe", isCurrentUser: false },
      rating: 2,
      isBookmarked: false,
    },
    {
      id: "6",
      title: "IB Calculus",
      description:
        "Designed for both SL and HL students, this set covers key topics such as limits, differentiation, and integration, along with their real-world applications.",
      tags: ["Maths", "IB", "Calculus"],
      creator: { name: "Sam Smith", isCurrentUser: false },
      rating: 2,
      isBookmarked: false,
    },
  ];

  const handleEmptyTrash = () => {
    setIsEmptyingTrash(true);
    // Here you would add the API call to empty the trash
    // After successful API call:
    setTimeout(() => {
      setIsEmptyingTrash(false);
      // You might want to clear the arrays or refresh data
    }, 1000);
  };

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
          disabled={isEmptyingTrash}
        >
          {isEmptyingTrash ? "Emptying..." : "Empty Trash"}
        </Button>
      </div>

      {/* Folders Section */}
      <section className="mb-8">
        <h2 className="text-xl font-medium text-[#444444] mb-4">Folders</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {trashFolders.map((folder) => (
            <FolderItem
              key={folder.id}
              id={folder.id}
              name={folder.name}
              onClick={() => {}}
            />
          ))}
        </div>
      </section>

      {/* Quiz Sets Section */}
      <section>
        <h2 className="text-xl font-medium text-[#444444] mb-4">Quiz Sets</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {trashQuizSets.map((quizSet) => (
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
