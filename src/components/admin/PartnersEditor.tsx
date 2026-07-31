import React from 'react';
import { PartnersSettings, PartnerItem } from '@/types/siteData';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/common/Button';
import { ImageInput } from '@/components/admin/ImageInput';

interface PartnersEditorProps {
  partners: PartnersSettings;
  onChange: (updated: PartnersSettings) => void;
}

export const PartnersEditor: React.FC<PartnersEditorProps> = ({ partners, onChange }) => {
  const handleChange = (field: keyof PartnersSettings, value: unknown) => {
    onChange({ ...partners, [field]: value });
  };

  const handleItemChange = (index: number, field: keyof PartnerItem, value: string) => {
    const updatedItems = [...partners.items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    onChange({ ...partners, items: updatedItems });
  };

  const addItem = () => {
    const newItem: PartnerItem = {
      id: `p_${Date.now()}`,
      name: 'Yeni Tərəfdaş',
      logoUrl: '',
    };
    onChange({ ...partners, items: [...partners.items, newItem] });
  };

  const removeItem = (index: number) => {
    const updatedItems = partners.items.filter((_, i) => i !== index);
    onChange({ ...partners, items: updatedItems });
  };

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-8">
      <div className="border-b border-slate-100 pb-4">
        <h2 className="text-lg font-bold text-slate-900">Tərəfdaşlar Redaktoru</h2>
        <p className="text-xs text-slate-500 mt-1">
          Saytın əməkdaşlar bölməsində görünən şirkət adlarını və loqo keçidlərini yeniləyin.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-2">Başlıq</label>
          <input
            type="text"
            value={partners.heading}
            onChange={(e) => handleChange('heading', e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none text-slate-900 font-bold"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-2">Alt Başlıq</label>
          <input
            type="text"
            value={partners.subtitle}
            onChange={(e) => handleChange('subtitle', e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none text-slate-900"
          />
        </div>
      </div>

      {/* Partners List */}
      <div className="pt-6 border-t border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-slate-900">Tərəfdaş Siyahısı ({partners.items.length})</h3>
          <Button variant="outline" size="sm" onClick={addItem} leftIcon={<Plus className="w-4 h-4" />}>
            Tərəfdaş Əlavə Et
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {partners.items.map((item, idx) => (
            <div key={item.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3 relative">
              <button
                type="button"
                onClick={() => removeItem(idx)}
                className="absolute top-3 right-3 text-red-400 hover:text-red-600 p-1"
                title="Tərəfdaşı Sil"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <div className="pr-8">
                <label className="block text-xs font-bold text-slate-600 mb-1">Şirkət Adı</label>
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => handleItemChange(idx, 'name', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-sm font-bold"
                />
              </div>

              {/* Image Input for Partner Logo (URL + File Upload) */}
              <ImageInput
                label="Loqo"
                value={item.logoUrl}
                onChange={(url) => handleItemChange(idx, 'logoUrl', url)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
