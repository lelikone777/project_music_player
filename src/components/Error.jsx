import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Error = () => {
  const { t } = useLanguage();

  return (
    <div className="w-full flex justify-center items-center">
      <h1 className="font-bold text-2xl text-white">{t.error}</h1>
    </div>
  );
};

export default Error;
