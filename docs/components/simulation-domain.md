# Simulation Domain

Aktor domeny symulacji (`BP_FluxSimulationDomain`) to serce systemu **Fluid Flux**. Odpowiada za prowadzenie symulacji 2D płytkiej wody (*shallow-water fluid simulation*) w wyznaczonym obszarze, zarządzanie rozdzielczością siatki obliczeniowej oraz komunikację z modyfikatorami i powierzchnią renderującą.

## Kluczowe cechy i właściwości

- **Obobszar symulacji (Domain Bounds):** Określa trójwymiarowe granice, w których obliczana jest dynamika płynu.
- **Przechwytywanie podłoża (Ground Capture):** Automatycznie pobiera wysokość terenu i obiektów kolidujących znajdujących się pod powierzchnią symulacji.
- **Zapis i odczyt stanu (Fluid State):** Umożliwia zapisanie ustabilizowanej symulacji (np. wodospadu czy rzeki) i błyskawiczne wczytanie jej podczas startu gry bez konieczności oczekiwania na rozłanie się wody.

::: tip Wydajność
Rozmiar domeny oraz rozdzielczość tekstury symulacji mają bezpośredni wpływ na wydajność VRAM i GPU. Zaleca się stosowanie optymalnych wartości siatki w zależności od docelowych platform (PC / VR / Konsole).
:::

## Modyfikatory symulacji (Modifier Components)

Aktor domeny współpracuje z komponentami modyfikatorów, takimi jak:
1. **Source / Sink:** Dodaje lub usuwa wodę w określonym punkcie domeny.
2. **Force / Velocity Modifier:** Wprowadza siłę i nadaje kierunek przepływu cieczy (np. nurt rzeki).
3. **Wave Generator:** Generuje okresowe fale na powierzchni.
