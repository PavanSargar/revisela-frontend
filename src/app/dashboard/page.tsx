"use client";
import React from "react";
import {
  RecentSection,
  LibrarySection,
  SharedSection,
  BookmarkedSection,
} from "./_components";

const Dashboard = () => {
  return (
    <div className="space-y-10">
      <RecentSection />
      <LibrarySection />
      <SharedSection />
      <BookmarkedSection />
    </div>
  );
};

export default Dashboard;
