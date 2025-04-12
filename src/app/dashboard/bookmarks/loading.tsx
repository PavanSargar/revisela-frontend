import React from "react";
import { Loader } from "@/components/ui";

export default function BookmarksLoading() {
  return (
    <div className="p-6 ml-64 h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader size="large" />
        <p className="text-lg text-[#444444]">Loading your bookmarks...</p>
      </div>
    </div>
  );
}
