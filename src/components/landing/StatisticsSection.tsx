import React, { useState, useEffect, useRef } from 'react';
import { useSiteData } from '../../context/SiteDataContext';
import { SectionHeading } from '../common/SectionHeading';
import { DynamicIcon } from '../../utils/iconHelper';

// Single counter item with animation
const StatCard: React.FC<{
  value: number;
  suffix: string;
  label: string;
  icon: string;
  isVisible: boolean;
}> = ({ value, suffix, label, icon, isVisible }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const end = value;
    const duration = 2000; // 2 seconds
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <div className="p-8 rounded-2xl bg-slate-900/60 backdrop-blur-md border border-slate-800 text-center flex flex-col items-center hover:border-primary-500/50 transition-colors group w-full sm:w-[calc(50%-16px)] lg:w-[calc(25%-24px)] min-w-[220px] max-w-[280px] flex-grow">
      <div className="w-14 h-14 rounded-2xl bg-primary-500/10 border border-primary-500/20 text-primary-400 flex items-center justify-center mb-4 group-hover:bg-primary-500 group-hover:text-white transition-colors duration-300">
        <DynamicIcon name={icon} className="w-7 h-7" />
      </div>
      <div className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-2 flex items-center justify-center gap-0.5">
        <span>{count.toLocaleString()}</span>
        <span className="text-primary-400">{suffix}</span>
      </div>
      <p className="text-sm font-semibold text-slate-300 tracking-wide uppercase">
        {label}
      </p>
    </div>
  );
};

export const StatisticsSection: React.FC = () => {
  const { data } = useSiteData();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  if (!data) return null;

  const { statistics } = data;

  // Filter valid stat items (must have label or value)
  const validItems = (statistics.items || []).filter(
    (item) => (item.label && item.label.trim() !== '') || (item.value !== undefined && item.value !== null)
  );

  if (validItems.length === 0) return null;

  return (
    <section
      id="statistics"
      ref={sectionRef}
      className="py-20 sm:py-28 bg-secondary-500 text-white relative overflow-hidden"
    >
      {/* Background Accent Gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Göstəricilər"
          heading={statistics.heading}
          subtitle={statistics.subtitle}
          theme="dark"
        />

        {/* Adaptive Centered Stat Grid */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
          {validItems.map((stat) => (
            <StatCard
              key={stat.id}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              icon={stat.icon}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
