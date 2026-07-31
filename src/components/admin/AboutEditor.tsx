import React from 'react';
import { AboutSettings, FeatureItem } from '@/types/siteData';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/common/Button';
import { IconPicker } from '@/components/admin/IconPicker';
import { ImageInput } from '@/components/admin/ImageInput';

interface AboutEditorProps {
  about: AboutSettings;
  onChange: (updated: AboutSettings) => void;
}

export const AboutEditor: React.FC<AboutEditorProps> = ({ about, onChange }) => {
  const handleChange = (field: keyof AboutSettings, value: unknown) => {
    onChange({ ...about, [field]: value });
  };

  const handleFeatureChange = (index: number, field: keyof FeatureItem, value: string) => {
    const updatedFeatures = [...about.features];
    updatedFeatures[index] = { ...updatedFeatures[index], [field]: value };
    onChange({ ...about, features: updatedFeatures });
  };

  const addFeature = () => {
    const newFeature: FeatureItem = {
      id: `f_${Date.now()}`,
      title: 'Yeni Xüsusiyyət',
      description: 'Xüsusiyyət təsvirini bura yazın.',
      icon: 'ShieldCheck',
    };
    onChange({ ...about, features: [...about.features, newFeature] });
  };

  const removeFeature = (index: number) => {
    const updatedFeatures = about.features.filter((_, i) => i !== index);
    onChange({ ...about, features: updatedFeatures });
  };

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-8">
      <div className="border-b border-slate-100 pb-4">
        <h2 className="text-lg font-bold text-slate-900">Haqqımızda Bölməsi Redaktoru</h2>
        <p className="text-xs text-slate-500 mt-1">
          Haqqımızda bölməsinin mətnlərini, şəklini və xüsusiyyət kartlarını idarə edin.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Heading */}
        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-2">Başlıq</label>
          <input
            type="text"
            value={about.heading}
            onChange={(e) => handleChange('heading', e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none"
          />
        </div>

        {/* Subtitle */}
        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-2">Alt Başlıq</label>
          <input
            type="text"
            value={about.subtitle}
            onChange={(e) => handleChange('subtitle', e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none"
          />
        </div>

        {/* Paragraph 1 */}
        <div className="sm:col-span-2">
          <label className="block text-sm font-semibold text-slate-800 mb-2">1-ci Mətn Paraqrafı</label>
          <textarea
            rows={3}
            value={about.contentParagraph1}
            onChange={(e) => handleChange('contentParagraph1', e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none resize-none"
          />
        </div>

        {/* Paragraph 2 */}
        <div className="sm:col-span-2">
          <label className="block text-sm font-semibold text-slate-800 mb-2">2-ci Mətn Paraqrafı</label>
          <textarea
            rows={3}
            value={about.contentParagraph2}
            onChange={(e) => handleChange('contentParagraph2', e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none resize-none"
          />
        </div>

        {/* Image Input (File Upload + URL) */}
        <div className="sm:col-span-2">
          <ImageInput
            label="Haqqımızda Şəkli"
            value={about.imageUrl}
            onChange={(url) => handleChange('imageUrl', url)}
          />
        </div>
      </div>

      {/* Features List */}
      <div className="pt-6 border-t border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-slate-900">Xüsusiyyət Kartları</h3>
          <Button variant="outline" size="sm" onClick={addFeature} leftIcon={<Plus className="w-4 h-4" />}>
            Kart Əlavə Et
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {about.features.map((feature, idx) => (
            <div key={feature.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3 relative group">
              <button
                type="button"
                onClick={() => removeFeature(idx)}
                className="absolute top-3 right-3 text-red-400 hover:text-red-600 p-1"
                title="Kartı Sil"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Kart Başlığı</label>
                <input
                  type="text"
                  value={feature.title}
                  onChange={(e) => handleFeatureChange(idx, 'title', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-sm font-bold"
                />
              </div>

              {/* Visual Icon Picker Dropdown */}
              <IconPicker
                label="İkon Seçimi"
                value={feature.icon}
                onChange={(iconName) => handleFeatureChange(idx, 'icon', iconName)}
              />

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Təsvir</label>
                <textarea
                  rows={2}
                  value={feature.description}
                  onChange={(e) => handleFeatureChange(idx, 'description', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-sm resize-none"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
