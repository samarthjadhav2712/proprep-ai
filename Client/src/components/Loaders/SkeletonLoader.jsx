import React from 'react';
const SkeletonLoader = () => {
  return (
    <div className="animate-pulse space-y-6 max-w-3xl w-full mx-auto p-4">
      {/* Header Skeleton */}
      <div role="status" className="space-y-4">
        <div className="h-6 bg-gray-200 rounded-md dark:bg-gray-400 w-1/2"></div>
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 rounded dark:bg-gray-400 w-full"></div>
          <div className="h-3 bg-gray-200 rounded dark:bg-gray-400 w-10/12"></div>
          <div className="h-3 bg-gray-200 rounded dark:bg-gray-400 w-9/12"></div>
        </div>
      </div>

      {/* Content Block Skeleton */}
      <div className="bg-gray-100 dark:bg-gray-400 rounded-lg p-4 space-y-3">
        <div className="h-4 bg-gray-300 rounded-md dark:bg-gray-400 w-3/4"></div>
        <div className="h-3 bg-gray-300 rounded-md dark:bg-gray-400 w-2/3"></div>
        <div className="h-3 bg-gray-300 rounded-md dark:bg-gray-400 w-1/2"></div>
      </div>

      {/* Another Section */}
      <div role="status" className="animate-pulse space-y-4 mt-10">
        <div className="h-4 bg-gray-200 rounded-md dark:bg-gray-400 w-1/2"></div>
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 rounded dark:bg-gray-400 w-full"></div>
          <div className="h-3 bg-gray-200 rounded dark:bg-gray-400 w-10/12"></div>
          <div className="h-3 bg-gray-200 rounded dark:bg-gray-400 w-9/12"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
