import { MainNav } from "@/components/Navigation/MainNav";
import { DesktopNav } from "@/components/Navigation/MainNav";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export const Header = () => {
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Skip to main content link for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        Přeskočit na hlavní obsah
      </a>

      <header
        className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 animate-fade-in"
        role="banner"
      >
        <div className="container flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 lg:gap-3 hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm flex-shrink-0"
            aria-label={t('site.home.label', 'Přejít na domovskou stránku')}
          >
            <ShoppingBag
              className="w-6 h-6 lg:w-7 lg:h-7 text-brand-orange animate-float"
              aria-hidden="true"
            />
            <span className="text-sm sm:text-base lg:text-xl font-bold text-brand-wine whitespace-nowrap">
              {t('site.title')}
            </span>
          </Link>

          {/* Desktop nav — grouped mega menu */}
          <div className="hidden lg:flex lg:items-center lg:ml-6">
            <DesktopNav />
          </div>

          {/* Mobile burger button */}
          <div
            className="flex items-center gap-1 sm:gap-2"
            role="toolbar"
            aria-label={t('nav.utilities.label', 'Nastavení webu')}
          >
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden ml-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-nav"
              aria-label={isMobileMenuOpen ? "Zavřít menu" : "Otevřít menu"}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile / tablet nav panel */}
        {isMobileMenuOpen && (
          <div
            id="mobile-nav"
            className="lg:hidden border-t bg-background/95 backdrop-blur animate-fade-in"
            role="navigation"
            aria-label={t('nav.mobile.label', 'Mobilní navigace')}
          >
            <div className="container py-4">
              <MainNav onItemClick={() => setIsMobileMenuOpen(false)} />
            </div>
          </div>
        )}
      </header>
    </>
  );
};
