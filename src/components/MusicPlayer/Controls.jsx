import React from 'react';
import { MdSkipNext, MdSkipPrevious } from 'react-icons/md';
import { BsArrowRepeat, BsFillPauseFill, BsFillPlayFill, BsShuffle } from 'react-icons/bs';

const Controls = ({ isPlaying, repeat, setRepeat, shuffle, setShuffle, currentSongs, handlePlayPause, handlePrevSong, handleNextSong }) => (
  <div className="flex w-full max-w-[220px] items-center justify-between gap-3 sm:max-w-[260px] lg:max-w-[320px]">
    <BsArrowRepeat size={18} color={repeat ? 'red' : 'white'} onClick={() => setRepeat((prev) => !prev)} className="hidden cursor-pointer md:block" />
    {currentSongs?.length && <MdSkipPrevious size={28} color="#FFF" className="cursor-pointer" onClick={handlePrevSong} />}
    {isPlaying ? (
      <BsFillPauseFill size={42} color="#FFF" onClick={handlePlayPause} className="cursor-pointer" />
    ) : (
      <BsFillPlayFill size={42} color="#FFF" onClick={handlePlayPause} className="cursor-pointer" />
    )}
    {currentSongs?.length && <MdSkipNext size={28} color="#FFF" className="cursor-pointer" onClick={handleNextSong} />}
    <BsShuffle size={18} color={shuffle ? 'red' : 'white'} onClick={() => setShuffle((prev) => !prev)} className="hidden cursor-pointer md:block" />
  </div>
);

export default Controls;
