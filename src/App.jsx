import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { Searchbar, Sidebar, MusicPlayer, TopPlay, SeoManager, LanguageToggle } from './components';
import { ArtistDetails, TopArtists, AroundYou, Discover, Search, SongDetails, TopCharts } from './pages';
 
const App = () => {
  const { activeSong } = useSelector((state) => state.player);

  return (
    <div className="relative flex min-h-[100dvh] w-full overflow-hidden bg-[#050816]">
      <SeoManager />
      <Sidebar />
      <div className="relative flex min-w-0 flex-1 flex-col bg-gradient-to-br from-black via-[#09091f] to-[#121286]">
        <LanguageToggle />
        <Searchbar />

        <div className="hide-scrollbar flex min-h-0 flex-1 flex-col-reverse gap-8 overflow-y-auto px-3 pb-[calc(9rem+env(safe-area-inset-bottom))] sm:px-4 md:px-6 xl:flex-row xl:items-start">
          <div className="min-w-0 flex-1 pb-2 xl:pb-10">
            <Routes>
              <Route path="/" element={<Discover />} />
              <Route path="/top-artists" element={<TopArtists />} />
              <Route path="/top-charts" element={<TopCharts />} />
              <Route path="/around-you" element={<AroundYou />} />
              <Route path="/artists/:id" element={<ArtistDetails />} />
              <Route path="/songs/:songid" element={<SongDetails />} />
              <Route path="/search/:searchTerm" element={<Search />} />
            </Routes>
          </div>
          <div className="w-full xl:sticky xl:top-0 xl:w-auto xl:self-start">
            <TopPlay />
          </div>
        </div>
      </div>

      {activeSong?.title && (
        <div className="absolute bottom-0 left-0 right-0 z-20 flex min-h-[132px] animate-slideup rounded-t-[2rem] bg-gradient-to-br from-white/10 to-[#2a2a80] pb-[env(safe-area-inset-bottom)] backdrop-blur-lg md:h-28 md:min-h-0">
          <MusicPlayer />
        </div>
      )}
    </div>
  );
};

export default App;
