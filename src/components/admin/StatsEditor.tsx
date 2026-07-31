import React from 'react';
import { StatisticsSettings, StatItem } from '../../types/siteData';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '../common/Button';
import { IconPicker } from './IconPicker';

interface StatsEditorProps {
  statistics: StatisticsSettings;
  onChange: (updated: StatisticsSettings) => void;
}

export const StatsEditor: React.FC<StatsEditorProps> = ({ statistics, onChange }) => {
  const handleChange = (field: keyof StatisticsSettings, value: unknown) => {
    onChange({ ...statistics, [field]: value });
  };

  const handleItemChange = (index: number, field: keyof StatItem, value: string | number) => {
    const updatedItems = [...statistics.items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    onChange({ ...statistics, items: updatedItems });
  };

  const addItem = () => {
    const newItem: StatItem = {
      id: `st_${Date.now()}`,
      value: 100,
      suffix: '+',
      label: 'Yeni Göstərici',
      icon: 'Award',
    };
    onChange({ ...statistics, items: [...statistics.items, newItem] });
  };

  const removeItem = (index: number) => {
    const updatedItems = statistics.items.filter((_, i) => i !== index);
    onChange({ ...statistics, items: updatedItems });
  };

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-8">
      <div className="border-b border-slate-100 pb-4">
        <h2 className="text-lg font-bold text-slate-900">Göstəricilər (Statistika) Redaktoru</h2>
        <p className="text-xs text-slate-500 mt-1">
          Saytda görünən animasiyalı rəqəmləri və göstəriciləri yeniləyin.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-2">Başlıq</label>
          <input
            type="text"
            value={statistics.heading}
            onChange={(e) => handleChange('heading', e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none font-bold"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-2">Alt Başlıq</label>
          <input
            type="text"
            value={statistics.subtitle}
            onChange={(e) => handleChange('subtitle', e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none"
          />
        </div>
      </div>

      {/* Stats List */}
      <div className="pt-6 border-t border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-slate-900">Statistika Kartları ({statistics.items.length})</h3>
          <Button variant="outline" size="sm" onClick={addItem} leftIcon={<Plus className="w-4 h-4" />}>
            Göstərici Əlavə Et
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statistics.items.map((item, idx) => (
            <div key={item.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3 relative">
              <button
                type="button"
                onClick={() => removeItem(idx)}
                className="absolute top-3 right-3 text-red-400 hover:text-red-600 p-1"
                title="Göstəricini Sil"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Rəqəm Dəyəri (Value)</label>
                <input
                  type="number"
                  value={item.value}
                  onChange={(e) => handleItemChange(idx, 'value', Number(e.target.value))}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-sm font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Şəkilçisi (Suffix: +, %, və s.)</label>
                <input
                  type="text"
                  value={item.suffix}
                  onChange={(e) => handleItemChange(idx, 'suffix', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-sm font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Etiket / Ad</label>
                <input
                  type="text"
                  value={item.label}
                  onChange={(e) => handleItemChange(idx, 'label', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-sm"
                />
              </div>

              {/* Visual Icon Picker Dropdown */}
              <IconPicker
                label="İkon Seçimi"
                value={item.icon}
                onChange={(iconName) => handleItemChange(idx, 'icon', iconName)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
