import { MenuItem, GalleryItem, Review, InstagramPost, Track } from './types';

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'm1',
    name: 'Strawberry Matcha Latte',
    description: 'Vibrant Uji matcha poured over cold pasture-raised milk and custom organic sweet strawberry compote. Separated layers of pink, white, and matcha green.',
    price: '$7.50',
    category: 'specialty',
    image: '/src/assets/images/strawberry_matcha_1781845822462.jpg',
    isPopular: true,
    isGlutenFree: true
  },
  {
    id: 'm2',
    name: 'Tiramisu Mascarpone Latte',
    description: 'Slow-pulled double espresso signature roast, organic milk, sweet vanilla cream syrup, capped with thick mascarpone cold foam and a generous cocoa dust.',
    price: '$8.00',
    category: 'coffee',
    image: '/src/assets/images/hero_iced_latte_1781845793820.jpg',
    isPopular: true
  },
  {
    id: 'm3',
    name: 'Korean Cloud Brioche Toast',
    description: 'Thick-cut hand-braided brioche, soft whipped sweet milk butter, organic wildflower honey glaze, served with light salted cloud cream and strawberries.',
    price: '$12.50',
    category: 'brunch',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=600',
    isVegan: false
  },
  {
    id: 'm4',
    name: 'Truffle Mushroom Fettuccine',
    description: 'House-made stone-milled ribbons of egg pasta tossed in a luxurious cream of sautéed chanterelles, black truffle paste, white wine, and fresh Parmigiano-Reggiano.',
    price: '$18.00',
    category: 'brunch',
    image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&q=80&w=600',
    isPopular: true
  },
  {
    id: 'm5',
    name: 'Japanese Fluffy Berry Pancakes',
    description: 'Three stacked wobbly soufflé pancakes, macerated wild organic berries, fresh vanilla bean chantilly cream, maple reduction, and lavender mist.',
    price: '$15.00',
    category: 'brunch',
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&q=80&w=600',
    isPopular: true
  },
  {
    id: 'm6',
    name: 'Twice-Baked Sicilian Pistachio Croissant',
    description: 'Ultra flaky 24-hour butter laminated pastry filled with a toasted organic pistachio frangipane cream, topped with chopped pistachios and delicate glaze.',
    price: '$6.50',
    category: 'pastries',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'm7',
    name: 'Blueberry Elderflower Cold Brew',
    description: 'Cold-brewed single-origin Ethiopian coffee, naturally sweetened with organic blueberry compote and wild elderflower cordial, served on geometric ice rock.',
    price: '$6.75',
    category: 'coffee',
    image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&q=80&w=600',
    isGlutenFree: true,
    isVegan: true
  },
  {
    id: 'm8',
    name: 'Crystallized Rose & Peach Scone',
    description: 'Buttery, crumbly warm vanilla scone baked with white peach slices, glazed with organic rosewater syrup, served with triple-devon clotted cream.',
    price: '$5.50',
    category: 'pastries',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g1',
    title: 'The Sun-Drenched Studio Room',
    category: 'interior',
    image: '/src/assets/images/cafe_interior_1781845810344.jpg',
    cols: 'md:col-span-2 md:row-span-2'
  },
  {
    id: 'g2',
    title: 'Precision Extraction Slow Brew',
    category: 'brews',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=800',
    cols: 'md:col-span-1 md:row-span-1'
  },
  {
    id: 'g3',
    title: 'Sharing Sweet Berry Moments',
    category: 'brunch',
    image: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&q=80&w=800',
    cols: 'md:col-span-1 md:row-span-2'
  },
  {
    id: 'g4',
    title: 'Linen Cushions & Warm Oak Oak',
    category: 'interior',
    image: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&q=80&w=800',
    cols: 'md:col-span-1 md:row-span-1'
  },
  {
    id: 'g5',
    title: 'The Perfect Flat Lay Coffee Vibe',
    category: 'vibe',
    image: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&q=80&w=800',
    cols: 'md:col-span-2 md:row-span-1'
  },
  {
    id: 'g6',
    title: 'Cozy Morning Social Plates',
    category: 'brunch',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=800',
    cols: 'md:col-span-1 md:row-span-1'
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'r1',
    name: 'Emily Watson',
    handle: '@emily_clicks',
    rating: 5,
    text: 'The Iced Strawberry Matcha Latte literally tastes like a pink cream dream! The light oak chairs with linen pillows are so comfortable I spent 4 hours coding here. 11/10 vibe!',
    date: '2 days ago',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150'
  },
  {
    id: 'r2',
    name: 'Lucas Kim',
    handle: '@lucas.bakes',
    rating: 5,
    text: 'Actually obsessed with their Korean Cloud Brioche! It has crisp caramel edges yet a cloud-like souffled egg center. Perfect sweet and savory balance. And the custom lo-fi playlist is absolute gold.',
    date: '1 week ago',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150'
  },
  {
    id: 'r3',
    name: 'Chloe Sinclair',
    handle: '@chloe.creates',
    rating: 5,
    text: 'Aesthetic is unreal. There isn’t a single angle in Brew & Bloom that isn’t photogenic. The travertine counters and plaster arches are gorgeous. Hands down the best aesthetic spot in town.',
    date: '3 days ago',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150'
  },
  {
    id: 'r4',
    name: 'Marcus Thorne',
    handle: '@marcus_vibes',
    rating: 5,
    text: 'Cold-brewed elderflower coffee is something I never knew I desperately needed on a Tuesday. Super fast Wi-Fi and every table has power. They got it 100% right.',
    date: '4 days ago',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150'
  }
];

