# Coastline Domain

Aktor domeny linii brzegowej (`BP_FluxCoastlineDomain`) służy do generowania dynamicznych danych brzegowych dla powierzchni oceanów oraz dużych zbiorników wodnych. Umożliwia precyzyjne odtworzenie załamywania się fal przy brzegu, piany oraz interakcji z ukształtowaniem terenu.

## Kluczowe funkcje i możliwości

- **Coastline State:** Generuje i zapisuje wstępnie przeliczone dane o linii brzegowej, co pozwala na płynne renderowanie fal oceanicznych bez obciążania procesora w czasie rzeczywistym.
- **Mieszanie z symulacją (Ocean & Wave Blending):** Płynnie łączy statyczne/okresowe fale oceaniczne z dynamiczną symulacją 2D płytkiej wody w miejscach, gdzie gracz wchodzi w interakcję z wodą.
- **Piana brzegowa (Shore Foam):** Daje dostęp do parametrów kontrolujących gęstość, zanikanie oraz prądy porywające pianę przy brzegu.

::: tip Rozwiązywanie problemów (Solving Issues)
Upewnij się, że promień przechwytywania ukształtowania terenu pokrywa całą linię brzegową w obrębie domeny. W przypadku nietypowych klifów lub jaskiń warto dostosować wysokość przycinania (*Capture Height Bounds*).
:::
