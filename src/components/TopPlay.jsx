/* eslint-disable import/no-unresolved */
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper';

import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';
import { useGetTopChartsQuery } from '../redux/services/shazamCore';
import { useLanguage } from '../context/LanguageContext';

import 'swiper/css';
import 'swiper/css/free-mode';

const TopChartCard = ({ song, i, isPlaying, activeSong, handlePauseClick, handlePlayClick }) => (
  <div className={`mb-2 flex w-full items-center gap-3 rounded-2xl px-3 py-3 transition-colors hover:bg-[#4c426e] ${activeSong?.title === song?.title ? 'bg-[#4c426e]' : 'bg-transparent'}`}>
    <h3 className="w-6 shrink-0 text-sm font-bold text-white sm:text-base">{i + 1}.</h3>
    <div className="flex min-w-0 flex-1 items-center gap-3">
      <img className="h-14 w-14 shrink-0 rounded-xl object-cover sm:h-16 sm:w-16" src={song?.images?.coverart} alt={song?.title} />
      <div className="min-w-0 flex-1">
        <Link to={`/songs/${song.key}`}>
          <p className="truncate text-sm font-bold text-white sm:text-base lg:text-lg">
            {song?.title}
          </p>
        </Link>
        <Link to={`/artists/${song?.artists[0].adamid}`}>
          <p className="mt-1 truncate text-xs text-gray-300 sm:text-sm">
            {song?.subtitle}
          </p>
        </Link>
      </div>
    </div>
    <PlayPause
      isPlaying={isPlaying}
      activeSong={activeSong}
      song={song}
      handlePause={handlePauseClick}
      handlePlay={handlePlayClick}
    />
  </div>
);

const TopPlay = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data } = useGetTopChartsQuery();
  const { t } = useLanguage();

  const topPlays = data?.slice(0, 8);

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  return (
    <div className="mb-2 flex w-full flex-1 flex-col xl:mb-0 xl:ml-6 xl:max-w-[500px]">
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-xl font-bold text-white sm:text-2xl">{t.topCharts}</h2>
          <Link to="/top-charts">
            <p className="cursor-pointer text-sm text-gray-300 sm:text-base">{t.seeMore}</p>
          </Link>
        </div>

        <div className="mt-4 flex flex-col gap-1">
          {topPlays?.map((song, i) => (
            <TopChartCard
              key={song.key}
              song={song}
              i={i}
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePauseClick={handlePauseClick}
              handlePlayClick={() => handlePlayClick(song, i)}
            />
          ))}
        </div>
      </div>

      <div className="w-full flex flex-col mt-8">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-xl font-bold text-white sm:text-2xl">{t.topArtists}</h2>
          <Link to="/top-artists">
            <p className="cursor-pointer text-sm text-gray-300 sm:text-base">{t.seeMore}</p>
          </Link>
        </div>

        <Swiper
          slidesPerView="auto"
          spaceBetween={15}
          freeMode
          centeredSlides
          centeredSlidesBounds
          modules={[FreeMode]}
          className="mt-4"
        >
          {topPlays?.slice(0, 8).map((artist) => (
            <SwiperSlide
              key={artist?.key}
              style={{ width: 'clamp(84px, 30vw, 120px)', height: 'auto' }}
              className="shadow-lg rounded-full animate-slideright"
            >
              <Link to={`/artists/${artist?.artists[0].adamid}`}>
                <img src={artist?.images?.background} alt="Name" className="rounded-full w-full object-cover" />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TopPlay;
