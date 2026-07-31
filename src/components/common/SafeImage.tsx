import React, { useState } from 'react';
import { ImageOff } from 'lucide-react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackText?: string;
  fallbackSrc?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt = 'Şəkil',
  fallbackText,
  fallbackSrc,
  className,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    if (fallbackText) {
      return (
        <div
          className={`flex items-center justify-center bg-slate-800 text-white font-bold px-4 py-3 rounded-xl border border-slate-700 text-center select-none ${className}`}
        >
          <span>{fallbackText}</span>
        </div>
      );
    }

    if (fallbackSrc) {
      return (
        <img
          src={fallbackSrc}
          alt={alt}
          className={className}
          {...props}
        />
      );
    }

    return (
      <div className={`relative overflow-hidden bg-slate-900 flex flex-col items-center justify-center text-slate-400 p-4 text-center ${className}`}>
        <div className="relative z-10 flex flex-col items-center gap-1 text-xs font-semibold text-slate-300">
          <ImageOff className="w-6 h-6 text-slate-400 mb-1" />
          <span>{alt || 'Şəkil tapılmadı'}</span>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setHasError(true)}
      className={className}
      {...props}
    />
  );
};
