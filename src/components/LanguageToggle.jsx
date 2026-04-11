import React from 'react';

import { useLanguage } from '../context/LanguageContext';

const LanguageToggle = () => {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      aria-label={t.languageToggleAria}
      className="fixed right-3 top-4 z-30 rounded-full border border-white/30 bg-black/35 px-3 py-2 text-xs font-semibold text-white backdrop-blur-sm transition-colors hover:bg-black/50 sm:right-4 sm:text-sm md:absolute md:right-6"
    >
      {language.toUpperCase()}
    </button>
  );
};

export default LanguageToggle;
