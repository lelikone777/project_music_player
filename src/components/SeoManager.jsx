import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ensureMeta = (selector, attrs) => {
  let tag = document.querySelector(selector);

  if (!tag) {
    tag = document.createElement('meta');
    Object.entries(attrs).forEach(([key, value]) => tag.setAttribute(key, value));
    document.head.appendChild(tag);
  }

  return tag;
};

const getSeoForPath = (pathname) => {
  if (pathname === '/') {
    return {
      title: 'Pulsetune - Discover Music',
      description: 'Discover trending songs, top artists, and fresh tracks with Pulsetune.',
    };
  }

  if (pathname.startsWith('/top-charts')) {
    return {
      title: 'Top Charts | Pulsetune',
      description: 'Explore the top chart songs right now on Pulsetune.',
    };
  }

  if (pathname.startsWith('/top-artists')) {
    return {
      title: 'Top Artists | Pulsetune',
      description: 'Listen to and discover top artists on Pulsetune.',
    };
  }

  if (pathname.startsWith('/around-you')) {
    return {
      title: 'Around You | Pulsetune',
      description: 'Find popular songs around your location with Pulsetune.',
    };
  }

  if (pathname.startsWith('/search/')) {
    const term = decodeURIComponent(pathname.replace('/search/', ''));
    return {
      title: `${term} | Search | Pulsetune`,
      description: `Search results for "${term}" on Pulsetune.`,
    };
  }

  if (pathname.startsWith('/artists/')) {
    const artist = decodeURIComponent(pathname.replace('/artists/', ''));
    return {
      title: `${artist} | Artist | Pulsetune`,
      description: `Artist profile and songs for ${artist} on Pulsetune.`,
    };
  }

  if (pathname.startsWith('/songs/')) {
    return {
      title: 'Song Details | Pulsetune',
      description: 'Track details and related songs on Pulsetune.',
    };
  }

  return {
    title: 'Pulsetune',
    description: 'Pulsetune music app.',
  };
};

const SeoManager = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const { title, description } = getSeoForPath(pathname);

    document.title = title;

    const descriptionMeta = ensureMeta('meta[name="description"]', { name: 'description' });
    descriptionMeta.setAttribute('content', description);

    const ogTitle = ensureMeta('meta[property="og:title"]', { property: 'og:title' });
    ogTitle.setAttribute('content', title);

    const ogDescription = ensureMeta('meta[property="og:description"]', { property: 'og:description' });
    ogDescription.setAttribute('content', description);

    const twitterTitle = ensureMeta('meta[name="twitter:title"]', { name: 'twitter:title' });
    twitterTitle.setAttribute('content', title);

    const twitterDescription = ensureMeta('meta[name="twitter:description"]', { name: 'twitter:description' });
    twitterDescription.setAttribute('content', description);
  }, [pathname]);

  return null;
};

export default SeoManager;
