import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { HiOutlineHashtag, HiOutlineHome, HiOutlineMenu, HiOutlinePhotograph, HiOutlineUserGroup } from 'react-icons/hi';
import { RiCloseLine } from 'react-icons/ri';

import { logo } from '../assets';
import { useLanguage } from '../context/LanguageContext';

const links = [
  { key: 'navDiscover', to: '/', icon: HiOutlineHome },
  { key: 'navAroundYou', to: '/around-you', icon: HiOutlinePhotograph },
  { key: 'navTopArtists', to: '/top-artists', icon: HiOutlineUserGroup },
  { key: 'navTopCharts', to: '/top-charts', icon: HiOutlineHashtag },
];

const NavLinks = ({ handleClick, t }) => (
  <div className="mt-8 flex flex-col gap-2">
    {links.map((item) => (
      <NavLink
        key={item.key}
        to={item.to}
        className="flex flex-row items-center rounded-xl px-3 py-3 text-sm font-medium text-gray-300 transition-colors hover:bg-white/5 hover:text-cyan-400 sm:text-base"
        onClick={() => handleClick && handleClick()}
      >
        <item.icon className="mr-3 h-5 w-5 sm:h-6 sm:w-6" />
        {t[item.key]}
      </NavLink>
    ))}
  </div>
);

const Sidebar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <>
      <div className="hidden w-[220px] flex-col bg-[#191624] px-4 py-8 md:flex lg:w-[240px]">
        <img src={logo} alt="Pulsetune logo" className="w-full h-14 object-contain" />
        <NavLinks t={t} />
      </div>

      {/* Mobile sidebar */}
      <div className="fixed left-3 top-4 z-30 block md:hidden">
        {!mobileMenuOpen ? (
          <button
            type="button"
            aria-label="Open navigation"
            onClick={() => setMobileMenuOpen(true)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/30 text-white backdrop-blur-sm"
          >
            <HiOutlineMenu className="h-6 w-6" />
          </button>
        ) : (
          <button
            type="button"
            aria-label="Close navigation"
            onClick={() => setMobileMenuOpen(false)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/30 text-white backdrop-blur-sm"
          >
            <RiCloseLine className="h-6 w-6" />
          </button>
        )}
      </div>

      <button
        type="button"
        aria-label="Close navigation overlay"
        onClick={() => setMobileMenuOpen(false)}
        className={`fixed inset-0 z-30 bg-black/60 backdrop-blur-sm transition-opacity md:hidden ${mobileMenuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
      />

      <div className={`fixed left-0 top-0 z-40 h-[100dvh] w-[min(18rem,85vw)] bg-gradient-to-b from-[#191624] to-[#2b2370] p-5 shadow-2xl shadow-black/50 backdrop-blur-lg md:hidden smooth-transition ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="mt-14">
          <img src={logo} alt="Pulsetune logo" className="h-12 w-full object-contain" />
          <NavLinks t={t} handleClick={() => setMobileMenuOpen(false)} />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
