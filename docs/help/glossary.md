---
outline: [2, 2]
---

# Glossary

Short explanations of the classes, data assets and terms used in this documentation. Class names with a dotted underline in the text show their description when you point at them (or tap them on a phone).

## Actors and components

| Term | Description |
| --- | --- |
| [`BP_FluxSimulationDomain`](/core-systems/simulation-domain) | Runs the shallow water simulation, captures the ground map and exports the simulation state. |
| [`BP_FluxCoastlineDomain`](/core-systems/coastline-domain) | Bakes the area around the coast into a coastline state used to render coastline waves. |
| [`BP_FluxSurface`](/core-systems/surface-actor) | Renders the water: surface, underwater post-process, caustics and audio. Use one of its templates. |
| [`BP_FluxOceanWave`](/core-systems/simulation-domain#configuration-step-by-step) | Ocean waves outside the simulation area, based on an animated 3D texture. |
| [`BP_FluxModifierComponent`](/core-systems/simulation-domain#modifier-component) | Base class of modifiers – components that change the simulation state. |
| [`BP_FluxModifierSourceComponent`](/core-systems/simulation-domain#modifier-component) | Adds or removes fluid and changes its velocity in an area. |
| [`BP_FluxModifierSourceActor`](/core-systems/simulation-domain#modifier-container) | Actor for placing a source modifier in the level. |
| [`BP_FluxModifierWaveActor`](/core-systems/simulation-domain#configuration-step-by-step) | Generates waves on the edges of the simulation domain. |
| [`FluxDataComponent`](/core-systems/reading-fluid-data) | Reads water height, velocity and surface location for blueprints. |
| [`FluxHeightmapComponent`](/core-systems/ground-capture) | Captures the ground map from above. Used by both domains. |
| [`BP_FluxBuoyancyComponent`](/core-systems/buoyancy) | Applies buoyancy, drag and current forces using pontoons. |
| [`FluxBuoyancyEditor`](/core-systems/buoyancy#buoyancy-editor) | Editor tool (EUW_FluxBuoyancyEditor) for editing pontoons in a 3D viewport. |
| [`BP_FluxInteractionCapture`](/core-systems/interactions) | Simulates ripples around the camera from overlapping interactive actors. |
| [`BP_FluxInteractionComponent`](/core-systems/interactions#setting-up-interactions) | Stores the interaction sources (spheres) that create waves. |
| [`BPI_FluxInteraction`](/core-systems/interactions#setting-up-interactions) | Interface of interactive actors. GetInteractions returns their interaction sources. |
| [`BP_FluxSwimmingComponent`](/core-systems/player-character#swimming-component) | Example swimming movement for the default mannequin. |
| [`BP_FluxDriverComponent`](/core-systems/player-character#vehicle-driver) | Lets the player character possess vehicles. |
| [`BP_FluxBuoyancyVehiclePawn`](/core-systems/player-character#vehicle-driver) | Template of a drivable vehicle, e.g. the demo boat. |
| [`BP_FluxNiagaraActor`](/core-systems/niagara-integration) | Sends simulation data to Niagara systems. |
| [`FluxWorldBrush`](/core-systems/world-painter) | Paints color, wave size or wave type on the water. |
| [`BP_FluxSurfaceMeshGenerator`](/core-systems/simulation-domain#mesh-generator) | Bakes a simulation state into a static mesh. |
| [`BP_SDFVolumeDomain`](/core-systems/glass-system#masking-surface) | Builds the SDF volume that cuts holes in the water surface. |
| [`BP_FluxGlassActor`](/core-systems/glass-system#glass-rendering) | Base class of underwater glass actors. |
| [`BP_FluxSurfaceCutMask`](/core-systems/cut-mask-and-holes) | Removes the water surface in a rectangular area. |

## Data assets

| Term | Description |
| --- | --- |
| [`PDA_FluxSimulationState`](/core-systems/simulation-domain#fluid-state) | Stores one frame of the simulation. |
| [`CoastlineState`](/core-systems/coastline-domain#coastline-state) | Stores the baked coastline data used by the surface. |
| [`PDA_FluxBuoyancyData`](/core-systems/buoyancy#implementation) | Pontoons and density settings of a floating body. |
| [`BaseColorPreset`](/core-systems/color-presets#changing-surface-color) | Surface attribute that selects the water color preset. |

## Attributes

| Term | Description |
| --- | --- |
| [`SurfaceActorReference`](/core-systems/surface-actor) | Domain attribute: the surface actor that renders the domain’s data. |
| [`AffectWorld`](/core-systems/simulation-domain#use-case-3-using-state-without-simulation) | Domain attribute. False disables the domain, so an exported state can be rendered directly. |
| [`IsEditorOnlyActor`](/core-systems/simulation-domain#use-case-3-using-state-without-simulation) | Engine flag that removes the actor from the final build. |
| [`RuntimeCaptureDelay`](/core-systems/ground-capture#ground-map-works-in-the-editor-but-it-breaks-in-the-build-or-at-runtime) | Delays the ground map capture at runtime until the level is loaded. |

## Terms

| Term | Description |
| --- | --- |
| [`Ground map`](/core-systems/ground-capture) | Height map of the scene that defines where water can flow. |
| [`Pontoon`](/core-systems/buoyancy#buoyancy-editor) | Sphere approximating part of a floating body. |
| [`SDF`](/core-systems/glass-system#masking-surface) | Signed distance field – a 3D texture with the distance to the nearest surface. |
| [`M_PhantomMesh`](/core-systems/ground-capture#visibility-options) | Material visible only to the ground capture. |
| [`MF_FluxPixelDepthOffset`](/core-systems/ground-capture#landscape-or-mesh-is-not-rendering-to-the-ground-map) | Disables Pixel Depth Offset during ground capture. |
