# DaphneVlogs – Wereldkaart

Een donkere, interactieve 3D-wereldbol in de stijl van de meegestuurde screenshots.

## Wat zit erin

- **3D globe** – Donkere bol met landen als polygonen, subtiele blauwe atmosfeer
- **Interactie** – Klik op een land om het te selecteren (lichtblauwe highlight)
- **Informatiekaart** – Onderin verschijnt een kaart met landnaam, vlag en (voorbeeld) statistieken
- **Statistiekenpaneel** – “Van de wereld”, “Trips”, “Landen” en voorbeeldtrips (Poland, Ukraine)

## Lokaal draaien

Open het project het liefst via een lokale webserver (vanwege laden van GeoJSON en modules):

```bash
# Met Python 3
python3 -m http.server 8080

# Of met Node (npx)
npx serve -l 8080
```

Daarna in de browser: **http://localhost:8080**

Als je `index.html` direct opent (`file://`) kunnen het laden van de wereldbol en kaart door CORS fout gaan.

## Bestanden

- `index.html` – Paginastructuur, header, globe-container, stats-panel, landkaart
- `styles.css` – Donker thema, layout, kaartstyling
- `main.js` – Globe.gl-setup, Natural Earth GeoJSON, klik/hover en openen/sluiten van de landkaart

## Technieken

- **globe.gl** (ESM via esm.sh) voor de 3D-globe
- **Natural Earth** 110m countries als GeoJSON (via jsDelivr)
- **Flagcdn** voor vlaggen per land (ISO 2-letter code)
