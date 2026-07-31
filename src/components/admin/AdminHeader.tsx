import React from 'react';
import { useSiteData } from '../../context/SiteDataContext';
import { Button } from '../common/Button';
import { Save } from 'lucide-react';
import { SiteData } from '../../types/siteData';

interface AdminHeaderProps {
  title: string;
  currentData: SiteData | null;
  onSaveSuccess?: (msg: string) => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ title, currentData, onSaveSuccess }) => {
  const { saveData, loading } = useSiteData();

  const handleSave = async () => {
    if (!currentData) return;

    // Strict Admin Validation: Require essential contact fields before saving to disk
    if (!currentData.general?.companyName?.trim()) {
      if (onSaveSuccess) onSaveSuccess('Xəta: Şirkətin Adı məcburidir!');
      return;
    }
    if (!currentData.general?.contactEmail?.trim()) {
      if (onSaveSuccess) onSaveSuccess('Xəta: Əlaqə E-poçtu məcburidir!');
      return;
    }
    if (!currentData.general?.contactPhone?.trim()) {
      if (onSaveSuccess) onSaveSuccess('Xəta: Əlaqə Telefonu məcburidir!');
      return;
    }
    if (!currentData.general?.contactAddress?.trim()) {
      if (onSaveSuccess) onSaveSuccess('Xəta: Ünvan Məlumatı məcburidir!');
      return;
    }

    const result = await saveData(currentData);
    if (onSaveSuccess) {
      onSaveSuccess(result.message);
    }
  };

  return (
    <header className="bg-white border-b border-slate-200 px-4 sm:px-8 py-3.5 sm:py-4 flex items-center justify-between gap-3 sticky top-0 z-30 shadow-sm shrink-0">
      <div className="min-w-0 flex-1">
        <h1 className="text-base sm:text-xl lg:text-2xl font-bold text-slate-900 truncate">{title}</h1>
      </div>

      <div className="flex items-center shrink-0">
        {/* Save Button */}
        <Button
          variant="primary"
          size="md"
          isLoading={loading}
          onClick={handleSave}
          leftIcon={<Save className="w-4 h-4" />}
          className="shadow-md shadow-primary-500/20"
        >
          Yadda Saxla
        </Button>
      </div>
    </header>
  );
};
