# World painter

The `FluxWorldBrush` is a unique actor designed to manipulate data stored in the **WorldPainterComponent** canvas. The system offers three distinct types of canvas on which the `FluxWorldBrush` can perform painting operations:

- ColorPainter (`BP_FluxWorldPainter`) – interpolation between the base color and painter color.

  <MediaVideo src="/images/2023/05/2023-05-25-20-49-09.mp4" />

- WaveSize (`BP_FluxCoastlineDomain`) – interpolation between no wave and the highest wave.

  <MediaVideo src="/images/2023/05/2023-05-25-20-52-30.mp4" />

- WaveType (`BP_FluxCoastlineDomain`) – interpolation between the oceanic wave and the coastline wave.

  <MediaVideo src="/images/2023/05/2023-05-25-20-55-04.mp4" />

This two-minute tutorial presents the workflow and possibilities of brushes:

<YouTube id="jzR--W_gLDQ" />

## How it works

Every actor that owns a canvas renders all `BP_FluxWorldBrush` actors placed on the level into its own low-resolution texture. A brush is drawn only on the canvas selected in its **Canvas** attribute, so brushes for color and for coastline waves can be placed in the same area without affecting each other.

| Canvas | Painted by | Result |
| --- | --- | --- |
| `BP_FluxColorPainter` | `BP_FluxWorldPainter` | Blends the surface color from **BaseColorPreset** to **PainterColorPreset**. |
| `BP_FluxWaveScale` | `BP_FluxCoastlineDomain` | WaveSize – scales the height of the coastline waves. |
| `BP_FluxCoastErase` | `BP_FluxCoastlineDomain` | WaveType – replaces the coastline wave with the oceanic wave. |

The brush shape is a rectangle defined by the brush actor transform:

- **Location** – the center of the brush.
- **Scale X/Y** – the size of the brush area.
- **Rotation** – only the yaw rotation is used; pitch and roll are reset automatically.

Moving or editing a brush in the editor repaints all canvases immediately. When you move a brush at runtime, call the **Repaint** function on the brush to refresh the canvases.

## Painting the water color

1. Add `BP_FluxWorldPainter` to the level and place it in the center of the area you want to paint.
2. Adjust **AreaResolution** and **AreaPixelSize** so that the painter area covers the whole region (enable **DrawDebug** to see the canvas preview).
3. Select the surface actor and set **ScenePainterActor** to the newly added `BP_FluxWorldPainter`.
4. Set **PainterColorPreset** in the surface actor. This preset is used in the painted areas; **BaseColorPreset** is used everywhere else.
5. Add `BP_FluxWorldBrush` to the level, set **Canvas** = `BP_FluxColorPainter` and scale it to cover the area that should change color.

## Painting the coastline waves

The coastline domain owns its own canvases, which cover the domain area, so no additional painter actor is required.

1. Configure `BP_FluxCoastlineDomain` (see [Coastline Domain](/core-systems/coastline-domain)).
2. Add `BP_FluxWorldBrush` inside the domain area.
3. Set **Canvas** = `BP_FluxWaveScale` to change the wave size or `BP_FluxCoastErase` to change the wave type.
4. Adjust **TargetValue**, **ShapeHardness** and the brush scale until the waves look right.

The painted canvases are baked into the coastline map, so they are also stored in the exported **CoastlineState**.

## Brush attributes

| Attribute | Description |
| --- | --- |
| **TargetValue** | Value painted on the canvas (0–1). For color: 0 – base color, 1 – painter color. For wave size: 0 – no wave, 1 – the highest wave. For wave type: 1 – oceanic wave. |
| **BlendAdditive** | How the brush is blended with other brushes: 1 – the value is added, 0 – the brush replaces the value under it. |
| **ShapeHardness** | Softness of the brush edge. Higher values give a sharper edge; the inner debug box shows the fully painted part of the brush. |
| **ShapeRoundness** | Rounds the corners of the rectangular brush shape. |
| **Canvas** | The canvas the brush paints on: `BP_FluxColorPainter`, `BP_FluxWaveScale` or `BP_FluxCoastErase`. |

## Painter attributes

| Attribute | Description |
| --- | --- |
| **AreaResolution** | Resolution of the painter canvas texture (default 16 × 16). |
| **AreaPixelSize** | World size of one canvas pixel (default 1000). The painted area is AreaResolution × AreaPixelSize. |
| **DrawDebug** | Displays the canvas preview in the level. |

::: info
The painter canvas is a low-resolution texture blended smoothly across the surface. It is designed for large, soft color transitions, not for detailed shapes. Increase **AreaResolution** only when you need more precise borders.
:::
