# Řetězené prompty 🔗

Tyhle prompty **spolupracují**. Každý navazuje na výstup předchozího, takže na
konci máš celý plán postavení byznysu rozložený do souborů `01` až `06`.

## Dva způsoby, jak je použít

**A) Necháš to na AI agentovi (nejjednodušší).** Pokud tvoje AI umí číst tenhle
repozitář (Claude, Cursor, ChatGPT s nahranými soubory), řekni jí:

> *„Přečti AGENTS.md a kit.json a proveď mě řetězcem od kroku 1. Ptej se mě jen na
> to, co nevíš.“*

AI pak sama bere výstupy jedněch kroků do dalších.

**B) Krok po kroku ručně.** Otevři `01-persona.md`, zkopíruj, doplň `[závorky]`,
vlož do AI. Až máš výsledek, ulož si ho jako `01-persona.md`. U dalšího promptu
(`02-validace.md`) **vlož obsah `01` tam, kde to prompt říká.** A tak dál.

## Pořadí

```
01-persona  ─►  02-validace  ─►  03-platforma  ─►  04-launch-plan  ─►  05-marketing-plan  ─►  06-diagnostika
                     │                                                                              │
                     └── když STOP, vrať se a uprav 01 ──────────────────────────────────────┐    │
                                                                                              ◄────┘
            06 diagnostika tě podle nejslabšího článku vrací zpět na 01 (poptávka) nebo 05 (marketing).
```

## Pravidlo, které mění výsledek

**Vždy nech AI vědět, co už víš z předchozích kroků.** Čím konkrétnější vstup, tím
lepší rada. Obecné zadání = obecná (k ničemu) odpověď.
