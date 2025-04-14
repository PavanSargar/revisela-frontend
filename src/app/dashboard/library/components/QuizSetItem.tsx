import React from "react";
import { Bookmark } from "lucide-react";

interface QuizSetItemProps {
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
}

const QuizSetItem: React.FC<QuizSetItemProps> = ({
  title,
  description,
  tags,
  creator,
  rating = 0,
  isBookmarked = false,
}) => {
  return (
    <div className="p-4 border rounded-lg bg-white hover:shadow-md cursor-pointer">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <span className="bg-yellow-100 text-yellow-800 rounded-sm px-1 text-sm">
            📝
          </span>
          <h3 className="font-medium text-[#444444]">{title}</h3>
        </div>
        <div className="flex items-center gap-2">
          {isBookmarked ? (
            <Bookmark
              size={18}
              className="text-[#0890A8] fill-[#0890A8]"
              strokeWidth={1.5}
            />
          ) : (
            <Bookmark size={18} className="text-[#444444]" strokeWidth={1.5} />
          )}
          <button className="text-[#444444] cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="6" r="1" />
              <circle cx="12" cy="12" r="1" />
              <circle cx="12" cy="18" r="1" />
            </svg>
          </button>
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
              {creator.shared ? "Just Shared" : "Not Shared"}
            </p>
          )}
          {rating > 0 && (
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className="text-yellow-400">
                  {i < rating ? "★" : "☆"}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizSetItem;
