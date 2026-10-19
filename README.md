# Fluid Flux Documentation (VitePress)

Dokumentacja Fluid Flux przeniesiona z WordPressa. Treść jest w plikach Markdown w folderze `docs/`.
Strona: https://grackomi-sys.github.io/fluid-flux-docs/

## Uruchomienie lokalnie
1. Zainstaluj Node.js (wersja 20 lub nowsza).
2. W folderze projektu: `npm install`
3. Podgląd na żywo: `npm run docs:dev` i otwórz http://localhost:5173/fluid-flux-docs/
4. Zatrzymanie podglądu: Ctrl+C

## Struktura
- `docs/*.md` – podstrony (introduction, player-character, surface-actor, ground-capture, simulation-domain, coastline-domain, glass-system)
- `docs/index.md` – strona główna
- `docs/.vitepress/config.mjs` – menu, linki, nazwa strony
- `docs/.vitepress/theme/` – komponenty `<YouTube />` i `<MediaVideo />` oraz style
- `docs/public/images/` – wszystkie obrazki i filmy
- `scripts/` – pomocnicze skrypty

## Edycja treści
- Otwórz dowolny plik `.md` i edytuj tekst. Podgląd odświeża się sam.
- Obrazek: wrzuć plik do `docs/public/images/` i dodaj `![opis](/images/nazwa.png)`.
- Film z YouTube: `<YouTube id="ID_FILMU" />`
- Film mp4: wrzuć plik do `docs/public/images/` i dodaj `<MediaVideo src="/images/nazwa.mp4" />`
- Nowa podstrona: utwórz plik `.md` w `docs/` i dopisz go w `sidebar` w `docs/.vitepress/config.mjs`.
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

## Do uzupełnienia
- Brakuje obrazka `docs/public/images/help-panel-toggle-visible.png` (zrzut węzła ToggleVisible w „begin play" FluidFluxPlayerController). Po dodaniu pliku usuń znaczniki `<!--` i `-->` w `docs/player-character.md` (sekcja „Disabling the help panel").
