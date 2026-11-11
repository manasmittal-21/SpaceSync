import React from 'react';

const Card = ({
  children,
  className = '',
  hoverEffect = false,
  glow = false,
  onClick,
  as: Component = 'div',
  ...props
}) => {
  return (
    <Component
      onClick={onClick}
      className={`
        bg-space-card border border-space-border rounded-xl text-space-text
        transition-all duration-200 relative overflow-hidden
        ${hoverEffect ? 'hover:border-space-border-light hover:bg-space-card-hover hover:shadow-card-elevated cursor-pointer hover:-translate-y-0.5' : ''}
        ${glow ? 'shadow-glow-primary border-primary/40' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Card;
