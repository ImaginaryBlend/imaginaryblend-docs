# Surface actor

The **BP_FluxSurface** actor is an abstract class generalizing an audiovisual representation of the simulation and coastline domain data. By default, this actor can’t be placed in the level, as it is only an abstract class designed as a template that should be configured.

> An **abstract** actor is like a guide for creating new actors. It defines some common features that all related classes should have, but it’s not complete on its own. Other classes need to finish the details. For example, an abstract class may not specify any ambient water audio, but a customized ocean template has sounds that match the type of water it represents.

The surface actor implements a list of advanced subsystems:

| Actor component | Features |
| --- | --- |
| DecalCausticsWet | caustics decal<br>surface wetness decal |
| SurfaceOverMesh | surface mesh<br>surface scattering<br>surface foam<br>surface detail advection |
| Post-Process | underwater postprocess<br>underwater waterline |
| SurfaceUnderMesh | underwater surface |
| SurfaceProceduralMesh | Generating procedural static mesh |
| FluxAudioComponent | Analyzing the fluid surface for the audio source |
| Volume Absorption, Volume Scattering | Rendering underwater fog and absorption volume |

The **BP_FluxSurface** is an abstract base parent class, meaning it can’t be placed directly on a level. Configuring all these subsystems can be time-consuming, particularly for new users. This is why the package includes basic, configured surface child actor templates, which can be found in the **FluidFlux/Surface/Templates** folder.

| Template | Description |
| --- | --- |
| BP_FluxSurface_Water | The default water surface is spawned dynamically within the domain.<br>SurfaceActorReference is not specified. |
| BP_FluxSurface_River | Simple river/waterfall material and basic underwater post-process, river audio |
| BP_FluxSurface_Ocean | Advanced ocean materials, ocean audio, materials blended with wave actor, underwater mesh, underwater scattering, and absorption volume. |
| BP_FluxSurface_Coastline | Rendering two domains, simulation, and coastline at the same time. |

Users can also implement their surface templates and extend the surface’s functionalities.

The surface actor does not have any data to render, meaning that simulation or coastline domains must send it to the actor by setting the **SurfaceActorReference**. The **SurfaceActorReference** attribute in the **Domain** actor you use (SimulationDomain or CoastlineDomain) should reference the surface actor that will render the data. Otherwise, the domain will spawn a temporary water surface that can’t be configured by hand.

## Interaction system

The **BP_FluxInteractionCapture** is designed to add efficient, detailed interaction simulations in small areas around the camera (or specified object).

- It is a great addition that can improve the look of baked simulation for almost no cost.
- It currently supports the most straightforward fast ripple solver, but plans are in place to simulate a fluid pressure solver in the future.

The interaction system configuration is demonstrated in several example blueprints within the Fluid Flux demo, including **BP_DemoCharacter**, **BP_FluxBoat**, **and** **BP_FluxCrate**.

A detailed explanation of the implementation presented in **BP_DemoCharacter** can be found below:

1. **Component.BP_FluxDataComponent** – This component reads the fluid data required for further interaction calculations, including height and velocity. You can find more information about this component and its configuration in the *‘Async Readback’ section*.

2. **Component.BP_FluxInteractionComponent** – This component stores a list of **interaction sources**. The **interaction source** is a sphere attached to the component (or skeletal mesh bone) that generates waves after interacting with fluid.

   ![](/images/2021/09/foot.jpg)

   *Configuration of interaction surface attached to l_foot bone. The system uses owner skeletal component with the tag “FluxInteractionOwner”.*

3. Attach interaction sources to the **mesh** (skeletal or static) with the tag specified in the **OwnerComponentTag** attribute. Hence, adding this tag (FluxInteractionOwner) to the skeletal mesh that will move the interaction sources is essential.

   ![](/images/2021/09/tag.png)

4. The **BPI_FluxInteraction** interface handles communication between the actor and the interaction capture system. It should be added to the **Class Settings** of the actor that will interact.

   ![](/images/2021/09/interfaceinter.jpg)

   *Player character interfaces*

5. Implement the **GetInteractions** in **BPI_FluxInteraction.** When **BP_FluxInteractionCapture** is an overlapping interactive actor, it calls the GetInteractions function to retrieve information about the interactions that are occurring.

   ![](/images/2021/09/interaction.png)

   *Simple implementation of the GetInteractions function from the BPI_FluxInteraction interface.*

