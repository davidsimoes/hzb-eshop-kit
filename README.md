# E-shop, který vydělává 🛍️

> Otevřený nástroj a referenční kit pro spuštění e-shopu, který opravdu vydělává.
> Pro začínající podnikatelky (a kohokoli, kdo začíná). Od Davida Simõese pro
> komunitu **#HolkyzByznysu**.

**Web:** https://hzb.davidjose.net · **Licence:** [CC BY 4.0](LICENSE)

---

## 🇨🇿 Co to je

Tohle není kurz, který skončí a zapomeneš ho. Je to **živá reference**, která ti
zůstane — a kterou navíc můžeš „nakrmit“ vlastní AI (ChatGPT, Claude, Gemini),
aby ti radila konkrétně k tvému e-shopu.

Skládá se ze dvou částí:

1. **Web s nástroji** ([hzb.davidjose.net](https://hzb.davidjose.net)) — klikací,
   bez instalace:
   - **Ověř nápad** (`/validace`) — sestav personu a ověř, že o to někdo stojí.
   - **Kalkulačka** (`/kalkulacka`) — spočítej, jestli ti to vydělá, a kolik potřebuješ.
   - **Diagnostika** (`/diagnostika`) — „Co když to neprodává?“ Najde nejslabší článek.
   - **Checklist** (`/checklist`) — krok za krokem ke spuštění.

2. **Kit ke čtení i pro AI** — průvodci a prompty v jednoduchých textových
   souborech (`docs/`, `prompts/`). Můžeš si je přečíst, nebo je dát své AI a nechat
   si poradit na míru.

## 🤖 Jak to použít s AI (to nejlepší)

Celý kit je napsaný tak, aby ho zvládla jakákoli AI — žádné speciální nástroje.

**Nejjednodušší způsob:**
1. Otevři ChatGPT, Claude nebo Gemini.
2. Zkopíruj obsah souboru z `prompts/` (např. `prompts/validace-persony.md`) a vlož ho.
3. Doplň svoje informace a nech si poradit.

**Pro pokročilé (nakrm AI celým kitem):**
1. Stáhni si tenhle repozitář (zelené tlačítko **Code → Download ZIP**, nebo `git clone`).
2. Nahraj složku `docs/` do AI, která umí číst soubory (Claude Projects, ChatGPT
   s nahráním souborů, NotebookLM…).
3. Ptej se: *„Podle tohohle kitu mi poraď, jak…“* — AI bude radit v duchu téhle metody.

> Prompty v `prompts/` jsou napsané v běžné češtině. Klidně si je uprav.

<!-- AGENTNÍ VRSTVA, přidáno při restrukturalizaci „GitHub = agentní vrstva“ -->
## 🤖 Naval na to celou AI (klonování a krmení), pro netechnické

Tenhle repozitář je psaný tak, aby ho zvládla **jakákoli AI** (ChatGPT, Claude,
Gemini), klidně i bez instalace. Web je pro tebe (čteš, klikáš). Repozitář je pro
tvou AI (dostane z něj data, prompty a celý postup, jak ti pomoct stavět byznys).

### Co stáhnout
Nahoře na stránce repozitáře klikni na zelené **Code → Download ZIP** a rozbal ho.
(Nebo `git clone`, pokud umíš.) Důležité složky: `AGENTS.md`, `kit.json`,
`prompts/chain/`.

### ChatGPT
1. Otevři nový chat (ideálně s modelem, který umí nahrávat soubory).
2. Nahraj soubory `AGENTS.md`, `kit.json` a celou složku `prompts/chain/`
   (klidně i `docs/`).
3. Napiš: *„Přečti AGENTS.md a kit.json a proveď mě kitem od kroku 1. Ptej se mě
   jen na to, co nevíš.“*

### Claude
1. Použij **Claude Projects** (nebo nahraj soubory do chatu).
2. Přetáhni do projektu `AGENTS.md`, `kit.json` a `prompts/chain/`.
3. Napiš stejnou větu jako výš. Claude bude brát výstupy jedněch kroků do dalších.

### Gemini / NotebookLM
1. Nahraj soubory (Gemini umí přílohy; NotebookLM je dělaný přímo na čtení zdrojů).
2. Napiš: *„Tohle je kit ‚E-shop, který vydělává‘. Řiď se AGENTS.md, začni krokem 1
   a postupuj po krocích.“*

### Co z toho vznikne
AI tě provede řetězcem a pomůže ti vytvořit sadu souborů, které dohromady tvoří
tvůj plán postavení byznysu:

```
01-persona.md → 02-validace.md → 03-platforma.md → 04-launch-plan.md → 05-marketing-plan.md → 06-diagnostika.md
```

Ulož si je. Jsou tvoje a budeš se k nim vracet.

> Nechceš nic stahovat? Pořád můžeš zkopírovat jednotlivý prompt z `prompts/` a
> vložit ho do AI. Klonování celého kitu je jen pohodlnější, protože AI pak zná
> celý postup a navazuje kroky sama.

### 📁 Jak je repozitář rozdělený

| Vrstva | Kde | Pro koho |
|---|---|---|
| **Web** ([hzb.davidjose.net](https://hzb.davidjose.net)) | nasazená aplikace | **lidi**, čteš, klikáš na nástroje |
| **Lidská reference** | `docs/` | **lidi**, texty ke čtení |
| **Agentní vrstva** | `AGENTS.md`, `kit.json`, `prompts/chain/`, `prompts/connect-data.md` | **AI**, data, prompty a postup pro tvého asistenta |

## 📚 Obsah kitu (`docs/`)

| # | Téma | Soubor |
|---|------|--------|
| 0 | Začni tady (a strach ze startu) | [`docs/00-zacni-tady.md`](docs/00-zacni-tady.md) |
| 1 | Validace nápadu a persona | [`docs/01-validace.md`](docs/01-validace.md) |
| 2 | Výběr platformy | [`docs/02-vyber-platformy.md`](docs/02-vyber-platformy.md) |
| 3 | Spuštění, checklist a právní minimum | [`docs/03-spusteni-a-pravo.md`](docs/03-spusteni-a-pravo.md) |
| 4 | Marketing a značka | [`docs/04-marketing-a-znacka.md`](docs/04-marketing-a-znacka.md) |
| 5 | Provoz, finance a dodavatelé | [`docs/05-provoz-a-finance.md`](docs/05-provoz-a-finance.md) |
| 6 | Když to neprodává | [`docs/06-kdyz-to-neprodava.md`](docs/06-kdyz-to-neprodava.md) |
| 7 | Příběhy a inspirace | [`docs/07-pribehy.md`](docs/07-pribehy.md) |

Prompty pro AI: [`prompts/`](prompts/)

## 🎤 Pro lektora

Prezentace ke školení je na trase [`/prezentace`](https://hzb.davidjose.net/prezentace) —
ovládá se šipkami / mezerníkem, `N` přepíná poznámky lektora. Demo tlačítka přepnou
rovnou na živé nástroje.

## 🧭 Metoda v jedné větě

**Validace → Plán → Spuštění** — nejdřív ověř, že to někdo chce a že to vydělá,
pak naplánuj, pak spusť. AI ti pomáhá v každém kroku.

## ❤️ Komu patří dík

Kit vznikl pro webinář komunity **#HolkyzByznysu**. Sdílej ho dál — je to k tomu určené.

---

## 🇬🇧 In English

**E-shop that earns** — an open tool + reference kit for launching an e-commerce
store that actually makes money. Built for beginner (women) entrepreneurs by
David Simões for the Czech **#HolkyzByznysu** community.

It has two parts:

1. **A web app** ([hzb.davidjose.net](https://hzb.davidjose.net)) — no install:
   idea/persona **validation**, a viability **calculator**, a "why isn't it selling?"
   **diagnostic**, and a launch **checklist**.
2. **An AI-feedable kit** — plain-Markdown guides (`docs/`) and prompts (`prompts/`)
   that work with **any** LLM (ChatGPT, Claude, Gemini). Read them, or feed them to
   your AI for tailored advice.

**Content is in Czech** (the audience is Czech). The structure is agent-agnostic —
no Claude-specific tooling required.

**Use with AI:** copy a file from `prompts/` into your LLM and fill in your details,
or clone the repo and upload `docs/` to an LLM that reads files, then ask it to
advise "according to this kit."

**License:** [CC BY 4.0](LICENSE) — share and adapt with attribution. Brand names and
David's personal photos are excluded; replace them when adapting.

## 🛠️ Run locally (developers)

```bash
npm install
npm run dev      # http://localhost:8080
npm run build    # production build to dist/
```

Stack: Vite + React + TypeScript + Tailwind + shadcn/ui. Czech (single locale).
