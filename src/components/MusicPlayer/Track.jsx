import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const Track = ({ isPlaying, isActive, activeSong }) => {
  const { t } = useLanguage();

  return (
    <div className="flex w-full min-w-0 items-center gap-3 md:max-w-[40%] md:flex-1">
      <div className={`${isPlaying && isActive ? 'animate-[spin_3s_linear_infinite]' : ''} h-12 w-12 shrink-0 sm:h-14 sm:w-14 md:h-16 md:w-16`}>
        <img src={activeSong?.images?.coverart} alt="cover art" className="rounded-full" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-bold text-white sm:text-base md:text-lg">
          {activeSong?.title ? activeSong?.title : t.noActiveSong}
        </p>
        <p className="truncate text-xs text-gray-300 sm:text-sm">
          {activeSong?.subtitle ? activeSong?.subtitle : t.noActiveSong}
        </p>
      </div>
    </div>
  );
};

export default Track;
