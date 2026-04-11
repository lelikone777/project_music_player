import React from 'react';

const pulseClassName = 'animate-pulse rounded-2xl bg-white/10';

export const PageHeaderSkeleton = ({ hasControl = false }) => (
  <div className="mb-6 mt-2 flex w-full flex-col gap-4 sm:mb-10 sm:mt-4 sm:flex-row sm:items-center sm:justify-between">
    <div className={`${pulseClassName} h-8 w-56 sm:h-10 sm:w-80`} />
    {hasControl ? <div className={`${pulseClassName} h-12 w-full sm:w-44`} /> : null}
  </div>
);

export const SongGridSkeleton = ({ count = 8 }) => (
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 2xl:grid-cols-4">
    {Array.from({ length: count }).map((_, index) => (
      <div key={`song-skeleton-${index}`} className="rounded-2xl bg-white/5 p-3 sm:p-4">
        <div className={`${pulseClassName} aspect-square w-full`} />
        <div className={`${pulseClassName} mt-4 h-5 w-3/4`} />
        <div className={`${pulseClassName} mt-2 h-4 w-1/2`} />
      </div>
    ))}
  </div>
);

export const ArtistGridSkeleton = ({ count = 8 }) => (
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 2xl:grid-cols-4">
    {Array.from({ length: count }).map((_, index) => (
      <div key={`artist-skeleton-${index}`} className="rounded-2xl bg-white/5 p-3 sm:p-4">
        <div className={`${pulseClassName} aspect-square w-full`} />
        <div className={`${pulseClassName} mt-4 h-5 w-2/3`} />
      </div>
    ))}
  </div>
);

export const DetailsSkeleton = () => (
  <div className="flex flex-col">
    <div className="relative mb-8 w-full overflow-hidden rounded-[2rem] bg-white/5 p-4 sm:p-6">
      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <div className={`${pulseClassName} h-28 w-28 rounded-full sm:h-40 sm:w-40 lg:h-48 lg:w-48`} />
        <div className="flex min-w-0 flex-1 flex-col items-center gap-3 sm:items-start">
          <div className={`${pulseClassName} h-8 w-52 sm:h-10 sm:w-72`} />
          <div className={`${pulseClassName} h-4 w-36 sm:w-48`} />
          <div className={`${pulseClassName} h-4 w-24 sm:w-32`} />
        </div>
      </div>
    </div>

    <div className="mb-10">
      <div className={`${pulseClassName} h-8 w-32 sm:h-10 sm:w-40`} />
      <div className="mt-5 flex flex-col gap-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={`lyric-skeleton-${index}`} className={`${pulseClassName} h-4 w-full ${index % 3 === 0 ? 'max-w-[85%]' : index % 3 === 1 ? 'max-w-[70%]' : 'max-w-[60%]'}`} />
        ))}
      </div>
    </div>

    <div className="flex flex-col">
      <div className={`${pulseClassName} h-8 w-44 sm:h-10 sm:w-52`} />
      <div className="mt-6 flex flex-col">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={`related-skeleton-${index}`} className="mb-2 flex items-center gap-3 rounded-2xl bg-white/5 px-3 py-3">
            <div className={`${pulseClassName} h-4 w-6 rounded-md`} />
            <div className={`${pulseClassName} h-14 w-14 rounded-xl sm:h-16 sm:w-16`} />
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <div className={`${pulseClassName} h-4 w-2/3`} />
              <div className={`${pulseClassName} h-3 w-1/2`} />
            </div>
            <div className={`${pulseClassName} h-9 w-9 rounded-full`} />
          </div>
        ))}
      </div>
    </div>
  </div>
);

const PageSkeleton = ({ title, compact = false }) => (
  <div className={`flex w-full flex-col items-center justify-center ${compact ? 'min-h-[180px]' : 'min-h-[320px] sm:min-h-[420px]'}`}>
    <div className="animate-pulse rounded-full bg-white/10 p-6 sm:p-8">
      <div className="h-16 w-16 rounded-full border-4 border-white/15 border-t-cyan-400 sm:h-20 sm:w-20" />
    </div>
    {title ? <h1 className="mt-4 text-center text-lg font-bold text-white sm:text-2xl">{title}</h1> : null}
  </div>
);

export default PageSkeleton;
