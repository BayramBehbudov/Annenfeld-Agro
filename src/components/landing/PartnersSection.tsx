import React from 'react';
import { useSiteData } from '../../context/SiteDataContext';
import { SectionHeading } from '../common/SectionHeading';

export const PartnersSection: React.FC = () => {
  const { data } = useSiteData();

  if (!data) return null;

  const { partners } = data;

  // Filter out any empty partner objects that have neither a logoUrl nor a name
  const validPartners = (partners.items || []).filter(
    (partner) => (partner.logoUrl && partner.logoUrl.trim() !== '') || (partner.name && partner.name.trim() !== '')
  );

  if (validPartners.length === 0) return null;

  return (
    <section id="partners" className="py-20 sm:py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Tərəfdaşlarımız"
          heading={partners.heading}
          subtitle={partners.subtitle}
        />

        {/* Adaptive Centered Logo & Name Grid */}
        <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-8">
          {validPartners.map((partner) => (
            <div
              key={partner.id}
              className="p-5 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col items-center justify-center text-center gap-2.5 hover:bg-white hover:shadow-lg hover:border-primary-200 transition-all duration-300 group w-[150px] sm:w-[180px] min-h-[110px] shrink-0"
            >
              {/* Partner Logo */}
              {partner.logoUrl && (
                <img
                  src={partner.logoUrl}
                  alt={partner.name || 'Tərəfdaş loqosu'}
                  className="max-h-10 max-w-[130px] object-contain opacity-80 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0"
                />
              )}

              {/* Partner Name */}
              {partner.name && (
                <span className="text-xs sm:text-sm font-bold text-slate-700 group-hover:text-primary-700 transition-colors leading-tight">
                  {partner.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
