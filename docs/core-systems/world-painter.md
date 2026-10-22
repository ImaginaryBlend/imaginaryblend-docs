# World painter

The `FluxWorldBrush` is a unique actor designed to manipulate data stored in the **WorldPainterComponent** canvas. The system offers three distinct types of canvas on which the `FluxWorldBrush` can perform painting operations:

- ColorPainter (`BP_FluxWorldPainter`) – interpolation between the base color and painter color.

  <MediaVideo src="/images/2023/05/2023-05-25-20-49-09.mp4" />

- WaveSize (`BP_FluxCoastlineDomain`) – interpolation between no wave and the highest wave.

  <MediaVideo src="/images/2023/05/2023-05-25-20-52-30.mp4" />

- WaveType (`BP_FluxWorldDomain`) – interpolation between the oceanic wave and the coastline wave.

  <MediaVideo src="/images/2023/05/2023-05-25-20-55-04.mp4" />

This two-minute tutorial presents the workflow and possibilities of brushes:

<YouTube id="jzR--W_gLDQ" />
