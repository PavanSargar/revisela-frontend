import React from 'react';

import SkeletonLoader from './SkeletonLoader';

interface GridSkeletonLoaderProps {
  type: 'folder' | 'quiz';
  count?: number;
  columns?: 1 | 2 | 3 | 4;
  className?: string;
}

/**
 * A grid skeleton loader for folder and quiz set grids
 */
export const GridSkeletonLoader: React.FC<GridSkeletonLoaderProps> = ({
  type = 'folder',
  count = 6,
  columns = 3,
  className = '',
}) => {
  // Define grid columns based on responsive design
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
  };

  // Folder item skeleton
  const renderFolderSkeleton = () => (
    <div className="bg-gray-100 border border-gray-200 rounded-lg p-4 flex flex-col space-y-3">
      <div className="flex items-center space-x-3">
        <SkeletonLoader type="circle" className="w-10 h-10" />
        <SkeletonLoader type="text" className="h-5 w-2/3" />
      </div>
      <SkeletonLoader type="text" className="h-4 w-1/2" />
      <div className="flex justify-end">
        <SkeletonLoader type="button" className="h-8 w-20" />
      </div>
    </div>
  );

  // Quiz item skeleton
  const renderQuizSkeleton = () => (
    <div className="bg-gray-100 border border-gray-200 rounded-lg p-4 flex flex-col space-y-3">
      <SkeletonLoader type="text" className="h-6 w-4/5" />
      <SkeletonLoader type="text" className="h-4 w-full" />
      <SkeletonLoader type="text" className="h-4 w-3/4" />
      <div className="flex items-center space-x-2 mt-2">
        <SkeletonLoader type="circle" className="w-7 h-7" />
        <SkeletonLoader type="text" className="h-4 w-24" />
      </div>
      <div className="flex justify-between mt-2">
        <SkeletonLoader type="text" className="h-6 w-16" />
        <div className="flex space-x-2">
          <SkeletonLoader type="circle" className="w-8 h-8" />
          <SkeletonLoader type="circle" className="w-8 h-8" />
        </div>
      </div>
    </div>
  );

  const items = Array(count)
    .fill(null)
    .map((_, index) => (
      <div key={index}>
        {type === 'folder' ? renderFolderSkeleton() : renderQuizSkeleton()}
      </div>
    ));

  return (
    <div className={`grid ${gridCols[columns]} gap-4 ${className}`}>
      {items}
    </div>
  );
};

export default GridSkeletonLoader;
