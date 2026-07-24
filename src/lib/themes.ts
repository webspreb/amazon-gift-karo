export interface SeasonTheme {
  key: string;
  label: string;
  startMonth: number;
  startDay: number;
  endMonth: number;
  endDay: number;
  colors: {
    primary: string;
    secondary: string;
    bg: string;
  };
  hero: {
    title: string;
    subtitle: string;
    bgClass: string;
  };
}

export const seasons: SeasonTheme[] = [
  {
    key: 'diwali',
    label: 'Diwali',
    startMonth: 10, startDay: 15,
    endMonth: 11, endDay: 5,
    colors: { primary: 'amber', secondary: 'orange', bg: 'from-orange-50 to-amber-50' },
    hero: {
      title: 'Diwali Gift Guide 2026',
      subtitle: 'Find the perfect gifts for your loved ones this festival of lights.',
      bgClass: 'bg-gradient-to-r from-orange-50 to-amber-50',
    },
  },
  {
    key: 'valentine',
    label: "Valentine's",
    startMonth: 2, startDay: 1,
    endMonth: 2, endDay: 15,
    colors: { primary: 'rose', secondary: 'pink', bg: 'from-rose-50 to-pink-50' },
    hero: {
      title: "Valentine's Day Gift Guide",
      subtitle: "Show your love with thoughtful, romantic gifts they'll cherish.",
      bgClass: 'bg-gradient-to-r from-rose-50 to-pink-50',
    },
  },
  {
    key: 'christmas',
    label: 'Christmas',
    startMonth: 12, startDay: 1,
    endMonth: 12, endDay: 26,
    colors: { primary: 'red', secondary: 'green', bg: 'from-red-50 to-green-50' },
    hero: {
      title: 'Christmas Gift Guide',
      subtitle: 'Spread joy with unique and thoughtful Christmas gifts.',
      bgClass: 'bg-gradient-to-r from-red-50 to-green-50',
    },
  },
  {
    key: 'default',
    label: 'Gifts',
    startMonth: 1, startDay: 1,
    endMonth: 12, endDay: 31,
    colors: { primary: 'amber', secondary: 'orange', bg: 'from-amber-50 to-orange-50' },
    hero: {
      title: 'Find the Perfect Gift',
      subtitle: 'Discover thoughtful, unexpected gift ideas for every Indian festival and occasion.',
      bgClass: 'bg-gradient-to-r from-amber-50 to-orange-50',
    },
  },
];

export function getActiveSeason(): SeasonTheme {
  const now = new Date();
  for (const season of seasons) {
    const start = new Date(now.getFullYear(), season.startMonth - 1, season.startDay);
    const end = new Date(now.getFullYear(), season.endMonth - 1, season.endDay);
    if (now >= start && now <= end) return season;
  }
  return seasons.find(s => s.key === 'default')!;
}
