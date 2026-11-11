import React from 'react';
import Card from '../common/Card';

const StatCard = ({
  label,
  value,
  trend,
  trendPositive = true,
  icon: Icon,
  accent = 'primary',
  helper
}) => {
  const accentStyles = {
    primary: {
      iconBg: 'bg-primary/10 text-primary-light border-primary/20',
      badge: 'text-primary-light'
    },
    secondary: {
      iconBg: 'bg-secondary/10 text-secondary border-secondary/20',
      badge: 'text-secondary'
    },
    emerald: {
      iconBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      badge: 'text-emerald-400'
    },
    amber: {
      iconBg: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      badge: 'text-amber-400'
    }
  };

  const style = accentStyles[accent] || accentStyles.primary;

  return (
    <Card className="p-5 flex flex-col justify-between">
      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs font-medium text-space-muted block">{label}</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-white mt-1.5 tracking-tight">
            {value}
          </div>
        </div>
        {Icon && (
          <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${style.iconBg}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-space-border/50 flex items-center justify-between text-xs">
        {trend && (
          <span className={`font-medium flex items-center gap-1 ${trendPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
            <span>{trendPositive ? '↑' : '↓'}</span>
            <span>{trend}</span>
          </span>
        )}
        {helper && (
          <span className="text-space-dim text-[11px] truncate">
            {helper}
          </span>
        )}
      </div>
    </Card>
  );
};

export default StatCard;
