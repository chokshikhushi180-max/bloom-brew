export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  category: 'coffee' | 'specialty' | 'pastries' | 'brunch';
  image: string;
  isPopular?: boolean;
  isGlutenFree?: boolean;
  isVegan?: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'all' | 'interior' | 'brews' | 'brunch' | 'vibe';
  image: string;
  cols?: string; // for masonry span layout
  rows?: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  handle: string; // instagram handles are very Gen-Z
  date: string;
  avatar: string;
}

export interface InstagramPost {
  id: string;
  image: string;
  likes: number;
  comments: number;
  caption: string;
  isLiked?: boolean;
}

export interface Reservation {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  locationPreference: 'window' | 'patio' | 'workplace' | 'lounge' | 'any';
  specialRequests?: string;
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string;
  url?: string; // aesthetic lofi tracks
}
