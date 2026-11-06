# Klikkergonomi

Norsk nettside om musevaner og en planlagt Windows-app. Ingen rammeverk eller avhengigheter kreves for nettsiden.

## Lokalt

Kjør `python3 -m http.server 8000 --directory public` og åpne http://localhost:8000.

## Hosting

Nettsidens filer ligger i `public/`. `cloudflare/worker.mjs` leverer de tre filene som tekstmoduler med sikkerhetsheadere, og `cloudflare/metadata.json` angir kompatibilitetsdato og observability. Ved API-publisering sendes Worker-filen som JavaScript-modul, og filene fra `public/` som `text/plain`-moduler med sine originale filnavn. Dette krever ingen pakkeavhengigheter.

Cloudflare Worker: `klikkergonomi`. Produksjonsadresse: https://klikkergonomi.perkrdra.workers.dev. Automatisk publisering fra GitHub er ikke konfigurert; det krever et eget oppsett i Cloudflare Workers Builds eller CI.

## Demo

Demoen teller museknapptrykk og summerer avstand mellom musepekerens posisjoner i målefeltet. Den starter bare ved aktiv handling og sender eller lagrer ingen data. Avstand er CSS-skjermpiksler, ikke meter. Berøring teller ikke som museaktivitet.

## Windows-app (planlagt)

En separat app må bruke Windows-input for å måle på tvers av programmer. Fysisk avstand må anslås fra rå musedata med brukerens kalibrering; skjermpiksler gir ikke fysisk museavstand. Daglige summer, start/pause, datolagring lokalt og tydelig sletting bør inngå i første versjon. Appen er foreløpig ikke implementert. Nettsiden har derfor ingen nedlastingsknapp.
