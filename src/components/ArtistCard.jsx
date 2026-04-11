import React from 'react';
import { useNavigate } from 'react-router-dom';

const ArtistCard = ({ track }) => {
  const navigate = useNavigate();

  return (
    <div
      className="flex w-full flex-col rounded-2xl bg-white/5 bg-opacity-80 p-3 backdrop-blur-sm animate-slideup cursor-pointer sm:p-4"
      onClick={() => navigate(`/artists/${track?.artists[0].adamid}`)}
    >
      <img alt="song_img" src={track?.images?.coverart} className="w-full aspect-square rounded-lg object-cover" />
      <p className="mt-4 truncate text-base font-semibold text-white sm:text-lg">
        {track?.subtitle}
      </p>
    </div>
  );
};

export default ArtistCard;
