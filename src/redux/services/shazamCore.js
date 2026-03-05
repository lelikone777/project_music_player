import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const toCover = (url = '') => url.replace('{w}', '400').replace('{h}', '400');

const normalizeSong = (item) => {
  const attributes = item?.attributes || {};
  const songId = item?.id || attributes?.playParams?.id || '';
  const artistName = attributes?.artistName || 'Unknown Artist';
  const cover = toCover(attributes?.artwork?.url || '');
  const preview = attributes?.previews?.[0]?.url || '';

  return {
    key: songId,
    title: attributes?.name || 'Unknown Song',
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
      primary: attributes?.genreNames?.[0] || 'Unknown',
    },
  };
};

const normalizeSongsResponse = (response) => (response?.data || [])
  .map(normalizeSong)
  .filter((song) => song.key && song.hub?.actions?.[1]?.uri);

export const shazamCoreApi = createApi({
  reducerPath: 'shazamCoreApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://shazam-core.p.rapidapi.com/',
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', import.meta.env.VITE_SHAZAM_CORE_RAPID_API_KEY);
      headers.set('X-RapidAPI-Host', 'shazam-core.p.rapidapi.com');

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({
      query: () => 'v1/search/multi?search_type=SONGS&offset=0&query=top%20hits',
      transformResponse: normalizeSongsResponse,
    }),
    getSongsByGenre: builder.query({
      query: (genre) => `v1/search/multi?search_type=SONGS&offset=0&query=${encodeURIComponent((genre || '').replaceAll('_', ' '))}`,
      transformResponse: normalizeSongsResponse,
    }),
    getSongsByCountry: builder.query({
      query: (countryCode) => `v1/search/multi?search_type=SONGS&offset=0&query=${encodeURIComponent(`${countryCode || 'US'} top songs`)}`,
      transformResponse: normalizeSongsResponse,
    }),
    getSongsBySearch: builder.query({
      query: (searchTerm) => `v1/search/multi?search_type=SONGS&offset=0&query=${encodeURIComponent(searchTerm || '')}`,
      transformResponse: normalizeSongsResponse,
    }),
    getArtistDetails: builder.query({
      async queryFn(artistId, _api, _extraOptions, fetchWithBQ) {
        const artistName = decodeURIComponent(artistId || '');

        const [artistsResult, songsResult] = await Promise.all([
          fetchWithBQ(`v1/search/multi?search_type=ARTISTS&offset=0&query=${encodeURIComponent(artistName)}`),
          fetchWithBQ(`v1/search/multi?search_type=SONGS&offset=0&query=${encodeURIComponent(artistName)}`),
        ]);

        if (artistsResult.error) return { error: artistsResult.error };
        if (songsResult.error) return { error: songsResult.error };

        const artist = artistsResult.data?.data?.[0];
        const songs = songsResult.data?.data || [];

        return {
          data: {
            data: [{
              ...artist,
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
      query: ({ songid }) => `v1/search/multi?search_type=SONGS&offset=0&query=${encodeURIComponent(songid || '')}`,
      transformResponse: (response) => normalizeSongsResponse(response)[0] || null,
    }),
    getSongRelated: builder.query({
      query: ({ songid }) => `v1/search/multi?search_type=SONGS&offset=0&query=${encodeURIComponent(songid || '')}`,
      transformResponse: (response, _meta, arg) => normalizeSongsResponse(response)
        .filter((song) => song.key !== String(arg?.songid))
        .slice(0, 10),
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
