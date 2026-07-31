import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteData } from '../types/siteData';

interface SiteDataContextType {
  data: SiteData | null;
  loading: boolean;
  error: string | null;
  saveData: (newData: SiteData) => Promise<{ success: boolean; message: string }>;
  resetData: () => Promise<void>;
}

const SiteDataContext = createContext<SiteDataContextType | undefined>(undefined);

// Helper function to sanitize and clean siteData before saving to JSON
const sanitizeSiteData = (inputData: SiteData): SiteData => {
  const sanitized = JSON.parse(JSON.stringify(inputData)) as SiteData;

  // 1. Nav items: keep only items with non-empty label
  if (sanitized.nav?.navItems) {
    sanitized.nav.navItems = sanitized.nav.navItems.filter(
      (item) => item.label && item.label.trim() !== ''
    );
  }

  // 2. About features: keep items with non-empty title or description
  if (sanitized.about?.features) {
    sanitized.about.features = sanitized.about.features.filter(
      (f) => (f.title && f.title.trim() !== '') || (f.description && f.description.trim() !== '')
    );
  }

  // 3. Services items: keep items with non-empty title or description
  if (sanitized.services?.items) {
    sanitized.services.items = sanitized.services.items.filter(
      (s) => (s.title && s.title.trim() !== '') || (s.description && s.description.trim() !== '')
    );
  }

  // 4. WhyUs items: keep items with non-empty title or description
  if (sanitized.whyUs?.items) {
    sanitized.whyUs.items = sanitized.whyUs.items.filter(
      (w) => (w.title && w.title.trim() !== '') || (w.description && w.description.trim() !== '')
    );
  }

  // 5. Statistics items: keep items with non-empty label or valid value
  if (sanitized.statistics?.items) {
    sanitized.statistics.items = sanitized.statistics.items.filter(
      (st) => (st.label && st.label.trim() !== '') || (st.value !== undefined && st.value !== null)
    );
  }

  // 6. Partners items: keep items with non-empty name or non-empty logoUrl
  if (sanitized.partners?.items) {
    sanitized.partners.items = sanitized.partners.items.filter(
      (p) => (p.name && p.name.trim() !== '') || (p.logoUrl && p.logoUrl.trim() !== '')
    );
  }

  // 7. Footer socialLinks: keep links with non-empty platform or url
  if (sanitized.footer?.socialLinks) {
    sanitized.footer.socialLinks = sanitized.footer.socialLinks.filter(
      (scl) => (scl.platform && scl.platform.trim() !== '') || (scl.url && scl.url.trim() !== '')
    );
  }

  return sanitized;
};

export const SiteDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<SiteData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Load siteData.json from root/public directory
  const loadSiteData = async () => {
    try {
      setLoading(true);
      setError(null);
      // Fetch with cache busting to always get latest edited JSON
      const res = await fetch('/data/siteData.json?t=' + Date.now());
      if (!res.ok) {
        throw new Error(`HTTP xətası: ${res.status}`);
      }
      const jsonData: SiteData = await res.json();
      setData(sanitizeSiteData(jsonData));
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Məlumat yüklənərkən xəta baş verdi.';
      setError(msg);
      console.error('SiteData yüklənərkən xəta:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSiteData();
  }, []);

  // Update browser tab title dynamically whenever companyName or tabTitleTemplate changes
  useEffect(() => {
    if (data?.general) {
      const compName = data.general.companyName || 'Annenfeld Agro';
      const template = data.general.tabTitleTemplate || '{companyName} — Smart Agro Logistics Solutions';
      document.title = template.replace('{companyName}', compName);
    }
  }, [data?.general?.companyName, data?.general?.tabTitleTemplate]);

  // Update browser favicon dynamically whenever faviconUrl changes
  useEffect(() => {
    const faviconUrl = data?.general?.faviconUrl || '/favicon.png';
    let link = document.querySelector<HTMLLinkElement>("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.href = faviconUrl;
  }, [data?.general?.faviconUrl]);

  // Save updated data to disk via Vite dev server endpoint
  const saveData = async (newData: SiteData): Promise<{ success: boolean; message: string }> => {
    // Required Validation Check
    if (!newData.general?.companyName?.trim()) {
      return { success: false, message: 'Xəta: Şirkətin Adı daxil edilməlidir!' };
    }
    if (!newData.general?.contactEmail?.trim()) {
      return { success: false, message: 'Xəta: Əlaqə E-poçtu daxil edilməlidir!' };
    }
    if (!newData.general?.contactPhone?.trim()) {
      return { success: false, message: 'Xəta: Əlaqə Telefonu daxil edilməlidir!' };
    }
    if (!newData.general?.contactAddress?.trim()) {
      return { success: false, message: 'Xəta: Ünvan Məlumatı daxil edilməlidir!' };
    }

    const cleanData = sanitizeSiteData(newData);
    try {
      setLoading(true);
      const res = await fetch('/api/save-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cleanData, null, 2),
      });

      if (res.ok) {
        setData(cleanData);
        return { success: true, message: 'Məlumatlar yadda saxlanıldı' };
      } else {
        return {
          success: false,
          message: 'Xəta: Serverə yadda saxlanılarkən xəta baş verdi',
        };
      }
    } catch (err: unknown) {
      return {
        success: false,
        message: err instanceof Error ? `Xəta: ${err.message}` : 'Xəta: Məlumatlar saxlanıla bilmədi',
      };
    } finally {
      setLoading(false);
    }
  };

  // Reset to original JSON
  const resetData = async () => {
    await loadSiteData();
  };

  return (
    <SiteDataContext.Provider
      value={{
        data,
        loading,
        error,
        saveData,
        resetData,
      }}
    >
      {children}
    </SiteDataContext.Provider>
  );
};

export const useSiteData = () => {
  const context = useContext(SiteDataContext);
  if (!context) {
    throw new Error('useSiteData must be used within a SiteDataProvider');
  }
  return context;
};
