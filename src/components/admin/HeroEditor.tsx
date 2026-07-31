import React from 'react';
import { HeroSettings } from '@/types/siteData';
import { ImageInput } from '@/components/admin/ImageInput';

interface HeroEditorProps {
  hero: HeroSettings;
  onChange: (updated: HeroSettings) => void;
}

export const HeroEditor: React.FC<HeroEditorProps> = ({ hero, onChange }) => {
  const handleChange = (field: keyof HeroSettings, value: string) => {
    onChange({ ...hero, [field]: value });
  };

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <h2 className="text-lg font-bold text-slate-900">Hero Bölməsi Redaktoru</h2>
        <p className="text-xs text-slate-500 mt-1">
          Hero bölməsindəki əsas başlığı, düymələri və arxa fon şəklini idarə edin.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Badge */}
        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-2">
            Kiçik Etiket (Badge)
          </label>
          <input
            type="text"
            value={hero.badge}
            onChange={(e) => handleChange('badge', e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none text-slate-900"
          />
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-2">
            Əsas Başlıq (Title)
          </label>
          <input
            type="text"
            value={hero.title}
            onChange={(e) => handleChange('title', e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none text-slate-900 font-semibold"
          />
        </div>

        {/* Description */}
        <div className="sm:col-span-2">
          <label className="block text-sm font-semibold text-slate-800 mb-2">
            Mətn Təsviri (Description)
          </label>
          <textarea
            rows={3}
            value={hero.description}
            onChange={(e) => handleChange('description', e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none text-slate-900 resize-none"
          />
        </div>

        {/* Primary CTA Text */}
        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-2">
            1-ci Düymə Mətni (Əsas CTA)
          </label>
          <input
            type="text"
            value={hero.primaryCtaText}
            onChange={(e) => handleChange('primaryCtaText', e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none text-slate-900"
          />
        </div>

        {/* Primary CTA Link */}
        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-2">
            1-ci Düymə Keçidi (Href/Link)
          </label>
          <input
            type="text"
            value={hero.primaryCtaLink}
            onChange={(e) => handleChange('primaryCtaLink', e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none text-slate-900"
          />
        </div>

        {/* Secondary CTA Text */}
        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-2">
            2-ci Düymə Mətni (Köməkçi CTA)
          </label>
          <input
            type="text"
            value={hero.secondaryCtaText}
            onChange={(e) => handleChange('secondaryCtaText', e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none text-slate-900"
          />
        </div>

        {/* Secondary CTA Link */}
        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-2">
            2-ci Düymə Keçidi (Href/Link)
          </label>
          <input
            type="text"
            value={hero.secondaryCtaLink}
            onChange={(e) => handleChange('secondaryCtaLink', e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none text-slate-900"
          />
        </div>

        {/* Background Image Upload / URL Input */}
        <div className="sm:col-span-2">
          <ImageInput
            label="Arxa Fon Şəkli"
            value={hero.bgImageUrl}
            onChange={(url) => handleChange('bgImageUrl', url)}
          />
        </div>
      </div>
    </div>
  );
};
