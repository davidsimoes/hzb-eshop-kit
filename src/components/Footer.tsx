
import { Card, CardContent } from '@/components/ui/card';
import { Users, Target, TrendingUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="mt-16 border-t border-border bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Social Media Links */}
            <div>
              <h4 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-brand-orange" />
                {t('footer.contact.title')}
              </h4>
              <div className="space-y-3">
                <a 
                  href="https://www.linkedin.com/in/davidjsimoes/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-muted-foreground hover:text-brand-orange transition-colors text-sm"
                >
                  <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  <span>{t('footer.contact.linkedin')}</span>
                </a>
                <a 
                  href="https://www.instagram.com/davidsimoes_/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-muted-foreground hover:text-brand-pink transition-colors text-sm"
                >
                  <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <span>{t('footer.contact.instagram')}</span>
                </a>
                <a 
                  href="https://x.com/davidsimoes_" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-muted-foreground hover:text-brand-orange transition-colors text-sm"
                >
                  <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
                  </svg>
                  <span>{t('footer.contact.twitter')}</span>
                </a>
              </div>
            </div>

            {/* Agency */}
            <div>
              <h4 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-brand-orange" />
                {t('footer.agency.title')}
              </h4>
              <div className="space-y-3">
                <a 
                  href="https://soundsgood.agency" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-foreground hover:text-brand-orange transition-colors font-semibold text-sm"
                >
                  <span className="mr-2 flex-shrink-0">🚀</span>
                  <span>{t('footer.agency.name')}</span>
                </a>
                <p className="text-sm text-muted-foreground">
                  {t('footer.agency.description')}
                </p>
              </div>
            </div>

            {/* E-shop Platform */}
            <div>
              <h4 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-brand-orange" />
                {t('footer.platform.title')}
              </h4>
              <div className="space-y-3">
                <a 
                  href="https://shopify.pxf.io/hp-cz" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-2 bg-gradient-brand text-white rounded-lg hover:shadow-brand transition-all font-semibold text-sm"
                >
                  <span className="mr-2 flex-shrink-0">🛒</span>
                  <span>{t('footer.platform.shopify')}</span>
                </a>
                <p className="text-sm text-muted-foreground">
                  {t('footer.platform.description')}
                </p>
              </div>
            </div>

            {/* Education */}
            <div>
              <h4 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-brand-orange" />
                {t('footer.education.title')}
              </h4>
              <div className="space-y-3">
                <a 
                  href="https://exec.shopsys.cz/podcast" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-foreground hover:text-brand-orange transition-colors text-sm"
                >
                  <span className="mr-2 flex-shrink-0">🎧</span>
                  <span>{t('footer.education.podcast')}</span>
                </a>
                <p className="text-sm text-muted-foreground">
                  {t('footer.education.description')}
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="text-center pt-8 border-t border-border">
            <p className="text-muted-foreground mb-2">
              {t('footer.bottom.created')}
            </p>
            <p className="text-brand-orange font-semibold">
              {t('footer.bottom.success')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
