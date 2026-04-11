import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const toCover = (url = '') => url
  .replace(/100x100/gi, '400x400')
  .replace(/\/\d+x\d+bb(?=\.)/gi, '/400x400bb');

const genreFeedMap = {
  POP: 14,
  HIP_HOP_RAP: 18,
  DANCE: 17,
  ELECTRONIC: 7,
  SOUL_RNB: 15,
  ALTERNATIVE: 20,
  ROCK: 21,
  LATIN: 12,
  FILM_TV: 16,
  COUNTRY: 6,
  WORLDWIDE: 19,
  REGGAE_DANCE_HALL: 24,
  HOUSE: 17,
  K_POP: 51,
};

const normalizeCountryCode = (countryCode = 'US') => {
  const normalizedCountryCode = String(countryCode).trim().toLowerCase();
  return /^[a-z]{2}$/.test(normalizedCountryCode) ? normalizedCountryCode : 'us';
};

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

const normalizeRssSong = (entry = {}) => {
  const songId = entry?.id?.attributes?.['im:id'] || '';
  const artistName = entry?.['im:artist']?.label || 'Unknown Artist';
  const images = entry?.['im:image'] || [];
  const previewLink = (entry?.link || []).find((item) => item?.attributes?.['im:assetType'] === 'preview');
  const genreName = entry?.category?.attributes?.label || entry?.category?.attributes?.term || 'Unknown';

  return {
    key: songId,
    title: entry?.['im:name']?.label || entry?.title?.label || 'Unknown Song',
    subtitle: artistName,
    images: {
      coverart: toCover(images[images.length - 1]?.label || ''),
      background: toCover(images[images.length - 1]?.label || ''),
    },
    artists: [{ adamid: encodeURIComponent(artistName) }],
    hub: {
      actions: [{}, { uri: previewLink?.attributes?.href || '' }],
    },
    genres: {
      primary: genreName,
    },
    sections: [],
  };
};

const normalizeSongsResponse = (response) => (response?.results || [])
  .filter((item) => item?.wrapperType === 'track')
  .map(normalizeSong)
  .filter((song) => song.key && song.hub?.actions?.[1]?.uri);

const normalizeRssSongsResponse = (response) => {
  const entries = response?.feed?.entry || response?.feed?.results || [];

  return entries
    .map((entry) => (entry?.['im:name'] ? normalizeRssSong(entry) : normalizeSong({
      trackId: entry?.id,
      artistName: entry?.artistName,
      artworkUrl100: entry?.artworkUrl100,
      previewUrl: entry?.previewUrl,
      trackName: entry?.name,
      primaryGenreName: entry?.genres?.[0]?.name,
    })))
    .filter((song) => song.key && song.hub?.actions?.[1]?.uri);
};

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://itunes.apple.com/',
});

const getTopSongsFeed = async ({ countryCode = 'US', genre }, fetchWithBQ) => {
  const normalizedCountryCode = normalizeCountryCode(countryCode);
  const genrePath = genreFeedMap[genre] ? `/genre=${genreFeedMap[genre]}` : '';
  const result = await fetchWithBQ(`${normalizedCountryCode}/rss/topsongs/limit=25${genrePath}/json`);

  if (result.error) return { error: result.error };

  return { data: normalizeRssSongsResponse(result.data) };
};

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
      async queryFn(_arg, _api, _extraOptions, fetchWithBQ) {
        return getTopSongsFeed({ countryCode: 'US' }, fetchWithBQ);
      },
    }),
    getSongsByGenre: builder.query({
      async queryFn(genre, _api, _extraOptions, fetchWithBQ) {
        if (genreFeedMap[genre]) {
          return getTopSongsFeed({ countryCode: 'US', genre }, fetchWithBQ);
        }

        const result = await fetchWithBQ(`search?entity=song&limit=25&term=${encodeURIComponent((genre || '').replaceAll('_', ' '))}`);
        if (result.error) return { error: result.error };
        return { data: normalizeSongsResponse(result.data) };
      },
    }),
    getSongsByCountry: builder.query({
      async queryFn(countryCode, _api, _extraOptions, fetchWithBQ) {
        return getTopSongsFeed({ countryCode }, fetchWithBQ);
      },
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
