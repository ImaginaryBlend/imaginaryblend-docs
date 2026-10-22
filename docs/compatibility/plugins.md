# Third-party plugins

## Voxel Plugin

Fluid Flux can be used in combination with the **Voxel Plugin**, but it is also limited to heightfield projection, so caves and planets are unsupported.

<YouTube id="vJLU2CLuyNg" />

Use `Simulation.RuntimeCaptureDelay` = 1.0 to force the simulation to wait for the voxel plugin map to generate a mesh before rendering it to the height map.
The heightmap in this presentation is updated every frame using **CaptureGroundHeightmap**. It is inefficient and should probably be optimized to update the area around the brush only when something changes on the map. The **UpdateGroundMap**(Position, Size) function would be a better choice.

## Water Plugin

Water Plugin is not supported. Combining my water material with the water plugin mesh is possible, but not officially supported.

## ALS, UDS, Fluid Ninja and other packs

I plan to work on some integrations in the future. If you have a specific pack in mind, let me know.

Adding swimming to a custom character such as ALS heavily depends on the character implementation. The Fluid Flux `BP_FluxDataComponent` delivers all the data you need to implement swimming, and `BP_FluxSwimmingComponent` is an example implementation for the default engine mannequin. See [Player character → Swimming component](/core-systems/player-character#swimming-component).
