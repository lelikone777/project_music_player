import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Error, Loader, SongCard } from '../components';
import { selectGenreListId } from '../redux/features/playerSlice';
import { useGetSongsByGenreQuery } from '../redux/services/shazamCore';
import { genres } from '../assets/constants';
import { useLanguage } from '../context/LanguageContext';

const Discover = () => {
  const dispatch = useDispatch();
  const { genreListId } = useSelector((state) => state.player);
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetSongsByGenreQuery(genreListId || 'POP');
  const { t } = useLanguage();

  if (isFetching) return <Loader title={t.loadingSongs} />;

  if (error) return <Error />;

  const selectedGenre = genreListId || 'POP';
  const genreTitle = t.genres[selectedGenre] || genres.find(({ value }) => value === selectedGenre)?.title || selectedGenre;

  return (
    <div className="flex flex-col">
      <div className="mb-6 mt-2 flex w-full flex-col gap-4 sm:mb-10 sm:mt-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-left text-2xl font-bold text-white sm:text-3xl">{t.discoverGenre(genreTitle)}</h2>

        <select
          onChange={(e) => dispatch(selectGenreListId(e.target.value))}
          value={selectedGenre}
          className="w-full rounded-xl bg-black p-3 text-sm text-gray-300 outline-none sm:mt-0 sm:w-auto"
        >
          {genres.map((genre) => (
            <option key={genre.value} value={genre.value}>
              {t.genres[genre.value] || genre.title}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 2xl:grid-cols-4">
        {data?.slice(0, 8).map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default Discover;
