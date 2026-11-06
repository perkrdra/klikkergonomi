# Klikkergonomi

Norsk nettside om musevaner og en planlagt Windows-app. Ingen rammeverk eller avhengigheter kreves for nettsiden.

## Lokalt

Kjør `python3 -m http.server 8000 --directory public` og åpne http://localhost:8000.

## Hosting

Målet er Cloudflare Workers Static Assets med GitHub-tilkobling til dette repositoryet. Nettsidens filer ligger i `public/`. Cloudflare-konfigurasjon og produksjonsadresse legges til når kontoen er koblet til. Ingen produksjonsutrulling er gjort ennå.

## Demo

Demoen teller museknapptrykk og summerer avstand mellom musepekerens posisjoner i målefeltet. Den starter bare ved aktiv handling og sender eller lagrer ingen data. Avstand er CSS-skjermpiksler, ikke meter. Berøring teller ikke som museaktivitet.

## Windows-app (planlagt)

En separat app må bruke Windows-input for å måle på tvers av programmer. Fysisk avstand må anslås fra rå musedata med brukerens kalibrering; skjermpiksler gir ikke fysisk museavstand. Daglige summer, start/pause, datolagring lokalt og tydelig sletting bør inngå i første versjon. Appen er foreløpig ikke implementert. Nettsiden har derfor ingen nedlastingsknapp.
