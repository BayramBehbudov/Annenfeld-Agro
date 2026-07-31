import React from 'react';
import { useSiteData } from '../context/SiteDataContext';
import { Navbar } from '../components/landing/Navbar';
import { HeroSection } from '../components/landing/HeroSection';
import { AboutSection } from '../components/landing/AboutSection';
import { ServicesSection } from '../components/landing/ServicesSection';
import { WhyUsSection } from '../components/landing/WhyUsSection';
import { StatisticsSection } from '../components/landing/StatisticsSection';
import { PartnersSection } from '../components/landing/PartnersSection';
import { ContactSection } from '../components/landing/ContactSection';
import { Footer } from '../components/landing/Footer';
import { Loader2 } from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { data, loading, error } = useSiteData();

  if (loading && !data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white space-y-4">
        <Loader2 className="w-12 h-12 text-primary-500 animate-spin" />
        <p className="text-base font-semibold text-slate-300">Yüklənir...</p>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white p-6 text-center">
        <div className="max-w-md p-8 rounded-2xl bg-slate-800 border border-red-500/30 space-y-4">
          <h2 className="text-2xl font-bold text-red-400">Xəta Baş Verdi</h2>
          <p className="text-sm text-slate-300">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2.5 rounded-xl bg-primary-500 text-white font-bold hover:bg-primary-600 transition-colors"
          >
            Yenidən Yoxla
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-primary-500 selection:text-white">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <WhyUsSection />
        <StatisticsSection />
        <PartnersSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};
