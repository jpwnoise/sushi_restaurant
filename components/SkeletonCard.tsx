'use client';

export default function SkeletonCard() {
  return (
    <div className="group relative bg-dark-800/60 border border-dark-600/30 rounded-2xl overflow-hidden animate-pulse">
      {/* Floating image skeleton */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-44 h-44 z-20">
        <div className="w-full h-full rounded-full bg-dark-700/50" />
      </div>

      {/* Card content skeleton */}
      <div className="relative z-10 pt-20">
        <div className="p-5 pb-3">
          {/* Title skeleton */}
          <div className="h-6 bg-dark-700/50 rounded-lg w-3/4 mb-3" />
          {/* Description skeleton */}
          <div className="space-y-2">
            <div className="h-3 bg-dark-700/30 rounded w-full" />
            <div className="h-3 bg-dark-700/30 rounded w-5/6" />
            <div className="h-3 bg-dark-700/30 rounded w-2/3" />
          </div>
        </div>

        {/* Price and button skeleton */}
        <div className="px-5 py-4 border-t border-dark-600/20 flex items-center justify-between">
          <div className="h-7 bg-dark-700/50 rounded-lg w-16" />
          <div className="h-9 bg-dark-700/50 rounded-xl w-28" />
        </div>
      </div>
    </div>
  );
}
