import React from 'react';
import { useSiteData } from '../../context/SiteDataContext';
import { SectionHeading } from '../common/SectionHeading';
import { DynamicIcon } from '../../utils/iconHelper';

export const WhyUsSection: React.FC = () => {
  const { data } = useSiteData();

  if (!data) return null;

  const { whyUs } = data;

  // Filter valid whyUs items (must have title or description)
  const validItems = (whyUs.items || []).filter(
    (item) => (item.title && item.title.trim() !== '') || (item.description && item.description.trim() !== '')
  );

  if (validItems.length === 0) return null;

  return (
    <section id="why-us" className="py-20 sm:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Üstünlüklərimiz"
          heading={whyUs.heading}
          subtitle={whyUs.subtitle}
        />

        {/* Adaptive Centered WhyUs Grid */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
          {validItems.map((item) => (
            <div
              key={item.id}
              className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl hover:border-primary-100 transition-all duration-300 group w-full sm:w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)] min-w-[280px] max-w-[380px] flex-grow"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary-100 text-primary-700 flex items-center justify-center mb-6 group-hover:bg-primary-500 group-hover:text-white transition-colors duration-300 shadow-sm">
                <DynamicIcon name={item.icon} className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary-700 transition-colors mb-3">
                {item.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
