import React from 'react';
import { useSiteData } from '../../context/SiteDataContext';
import { DynamicIcon } from '../../utils/iconHelper';
import { Truck } from 'lucide-react';
import { scrollToSection } from '../../utils/scrollHelper';

export const Footer: React.FC = () => {
  const { data } = useSiteData();

  if (!data) return null;

  const { footer, general, nav } = data;
  const companyName = general.companyName || '';

  const visibleNavItems = (nav.navItems || []).filter(
    (item) => item.visible !== false && item.label && item.label.trim() !== ''
  );

  const validSocialLinks = (footer.socialLinks || []).filter(
    (social) => (social.platform && social.platform.trim() !== '') || (social.url && social.url.trim() !== '')
  );

  const copyrightText = (footer.copyrightText || '').replace(
    '{companyName}',
    companyName
  );

  return (
    <footer className="bg-secondary-500 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-primary-500 flex items-center justify-center text-white shadow-md">
                <Truck className="w-6 h-6" />
              </div>
              {companyName && (
                <span className="text-2xl font-black text-white tracking-tight">
                  {companyName}
                </span>
              )}
            </div>
            {(footer.companyDescription || general.description) && (
              <p className="text-sm text-slate-400 leading-relaxed">
                {footer.companyDescription || general.description}
              </p>
            )}

            {/* Social Links */}
            {validSocialLinks.length > 0 && (
              <div className="flex items-center gap-3 pt-2">
                {validSocialLinks.map((social) => (
                  <a
                    key={social.id}
                    href={social.url || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.platform || 'Sosial şəbəkə'}
                    className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-primary-500 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                  >
                    <DynamicIcon name={social.icon} className="w-4 h-4" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Column 2: Quick Links */}
          {visibleNavItems.length > 0 && (
            <div>
              {footer.quickLinksHeading && (
                <h4 className="text-base font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
                  {footer.quickLinksHeading}
                </h4>
              )}
              <ul className="space-y-2.5 text-sm">
                {visibleNavItems.map((item) => (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      onClick={(e) => scrollToSection(e, item.href)}
                      className="hover:text-primary-400 transition-colors flex items-center gap-1.5"
                    >
                      <span>›</span>
                      <span>{item.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Column 3: Contact Info */}
          <div>
            {footer.contactHeading && (
              <h4 className="text-base font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
                {footer.contactHeading}
              </h4>
            )}
            <div className="space-y-3 text-sm text-slate-400">
              {general.contactAddress && <p>📍 {general.contactAddress}</p>}
              {general.contactPhone && <p>📞 {general.contactPhone}</p>}
              {general.contactEmail && <p>✉️ {general.contactEmail}</p>}
              {general.workingHours && <p>⏰ {general.workingHours}</p>}
            </div>
          </div>

          {/* Column 4: Slogan & Description */}
          <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex flex-col justify-between">
            <div>
              {companyName && (
                <span className="text-xs font-bold text-primary-400 uppercase tracking-widest block mb-2">
                  {companyName}
                </span>
              )}
              {general.slogan && (
                <h5 className="text-base font-bold text-white">
                  {general.slogan}
                </h5>
              )}
            </div>
            {general.description && (
              <p className="text-xs text-slate-400 mt-4 leading-relaxed">
                {general.description}
              </p>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          {copyrightText && <p>{copyrightText}</p>}
          {general.slogan && (
            <p className="font-medium text-slate-300">{general.slogan}</p>
          )}
        </div>
      </div>
    </footer>
  );
};
