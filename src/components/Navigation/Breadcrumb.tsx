import { useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronRight, Home } from 'lucide-react';

export const Breadcrumb = () => {
  const { t } = useTranslation();
  const location = useLocation();
  
  const pathSegments = location.pathname.split('/').filter(Boolean);
  
  if (pathSegments.length === 0) return null;

  const breadcrumbItems = pathSegments.map((segment, index) => {
    const path = '/' + pathSegments.slice(0, index + 1).join('/');
    const isLast = index === pathSegments.length - 1;
    
    let label = segment;
    if (segment === 'kalkulacka') label = t('general.breadcrumb.kalkulacka');
    else if (segment === 'pred-zacatkem') label = t('general.breadcrumb.pred-zacatkem');
    else if (segment === 'calculator') label = t('general.breadcrumb.calculator');
    else if (segment === 'checklist') label = t('general.breadcrumb.checklist');
    else if (segment === 'o-mne') label = t('general.breadcrumb.o-mne');
    else if (segment === 'about') label = t('general.breadcrumb.about');
    
    return { path, label, isLast };
  });

  return (
    <nav className="flex items-center space-x-1 text-xs lg:text-sm text-brand-wine/70 mb-4 lg:mb-6 overflow-x-auto pb-1" aria-label="Breadcrumb">
      <Link 
        to="/" 
        className="flex items-center gap-1 hover:text-brand-wine transition-colors whitespace-nowrap"
      >
        <Home className="w-3 h-3 lg:w-4 lg:h-4 flex-shrink-0" />
        <span className="hidden sm:inline">{t('general.breadcrumb.home')}</span>
      </Link>
      
      {breadcrumbItems.map((item, index) => (
        <div key={item.path} className="flex items-center whitespace-nowrap">
          <ChevronRight className="w-3 h-3 lg:w-4 lg:h-4 mx-1 flex-shrink-0" />
          {item.isLast ? (
            <span className="text-brand-wine font-medium truncate max-w-[120px] sm:max-w-none">{item.label}</span>
          ) : (
            <Link 
              to={item.path}
              className="hover:text-brand-wine transition-colors truncate max-w-[120px] sm:max-w-none"
            >
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
};