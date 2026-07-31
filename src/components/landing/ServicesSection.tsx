import React from 'react';
import { useSiteData } from '../../context/SiteDataContext';
import { SectionHeading } from '../common/SectionHeading';
import { DynamicIcon } from '../../utils/iconHelper';

export const ServicesSection: React.FC = () => {
  const { data } = useSiteData();

  if (!data) return null;

  const { services } = data;

  // Filter valid service items (must have title or description)
  const validItems = (services.items || []).filter(
    (item) => (item.title && item.title.trim() !== '') || (item.description && item.description.trim() !== '')
  );

  if (validItems.length === 0) return null;

  return (
    <section id="services" className="py-20 sm:py-28 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Xidmətlər"
          heading={services.heading}
          subtitle={services.subtitle}
        />

        {/* Adaptive Centered Services Grid */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
          {validItems.map((service, index) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden w-full sm:w-[calc(50%-16px)] lg:w-[calc(25%-24px)] min-w-[260px] max-w-[340px] flex-grow"
            >
              {/* Top Accent Bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary-400 to-primary-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />

              <div>
                {/* Icon Container */}
                <div className="w-14 h-14 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center mb-6 group-hover:bg-primary-500 group-hover:text-white transition-colors duration-300 shadow-sm">
                  <DynamicIcon name={service.icon} className="w-7 h-7" />
                </div>

                {/* Number Watermark */}
                <span className="text-xs font-black text-slate-300 uppercase tracking-widest block mb-2">
                  0{index + 1}
                </span>

                {/* Title */}
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary-700 transition-colors mb-3">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
