
import { Loader2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useTranslation } from 'react-i18next';

export const LoadingSpinner = ({ size = 'default' }: { size?: 'sm' | 'default' | 'lg' }) => {
  const { t } = useTranslation();
  
  const sizeClasses = {
    sm: 'w-4 h-4',
    default: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <div className="flex items-center justify-center">
      <Loader2 className={`${sizeClasses[size]} animate-spin text-brand-orange`} />
      <span className="sr-only">{t('loading.loading')}</span>
    </div>
  );
};

export const CalculatorSkeleton = () => {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="space-y-4">
        <Skeleton className="h-8 w-3/4 mx-auto" />
        <Skeleton className="h-4 w-1/2 mx-auto" />
      </div>
      
      <div className="space-y-4 p-6">
        <div className="space-y-2">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-10 w-full" />
        </div>
        
        <div className="space-y-2">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-10 w-full" />
        </div>
        
        <div className="space-y-2">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-10 w-full" />
        </div>
        
        <div className="flex justify-between">
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-10 w-24" />
        </div>
      </div>
    </div>
  );
};

export const ResultsSkeleton = () => {
  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="space-y-4">
        <div className="p-6 space-y-4">
          <Skeleton className="h-6 w-1/2" />
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="p-6 space-y-4">
          <Skeleton className="h-6 w-1/2" />
          <div className="space-y-3">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const LoadingOverlay = ({ children }: { children: React.ReactNode }) => {
  const { t } = useTranslation();
  
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="text-center space-y-2">
          <LoadingSpinner size="lg" />
          <p className="text-sm text-muted-foreground">{t('loading.calculating')}</p>
        </div>
      </div>
      {children}
    </div>
  );
};
