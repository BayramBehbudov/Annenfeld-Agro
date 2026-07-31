import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSiteData } from '../context/SiteDataContext';
import { AdminLoginPage } from './AdminLoginPage';
import { AdminSidebar, AdminTab } from '../components/admin/AdminSidebar';
import { AdminHeader } from '../components/admin/AdminHeader';
import { GeneralSettingsForm } from '../components/admin/GeneralSettingsForm';
import { HeroEditor } from '../components/admin/HeroEditor';
import { AboutEditor } from '../components/admin/AboutEditor';
import { ServicesEditor } from '../components/admin/ServicesEditor';
import { WhyUsEditor } from '../components/admin/WhyUsEditor';
import { StatsEditor } from '../components/admin/StatsEditor';
import { PartnersEditor } from '../components/admin/PartnersEditor';
import { ContactEditor } from '../components/admin/ContactEditor';
import { FooterEditor } from '../components/admin/FooterEditor';
import { SiteData } from '../types/siteData';
import { CheckCircle2, AlertCircle, Loader2, Menu, Truck } from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { data, loading } = useSiteData();
  const [activeTab, setActiveTab] = useState<AdminTab>('general');
  const [localData, setLocalData] = useState<SiteData | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Sync initial or updated siteData into local draft state
  useEffect(() => {
    if (data) {
      setLocalData(data);
    }
  }, [data]);

  if (!isAuthenticated) {
    return <AdminLoginPage />;
  }

  if (loading && !localData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white space-y-4">
        <Loader2 className="w-10 h-10 text-primary-500 animate-spin" />
        <span className="text-sm font-semibold">Məlumatlar yüklənir...</span>
      </div>
    );
  }

  if (!localData) return null;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const isErrorToast = toastMessage?.startsWith('Xəta:');

  const getTabTitle = (tab: AdminTab): string => {
    const titles: Record<AdminTab, string> = {
      general: 'Ümumi Parametrlər, Giriş Məlumatları və Menyu İdarəetməsi',
      hero: 'Hero Bölməsi Redaktoru',
      about: 'Haqqımızda Bölməsi Redaktoru',
      services: 'Xidmətlər Bölməsi Redaktoru',
      whyUs: 'Üstünlüklər (Niyə Biz) Redaktoru',
      stats: 'Göstəricilər (Statistika) Redaktoru',
      partners: 'Tərəfdaşlar Redaktoru',
      contact: 'Əlaqə & Forma Redaktoru',
      footer: 'Footer Məlumatları Redaktoru',
    };
    return titles[tab];
  };

  return (
    <div className="h-screen w-screen bg-slate-100 flex flex-col lg:flex-row overflow-hidden selection:bg-primary-500 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-5 py-3.5 rounded-2xl shadow-2xl border flex items-center gap-3 animate-fade-in ${
            isErrorToast
              ? 'bg-red-950 text-red-100 border-red-500/50'
              : 'bg-slate-900 text-white border-primary-500/40'
          }`}
        >
          {isErrorToast ? (
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-primary-400 shrink-0" />
          )}
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Mobile Top Header Navigation */}
      <div className="lg:hidden bg-slate-900 text-white px-4 py-3 border-b border-slate-800 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition-colors"
            aria-label="Menyunu Aç"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary-500 flex items-center justify-center text-white">
              <Truck className="w-4 h-4" />
            </div>
            <span className="font-bold text-sm truncate max-w-[140px]">
              {localData.general?.companyName || 'Annenfeld Agro'}
            </span>
          </div>
        </div>
        <span className="text-xs font-semibold text-primary-400 bg-primary-500/10 px-2.5 py-1 rounded-full border border-primary-500/20">
          Admin Panel
        </span>
      </div>

      {/* Sidebar (Desktop Docked + Mobile Drawer Overlay) */}
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpenMobile={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 h-full overflow-y-auto flex flex-col min-w-0">
        <AdminHeader
          title={getTabTitle(activeTab)}
          currentData={localData}
          onSaveSuccess={showToast}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 w-full max-w-7xl mx-auto">
          {activeTab === 'general' && (
            <GeneralSettingsForm
              general={localData.general}
              nav={localData.nav}
              adminAuth={localData.adminAuth}
              onChangeGeneral={(general) => setLocalData({ ...localData, general })}
              onChangeNav={(nav) => setLocalData({ ...localData, nav })}
              onChangeAdminAuth={(adminAuth) => setLocalData({ ...localData, adminAuth })}
            />
          )}

          {activeTab === 'hero' && (
            <HeroEditor
              hero={localData.hero}
              onChange={(hero) => setLocalData({ ...localData, hero })}
            />
          )}

          {activeTab === 'about' && (
            <AboutEditor
              about={localData.about}
              onChange={(about) => setLocalData({ ...localData, about })}
            />
          )}

          {activeTab === 'services' && (
            <ServicesEditor
              services={localData.services}
              onChange={(services) => setLocalData({ ...localData, services })}
            />
          )}

          {activeTab === 'whyUs' && (
            <WhyUsEditor
              whyUs={localData.whyUs}
              onChange={(whyUs) => setLocalData({ ...localData, whyUs })}
            />
          )}

          {activeTab === 'stats' && (
            <StatsEditor
              statistics={localData.statistics}
              onChange={(statistics) => setLocalData({ ...localData, statistics })}
            />
          )}

          {activeTab === 'partners' && (
            <PartnersEditor
              partners={localData.partners}
              onChange={(partners) => setLocalData({ ...localData, partners })}
            />
          )}

          {activeTab === 'contact' && (
            <ContactEditor
              contact={localData.contact}
              onChange={(contact) => setLocalData({ ...localData, contact })}
            />
          )}

          {activeTab === 'footer' && (
            <FooterEditor
              footer={localData.footer}
              onChange={(footer) => setLocalData({ ...localData, footer })}
            />
          )}
        </main>
      </div>
    </div>
  );
};
