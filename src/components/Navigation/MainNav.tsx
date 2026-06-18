import { NavLink, useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  HelpCircle,
  Calculator,
  CheckSquare,
  User,
  MessageCircleQuestion,
  Lightbulb,
  Stethoscope,
  Compass,
  Wallet,
  ChevronDown,
  BookOpen,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { GUIDES } from '@/data/guides';

interface MainNavProps {
  /** Called after a nav link is clicked (used by mobile menu to close itself). */
  onItemClick?: () => void;
  /** When true, renders as a flat vertical list for mobile (burger menu). */
  mobile?: boolean;
}

const toolItems = [
  {
    to: '/validace',
    label: 'Validace nápadu',
    description: 'Ověř poptávku, než utratíš',
    icon: Lightbulb,
  },
  {
    to: '/kalkulacka',
    label: 'Finanční kalkulačka',
    description: 'Spočítej, jestli to vydělá',
    icon: Calculator,
  },
  {
    to: '/vyber-platformy',
    label: 'Výběr platformy',
    description: 'Najdi svou platformu',
    icon: Compass,
  },
  {
    to: '/checklist',
    label: 'Checklist spuštění',
    description: 'Co mít hotové před startem',
    icon: CheckSquare,
  },
  {
    to: '/diagnostika',
    label: 'Diagnostika',
    description: 'Zjisti, proč to neprodává',
    icon: Stethoscope,
  },
  {
    to: '/roi-kalkulacka',
    label: 'ROI kalkulačka',
    description: 'Vyplatí se ten výdaj?',
    icon: Wallet,
  },
];

const topItems = [
  { to: '/pred-zacatkem', label: 'Před začátkem', icon: HelpCircle },
  { to: '/faq', label: 'FAQ', icon: MessageCircleQuestion },
  { to: '/o-mne', label: 'O mně', icon: User },
];

/** Shared link class factory — same visual style as the original nav links. */
const navLinkClass = (isActive: boolean) =>
  cn(
    'flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 whitespace-nowrap hover:scale-105',
    'hover:bg-brand-light-pink hover:text-brand-wine relative',
    "after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-brand-wine after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left",
    isActive ? 'bg-brand-wine text-white after:scale-x-100' : 'text-brand-wine/70',
  );

// ─── Desktop grouped nav ──────────────────────────────────────────────────────

export const DesktopNav = () => {
  const location = useLocation();
  const isToolActive = toolItems.some((t) => t.to === location.pathname);
  const isGuideActive = location.pathname.startsWith('/pruvodce');

  return (
    <nav
      className="flex items-center space-x-1"
      role="navigation"
      aria-label="Hlavní navigace"
    >
      {/* Nástroje dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className={cn(
              navLinkClass(isToolActive),
              // remove the underline pseudo-element on the trigger — Radix manages open state
              'after:hidden',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-wine focus-visible:ring-offset-2',
            )}
            aria-label="Nástroje — otevřít nabídku"
          >
            <span>Nástroje</span>
            <ChevronDown
              className="w-3.5 h-3.5 flex-shrink-0 transition-transform duration-200 ui-open:rotate-180"
              aria-hidden="true"
            />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="start"
          sideOffset={8}
          className="w-72 p-2 rounded-xl shadow-lg border border-border bg-background"
        >
          {toolItems.map((item) => (
            <DropdownMenuItem key={item.to} asChild>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    'flex items-start gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors duration-150',
                    'hover:bg-brand-light-pink focus:bg-brand-light-pink focus:outline-none',
                    isActive
                      ? 'bg-brand-wine/10 text-brand-wine font-semibold'
                      : 'text-foreground',
                  )
                }
              >
                <item.icon className="w-4 h-4 mt-0.5 flex-shrink-0 text-brand-orange" aria-hidden="true" />
                <span className="flex flex-col">
                  <span className="text-sm font-medium leading-snug">{item.label}</span>
                  <span className="text-xs text-muted-foreground leading-snug">{item.description}</span>
                </span>
              </NavLink>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Průvodce dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className={cn(
              navLinkClass(isGuideActive),
              'after:hidden',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-wine focus-visible:ring-offset-2',
            )}
            aria-label="Průvodce — otevřít nabídku"
          >
            <span>Průvodce</span>
            <ChevronDown
              className="w-3.5 h-3.5 flex-shrink-0 transition-transform duration-200 ui-open:rotate-180"
              aria-hidden="true"
            />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="start"
          sideOffset={8}
          className="w-72 p-2 rounded-xl shadow-lg border border-border bg-background"
        >
          {/* Index link */}
          <DropdownMenuItem asChild>
            <Link
              to="/pruvodce"
              className={cn(
                'flex items-start gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors duration-150',
                'hover:bg-brand-light-pink focus:bg-brand-light-pink focus:outline-none',
                location.pathname === '/pruvodce'
                  ? 'bg-brand-wine/10 text-brand-wine font-semibold'
                  : 'text-foreground',
              )}
            >
              <BookOpen className="w-4 h-4 mt-0.5 flex-shrink-0 text-brand-orange" aria-hidden="true" />
              <span className="flex flex-col">
                <span className="text-sm font-medium leading-snug">Všichni průvodci</span>
                <span className="text-xs text-muted-foreground leading-snug">Přehled všech průvodců</span>
              </span>
            </Link>
          </DropdownMenuItem>

          {/* Individual guides */}
          {GUIDES.map((g) => (
            <DropdownMenuItem key={g.slug} asChild>
              <NavLink
                to={`/pruvodce/${g.slug}`}
                className={({ isActive }) =>
                  cn(
                    'flex items-start gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors duration-150',
                    'hover:bg-brand-light-pink focus:bg-brand-light-pink focus:outline-none',
                    isActive
                      ? 'bg-brand-wine/10 text-brand-wine font-semibold'
                      : 'text-foreground',
                  )
                }
              >
                <span className="w-4 h-4 mt-0.5 flex-shrink-0 text-center text-xs font-bold text-brand-orange tabular-nums">
                  {g.order}
                </span>
                <span className="flex flex-col">
                  <span className="text-sm font-medium leading-snug">{g.title}</span>
                  {g.summary && (
                    <span className="text-xs text-muted-foreground leading-snug line-clamp-1">{g.summary}</span>
                  )}
                </span>
              </NavLink>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Top-level links */}
      {topItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) => navLinkClass(isActive)}
        >
          <item.icon className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
};

// ─── Mobile flat nav (used inside burger menu) ────────────────────────────────

export const MainNav = ({ onItemClick }: MainNavProps) => {
  const { t } = useTranslation();
  // t() calls kept so i18n keys still resolve; labels below use literal Czech
  void t;

  const mobileLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      'flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150',
      'hover:bg-brand-light-pink hover:text-brand-wine',
      isActive ? 'bg-brand-wine text-white' : 'text-brand-wine/70',
    );

  return (
    <nav
      className="flex flex-col space-y-1"
      role="navigation"
      aria-label="Mobilní navigace"
    >
      {/* Nástroje subheading */}
      <p className="px-3 pt-1 pb-0.5 text-xs font-semibold uppercase tracking-wider text-brand-wine/50 select-none">
        Nástroje
      </p>

      {toolItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          onClick={onItemClick}
          className={({ isActive }) =>
            cn(
              'flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150',
              'hover:bg-brand-light-pink hover:text-brand-wine',
              isActive ? 'bg-brand-wine text-white' : 'text-brand-wine/70',
            )
          }
        >
          <item.icon className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
          <span className="flex-1">{item.label}</span>
        </NavLink>
      ))}

      {/* Divider */}
      <div className="my-1 border-t border-border" role="separator" />

      {/* Průvodce subheading */}
      <p className="px-3 pt-1 pb-0.5 text-xs font-semibold uppercase tracking-wider text-brand-wine/50 select-none">
        Průvodce
      </p>

      {/* Průvodce — pouze odkaz na přehled */}
      <NavLink
        to="/pruvodce"
        end
        onClick={onItemClick}
        className={mobileLinkClass}
      >
        <BookOpen className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
        <span className="flex-1">Všichni průvodci</span>
      </NavLink>

      {/* Divider */}
      <div className="my-1 border-t border-border" role="separator" />

      {topItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          onClick={onItemClick}
          className={mobileLinkClass}
        >
          <item.icon className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
};
