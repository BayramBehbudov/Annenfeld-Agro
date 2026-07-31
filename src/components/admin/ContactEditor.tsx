import React from 'react';
import { ContactSettings } from '../../types/siteData';

interface ContactEditorProps {
  contact: ContactSettings;
  onChange: (updated: ContactSettings) => void;
}

export const ContactEditor: React.FC<ContactEditorProps> = ({ contact, onChange }) => {
  const handleChange = (field: keyof ContactSettings, value: string) => {
    onChange({ ...contact, [field]: value });
  };

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <h2 className="text-lg font-bold text-slate-900">Əlaqə Bölməsi Redaktoru</h2>
        <p className="text-xs text-slate-500 mt-1">
          Əlaqə bölməsinin mətnlərini, kart etiketlərini və forma parametrlərini tənzimləyin.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-2">Başlıq</label>
          <input
            type="text"
            value={contact.heading}
            onChange={(e) => handleChange('heading', e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none font-bold text-slate-900"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-2">Forma Başlığı</label>
          <input
            type="text"
            value={contact.formTitle}
            onChange={(e) => handleChange('formTitle', e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none font-bold text-slate-900"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-semibold text-slate-800 mb-2">Alt Başlıq / Açıqlama</label>
          <textarea
            rows={2}
            value={contact.subtitle}
            onChange={(e) => handleChange('subtitle', e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none resize-none text-slate-900"
          />
        </div>

        {/* Card Labels */}
        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-2">Ünvan Etiketi</label>
          <input
            type="text"
            value={contact.addressLabel || 'Ünvan'}
            onChange={(e) => handleChange('addressLabel', e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none text-slate-900 font-medium"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-2">Telefon Etiketi</label>
          <input
            type="text"
            value={contact.phoneLabel || 'Telefon'}
            onChange={(e) => handleChange('phoneLabel', e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none text-slate-900 font-medium"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-2">E-poçt Etiketi</label>
          <input
            type="text"
            value={contact.emailLabel || 'E-poçt'}
            onChange={(e) => handleChange('emailLabel', e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none text-slate-900 font-medium"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-2">Göndər Düyməsi Mətni</label>
          <input
            type="text"
            value={contact.formSubmitButton}
            onChange={(e) => handleChange('formSubmitButton', e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none font-semibold text-slate-900"
          />
        </div>

        {/* Placeholders */}
        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-2">Ad Placeholder</label>
          <input
            type="text"
            value={contact.formNamePlaceholder}
            onChange={(e) => handleChange('formNamePlaceholder', e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none text-slate-900"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-2">Email Placeholder</label>
          <input
            type="text"
            value={contact.formEmailPlaceholder}
            onChange={(e) => handleChange('formEmailPlaceholder', e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none text-slate-900"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-2">Telefon Placeholder</label>
          <input
            type="text"
            value={contact.formPhonePlaceholder}
            onChange={(e) => handleChange('formPhonePlaceholder', e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none text-slate-900"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-2">Mesaj Placeholder</label>
          <input
            type="text"
            value={contact.formMessagePlaceholder}
            onChange={(e) => handleChange('formMessagePlaceholder', e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none text-slate-900"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-semibold text-slate-800 mb-2">Uğurlu Göndərildi Mesajı</label>
          <textarea
            rows={2}
            value={contact.formSuccessMessage}
            onChange={(e) => handleChange('formSuccessMessage', e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none text-emerald-800 bg-emerald-50/50 resize-none font-medium"
          />
        </div>
      </div>
    </div>
  );
};