6. The **BP_FluxInteractionCapture** actor is placed on every map. The actor detects the interactable actors and manages the whole process of generating the interaction effect. The **InteractionCapture** actor uses the **overlap** to identify actors within the interaction actor’s area. This mechanism ensures that only the area’s actors are considered potential sources of interaction. For example, a character uses the Capsule component for overlap; custom actors require the addition of a collision component, such as SphereCollision.

> There are many steps to do before interaction start working but no worries you can debug and make sure that every part of your implementation works correctly:
>
> 1. Test it on demo maps at first
> 2. Enable DrawDebug in BP_FluxInteractionCapture
> 3. Enable DebugDraw in BP_FluxDataComponent
> 4. Enable DebugDraw in BP_FluxInteractionComponent
> 5. Make sure that “GetInteractions” is evaluated. Put a breakpoint in this function to check. If its not then your actor is not detected by overlap with **InteractionCapture** and you may have to add collision volume to your actor.

Interactions with a fluid surface can generate splashes, adding realism and immersion to the simulation. This is achieved through a straightforward mechanism that detects when the interaction source intersects the fluid surface. If this condition is met, the system creates a splash effect to simulate the disturbance caused by the interaction.

![](/images/2021/09/sourcesplash-1.png)

*Communication between interaction component and surface actor.*

The **InteractionComponent->Source->SplashType** defines the splash index stored in the **Surface->InteractionSplashes** array.

## Color presets

The color preset system is a powerful tool for effortlessly configuring the visual aspects of water. It offers a range of predefined presets, eliminating the need to create new material instances to modify scattering and absorption.

> Before starting to change the color of the water, make sure the surface is configured correctly. The **SurfaceActorReference** attribute in the **Domain** actor you use (SimulationDomain or CoastlineDomain) should reference your surface actor. Otherwise, the domain will spawn a temporary water surface that can’t be configured by hand.

**Changing surface color:**

1. Select the surface actor on your map.
2. Find MeshRendering Tab and attributes: **BaseColorPreset.**
3. You can use any preset from my list of predefined colors or create a duplicate and modify it.

<MediaVideo src="/images/2023/05/2023-05-25-19-34-38.mp4" />

**Creating new custom color preset data asset:**

Many pre-configured color presets are available for oceans, shallow water, and rivers. Additionally, users can create their water presets by duplicating existing examples and adjusting the parameters as desired, allowing for seamless customization and experimentation.

1. In the Content Browser, open the folder /FluidFlux/Content/FluidFlux/Surface/Templates/Color/
2. Find a data asset preset closest to the effect you want.
3. Duplicate the chosen data asset
4. Set the data asset to the surface rendered on your map (attribute BaseColorPreset)
5. Open data assets and edit parameters:

   ![](/images/2021/09/data-asset.png)

**Modifying Color Presets with Editor Preview**

As you may notice, editing the Color Preset through the Surface Actor does not automatically update the surface itself. This is because data assets cannot communicate with the surface actor in a way that allows them to broadcast changes directly.

To solve this, Fluid Flux provides a dedicated tool called **OpenSurfaceEditorTab**, designed specifically for editing Color Presets applied to the surface with live editor preview.

You can find and run this tool from the **Details** panel of the selected Surface Actor.

> If **OpenSurfaceEditorTab** does not appear after clicking the button, make sure the **Python** plugin is enabled in your project settings under **Edit > Plugins**. It is required for opening editor tabs.

![](/images/2025/01/editor2.jpg)

Using the new editor is straightforward:

1. Select the Color Preset from the Surface that you want to edit.
2. Expand the **Settings** parameter section and make your changes.
3. When you are done, click **Save Asset**.
4. To import data from another data asset, use **Import From Content**.

## World painter and brush

The FluxWorldBrush is a unique actor designed to manipulate data stored in the **WorldPainterComponent** canvas. The system offers three distinct types of canvas on which the FluxWorldBrush can perform painting operations:

- ColorPainter ( BP_FluxWorldPainter), interpolation between the base color and painter color.

  <MediaVideo src="/images/2023/05/2023-05-25-20-49-09.mp4" />

- WaveSize (BP_FluxCoastlineDomain), interpolation between no wave and the highest wave.

  <MediaVideo src="/images/2023/05/2023-05-25-20-52-30.mp4" />

