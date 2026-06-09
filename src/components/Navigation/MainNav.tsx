
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { HelpCircle, Calculator, CheckSquare, User, MessageCircleQuestion, Lightbulb, Stethoscope } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MainNavProps {
  onItemClick?: () => void;
}

export const MainNav = ({ onItemClick }: MainNavProps) => {
  const { t } = useTranslation();

  const navItems = [
    { to: '/validace', label: t('nav.validace'), icon: Lightbulb },
    { to: '/kalkulacka', label: t('nav.calculator'), icon: Calculator },
    { to: '/diagnostika', label: t('nav.diagnostika'), icon: Stethoscope },
    { to: '/checklist', label: t('nav.checklist'), icon: CheckSquare },
    { to: '/pred-zacatkem', label: t('nav.beforeStart'), icon: HelpCircle },
    { to: '/faq', label: t('nav.faq'), icon: MessageCircleQuestion },
    { to: '/o-mne', label: t('nav.about'), icon: User },
  ];

  return (
    <nav className="flex flex-col lg:flex-row lg:items-center space-y-2 lg:space-y-0 lg:space-x-2" role="navigation">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          onClick={onItemClick}
          className={({ isActive }) =>
            cn(
              "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 whitespace-nowrap hover:scale-105",
              "hover:bg-brand-light-pink hover:text-brand-wine relative",
              "after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-brand-wine after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left",
              isActive 
                ? "bg-brand-wine text-white after:scale-x-100" 
                : "text-brand-wine/70"
            )
          }
          end={item.to === '/'}
        >
          <item.icon className="w-4 h-4 flex-shrink-0" />
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
};
