import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const toCover = (url = '') => url.replace(/100x100/gi, '400x400');

const normalizeSong = (item = {}) => {
  const songId = item?.trackId ? String(item.trackId) : '';
  const artistName = item?.artistName || 'Unknown Artist';
  const cover = toCover(item?.artworkUrl100 || '');
  const preview = item?.previewUrl || '';

  return {
    key: songId,
    title: item?.trackName || item?.collectionName || 'Unknown Song',
    subtitle: artistName,
    images: {
      coverart: cover,
      background: cover,
    },
    artists: [{ adamid: encodeURIComponent(artistName) }],
    hub: {
      actions: [{}, { uri: preview }],
    },
    genres: {
      primary: item?.primaryGenreName || 'Unknown',
    },
    sections: item?.sections || [],
  };
};

const normalizeSongsResponse = (response) => (response?.results || [])
  .filter((item) => item?.wrapperType === 'track')
  .map(normalizeSong)
  .filter((song) => song.key && song.hub?.actions?.[1]?.uri);

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://itunes.apple.com/',
});

const getSongById = async (songid, fetchWithBQ) => {
  if (!songid) return null;

  const lookupResult = await fetchWithBQ(`lookup?id=${encodeURIComponent(songid)}`);
  if (!lookupResult.error) {
    const lookupSong = normalizeSongsResponse(lookupResult.data)[0];
    if (lookupSong) return lookupSong;
  }

  const searchResult = await fetchWithBQ(`search?entity=song&limit=1&term=${encodeURIComponent(songid)}`);
  if (searchResult.error) return null;

  return normalizeSongsResponse(searchResult.data)[0] || null;
};

export const shazamCoreApi = createApi({
  reducerPath: 'shazamCoreApi',
  baseQuery,
  endpoints: (builder) => ({
    getTopCharts: builder.query({
      query: () => 'search?entity=song&limit=25&term=top%20hits',
      transformResponse: normalizeSongsResponse,
    }),
    getSongsByGenre: builder.query({
      query: (genre) => `search?entity=song&limit=25&term=${encodeURIComponent((genre || '').replaceAll('_', ' '))}`,
      transformResponse: normalizeSongsResponse,
    }),
    getSongsByCountry: builder.query({
      query: (countryCode) => `search?entity=song&limit=25&country=${encodeURIComponent(countryCode || 'US')}&term=${encodeURIComponent(`${countryCode || 'US'} top songs`)}`,
      transformResponse: normalizeSongsResponse,
    }),
    getSongsBySearch: builder.query({
      query: (searchTerm) => `search?entity=song&limit=25&term=${encodeURIComponent(searchTerm || '')}`,
      transformResponse: normalizeSongsResponse,
    }),
    getArtistDetails: builder.query({
      async queryFn(artistId, _api, _extraOptions, fetchWithBQ) {
        const artistName = decodeURIComponent(artistId || '');
        const songsResult = await fetchWithBQ(`search?entity=song&limit=25&term=${encodeURIComponent(artistName)}`);

        if (songsResult.error) return { error: songsResult.error };

        const songs = normalizeSongsResponse(songsResult.data);
        const artistCover = songs[0]?.images?.coverart || '';
        const artistGenre = songs[0]?.genres?.primary || 'Unknown';

        return {
          data: {
            data: [{
              id: artistId,
              attributes: {
                name: artistName || songs[0]?.subtitle || 'Unknown Artist',
                genreNames: [artistGenre],
                artwork: {
                  url: artistCover,
                },
              },
              views: {
                'top-songs': {
                  data: songs,
                },
              },
            }],
          },
        };
      },
    }),
    getSongDetails: builder.query({
      async queryFn({ songid }, _api, _extraOptions, fetchWithBQ) {
        const song = await getSongById(songid, fetchWithBQ);
        return { data: song };
      },
    }),
    getSongRelated: builder.query({
      async queryFn({ songid }, _api, _extraOptions, fetchWithBQ) {
        const song = await getSongById(songid, fetchWithBQ);
        if (!song?.subtitle) return { data: [] };

        const relatedResult = await fetchWithBQ(`search?entity=song&limit=25&term=${encodeURIComponent(song.subtitle)}`);
        if (relatedResult.error) return { error: relatedResult.error };

        const related = normalizeSongsResponse(relatedResult.data)
          .filter((item) => item.key !== String(songid))
          .slice(0, 10);

        return { data: related };
      },
    }),
  }),
});

export const {
  useGetTopChartsQuery,
  useGetSongsByGenreQuery,
  useGetSongsByCountryQuery,
  useGetSongsBySearchQuery,
  useGetArtistDetailsQuery,
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
} = shazamCoreApi;
