interface SeasonalHeroProps {
  title: string;
  subtitle: string;
  ctaText?: string;
  ctaHref?: string;
  bgClass?: string;
}

export function SeasonalHero({ title, subtitle, ctaText, ctaHref, bgClass }: SeasonalHeroProps) {
  return (
    <section className={`relative overflow-hidden rounded-2xl ${bgClass ?? 'bg-gradient-to-r from-amber-50 to-orange-100'} px-6 py-16 sm:px-12 sm:py-24`}>
      <div className="relative z-10">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-gray-600">
          {subtitle}
        </p>
        {ctaText && ctaHref && (
          <a
            href={ctaHref}
            className="mt-6 inline-flex items-center rounded-lg bg-amber-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-amber-600"
          >
            {ctaText}
          </a>
        )}
      </div>
    </section>
  );
}
