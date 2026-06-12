// Lehký důvěryhodnostní pruh — značky, se kterými David pracoval (přes SGA).
// Záměrně decentní: loga, žádná vymyšlená čísla ani citace. Stejná sada jako sga-web.

const logos = [
  { src: '/images/clients/yoggies.svg', alt: 'Yoggies' },
  { src: '/images/clients/mana.svg', alt: 'MANA' },
  { src: '/images/clients/wild-coco.svg', alt: 'Wild & Coco' },
  { src: '/images/clients/eta.svg', alt: 'ETA' },
  { src: '/images/clients/tepe.svg', alt: 'TePe' },
  { src: '/images/clients/bloom-robbins.svg', alt: 'Bloom Robbins' },
  { src: '/images/clients/econea.svg', alt: 'Econea' },
  { src: '/images/clients/tonak.svg', alt: 'TONAK' },
  { src: '/images/clients/pavlinek.svg', alt: 'Pavlínek' }
];

export const ClientLogos = () => {
  return (
    <section className="py-12 lg:py-16 bg-white border-y border-brand-light-pink">
      <div className="container mx-auto px-4">
        <p className="text-center text-sm font-semibold uppercase tracking-wide text-brand-wine/60 mb-8">
          Značky, se kterými jsem pracoval
        </p>
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-x-10 gap-y-8">
          {logos.map((l) => (
            <img
              key={l.alt}
              src={l.src}
              alt={l.alt}
              loading="lazy"
              className="h-7 lg:h-8 w-auto object-contain opacity-55 hover:opacity-100 transition-opacity duration-300"
            />
          ))}
        </div>
      </div>
    </section>
  );
};
