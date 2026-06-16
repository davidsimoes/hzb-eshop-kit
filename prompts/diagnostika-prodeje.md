# Prompt: Proč to neprodává

> Zkopíruj, doplň `[závorky]`, vlož do AI. (Čísla ti spočítá i
> [diagnostika na webu](https://hzb.davidjose.net/diagnostika).)

---

Jsi praktický e-commerce poradce. Mluv lidsky, neházej na mě žargon.

Mám e-shop a neprodává mi to tak, jak bych chtěla. Tady jsou moje čísla za měsíc:

- **Návštěvnost:** [počet] lidí
- **Konverze:** [%] (kolik % návštěv skončí objednávkou; nevím-li, dej odhad)
- **Průměrná objednávka (AOV):** [Kč]
- **Náklady na zboží v objednávce:** [Kč]
- **Ostatní náklady na objednávku** (doprava, balné, poplatky): [Kč]
- **Marketing měsíčně:** [Kč]
- **Co prodávám a komu:** [produkt + persona]

Prosím:
1. Spočítej a **jednoduše vysvětli**, kde se ztrácí nejvíc peněz (nejslabší článek:
   návštěvnost / konverze / hodnota objednávky / marže / náklad na zákaznici).
2. Dej mi **akční plán na příští 2 týdny**, seřazený podle dopadu.
3. U každého kroku napiš, **jak poznám, že zabral**.
4. Nech mě **neměnit všechno najednou**, vyber, čím mám začít.

---

**Pokračování (volitelné):** *„Teď buď mojí zákaznicí (persona výš). Popíšu ti svůj
e-shop a produktovou stránku, řekni mi upřímně, co by tě odradilo od nákupu.“*

---

**Propoj to s ostatními plány (volitelné):** *„Mám hotové i další podklady z téhle
sady. Vezmi je v potaz, ať plán sedí dohromady a neradíš mi věci, co už mám vyřešené:*

- *Komu prodávám a co je pro ni důležité: viz [validace persony](validace-persony.md)*
- *Jestli mi byznys finančně vychází: viz [výběr platformy](vyber-platformy.md) a kalkulačka*
- *Jak a kde dělám marketing: viz [marketing plán](marketing-plan.md)*
- *Jak mám napsané produkty: viz [popisky produktů](popisky-produktu.md)*
- *Co mi ještě chybí před spuštěním: viz [spuštění a checklist](spusteni-checklist.md)*

*Když ti něco z toho předám, zohledni to. Když ne, klidně se zeptej, co už mám hotové.“*

---

**Připoj reálná data, ať je diagnóza přesná (doporučeno):**

Odhad je fajn na začátek, ale skutečná čísla z tvých nástrojů ti dají mnohem přesnější
odpověď. Nemusíš umět nic technického, postupuj krok po kroku:

1. **Návštěvnost a konverze, mobil vs. počítač, Google Analytics (GA4):**
   - Přihlas se na [analytics.google.com](https://analytics.google.com).
   - Vlevo dej **Reports → Engagement → Pages and screens** (návštěvnost) a
     **Reports → Acquisition** (odkud lidé chodí).
   - Konverzi a porovnání mobil/počítač najdeš v **Reports → Tech → Tech details**
     (rozdělení podle zařízení) a v **Reports → Monetization** (objednávky).
   - Pokud GA4 ještě nemáš, je zdarma a nainstaluje se za odpoledne; tvoje platforma
     (Shopify, WooCommerce, Shoptet) má pro to návod nebo doplněk na pár kliků.

2. **Výdaje na reklamu a ROAS, Meta Ads / Google Ads:**
   - **Meta:** [business.facebook.com](https://business.facebook.com) → **Ads Manager**.
     Sloupce „Amount spent“ (utraceno) a „Purchase ROAS“ (návratnost) ti dají marketing
     a ROAS za měsíc.
   - **Google Ads:** [ads.google.com](https://ads.google.com) → **Campaigns**, sloupce
     „Cost“ a „Conv. value / cost“.

3. **Objednávky, AOV, vratky, opakované nákupy, admin tvého e-shopu:**
   - V administraci e-shopu najdeš sekci **Objednávky / Analýza / Přehledy**.
   - Shopify: **Analytics → Reports** (Sales, Average order value, Returning customer rate).
   - Shoptet/WooCommerce: sekce **Statistiky / Přehledy** nebo doplněk Google Analytics.
   - Vratky bývají v **Objednávky → Vrácení / Reklamace**.

4. **Náklady na zboží a dopravu:**
   - Náklad na zboží = nákupní cena (nebo materiál + práce u ruční výroby) na jeden kus.
   - Dopravu zjistíš z faktur od dopravce (Zásilkovna, PPL, Balíkovna) podělené počtem
     odeslaných objednávek za měsíc.

**Co s tím v AI:** Až čísla máš, vlož je sem nahoru místo odhadů. Nebo mi je nasdílej
takhle: *„Tady jsou data za poslední měsíc z GA4, Meta Ads a adminu e-shopu: [vlož].
Spočítej z toho diagnózu a porovnej mobil vs. počítač.“*

> **Bezpečnostní poznámka:** Když data kopíruješ do AI, nevkládej osobní údaje
> zákaznic (jména, e-maily, adresy). Stačí souhrnná čísla (počty, procenta, částky).
