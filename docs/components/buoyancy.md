# Buoyancy Component

`BP_FluxBuoyancyComponent` odpowiada za obliczanie fizycznej siły wyporu cieczy działającej na obiekty na podstawie konfiguracji z zasobu danych `PDA_FluxBuoyancyData`.

## Kluczowe cechy
- **Obsługa prądów i oporu:** Wykorzystuje prędkość płynu z symulacji do określania kierunku ruchu.
- **Dynamiczna zmiana parametrów:** Zasób danych (*Data Asset*) może być zmieniany w trakcie gry (np. dla tonącego statku).

## Przykłady użycia w klasach demo
1. `BP_FluxCrate` – Prosty obiekt z jednym pontonem.
2. `BP_FluxBoatPawn` – Kombinacja wielu pontonów podpiętych do Static Mesh.
3. `BP_DemoCharacter` – Postać w stanie Ragdoll unosząca się na wodzie.