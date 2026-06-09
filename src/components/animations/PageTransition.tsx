import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

export const PageTransition = ({ children, className }: PageTransitionProps) => {
  return (
    <div className={cn("animate-fade-in", className)}>
      {children}
    </div>
  );
};

export const StaggeredContainer = ({ children, className }: PageTransitionProps) => {
  return (
    <div className={cn("space-y-4", className)}>
      {children}
    </div>
  );
};

export const AnimatedCard = ({ children, className, delay = 0 }: PageTransitionProps & { delay?: number }) => {
  return (
    <div 
      className={cn("animate-fade-in transition-all duration-300 hover:scale-105 hover:shadow-lg", className)}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};