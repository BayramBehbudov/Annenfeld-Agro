import React, { useRef, useState } from 'react';
import { Upload, Trash2, Loader2, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/common/Button';

interface ImageInputProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  isFavicon?: boolean;
}

export const ImageInput: React.FC<ImageInputProps> = ({
  value,
  onChange,
  label = 'Şəkil',
  isFavicon = false,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const reader = new FileReader();
    reader.onload = async (event) => {
      const dataUrl = event.target?.result as string;
      if (!dataUrl) {
        setUploading(false);
        return;
      }

      try {
        // Upload image to unified /api/upload-image endpoint (saves in public/uploads/ or root public/ for favicon)
        const res = await fetch('/api/upload-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fileData: dataUrl,
            fileName: file.name.split('.')[0],
            previousUrl: value,
            isFavicon,
          }),
        });

        if (res.ok) {
          const json = await res.json();
          if (json.url) {
            onChange(json.url);
          } else {
            onChange(dataUrl);
          }
        } else {
          onChange(dataUrl);
        }
      } catch (err) {
        console.warn('Upload endpoint error, falling back:', err);
        onChange(dataUrl);
      } finally {
        setUploading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-2">
      {label && <label className="block text-sm font-semibold text-slate-800">{label}</label>}

      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*,.ico,.svg"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Image Preview & Upload Controls (No manual text input box) */}
      <div className="flex items-center gap-4 p-3 rounded-2xl bg-slate-50 border border-slate-200">
        {/* Preview Thumbnail Box */}
        <div className="w-20 h-20 rounded-xl overflow-hidden border border-slate-300 bg-slate-900 shrink-0 relative flex items-center justify-center">
          {value ? (
            <img
              src={value}
              alt="Şəkil önbaxışı"
              className="w-full h-full object-cover"
            />
          ) : (
            <ImageIcon className="w-8 h-8 text-slate-500" />
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            isLoading={uploading}
            onClick={() => fileInputRef.current?.click()}
            leftIcon={uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
          >
            Yüklə
          </Button>

          {value && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => onChange('')}
              leftIcon={<Trash2 className="w-4 h-4 text-red-500" />}
              className="text-red-600 hover:bg-red-50"
            >
              Sil
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