export const INSTAGRAM_POSTS: InstagramPost[] = [
  {
    id: 'i1',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=600',
    likes: 842,
    comments: 48,
    caption: 'slow warm morning beams. who are you bringing here tomorrow? 💭🍵 #cozyvibe #pourover'
  },
  {
    id: 'i2',
    image: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&q=80&w=600',
    likes: 1205,
    comments: 72,
    caption: 'croissants and keynotes. work space setup on point. 🥐💻 #studysession #morningroutine'
  },
  {
    id: 'i3',
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&q=80&w=600',
    likes: 954,
    comments: 31,
    caption: 'layers of joy. organic uji matcha cold foam floats. yes, please! 🍵🌱 #matchacoloflow'
  },
  {
    id: 'i4',
    image: 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?auto=format&fit=crop&q=80&w=600',
    likes: 1530,
    comments: 89,
    caption: 'our secret thick fluffy stack, sweet maple reductions. brunch belongs here. 🥞✨ #aestheticbrunch'
  },
  {
    id: 'i5',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=600',
    likes: 1894,
    comments: 112,
    caption: 'sun-soaked plaster, terrazzo curves, and leafy greens. breathe out, sit back. 🌿🍂 #organicdesign'
  },
  {
    id: 'i6',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&q=80&w=600',
    likes: 710,
    comments: 29,
    caption: 'melt-in-your-mouth double baked pastries and espresso. happy Thursday. 🤎☕️ #coffeetime'
  }
];

export const PLAYLIST: Track[] = [
  {
    id: 't1',
    title: 'Slow Steeps & Morning Rays',
    artist: 'Coffee House Chillout',
    duration: '2:48'
  },
  {
    id: 't2',
    title: 'Matcha Foam Whispers',
    artist: 'Lofi Girl Beats',
    duration: '3:15'
  },
  {
    id: 't3',
    title: 'Travertine Shadows (Piano Mood)',
    artist: 'Late Night Chillhop',
    duration: '2:32'
  },
  {
    id: 't4',
    title: 'Brioche Glaze Dreams',
    artist: 'Tokyo Coffee Lounge',
    duration: '3:04'
  },
  {
    id: 't5',
    title: 'Breathe Out, Sip In',
    artist: 'Organic Pastel Records',
    duration: '2:55'
  }
];
