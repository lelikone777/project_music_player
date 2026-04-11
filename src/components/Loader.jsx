import React from 'react';

import { loader } from '../assets';
import { useLanguage } from '../context/LanguageContext';

const Loader = ({ title, compact = false }) => {
  const { t } = useLanguage();

  return (
    <div className={`flex w-full flex-col items-center justify-center ${compact ? 'min-h-[180px]' : 'min-h-[320px] sm:min-h-[420px]'}`}>
      <img src={loader} alt="loader" className="h-24 w-24 object-contain sm:h-32 sm:w-32" />
      <h1 className="mt-2 text-center text-lg font-bold text-white sm:text-2xl">{title || t.loading}</h1>
    </div>
  );
};

export default Loader;
