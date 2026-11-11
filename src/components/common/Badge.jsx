import React from 'react';

const Badge = ({
  children,
  variant = 'neutral',
  dot = false,
  pulse = false,
  className = '',
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5 font-medium',
    md: 'text-xs px-2.5 py-1 font-medium',
    lg: 'text-sm px-3 py-1.5 font-medium'
  };

  const variantStyles = {
    available: {
      wrap: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
      dot: 'bg-emerald-400'
    },
    busy: {
      wrap: 'bg-rose-500/10 text-rose-400 border border-rose-500/20',
      dot: 'bg-rose-400'
    },
    reserved: {
      wrap: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
      dot: 'bg-amber-400'
    },
    primary: {
      wrap: 'bg-primary/10 text-primary-light border border-primary/20',
      dot: 'bg-primary'
    },
    secondary: {
      wrap: 'bg-secondary/10 text-secondary border border-secondary/25',
      dot: 'bg-secondary'
    },
    neutral: {
      wrap: 'bg-space-card text-space-muted border border-space-border',
      dot: 'bg-space-muted'
    }
  };

  const selected = variantStyles[variant] || variantStyles.neutral;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full tracking-wide ${sizeClasses[size] || sizeClasses.md} ${selected.wrap} ${className}`}
    >
      {dot && (
        <span className="relative flex h-2 w-2 shrink-0">
          {pulse && (
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${selected.dot}`}
            />
          )}
          <span className={`relative inline-flex rounded-full h-2 w-2 ${selected.dot}`} />
        </span>
      )}
      <span>{children}</span>
    </span>
  );
};

export default Badge;
