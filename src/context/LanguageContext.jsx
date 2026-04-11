import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'pulsetune-language';
const DEFAULT_LANGUAGE = 'en';

const translations = {
  en: {
    languageToggle: 'EN',
    languageToggleAria: 'Switch language to Russian',
    searchLabel: 'Search songs on Pulsetune',
    searchPlaceholder: 'Search on Pulsetune',
    navDiscover: 'Discover',
    navAroundYou: 'Around You',
    navTopArtists: 'Top Artists',
    navTopCharts: 'Top Charts',
    topCharts: 'Top Charts',
    topArtists: 'Top Artists',
    seeMore: 'See more',
    loadingSongs: 'Loading songs...',
    discoverGenre: (genre) => `Discover ${genre}`,
    searching: (term) => `Searching ${term}...`,
    showingResultsFor: 'Showing results for',
    loadingTopCharts: 'Loading Top Charts',
    discoverTopCharts: 'Discover Top Charts',
    loadingArtists: 'Loading artists...',
    loadingAroundYou: 'Loading songs around you...',
    aroundYou: (country) => `Around you ${country}`,
    searchingSongDetails: 'Searching song details',
    lyrics: 'Lyrics:',
    noLyrics: 'Sorry, no lyrics found!',
    loadingArtistDetails: 'Loading artist details...',
    relatedSongs: 'Related Songs:',
    loading: 'Loading',
    error: 'Something went wrong. Please try again',
    noActiveSong: 'No active song',
    genres: {
      POP: 'Pop',
      HIP_HOP_RAP: 'Hip-Hop',
      DANCE: 'Dance',
      ELECTRONIC: 'Electronic',
      SOUL_RNB: 'Soul',
      ALTERNATIVE: 'Alternative',
      ROCK: 'Rock',
      LATIN: 'Latin',
      FILM_TV: 'Film',
      COUNTRY: 'Country',
      WORLDWIDE: 'Worldwide',
      REGGAE_DANCE_HALL: 'Reggae',
      HOUSE: 'House',
      K_POP: 'K-Pop',
    },
  },
  ru: {
    languageToggle: 'RU',
    languageToggleAria: 'Переключить язык на английский',
    searchLabel: 'Поиск треков в Pulsetune',
    searchPlaceholder: 'Искать в Pulsetune',
    navDiscover: 'Обзор',
    navAroundYou: 'Рядом с вами',
    navTopArtists: 'Топ артисты',
    navTopCharts: 'Топ чарты',
    topCharts: 'Топ-чарты',
    topArtists: 'Топ-артисты',
    seeMore: 'Смотреть ещё',
    loadingSongs: 'Загрузка треков...',
    discoverGenre: (genre) => `Жанр: ${genre}`,
    searching: (term) => `Поиск: ${term}...`,
    showingResultsFor: 'Результаты по запросу',
    loadingTopCharts: 'Загрузка топ-чартов',
    discoverTopCharts: 'Топ-чарты',
    loadingArtists: 'Загрузка артистов...',
    loadingAroundYou: 'Загрузка треков рядом с вами...',
    aroundYou: (country) => `Рядом с вами ${country}`,
    searchingSongDetails: 'Загрузка деталей трека',
    lyrics: 'Текст песни:',
    noLyrics: 'К сожалению, текст не найден',
    loadingArtistDetails: 'Загрузка информации об артисте...',
    relatedSongs: 'Похожие треки:',
    loading: 'Загрузка',
    error: 'Что-то пошло не так. Попробуйте снова',
    noActiveSong: 'Нет активного трека',
    genres: {
      POP: 'Поп',
      HIP_HOP_RAP: 'Хип-хоп',
      DANCE: 'Танцевальная',
      ELECTRONIC: 'Электроника',
      SOUL_RNB: 'Соул',
      ALTERNATIVE: 'Альтернатива',
      ROCK: 'Рок',
      LATIN: 'Латино',
      FILM_TV: 'Кино/ТВ',
      COUNTRY: 'Кантри',
      WORLDWIDE: 'Мировая',
      REGGAE_DANCE_HALL: 'Регги',
      HOUSE: 'Хаус',
      K_POP: 'K-pop',
    },
  },
};

const getSavedLanguage = () => {
  if (typeof window === 'undefined') return DEFAULT_LANGUAGE;

  const storedLanguage = window.localStorage.getItem(STORAGE_KEY);
  return storedLanguage === 'ru' || storedLanguage === 'en'
    ? storedLanguage
    : DEFAULT_LANGUAGE;
};

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(getSavedLanguage);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === 'en' ? 'ru' : 'en'));
  };

  const value = useMemo(() => ({
    language,
    t: translations[language],
    toggleLanguage,
  }), [language]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error('useLanguage must be used inside LanguageProvider');
  }

  return context;
};
