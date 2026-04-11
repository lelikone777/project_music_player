import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { FiSearch } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';

const Searchbar = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const { t } = useLanguage();

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedSearchTerm = searchTerm.trim();

    if (!trimmedSearchTerm) return;

    navigate(`/search/${trimmedSearchTerm}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="off"
      className="z-10 px-3 pb-3 pt-16 text-gray-300 focus-within:text-white sm:px-4 md:px-6 md:pb-4 md:pt-4"
    >
      <label htmlFor="search-field" className="sr-only">
        {t.searchLabel}
      </label>
      <div className="flex items-center rounded-2xl border border-white/10 bg-white/5 px-3 shadow-lg shadow-black/10 backdrop-blur-sm">
        <FiSearch aria-hidden="true" className="h-5 w-5 shrink-0" />
        <input
          name="search-field"
          autoComplete="off"
          id="search-field"
          className="min-w-0 flex-1 bg-transparent border-none px-3 py-3 text-sm text-white outline-none placeholder:text-gray-500 sm:py-4 sm:text-base"
          placeholder={t.searchPlaceholder}
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </form>
  );
};

export default Searchbar;
