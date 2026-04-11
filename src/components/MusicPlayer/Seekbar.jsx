import React from 'react';

const Seekbar = ({ value, min, max, onInput, setSeekTime, appTime }) => {
  // converts the time to format 0:00
  const getTime = (time) => `${Math.floor(time / 60)}:${(`0${Math.floor(time % 60)}`).slice(-2)}`;

  return (
    <div className="flex w-full items-center gap-2 text-[11px] sm:text-xs">
      <button type="button" onClick={() => setSeekTime(appTime - 5)} className="hidden text-white xl:mr-4 xl:block">
        -
      </button>
      <p className="w-9 shrink-0 text-white sm:w-10">{value === 0 ? '0:00' : getTime(value)}</p>
      <input
        type="range"
        step="any"
        value={value}
        min={min}
        max={max}
        onInput={onInput}
        className="h-1 min-w-0 flex-1 rounded-lg accent-cyan-400"
      />
      <p className="w-9 shrink-0 text-right text-white sm:w-10">{max === 0 ? '0:00' : getTime(max)}</p>
      <button type="button" onClick={() => setSeekTime(appTime + 5)} className="hidden text-white xl:ml-4 xl:block">
        +
      </button>
    </div>
  );
};

export default Seekbar;
