export interface CategoryMeta {
  name: string;
  icon: string;
  desc: string;
  editorial: string;
  related: string[];
}

export const categoryMetadata: Record<string, CategoryMeta> = {
  diwali: {
    name: 'Diwali Gifts',
    icon: '🪔',
    desc: 'Illuminate their celebrations with handcrafted diyas, artisanal sweets, and thoughtful treasures for the Festival of Lights.',
    editorial: 'Diwali is more than lights and sweets — it\'s about expressing love, gratitude, and hope. Our curated Diwali gifts go beyond the ordinary, featuring handcrafted brass diyas from Moradabad, artisanal mithai boxes, and unique home decor pieces that bring warmth to every corner. Each gift tells a story of craftsmanship and care, making your celebrations truly meaningful.',
    related: ['holi', 'raksha-bandhan', 'eid'],
  },
  christmas: {
    name: 'Christmas Gifts',
    icon: '🎄',
    desc: 'Celebrate the season of giving with curated gift boxes, artisanal treats, and heartfelt surprises.',
    editorial: 'Christmas is about creating moments of wonder and joy. Our curated Christmas collection features luxury gift boxes with artisanal chocolates, handpicked ornaments, scented candles, and unique finds that bring smiles. From cozy winter essentials to elegant home decor, every gift is chosen to make the season magical.',
    related: ['valentines', 'birthday', 'housewarming'],
  },
  valentines: {
    name: "Valentine's Gifts",
    icon: '💝',
    desc: 'Express love with personalized keepsakes, romantic experiences, and thoughtful surprises.',
    editorial: 'Love deserves more than flowers and chocolate. Our Valentine\'s collection features personalized star maps of your special night, handcrafted jewelry, artisanal treat boxes, and sentimental keepsakes that capture your story. Each gift is chosen to make your loved one feel truly cherished.',
    related: ['anniversary', 'birthday', 'christmas'],
  },
  birthday: {
    name: 'Birthday Gifts',
    icon: '🎂',
    desc: 'Find the perfect gift for every personality — from tech enthusiasts to wellness lovers.',
    editorial: 'Birthdays are about celebrating the unique person in your life. Our curated birthday collection spans every interest and personality — from smart plant sensors for the green thumb to artisanal tea sets for the mindful soul. Skip the generic gifts and find something that truly speaks to who they are.',
    related: ['anniversary', 'graduation', 'housewarming'],
  },
  anniversary: {
    name: 'Anniversary Gifts',
    icon: '💍',
    desc: 'Commemorate your journey together with sentimental, elegant, and meaningful gifts.',
    editorial: 'Anniversaries celebrate the story you\'re writing together. Our curated collection features personalized star maps, artisanal ceramic sets, handcrafted leather journals, and elegant keepsakes that mark your journey. Each gift is chosen to honor your unique bond.',
    related: ['valentines', 'birthday', 'wedding'],
  },
  housewarming: {
    name: 'Housewarming Gifts',
    icon: '🏠',
    desc: 'Welcome them home with smart home gadgets, artisanal decor, and thoughtful essentials.',
    editorial: 'A new home is a fresh chapter. Our housewarming collection features smart plant sensors for the urban jungle, artisanal tea sets for cozy mornings, bamboo chargers for the modern home, and vintage decor pieces that add character. Each gift helps turn a house into a home.',
    related: ['wedding', 'diwali', 'christmas'],
  },
  wedding: {
    name: 'Wedding Gifts',
    icon: '💒',
    desc: 'Celebrate their union with elegant, practical, and memorable gifts they\'ll treasure.',
    editorial: 'Weddings mark the beginning of a beautiful journey. Our curated collection features artisanal spice collections for the foodie couple, elegant drink dispensers for their new home, and sentimental keepsakes that commemorate their special day. Each gift is chosen to bless their new chapter.',
    related: ['anniversary', 'housewarming', 'valentines'],
  },
  holi: {
    name: 'Holi Gifts',
    icon: '🌈',
    desc: 'Add color to celebrations with vibrant, festive, and joyful gift picks.',
    editorial: 'Holi is the festival of colors, joy, and togetherness. Our curated collection features vibrant home decor, artisanal sweets, colorful accessories, and festive essentials that make your celebrations brighter. Each gift captures the spirit of this joyous occasion.',
    related: ['diwali', 'raksha-bandhan', 'pongal'],
  },
  eid: {
    name: 'Eid Gifts',
    icon: '🌙',
    desc: 'Honor the occasion with elegant, thoughtful, and culturally meaningful gifts.',
    editorial: 'Eid is a time of gratitude, generosity, and celebration. Our curated collection features elegant gift boxes, artisanal dates and sweets, decorative pieces, and thoughtful accessories that honor this blessed occasion. Each gift reflects the spirit of sharing and joy.',
    related: ['diwali', 'holi', 'raksha-bandhan'],
  },
  'raksha-bandhan': {
    name: 'Raksha Bandhan Gifts',
    icon: '🧵',
    desc: 'Celebrate the bond of siblings with unique rakhis and meaningful gifts.',
    editorial: 'Raksha Bandhan celebrates the beautiful bond between brothers and sisters. Our collection features unique handcrafted rakhis, matching accessories, personalized keepsakes, and sweet treats that honor this special relationship.',
    related: ['diwali', 'holi', 'eid'],
  },
};

// Fallback logic if key is not defined explicitly
export function getCategoryMeta(key: string): CategoryMeta {
  const normalizedKey = key.toLowerCase();
  if (categoryMetadata[normalizedKey]) {
    return categoryMetadata[normalizedKey];
  }

  // Generate fallback values
  const name = key
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ') + ' Gifts';

  return {
    name,
    icon: '🎁',
    desc: `Discover handpicked, thoughtful ${name.toLowerCase()} ideas.`,
    editorial: `${name} are about celebrating precious connections. Our editorial team searches the market to bring you unique, handcrafted, and high-quality selections that feel personal.`,
    related: ['birthday', 'anniversary'],
  };
}
