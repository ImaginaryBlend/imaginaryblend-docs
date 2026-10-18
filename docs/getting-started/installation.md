# Installation & Configuration

Wymagane wtyczki w Unreal Engine:
- `UE Fab Plugin`
- `PythonScriptPlugin`
- `EditorScriptingUtilities`
- `GeometryScripting`
- `ProceduralMeshComponent`
- `Niagara`

## Wymagane ustawienia projektu (Project Settings)

| Ustawienie | Wartość | Opis / Powód |
| :--- | :--- | :--- |
| **DBuffer** | `Enabled` | Wymagane do prawidłowego renderowania dekali (mokrość i kaustyka). |
| **CustomDepth-Stencil Pass** | `Enabled` | Wymagane do renderowania map głębokości pod wodą. |
| **Velocity Pass** | `Write During Base Pass` | Poprawia renderowanie wektorów ruchu (*motion vectors*). |
| **Default Renderer Motion Vector** | `Precise` | Zwiększa dokładność wektorów ruchu. |
| **Mask material only in early Z-pass** | `False` | Wymagane do poprawnego przechwytywania tuneli. |
| **HighQualityTranslucencyReflections** | `Disabled` | Zapewnia stabilność przy współpracy z Substrate. |
| **r.OIT.SortedPixels** (config) | `Disabled` | Zapobiega błędom sortowania obiektów przezroczystych. |