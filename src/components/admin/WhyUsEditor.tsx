import React from 'react';
import { WhyUsSettings, WhyUsItem } from '../../types/siteData';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '../common/Button';
import { IconPicker } from './IconPicker';

interface WhyUsEditorProps {
  whyUs: WhyUsSettings;
  onChange: (updated: WhyUsSettings) => void;
}

export const WhyUsEditor: React.FC<WhyUsEditorProps> = ({ whyUs, onChange }) => {
  const handleChange = (field: keyof WhyUsSettings, value: unknown) => {
    onChange({ ...whyUs, [field]: value });
  };

  const handleItemChange = (index: number, field: keyof WhyUsItem, value: string) => {
    const updatedItems = [...whyUs.items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    onChange({ ...whyUs, items: updatedItems });
  };

  const addItem = () => {
    const newItem: WhyUsItem = {
      id: `w_${Date.now()}`,
      title: 'Yeni Üstünlük',
      description: 'Üstünlüyün təsviri.',
      icon: 'ShieldCheck',
    };
    onChange({ ...whyUs, items: [...whyUs.items, newItem] });
  };

  const removeItem = (index: number) => {
    const updatedItems = whyUs.items.filter((_, i) => i !== index);
    onChange({ ...whyUs, items: updatedItems });
  };

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-8">
      <div className="border-b border-slate-100 pb-4">
        <h2 className="text-lg font-bold text-slate-900">Üstünlüklər (Niyə Biz) Redaktoru</h2>
        <p className="text-xs text-slate-500 mt-1">
          Müştərilərin şirkəti seçmə üstünlüklərini idarə edin.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-2">Başlıq</label>
          <input
            type="text"
            value={whyUs.heading}
            onChange={(e) => handleChange('heading', e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none font-bold text-slate-900"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-2">Alt Başlıq</label>
          <input
            type="text"
            value={whyUs.subtitle}
            onChange={(e) => handleChange('subtitle', e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none text-slate-900"
          />
        </div>
      </div>

      {/* Items List */}
      <div className="pt-6 border-t border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-slate-900">Üstünlük Kartları ({whyUs.items.length})</h3>
          <Button variant="outline" size="sm" onClick={addItem} leftIcon={<Plus className="w-4 h-4" />}>
            Kart Əlavə Et
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {whyUs.items.map((item, idx) => (
            <div key={item.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3 relative">
              <button
                type="button"
                onClick={() => removeItem(idx)}
                className="absolute top-3 right-3 text-red-400 hover:text-red-600 p-1"
                title="Kartı Sil"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <div className="pr-8">
                <label className="block text-xs font-bold text-slate-600 mb-1">Başlıq</label>
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => handleItemChange(idx, 'title', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-sm font-bold text-slate-900"
                />
              </div>

              {/* Visual Icon Picker Dropdown */}
              <IconPicker
                label="İkon Seçimi"
                value={item.icon}
                onChange={(iconName) => handleItemChange(idx, 'icon', iconName)}
              />

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Təsvir</label>
                <textarea
                  rows={2}
                  value={item.description}
                  onChange={(e) => handleItemChange(idx, 'description', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-sm resize-none text-slate-900"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
