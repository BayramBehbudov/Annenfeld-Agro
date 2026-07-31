import React, { useState } from 'react';
import { GeneralSettings, NavSettings, NavItem, AdminAuthSettings } from '@/types/siteData';
import { Eye, EyeOff, Plus, Trash2, KeyRound } from 'lucide-react';
import { Button } from '@/components/common/Button';
import { hashPassword } from '@/utils/cryptoHelper';
import { ImageInput } from '@/components/admin/ImageInput';

interface GeneralSettingsFormProps {
  general: GeneralSettings;
  nav: NavSettings;
  adminAuth: AdminAuthSettings;
  onChangeGeneral: (updated: GeneralSettings) => void;
  onChangeNav: (updated: NavSettings) => void;
  onChangeAdminAuth: (updated: AdminAuthSettings) => void;
}

export const GeneralSettingsForm: React.FC<GeneralSettingsFormProps> = ({
  general,
  nav,
  adminAuth,
  onChangeGeneral,
  onChangeNav,
  onChangeAdminAuth,
}) => {
  const [newUsername, setNewUsername] = useState(adminAuth?.username || 'admin');
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [authSuccessMsg, setAuthSuccessMsg] = useState<string | null>(null);

  const handleGeneralChange = (field: keyof GeneralSettings, value: string) => {
    onChangeGeneral({ ...general, [field]: value });
  };

  const handleNavChange = (field: keyof NavSettings, value: unknown) => {
    onChangeNav({ ...nav, [field]: value });
  };

  const handleNavItemChange = (index: number, field: keyof NavItem, value: unknown) => {
    const updatedItems = [...nav.navItems];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    onChangeNav({ ...nav, navItems: updatedItems });
  };

  const addNavItem = () => {
    const newItem: NavItem = {
      id: `nav_${Date.now()}`,
      label: 'Yeni Menyu',
      href: '#section',
      visible: true,
    };
    onChangeNav({ ...nav, navItems: [...nav.navItems, newItem] });
  };

  const removeNavItem = (index: number) => {
    const updatedItems = nav.navItems.filter((_, i) => i !== index);
    onChangeNav({ ...nav, navItems: updatedItems });
  };

  const handleApplyAuthChanges = async () => {
    let updatedHash = adminAuth.passwordHash;
    if (newPasswordInput.trim()) {
      updatedHash = await hashPassword(newPasswordInput.trim());
    }

    onChangeAdminAuth({
      username: newUsername.trim() || 'admin',
      passwordHash: updatedHash,
    });

    setNewPasswordInput('');
    setAuthSuccessMsg('Giriş məlumatları yeniləndi!');
    setTimeout(() => setAuthSuccessMsg(null), 3000);
  };

  return (
    <div className="space-y-8">
      {/* Admin Auth Credentials Settings Card */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary-100 text-primary-700 flex items-center justify-center shrink-0">
            <KeyRound className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Admin Panel Giriş Məlumatları</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              İdarəetmə paneline daxil olmaq üçün istifadəçi adını və şifrənizi idarə edin.
            </p>
          </div>
        </div>

        {authSuccessMsg && (
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
            {authSuccessMsg}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-2">
              İstifadəçi Adı (Username) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none font-semibold text-slate-900"
              placeholder="admin"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-2">
              Yeni Şifrə (Dəyişmək istəmirsinizsə boş saxlayın)
            </label>
            <input
              type="password"
              value={newPasswordInput}
              onChange={(e) => setNewPasswordInput(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none text-slate-900"
              placeholder="Yeni şifrə yazın"
            />
          </div>
        </div>

        <div className="pt-2">
          <Button variant="secondary" size="sm" onClick={handleApplyAuthChanges}>
            Giriş Məlumatlarını Yenilə
          </Button>
        </div>
      </div>

      {/* General Settings Card */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h2 className="text-lg font-bold text-slate-900">Şirkət və Ümumi Parametrlər</h2>
          <p className="text-xs text-slate-500 mt-1">
            Şirkətin adını, şüarını, ikonunu və əsas əlaqə məlumatlarını idarə edin.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Company Name */}
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-2">
              Şirkətin Adı <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={general.companyName}
              onChange={(e) => handleGeneralChange('companyName', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none font-medium text-slate-900"
              placeholder="Annenfeld Agro"
            />
          </div>

          {/* Slogan */}
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-2">
              Şirkətin Şüarı (Slogan)
            </label>
            <input
              type="text"
              value={general.slogan}
              onChange={(e) => handleGeneralChange('slogan', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none text-slate-900"
              placeholder="Smart Agro Logistics Solutions"
            />
          </div>

          {/* Tab Title Template */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-semibold text-slate-800 mb-2">
              Brauzer Tab Başlığı Şablonu (Tab Title)
            </label>
            <input
              type="text"
              value={general.tabTitleTemplate}
              onChange={(e) => handleGeneralChange('tabTitleTemplate', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none text-slate-900"
              placeholder="{companyName} — Smart Agro Logistics Solutions"
            />
            <p className="text-xs text-slate-500 mt-1">
              Qeyd:{' '}
              <code className="bg-slate-100 px-1 py-0.5 rounded text-primary-700 font-bold">
                {'{companyName}'}
              </code>{' '}
              açar sözü yuxarıdakı Şirkət Adı ilə əvəz olunacaq.
            </p>
          </div>

          {/* Favicon Upload Input */}
          <div className="sm:col-span-2">
            <ImageInput
              label="Saytın İkonu (Favicon)"
              value={general.faviconUrl || ''}
              isFavicon={true}
              onChange={(url) => handleGeneralChange('faviconUrl', url)}
            />
          </div>

          {/* General Description */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-semibold text-slate-800 mb-2">
              Şirkət Haqqında Qısa Təsvir
            </label>
            <textarea
              rows={3}
              value={general.description}
              onChange={(e) => handleGeneralChange('description', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none text-slate-900 resize-none"
            />
          </div>

          {/* Email (Required) */}
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-2">
              Əlaqə E-poçtu <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              required
              value={general.contactEmail}
              onChange={(e) => handleGeneralChange('contactEmail', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none text-slate-900 font-medium"
              placeholder="info@annenfeldaqro.az"
            />
          </div>

          {/* Phone (Required) */}
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-2">
              Əlaqə Telefonu <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={general.contactPhone}
              onChange={(e) => handleGeneralChange('contactPhone', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none text-slate-900 font-medium"
              placeholder="+994 50 123 45 67"
            />
          </div>

          {/* Address (Required) */}
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-2">
              Ünvan Məlumatı <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={general.contactAddress}
              onChange={(e) => handleGeneralChange('contactAddress', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none text-slate-900 font-medium"
              placeholder="Bakı, Azərbaycan"
            />
          </div>

          {/* Working Hours */}
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-2">
              İş Rejimi / Vaxtı
            </label>
            <input
              type="text"
              value={general.workingHours}
              onChange={(e) => handleGeneralChange('workingHours', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none text-slate-900"
              placeholder="B.E - Ş.B: 09:00 - 18:00"
            />
          </div>
        </div>
      </div>

      {/* Nav Menu Settings Card */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Naviqasiya Menyusu</h2>
            <p className="text-xs text-slate-500 mt-1">
              Menyu keçidlərini və onların saytda görünürlük rejimini tənzimləyin.
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={addNavItem} leftIcon={<Plus className="w-4 h-4" />}>
            Menyu Keçidi Əlavə Et
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-2">Navbar Düymə Mətni (CTA)</label>
            <input
              type="text"
              value={nav.ctaText}
              onChange={(e) => handleNavChange('ctaText', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none text-slate-900"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-2">Navbar Düymə Keçidi (CTA Link)</label>
            <input
              type="text"
              value={nav.ctaLink}
              onChange={(e) => handleNavChange('ctaLink', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none text-slate-900"
            />
          </div>
        </div>

        {/* Menu Items List */}
        <div className="space-y-3 pt-2">
          <label className="block text-sm font-bold text-slate-800">Menyu Siyahısı ({nav.navItems.length})</label>
          <div className="space-y-3">
            {nav.navItems.map((item, idx) => {
              const isVisible = item.visible !== false;
              return (
                <div
                  key={item.id}
                  className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    isVisible ? 'bg-slate-50 border-slate-200' : 'bg-slate-100/70 border-slate-300 opacity-75'
                  }`}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Menyu Adı</label>
                      <input
                        type="text"
                        value={item.label}
                        onChange={(e) => handleNavItemChange(idx, 'label', e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-sm font-semibold text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Keçid (#section)</label>
                      <input
                        type="text"
                        value={item.href}
                        onChange={(e) => handleNavItemChange(idx, 'href', e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-sm font-mono text-slate-900"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    {/* Toggle Visibility */}
                    <button
                      type="button"
                      onClick={() => handleNavItemChange(idx, 'visible', !isVisible)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        isVisible
                          ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                          : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                      }`}
                      title={isVisible ? 'Aktivdir' : 'Gizlidir'}
                    >
                      {isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      <span>{isVisible ? 'Aktiv' : 'Gizli'}</span>
                    </button>

                    {/* Delete Item */}
                    <button
                      type="button"
                      onClick={() => removeNavItem(idx)}
                      className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                      title="Menyu Elementini Sil"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
