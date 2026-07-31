import React from 'react';
import { ServicesSettings, ServiceItem } from '../../types/siteData';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '../common/Button';
import { IconPicker } from './IconPicker';

interface ServicesEditorProps {
  services: ServicesSettings;
  onChange: (updated: ServicesSettings) => void;
}

export const ServicesEditor: React.FC<ServicesEditorProps> = ({ services, onChange }) => {
  const handleChange = (field: keyof ServicesSettings, value: unknown) => {
    onChange({ ...services, [field]: value });
  };

  const handleItemChange = (index: number, field: keyof ServiceItem, value: string) => {
    const updatedItems = [...services.items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    onChange({ ...services, items: updatedItems });
  };

  const addItem = () => {
    const newItem: ServiceItem = {
      id: `s_${Date.now()}`,
      title: 'Yeni Xidmət',
      description: 'Xidmətin təfərrüatlı təsviri.',
      icon: 'Truck',
    };
    onChange({ ...services, items: [...services.items, newItem] });
  };

  const removeItem = (index: number) => {
    const updatedItems = services.items.filter((_, i) => i !== index);
    onChange({ ...services, items: updatedItems });
  };

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-8">
      <div className="border-b border-slate-100 pb-4">
        <h2 className="text-lg font-bold text-slate-900">Xidmətlər Bölməsi Redaktoru</h2>
        <p className="text-xs text-slate-500 mt-1">
          Göstərilən logistika xidmətlərini redaktə edin və ya yenisini əlavə edin.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-2">Başlıq</label>
          <input
            type="text"
            value={services.heading}
            onChange={(e) => handleChange('heading', e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none font-bold"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-2">Alt Başlıq</label>
          <input
            type="text"
            value={services.subtitle}
            onChange={(e) => handleChange('subtitle', e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none"
          />
        </div>
      </div>

      {/* Services Items List */}
      <div className="pt-6 border-t border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-slate-900">Xidmət Kartları ({services.items.length})</h3>
          <Button variant="outline" size="sm" onClick={addItem} leftIcon={<Plus className="w-4 h-4" />}>
            Xidmət Əlavə Et
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.items.map((item, idx) => (
            <div key={item.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3 relative">
              <button
                type="button"
                onClick={() => removeItem(idx)}
                className="absolute top-3 right-3 text-red-400 hover:text-red-600 p-1"
                title="Xidməti Sil"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <div className="pr-8">
                <label className="block text-xs font-bold text-slate-600 mb-1">Xidmət Adı</label>
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => handleItemChange(idx, 'title', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-sm font-bold"
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
