import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Header } from "@/components/Header/Header";
import { MapPin } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-soft flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-light-pink mb-6">
            <MapPin className="w-8 h-8 text-brand-wine" />
          </div>

          <p className="text-brand-orange font-semibold uppercase tracking-wide text-sm mb-2">
            404
          </p>
          <h1 className="text-3xl font-bold text-brand-wine mb-3">
            Tahle stránka tu není
          </h1>
          <p className="text-brand-wine/70 mb-8">
            Možná ses ztratila, to nevadí. Tady jsou místa, kam se vrátit:
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center flex-wrap">
            <Link
              to="/"
              className="px-4 py-2 rounded-lg bg-brand-wine text-white font-medium hover:bg-brand-wine/90 transition-colors"
            >
              Domů
            </Link>
            <Link
              to="/kalkulacka"
              className="px-4 py-2 rounded-lg border border-brand-wine/30 text-brand-wine font-medium hover:bg-brand-light-pink transition-colors"
            >
              Kalkulačka
            </Link>
            <Link
              to="/diagnostika"
              className="px-4 py-2 rounded-lg border border-brand-wine/30 text-brand-wine font-medium hover:bg-brand-light-pink transition-colors"
            >
              Diagnostika
            </Link>
            <Link
              to="/pruvodce"
              className="px-4 py-2 rounded-lg border border-brand-wine/30 text-brand-wine font-medium hover:bg-brand-light-pink transition-colors"
            >
              Průvodci
            </Link>
            <Link
              to="/faq"
              className="px-4 py-2 rounded-lg border border-brand-wine/30 text-brand-wine font-medium hover:bg-brand-light-pink transition-colors"
            >
              Časté otázky
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default NotFound;
