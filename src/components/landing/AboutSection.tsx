import React from 'react';
import { useSiteData } from '../../context/SiteDataContext';
import { SectionHeading } from '../common/SectionHeading';
import { DynamicIcon } from '../../utils/iconHelper';

export const AboutSection: React.FC = () => {
  const { data } = useSiteData();

  if (!data) return null;

  const { about, general } = data;
  const companyName = general.companyName;

  const validFeatures = (about.features || []).filter(
    (f) => (f.title && f.title.trim() !== '') || (f.description && f.description.trim() !== '')
  );

  return (
    <section id="about" className="py-20 sm:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge={companyName}
          heading={about.heading}
          subtitle={about.subtitle}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Image with Decorative Overlay */}
          {about.imageUrl && (
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-100 group">
                <img
                  src={about.imageUrl}
                  alt={about.heading || companyName}
                  className="w-full h-[400px] sm:h-[480px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                {(companyName || general.slogan) && (
                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl glass-card border border-white/30 text-slate-900 shadow-lg">
                    {companyName && (
                      <p className="text-sm font-bold text-primary-700">
                        {companyName}
                      </p>
                    )}
                    {general.slogan && (
                      <p className="text-xs text-slate-600 mt-0.5">
                        {general.slogan}
                      </p>
                    )}
                  </div>
                )}
              </div>
              {/* Background Accent Pill */}
              <div className="absolute -bottom-4 -left-4 w-48 h-48 bg-primary-500/10 rounded-full blur-2xl -z-10" />
            </div>
          )}

          {/* Right: Text & Feature Cards */}
          <div className={`${about.imageUrl ? 'lg:col-span-7' : 'lg:col-span-12'} space-y-8`}>
            <div className="space-y-4">
              {about.contentParagraph1 && (
                <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
                  {about.contentParagraph1}
                </p>
              )}
              {about.contentParagraph2 && (
                <p className="text-base text-slate-600 leading-relaxed font-normal">
                  {about.contentParagraph2}
                </p>
              )}
            </div>

            {/* Feature Cards Grid */}
            {validFeatures.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                {validFeatures.map((feature) => (
                  <div
                    key={feature.id}
                    className="p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-primary-200 hover:shadow-md transition-all group flex items-start gap-4"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary-100 text-primary-700 flex items-center justify-center shrink-0 group-hover:bg-primary-500 group-hover:text-white transition-colors shadow-sm">
                      <DynamicIcon name={feature.icon} className="w-6 h-6" />
                    </div>
                    <div>
                      {feature.title && (
                        <h3 className="text-base font-bold text-slate-900 group-hover:text-primary-700 transition-colors">
                          {feature.title}
                        </h3>
                      )}
                      {feature.description && (
                        <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                          {feature.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
