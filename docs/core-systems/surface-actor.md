# Surface actor

The `BP_FluxSurface` actor is an abstract class generalizing an audiovisual representation of the simulation and coastline domain data. By default, this actor can’t be placed in the level, as it is only an abstract class designed as a template that should be configured.

::: warning
An **abstract** actor is like a guide for creating new actors. It defines some common features that all related classes should have, but it’s not complete on its own. Other classes need to finish the details. For example, an abstract class may not specify any ambient water audio, but a customized ocean template has sounds that match the type of water it represents.
:::

The surface actor implements a list of advanced subsystems:

| Actor component | Features |
| --- | --- |
| DecalCausticsWet | caustics decal<br>surface wetness decal |
| SurfaceOverMesh | surface mesh<br>surface scattering<br>surface foam<br>surface detail advection |
| Post-Process | underwater post-process<br>underwater waterline |
| SurfaceUnderMesh | underwater surface |
| AudioComponent | Analyzing the fluid surface for the audio source |
| Volume Absorption, Volume Scattering | Rendering underwater fog and absorption volume |

The `BP_FluxSurface` is an abstract base parent class, meaning it can’t be placed directly on a level. Configuring all these subsystems can be time-consuming, particularly for new users. This is why the package includes basic, configured surface child actor templates, which can be found in the **FluidFlux/Surface/Templates** folder.

| Template | Description |
| --- | --- |
| `BP_FluxSurface_Water` | The default water surface is spawned dynamically within the domain.<br>SurfaceActorReference is not specified. |
| `BP_FluxSurface_River` | Simple river/waterfall material and basic underwater post-process, river audio |
| `BP_FluxSurface_Ocean` | Advanced ocean materials, ocean audio, materials blended with wave actor, underwater mesh, underwater scattering, and absorption volume. |
| `BP_FluxSurface_Coastline` | Rendering two domains, simulation, and coastline at the same time. |

Users can also implement their own surface templates and extend the surface’s functionalities.

The surface actor does not have any data to render, meaning that simulation or coastline domains must send it to the actor by setting the **SurfaceActorReference**. The **SurfaceActorReference** attribute in the **Domain** actor you use (SimulationDomain or CoastlineDomain) should reference the surface actor that will render the data. Otherwise, the domain will spawn a temporary water surface that can’t be configured by hand.

## Subsystems

Each part of the surface actor is described on its own page:

<div class="link-cards">

[**Color presets**<br>Predefined water looks – scattering and absorption without new material instances.](/core-systems/color-presets){.i-palette}
[**World painter**<br>Paint color, wave size and wave type on the water with brush actors.](/core-systems/world-painter){.i-brush}
[**Reading fluid data**<br>Read water height, velocity and depth in blueprints with async readback.](/core-systems/reading-fluid-data){.i-gauge}
[**Niagara integration**<br>Drive Niagara particles with fluid data – plants, debris and bubbles.](/core-systems/niagara-integration){.i-sparkles}
[**Translucency**<br>Render translucent objects together with the water surface and underwater.](/core-systems/translucency){.i-glass}
[**Cut the mask and holes**<br>Remove water from boats, buildings and other areas.](/core-systems/cut-mask-and-holes){.i-scissors}

</div>
