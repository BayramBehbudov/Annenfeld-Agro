import React, { useState, useEffect } from 'react';
import { useSiteData } from '../../context/SiteDataContext';
import { Button } from '../common/Button';
import { Menu, X, Truck } from 'lucide-react';
import { scrollToSection } from '../../utils/scrollHelper';

export const Navbar: React.FC = () => {
  const { data } = useSiteData();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!data) return null;

  const { nav, general } = data;
  const companyName = general.companyName;

  // Filter visible & non-empty navigation items
  const visibleNavItems = (nav.navItems || []).filter(
    (item) => item.visible !== false && item.label && item.label.trim() !== ''
  );

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setIsMobileMenuOpen(false);
    scrollToSection(e, href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'glass-nav shadow-md py-3 border-b border-slate-200/50'
          : 'bg-gradient-to-b from-slate-950/80 to-transparent py-5 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-10 h-10 rounded-xl bg-primary-500 flex items-center justify-center text-white shadow-md shadow-primary-500/30 group-hover:scale-105 transition-transform">
              <Truck className="w-6 h-6" />
            </div>
            {companyName && (
              <span className={`text-xl sm:text-2xl font-black tracking-tight ${isScrolled ? 'text-slate-900' : 'text-white'}`}>
                {companyName}
              </span>
            )}
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-8">
            {visibleNavItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`text-sm font-semibold transition-colors hover:text-primary-500 ${
                  isScrolled ? 'text-slate-700' : 'text-slate-100 hover:text-white'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          {nav.ctaText && (
            <div className="hidden md:block">
              <a href={nav.ctaLink || '#contact'} onClick={(e) => handleNavClick(e, nav.ctaLink || '#contact')}>
                <Button variant="primary" size="md">
                  {nav.ctaText}
                </Button>
              </a>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              isScrolled ? 'text-slate-800 hover:bg-slate-100' : 'text-white hover:bg-white/10'
            }`}
            aria-label="Menyunu dəyişdir"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[65px] bg-slate-950/70 backdrop-blur-md z-40 animate-fade-in">
          <div className="bg-white border-b border-slate-200 px-6 py-6 space-y-4 shadow-xl">
            {visibleNavItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="block text-base font-semibold text-slate-800 hover:text-primary-600 py-2 border-b border-slate-100"
              >
                {item.label}
              </a>
            ))}
            {nav.ctaText && (
              <div className="pt-2">
                <a
                  href={nav.ctaLink || '#contact'}
                  onClick={(e) => handleNavClick(e, nav.ctaLink || '#contact')}
                  className="block w-full"
                >
                  <Button variant="primary" size="lg" className="w-full">
                    {nav.ctaText}
                  </Button>
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
