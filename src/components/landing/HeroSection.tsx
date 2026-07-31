import React from 'react';
import { useSiteData } from '../../context/SiteDataContext';
import { Button } from '../common/Button';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { scrollToSection } from '../../utils/scrollHelper';

export const HeroSection: React.FC = () => {
  const { data } = useSiteData();

  if (!data) return null;

  const { hero, general } = data;
  const companyName = general.companyName;

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 overflow-hidden"
    >
      {/* Background Image with Dark Gradient Overlay */}
      {hero.bgImageUrl && (
        <div className="absolute inset-0 z-0">
          <img
            src={hero.bgImageUrl}
            alt={hero.title}
            className="w-full h-full object-cover object-center scale-105 duration-10000 transition-transform"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/80 to-slate-950/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
        </div>
      )}

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left text-white my-auto">
        <div className="max-w-3xl animate-fade-in">
          {/* Badge */}
          {(hero.badge || companyName) && (
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-500/20 border border-primary-500/30 text-primary-300 text-xs sm:text-sm font-semibold mb-6 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-primary-400 animate-pulse" />
              {hero.badge || companyName}
            </div>
          )}

          {/* Main Title */}
          {hero.title && (
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight sm:leading-none mb-6">
              {hero.title}
            </h1>
          )}

          {/* Description */}
          {hero.description && (
            <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed mb-8 max-w-2xl">
              {hero.description}
            </p>
          )}

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            {hero.primaryCtaText && (
              <a
                href={hero.primaryCtaLink || '#services'}
                onClick={(e) =>
                  scrollToSection(e, hero.primaryCtaLink || '#services')
                }
                className="w-full sm:w-auto"
              >
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto"
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                >
                  {hero.primaryCtaText}
                </Button>
              </a>
            )}

            {hero.secondaryCtaText && (
              <a
                href={hero.secondaryCtaLink || '#contact'}
                onClick={(e) =>
                  scrollToSection(e, hero.secondaryCtaLink || '#contact')
                }
                className="w-full sm:w-auto"
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-slate-900"
                >
                  {hero.secondaryCtaText}
                </Button>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 hidden sm:block">
        <a
          href="#about"
          onClick={(e) => scrollToSection(e, '#about')}
          className="flex flex-col items-center gap-1 text-slate-400 hover:text-white transition-colors"
          aria-label="Aşağı keçid"
        >
          <ChevronDown className="w-5 h-5 animate-bounce text-primary-400" />
        </a>
      </div>
    </section>
  );
};
