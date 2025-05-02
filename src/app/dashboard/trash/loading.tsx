import React from 'react';

import { ContentLoader } from '@/components/ui/loaders';

export default function TrashLoading() {
  return (
    <div className="p-6 ml-64 h-screen">
      <ContentLoader
        message="Loading trash items..."
        size="lg"
        variant="primary"
        className="h-full"
      />
    </div>
  );
}
