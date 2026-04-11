import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Error = () => {
  const { t } = useLanguage();

  return (
    <div className="flex min-h-[240px] w-full items-center justify-center">
      <h1 className="text-center text-xl font-bold text-white sm:text-2xl">{t.error}</h1>
    </div>
  );
};

export default Error;
