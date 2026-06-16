# Napojení dat pro reálnou diagnostiku 📊

> Pro krok 6 (diagnostika). Cíl: aby AI radila z **tvých reálných čísel**, ne z
> odhadů. Nemusíš nic programovat. Stačí čísla AI ukázat.

Máš dvě cesty, podle toho, co tvoje AI umí.

---

## Cesta A: Zkopíruj čísla ručně (funguje vždy, doporučeno pro začátek)

Otevři každý zdroj, opiš pár klíčových čísel a vlož je do promptu kroku 6. Níž je
přesně, co kde hledat.

### Google Analytics 4 (návštěvnost a chování)
1. Otevři https://analytics.google.com → vyber svůj web.
2. **Reports → Engagement / Acquisition.** Zapiš za poslední měsíc:
   - Návštěvnost (Users / Sessions),
   - Konverzní poměr (Conversion rate), pokud máš nastavené cíle nákupu,
   - Odkud lidé přišli (Acquisition: organic / social / paid / direct),
   - Které stránky mají nejvíc opuštění.

### Meta (Facebook / Instagram)
- **Insights** (organicky): dosah, interakce, prokliky na web, nejlepší příspěvky.
- **Ads Manager** (pokud platíš reklamu): útrata, prokliky, cena za proklik,
  nákupy, ROAS (kolik Kč tržby na 1 Kč reklamy).
  Najdeš v https://business.facebook.com.

### Platforma e-shopu (Shoptet / Shopify / WooCommerce / ...)
V administraci e-shopu (sekce Statistiky / Přehledy / Objednávky) zapiš:
- počet objednávek a tržby za měsíc,
- průměrná objednávka (AOV),
- opuštěné košíky (kolik lidí začalo objednávku a nedokončilo),
- top a nejhůř prodávané produkty.

### Šablona, kterou AI dáš
```
Návštěvnost: ___   Konverze: ___ %   AOV: ___ Kč
Náklad na zboží/obj.: ___ Kč   Ostatní náklady/obj.: ___ Kč
Marketing/měsíc: ___ Kč   Hlavní zdroj návštěv: ___
Opuštěné košíky: ___ %   Nejprodávanější / nejhorší produkt: ___
```

---

## Cesta B: Necháš to na AI s přístupem k nástrojům (pokročilé)

Pokud tvoje AI má napojení (konektory, MCP, pluginy) na Google Analytics, Meta
nebo tvoji platformu, řekni jí:

> *„Připoj se k mému Google Analytics 4 (a Meta a platformě e-shopu, pokud to umíš).
> Stáhni za poslední měsíc návštěvnost, konverzi, AOV, zdroje návštěv a opuštěné
> košíky. Pak proveď diagnostiku podle `prompts/chain/06-diagnostika.md` a najdi
> nejslabší článek. Než cokoli stáhneš, ukaž mi, co se chystáš číst.“*

**Bezpečnost:** dej AI přístup jen ke čtení (read-only). Nikdy nesdílej hesla v
chatu, používej oficiální přihlášení / konektory dané AI. Osobní data zákazníků
(jména, adresy, e-maily) nikam nekopíruj, k diagnostice je nepotřebuješ.

---

## Jak data čísel proměnit v rozhodnutí
Reálná čísla vlož do **kroku 6** (`prompts/chain/06-diagnostika.md`). AI z nich
najde nejslabší článek a vrátí tě na správné místo v řetězci (poptávka, marketing
nebo ekonomika). Diagnostiku opakuj každý měsíc, ať vidíš, jestli zásahy zabíraly.
