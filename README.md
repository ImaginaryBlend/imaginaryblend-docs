# Fluid Flux Documentation (VitePress)

Dokumentacja Fluid Flux przeniesiona z WordPressa. Treść jest w plikach Markdown w folderze `docs/`.
Strona: https://imaginaryblend.github.io/imaginaryblend-docs/
## Uruchomienie lokalnie
Najprościej: kliknij dwukrotnie `start-docs.bat` – zainstaluje zależności (tylko za pierwszym razem), uruchomi podgląd i otworzy stronę w przeglądarce. Zamknięcie okna zatrzymuje serwer.

Ręcznie:
1. Zainstaluj Node.js (wersja 20 lub nowsza).
2. W folderze projektu: `npm install`
3. Podgląd na żywo: `npm run docs:dev` i otwórz http://localhost:5173/imaginaryblend-docs/
4. Zatrzymanie podglądu: Ctrl+C

## Struktura
Foldery odpowiadają menu po lewej stronie.

**Dział Fluid Flux** (logo w górnym pasku)
- `docs/index.md` – Product → Overview (strona startowa: logo i tytuł, opis z wersjami silnika, przyciski Fab/demo, pokaz zdjęć, przewijany pasek „Made with Fluid Flux” – lista w `theme/UsedIn.vue`, kafelki z odsyłaczami)
- `docs/product/` – Product: `showcase.md` (funkcje, demo, filmy, galeria, gry), `performance.md`, `limitations.md`, `faq.md`
- `docs/purchase/` – Purchase: `license.md`, `refund-policy.md`
- `docs/updates/` – Release Notes: `index.md` (wersje i plany), `3-0.md`, `2-0.md`, `1-1.md`

**Dział Documentation**
- `docs/getting-started/` – Getting started: `installation.md`, `project-settings.md`, `updating.md`, `tutorials.md`
- `docs/core-systems/` – Core systems: project-structure, player-character, buoyancy, surface-actor (+ color-presets, world-painter, reading-fluid-data, niagara-integration, translucency, cut-mask-and-holes), interactions, ground-capture, simulation-domain, coastline-domain, glass-system
- `docs/compatibility/` – Compatibility: substrate, multiplayer, open-world, platforms, plugins
- `docs/help/` – Help: `troubleshooting.md` (typowe problemy), `support.md` (kontakt), `reporting-bugs.md` (zgłaszanie błędów i minimal project), `bug-report-form.md` (formularz zgłoszenia, ukryty – wyłączony w `srcExclude` w `config.mjs`, komponent `theme/BugReportForm.vue`)

**Pozostałe**
- `docs/.vitepress/config.mjs` – menu, linki, nazwa strony
- `docs/.vitepress/theme/` – komponenty, style i skrypty (m.in. `redirects.mjs` – przekierowania ze starych adresów)
- `docs/.vitepress/theme/icons.css` – ikonki w menu i kafelkach; w kafelku dopisz klasę po linku, np. `[**Tytuł**<br>opis](/adres){.i-rocket}`
- `docs/public/images/` – wszystkie obrazki i filmy
- `scripts/` – pomocnicze skrypty

## Edycja treści
- Otwórz dowolny plik `.md` i edytuj tekst. Podgląd odświeża się sam.
- Obrazek: wrzuć plik do `docs/public/images/` i dodaj `![opis](/images/nazwa.png)`.
- Film z YouTube: `<YouTube id="ID_FILMU" />`
- Film mp4: wrzuć plik do `docs/public/images/` i dodaj `<MediaVideo src="/images/nazwa.mp4" />`
- Nowa podstrona: utwórz plik `.md` w odpowiednim folderze w `docs/` i dopisz go w `sidebar` w `docs/.vitepress/config.mjs`.
- Uwaga (VitePress): nieistniejący plik obrazka przerywa budowanie strony. Przed publikacją uruchom `npm run check`, który pokazuje brakujące pliki.

## Praca z AI (Claude Code / Codex)
Otwórz folder projektu w narzędziu i podawaj zasady, np.:
„Nie tłumacz, nie streszczaj i nie poprawiaj literówek w treści. Zmieniaj tylko to, o co proszę.”
Po zmianach sprawdź `git diff` / zakładkę Changes w GitHub Desktop.

## Publikacja zmian
1. (opcjonalnie) sprawdź budowanie: `npm run docs:build`
2. GitHub Desktop: wpisz Summary, **Commit to main**, **Push origin**
3. GitHub → zakładka **Actions**: poczekaj na zielony przebieg (ok. 1 minuty)
4. Odśwież stronę (Ctrl+F5)

## Obrazki ze starego WordPressa
Jeśli wkleisz treść z imaginaryblend.com z linkami do `wp-content/uploads`, uruchom `npm run assets` – skrypt pobierze pliki do `docs/public/images/` i przepisze linki na lokalne. Potem `npm run check`.

## Do uzupełnienia
- Brakuje obrazka `docs/public/images/help-panel-toggle-visible.png` (zrzut węzła ToggleVisible w „begin play" FluidFluxPlayerController). Po dodaniu pliku usuń znaczniki `<!--` i `-->` w `docs/core-systems/player-character.md` (sekcja „Disabling the help panel").
