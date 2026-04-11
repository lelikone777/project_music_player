/* eslint-disable no-nested-ternary */
import React from 'react';
import { Link } from 'react-router-dom';

import PlayPause from './PlayPause';

const SongBar = ({ song, i, artistId, isPlaying, activeSong, handlePauseClick, handlePlayClick }) => (
  <div className={`mb-2 flex w-full items-center gap-3 rounded-2xl px-3 py-3 transition-colors hover:bg-[#4c426e] ${activeSong?.title === song?.title ? 'bg-[#4c426e]' : 'bg-transparent'}`}>
    <h3 className="w-6 shrink-0 text-sm font-bold text-white sm:text-base">{i + 1}.</h3>
    <div className="flex min-w-0 flex-1 items-center gap-3">
      <img
        className="h-14 w-14 shrink-0 rounded-xl object-cover sm:h-16 sm:w-16"
        src={artistId ? song?.attributes?.artwork?.url.replace('{w}', '125').replace('{h}', '125') : song?.images?.coverart}
        alt={song?.title}
      />
      <div className="min-w-0 flex-1">
        {!artistId ? (
          <Link to={`/songs/${song.key}`}>
            <p className="truncate text-sm font-bold text-white sm:text-base lg:text-lg">
              {song?.title}
            </p>
          </Link>
        ) : (
          <p className="truncate text-sm font-bold text-white sm:text-base lg:text-lg">
            {song?.attributes?.name}
          </p>
        )}
        <p className="mt-1 truncate text-xs text-gray-300 sm:text-sm">
          {artistId ? song?.attributes?.albumName : song?.subtitle}
        </p>
      </div>
    </div>
    {!artistId
      ? (
        <PlayPause
          isPlaying={isPlaying}
          activeSong={activeSong}
          song={song}
          handlePause={handlePauseClick}
          handlePlay={() => handlePlayClick(song, i)}
        />
      )
      : null}
  </div>
);

export default SongBar;
