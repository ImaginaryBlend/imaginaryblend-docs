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
- `docs/index.md` – strona główna „Features” (opis, pokaz zdjęć, lista funkcji, trailer, demo)
- `docs/introduction/` – Fluid Flux: `limitations.md`, `performance.md`, `faq.md` (`index.md` i `features.md` tylko przekierowują na stronę główną)
- `docs/getting-started/` – Getting started: `installation.md`, `project-settings.md`, `updating.md`, `tutorials.md`
- `docs/compatibility/` – Compatibility: `index.md` (przekierowanie do Limitations → Compatibility), `substrate.md`, `multiplayer.md`, `open-world.md`, `platforms.md`, `plugins.md`
- `docs/guide/` – Documentation (Core systems): project-structure, player-character, buoyancy, surface-actor, interactions, ground-capture, simulation-domain, coastline-domain, glass-system
- `docs/showcase/` – Showcase: `index.md` (filmy, galeria, gry; `videos.md`, `gallery.md`, `games.md` tylko przekierowują)
- `docs/release-notes/` – `index.md` (aktualizacje i roadmapa), `3-0.md`, `2-0.md`, `1-1.md`
- `docs/support/` – `index.md` (kontakt, zgłaszanie błędów, refund policy), `license.md` (licencje), `refund-policy.md`, `reporting-bugs.md`
- `docs/.vitepress/config.mjs` – menu, linki, nazwa strony
- `docs/.vitepress/theme/` – komponenty `<YouTube />` i `<MediaVideo />` oraz style
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
- Brakuje obrazka `docs/public/images/help-panel-toggle-visible.png` (zrzut węzła ToggleVisible w „begin play" FluidFluxPlayerController). Po dodaniu pliku usuń znaczniki `<!--` i `-->` w `docs/guide/player-character.md` (sekcja „Disabling the help panel").
