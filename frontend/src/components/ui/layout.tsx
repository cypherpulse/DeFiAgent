import { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
}

export const Section = ({ children, className = '', containerClassName = '' }: SectionProps) => (
  <section className={`py-8 md:py-12 ${className}`}>
    <div className={`container mx-auto px-4 ${containerClassName}`}>
      {children}
    </div>
  </section>
);

interface GridProps {
  children: ReactNode;
  cols?: {
    default: string;
    md?: string;
    lg?: string;
    xl?: string;
  };
  gap?: string;
  className?: string;
}

export const Grid = ({
  children,
  cols = { default: '1', md: '2', lg: '3' },
  gap = '4',
  className = ''
}: GridProps) => {
  const gridClasses = [
    `grid grid-cols-${cols.default}`,
    cols.md && `md:grid-cols-${cols.md}`,
    cols.lg && `lg:grid-cols-${cols.lg}`,
    cols.xl && `xl:grid-cols-${cols.xl}`,
    `gap-${gap}`,
    className
  ].filter(Boolean).join(' ');

  return <div className={gridClasses}>{children}</div>;
};

interface CardGridProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  cols?: GridProps['cols'];
}

export const CardGrid = ({ children, title, subtitle, cols }: CardGridProps) => (
  <div className="space-y-6">
    {(title || subtitle) && (
      <div className="text-center">
        {title && <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">{title}</h2>}
        {subtitle && <p className="text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>}
      </div>
    )}
    <Grid cols={cols || { default: '1', md: '2', lg: '3' }} gap="6">
      {children}
    </Grid>
  </div>
);