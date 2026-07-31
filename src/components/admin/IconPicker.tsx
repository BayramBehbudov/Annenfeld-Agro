import React, { useState, useRef, useEffect } from 'react';
import { DynamicIcon } from '../../utils/iconHelper';
import { ChevronDown, Check } from 'lucide-react';

export const AVAILABLE_ICONS: string[] = [
  'Truck',
  'ShieldCheck',
  'Award',
  'Users',
  'Globe',
  'Warehouse',
  'MapPin',
  'Zap',
  'Compass',
  'UserCheck',
  'Headphones',
  'Package',
  'Smile',
  'Calendar',
  'Phone',
  'Mail',
  'Clock',
  'CheckCircle',
  'Star',
  'Heart',
  'Activity',
  'Navigation',
  'Anchor',
  'Box',
  'Cpu',
  'FileText',
  'Layers',
  'Shield',
  'Sparkles',
  'Target',
  'Instagram',
  'Facebook',
  'Linkedin',
  'Twitter',
  'Share2',
];

interface IconPickerProps {
  value: string;
  onChange: (iconName: string) => void;
  label?: string;
}

export const IconPicker: React.FC<IconPickerProps> = ({ value, onChange, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openUpward, setOpenUpward] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Determine smart open direction (upward vs downward) based on available screen space
  const handleToggle = () => {
    if (!isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      // If less than 240px below, open upward to prevent page overflow
      setOpenUpward(spaceBelow < 240);
    }
    setIsOpen(!isOpen);
  };

  const selectedIcon = value && AVAILABLE_ICONS.includes(value) ? value : 'Truck';

  return (
    <div className="relative" ref={dropdownRef}>
      {label && <label className="block text-xs font-bold text-slate-700 mb-1">{label}</label>}

      {/* Selected Value Trigger Button */}
      <button
        type="button"
        ref={buttonRef}
        onClick={handleToggle}
        className="w-full flex items-center justify-between px-3 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none transition-all text-sm"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-primary-100 text-primary-700 flex items-center justify-center shrink-0">
            <DynamicIcon name={selectedIcon} className="w-4 h-4" />
          </div>
          <span className="font-semibold text-slate-800">{selectedIcon}</span>
        </div>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Options Grid with Smart Auto-Flip Positioning */}
      {isOpen && (
        <div
          className={`absolute z-50 left-0 right-0 bg-white rounded-2xl border border-slate-200 shadow-2xl max-h-52 overflow-y-auto p-2 space-y-1 animate-fade-in ${
            openUpward ? 'bottom-full mb-1.5' : 'top-full mt-1.5'
          }`}
        >
          <div className="grid grid-cols-2 gap-1">
            {AVAILABLE_ICONS.map((iconName) => {
              const isSelected = iconName === selectedIcon;
              return (
                <button
                  key={iconName}
                  type="button"
                  onClick={() => {
                    onChange(iconName);
                    setIsOpen(false);
                  }}
                  className={`flex items-center justify-between p-2 rounded-xl text-xs font-medium transition-all ${
                    isSelected
                      ? 'bg-primary-500 text-white font-bold'
                      : 'hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <DynamicIcon
                      name={iconName}
                      className={`w-4 h-4 shrink-0 ${isSelected ? 'text-white' : 'text-primary-600'}`}
                    />
                    <span className="truncate">{iconName}</span>
                  </div>
                  {isSelected && <Check className="w-3.5 h-3.5 shrink-0 ml-1" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
