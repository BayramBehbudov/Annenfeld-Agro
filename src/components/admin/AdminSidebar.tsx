import React from 'react';
import {
  Settings,
  LayoutTemplate,
  Info,
  Briefcase,
  Award,
  BarChart3,
  Users,
  Mail,
  FileText,
  LogOut,
  Eye,
  Truck,
  X,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useSiteData } from '../../context/SiteDataContext';

export type AdminTab =
  | 'general'
  | 'hero'
  | 'about'
  | 'services'
  | 'whyUs'
  | 'stats'
  | 'partners'
  | 'contact'
  | 'footer';

interface AdminSidebarProps {
  activeTab: AdminTab;
  setActiveTab: (tab: AdminTab) => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeTab,
  setActiveTab,
  isOpenMobile = false,
  onCloseMobile,
}) => {
  const { logout } = useAuth();
  const { data } = useSiteData();

  const companyName = data?.general?.companyName || 'Annenfeld Agro';

  const navItems: { id: AdminTab; label: string; icon: React.ReactNode }[] = [
    {
      id: 'general',
      label: 'Ümumi Parametrlər',
      icon: <Settings className="w-5 h-5" />,
    },
    {
      id: 'hero',
      label: 'Hero Bölməsi',
      icon: <LayoutTemplate className="w-5 h-5" />,
    },
    { id: 'about', label: 'Haqqımızda', icon: <Info className="w-5 h-5" /> },
    {
      id: 'services',
      label: 'Xidmətlər',
      icon: <Briefcase className="w-5 h-5" />,
    },
    {
      id: 'whyUs',
      label: 'Üstünlüklər (Niyə Biz)',
      icon: <Award className="w-5 h-5" />,
    },
    {
      id: 'stats',
      label: 'Göstəricilər',
      icon: <BarChart3 className="w-5 h-5" />,
    },
    {
      id: 'partners',
      label: 'Tərəfdaşlar',
      icon: <Users className="w-5 h-5" />,
    },
    {
      id: 'contact',
      label: 'Əlaqə & Form',
      icon: <Mail className="w-5 h-5" />,
    },
    {
      id: 'footer',
      label: 'Footer Məlumatları',
      icon: <FileText className="w-5 h-5" />,
    },
  ];

  const handleSelectTab = (tab: AdminTab) => {
    setActiveTab(tab);
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  const sidebarContent = (
    <aside className="w-64 bg-slate-900 text-slate-300 h-full max-h-screen overflow-y-auto flex flex-col justify-between shrink-0 border-r border-slate-800">
      <div>
        {/* Header Branding */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary-500 flex items-center justify-center text-white font-bold shadow-md">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white leading-tight truncate max-w-[120px]">
                {companyName}
              </h2>
              <span className="text-xs text-primary-400 font-medium">
                Admin Panel
              </span>
            </div>
          </div>

          {/* Close Button on Mobile Drawer */}
          {onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              aria-label="Menyunu Bağla"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* View Site Quick Link */}
        <div className="p-4 border-b border-slate-800">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-xs font-semibold text-slate-300 hover:text-white transition-colors border border-slate-700/50"
          >
            <Eye className="w-4 h-4 text-primary-400" />
            <span>Saytı Yeni Tabda Aç</span>
          </a>
        </div>

        {/* Navigation Items */}
        <nav className="p-4 space-y-1.5">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleSelectTab(item.id)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === item.id
                  ? 'bg-primary-500 text-white shadow-md shadow-primary-500/30'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Logout Footer */}
      <div className="p-4 border-t border-slate-800">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Paneldən Çıxış</span>
        </button>
      </div>
    </aside>
  );

  return (
    <>
      {/* Desktop Docked Sidebar */}
      <div className="hidden lg:block h-full">{sidebarContent}</div>

      {/* Mobile Sliding Drawer & Overlay */}
      {isOpenMobile && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm animate-fade-in"
            onClick={onCloseMobile}
          />

          {/* Drawer Box */}
          <div className="relative z-10 animate-slide-in-left h-full">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
