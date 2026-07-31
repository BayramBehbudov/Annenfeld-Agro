import React from 'react';
import { FooterSettings, SocialLink } from '@/types/siteData';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/common/Button';
import { IconPicker } from '@/components/admin/IconPicker';

interface FooterEditorProps {
  footer: FooterSettings;
  onChange: (updated: FooterSettings) => void;
}

export const FooterEditor: React.FC<FooterEditorProps> = ({ footer, onChange }) => {
  const handleChange = (field: keyof FooterSettings, value: unknown) => {
    onChange({ ...footer, [field]: value });
  };

  const handleSocialChange = (index: number, field: keyof SocialLink, value: string) => {
    const updatedSocials = [...footer.socialLinks];
    updatedSocials[index] = { ...updatedSocials[index], [field]: value };
    onChange({ ...footer, socialLinks: updatedSocials });
  };

  const addSocial = () => {
    const newSocial: SocialLink = {
      id: `scl_${Date.now()}`,
      platform: 'Sosial Şəbəkə',
      url: '',
      icon: 'Share2',
    };
    onChange({ ...footer, socialLinks: [...footer.socialLinks, newSocial] });
  };

  const removeSocial = (index: number) => {
    const updatedSocials = footer.socialLinks.filter((_, i) => i !== index);
    onChange({ ...footer, socialLinks: updatedSocials });
  };

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-8">
      <div className="border-b border-slate-100 pb-4">
        <h2 className="text-lg font-bold text-slate-900">Footer Məlumatları Redaktoru</h2>
        <p className="text-xs text-slate-500 mt-1">
          Saytın alt hissəsindəki təsvirləri, sürətli keçid başlıqlarını və sosial şəbəkə keçidlərini tənzimləyin.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="sm:col-span-2">
          <label className="block text-sm font-semibold text-slate-800 mb-2">
            Footer Şirkət Təsviri
          </label>
          <textarea
            rows={3}
            value={footer.companyDescription}
            onChange={(e) => handleChange('companyDescription', e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none text-slate-900 resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-2">
            Sürətli Keçidlər Bölmə Başlığı
          </label>
          <input
            type="text"
            value={footer.quickLinksHeading}
            onChange={(e) => handleChange('quickLinksHeading', e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none text-slate-900"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-2">
            Əlaqə Bölmə Başlığı
          </label>
          <input
            type="text"
            value={footer.contactHeading}
            onChange={(e) => handleChange('contactHeading', e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none text-slate-900"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-semibold text-slate-800 mb-2">
            Müəllif Hüquqları Mətni
          </label>
          <input
            type="text"
            value={footer.copyrightText}
            onChange={(e) => handleChange('copyrightText', e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none font-medium text-sm text-slate-900"
          />
          <p className="text-xs text-slate-500 mt-1">
            Qeyd: <code className="bg-slate-100 px-1 rounded text-primary-700 font-bold">{'{companyName}'}</code> avtomatik olaraq Şirkətin Adı ilə əvəz olunacaq.
          </p>
        </div>
      </div>

      {/* Social Links */}
      <div className="pt-6 border-t border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-slate-900">Sosial Şəbəkə Keçidləri ({footer.socialLinks.length})</h3>
          <Button variant="outline" size="sm" onClick={addSocial} leftIcon={<Plus className="w-4 h-4" />}>
            Sosial Şəbəkə Əlavə Et
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {footer.socialLinks.map((social, idx) => (
            <div key={social.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3 relative">
              <button
                type="button"
                onClick={() => removeSocial(idx)}
                className="absolute top-3 right-3 text-red-400 hover:text-red-600 p-1"
                title="Keçidi Sil"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <div className="pr-8">
                <label className="block text-xs font-bold text-slate-600 mb-1">Platforma Adı</label>
                <input
                  type="text"
                  value={social.platform}
                  onChange={(e) => handleSocialChange(idx, 'platform', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-sm font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Keçid (URL)</label>
                <input
                  type="text"
                  value={social.url}
                  onChange={(e) => handleSocialChange(idx, 'url', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-sm font-mono text-slate-900"
                  placeholder="https://..."
                />
              </div>

              {/* Visual Icon Picker Dropdown */}
              <IconPicker
                label="İkon Seçimi"
                value={social.icon}
                onChange={(iconName) => handleSocialChange(idx, 'icon', iconName)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