- WaveType (BP_FluxWorldDomain), interpolation between Oceanic wave and coastline wave

  <MediaVideo src="/images/2023/05/2023-05-25-20-55-04.mp4" />

This two-minute tutorial presents the workflow and possibilities of brushes:

<YouTube id="jzR--W_gLDQ" />

## Reading fluid data

The Fluid Flux utilizes Niagara **asynchronous readback events** to retrieve data from fluid render targets and pass it to blueprints. The Fluid Flux uses this feature in multiple situations:

- buoyancy and floating objects
- automatic dam breaking
- interaction detection
- swimming system
- fluid sound source analyzer
- underwater camera detection
- spawning splashes

There are examples of actors that are presenting the functionality of FluxDataComponent:

- Demo/Environment/**BP_FluxDataReadbackExample** – Basic data component test: reading water information and rendering an arrow of direction on the surface of water.
- Demo/Environment/**BP_FluxRotatorActor** – Rotating wheel reading the data from water under the mesh.
- Demo/Environment/**BP_FluxBoatPawn** – Advanced use case that reads multiple readback locations automatically sent by the buoyancy component. As a result, it generates water samples at all locations.

The current water state at the readback location is read from the GPU and stored in component attributes:

- **Flux Surface Location** – The location on the water surface.
- **Flux Fluid Velocity** – Velocity of water on the surface.
- **Flux Fluid Height** – Height of the water (relative to ground) may be incorrect in the open ocean, where the ground height map does not exist in the system.

The **BP_FluxDataComponent** listener samples water at a specific location (Readback Locations) relative to the owner component specified by **OwnerComponentTag** and **OwnerSocketName** in the case of skeletal meshes.

![](/images/2021/09/readback-owner.jpg)

By default, the component reads data from the fluid in every frame; however, for optimization, it can be configured to refresh with a lower frequency using the **ReadbackEventInterval** parameter.

Users can also bind to the event dispatcher **OnReceiveParticleData** to get the event every time the system receives data from Niagara.

> Use **Debug** option in FluxDataComponent to make sure that component is following your actor and sampling proper values.

## Niagara integration

The Niagara integration is based on three elements:

1. **BP_FluxNiagaraActor** communicates with the simulation and sends data to the Niagara system.
2. **NE_FluxData** emitter should be inherited by the Niagara system to read the data.

   ![](/images/2021/09/niagara.jpg)

3. NMS_FluxData is a specialized module that extracts simulation data from **Stage Transients** variables to drive the particles.

   ![](/images/2021/09/stagetrans.jpg)

All particle systems (trash, plants, splashes) in the pack are constructed similarly; feel free to check and modify the examples.

## Translucency

Rendering underwater translucents is, in general, a challenging problem to solve. Single-layer water materials do not support translucency, so translucents are invisible when watching surfaces from above the water.

In general, I recommend using dithering instead of translucency.

The underwater volume post-process implementation is more functional because it can be overlaid with translucent meshes. This means that a translucent mesh is rendered on top of the post-process volume, but developers must handle the fading.

![](/images/2021/09/fade.jpg)

*Example translucent mesh fading implementation.*

Final effect:

<MediaVideo src="/images/2021/09/2023-12-13-19-51-17.mp4" />

## Cut the mask and holes

Generally, the system supports two methods for cutting holes in the water surface.

The first method is somewhat complex and is designed for small boats. Look at the example boat mesh (Demo/Environment/Boat/SM_Boat) that uses an additional cap mesh with the M_FluxSurfaceInvisible material. The M_FluxSurfaceInvisible renders translucent materials using the Single Layer Water mode, which overrides the water surface and makes it invisible.

![](/images/2021/09/boat.jpg)

The second method for cutting holes requires the **BP_SurfaceCutMask** actor, which defines the rectangular area to remove. Unfortunately, only one cut mask per surface actor is currently supported.

<MediaVideo src="/images/2023/05/2023-06-06-11-39-21.mp4" />

1. Drag and drop the **BP_SurfaceCutMask** actor into an area where you want to cut out the water.
2. Select the **BP_FluxSurface** actor in your level and set the newly created actor to the **CutMaskActor** attribute.

   ![](/images/2021/09/cutmask.jpg)

   *Example cut mask implementation presented on the FluxBeachMap.*
