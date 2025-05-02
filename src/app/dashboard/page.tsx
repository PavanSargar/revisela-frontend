'use client';

import React from 'react';

import {
  BookmarkedSection,
  LibrarySection,
  RecentSection,
  SharedSection,
} from './_components';

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
