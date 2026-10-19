# Fluid Flux 3.0 Release Notes

## What’s New?

More effects, better performance! Is it even possible?

It’s been over a year since the last major update to Fluid Flux, and while I often call updates ‘big,’ this one truly stands out. The update 3.0 is massive, bringing significant improvements in performance, stability, and memory management, along with many new features and enhancements. So much has been added during development that I might struggle to list every improvement here—I honestly lost track somewhere along the way while adding all kinds of exciting new functionality!

<YouTube id="-py91uoMVNo" />

### Demo

The new demo is already available on [itchio.com](https://imaginaryblend.itch.io/fluid-flux). During the development, most of the focus was on improving maps and extending functionalities.

- The Island level received a crucial update with an underwater tunnel example.
- The beach map was changed to more rainy and foggy conditions to present new particle system integration and how Fluid Flux works in different weather conditions.
- The coastline map will work much faster now as performance has dramatically improved with new rendering optimizations.
- The ocean map was extended by the Large World Coordinate test and dynamic wind.
- SectionMap uses a new glass system instead of building in section mesh.

If you’re enjoying Fluid Flux, appreciate the update, and want to see more improvements like this in the future, I’d be grateful if you could leave a review. If you haven’t tried Fluid Flux yet, you can purchase it on [FAB](https://www.fab.com/listings/196c70cd-1283-4249-bf6b-c3019d1cbe11).

### Before updating your project

The new version only applies to Unreal Engine 5.3+ and higher, and there will not be any updates for the older engine versions.

All levels were updated, performance improved, and quality and reliability improved. Due to this update’s extensive scope, certain aspects might have been overlooked during the development and testing phases. To ensure a smooth transition, it is **strongly recommended that you make a copy of your project** before downloading the update.

Please read the detailed [Package Update/Installation Process](/installation-process).

## Underwater glass

The biggest and most spectacular feature of this product is the glass system. Example presentations generated millions of views on my X, and I believe many users will find even better, more spectacular use cases than mine.

The glass system is built on three cooperating mechanisms integrated with BP_FluxSurface actor:

1. **Masking surface** – The geometry of the glass volume is captured to SDF (signed distance field), and then the result is used to cut holes in the surface mesh.
2. **Filling holes with glass** – BP_FluxGlassActor can render any mesh as glass and sample water height to apply post-process effects like waterline refraction and absorption. You can use as many glass actors as you need, but be aware that calculating data about water requires heavy computations calculated per vertex. Glass meshes need to be quite dense to work correctly and also use multiple layers of transly1
3. **Lighting in the tunnel** – The volume mesh absorbs the light inside the tunnel to simulate underwater scenes lightened by watercolor.

Glass system still has many limitations:

- The whole Tunnel area should be covered by the SDF domain, which is 3d texture and may require a lot of memory when stretched on a large scale. I plan to address this limitation by implementing Virtual texturing in the future.
- Glass mesh can receive shadows. It’s translucent, so it’s mostly not noticeable, but it still sometimes may break the visual appearance.
- Baking spline mesh to SDF is slow and requires many additional steps, confusing new users. I plan to improve it by moving the whole implementation to Niagara.
- Cutting holes in the surface using the SDF may sometimes look imprecise; increasing resolution can fix those bugs but also exceed memory budgets.

The old fluid cross-section was removed from the surface actor. Use **BP_FluxGlassSection** (example on FluxSectionMap) to achieve the effect of the water volume cut. Moreover, the new glass rendering mode does not interfere with underwater surface rendering, and the base water shader has been simplified by removing Seciton branches.

![](/images/2024/11/glassvolume.png)

*Improved underwater volume and surface rendering in underwater section glass after upgrading to a new glass system.*

## Underwater light

Another long-awaited feature introduced in this version is **underwater lighting**. A New system simulating underwater scattering and working with single-layer water mode is a huge step forward in expanding the possibilities of building the underwater world. There are many ways how underwater lights can be used in your projects:

- underwater bathyscaphe,
- lights from a helicopter lighting the water,
- underwater lights directing the player,
- rivaling underwater cities,
- underwater diving with attached flashlights,

> Testing surface decals and attaching the spotlight. Maybe it’s time to add the bathyscaphe and helicopter? 🙂 #UnrealEngine #techart #vfx pic.twitter.com/evSrbJcOEE
>
> — Krystian Komisarek (@ImaginaryBlend) [June 4, 2024](https://twitter.com/ImaginaryBlend/status/1798003120997536074)

> This one is tricky!<br>
> – single static mesh per light<br>
> – disabled depth test<br>
> – ray-traced cone<br>
> – ray marched scattering (5 samples + blue noise)<br>
> – projected light texture<br>
> – screen normals used for simulating fake refraction xD #UnrealEngine #techart #vfx pic.twitter.com/5EFWmHL5qL
>
> — Krystian Komisarek (@ImaginaryBlend) [May 18, 2024](https://twitter.com/ImaginaryBlend/status/1791630647871627402)

The underwater light system brings many exciting features:

- Efficient **point light** implementation (BP_FluxPointLight )
- Advanced **spotlights** (BP_FluxSpotLight) implemented as volume ray marching with dithering. Support projecting texture and generating light shafts.
- Light propagation medium water and air splits the light into two colors.
- Integration with built-in unreal light system shadow mapping
- An unlimited number of lights. The system used a system similar to deferred rendering that is drawing lights as meshes
- Nonphysically correct but controllable scattering and projection intensity provide more variety and allow adjustments.
- The system can be used with underwater glass.

## Water decal

This feature was added at the request of the user who needed to render decals on water. (Yes, you can have an impact on this project!). After a few tests, I noticed that it is doable and may be valuable for many projects. The new decal actor (BP_FluxDecal) uses unique programmable material that can be implemented in many different ways based on the requirements of the designer; it provides additional functions that generate Decal UV projection and information about the side of the water currently rendered.

<MediaVideo src="/images/2024/11/2024-11-18-12-56-41.mp4" />

The default example decal material uses the Fluid Flux icon texture, but many exciting effects can be implemented with this system:

- gameplay indicators,
- rendering additional foam animation,
- dirt and dust projection on water,
- blood or oil stain on the water

<MediaVideo src="/images/2024/11/2024-10-30-01-11-07.mp4" />

This feature has a lot of potential, so in the future, I plan to extend it by implementing decal-like volumes and simulated fluids on top of the water surface, which are advected by base fluid velocities.

## Static mesh converter and baking

The static mesh mode is the most efficient way to render fluid flux water surfaces. Still, since releasing the Fluid FLux 2.0, it has been entirely forgotten, and it’s time to introduce significant improvements in this topic.

In Fluid Flux 3.0, the static mesh generator was rewritten to a new separate editor actor tool called BP_FluxSurfaceMeshGenerator. The new tool uses the **Geometry Scriprs** **Plugin** introduced in Unreal Engine 5, so don’t forget to enable it in your projects!

![](/images/2024/11/geometry-script.png)

What changed:

- This new tool is now separated from the **BP_FluxSurface** actor, making the interface cleaner and more encapsulated.
- The new wireframe preview option dramatically improves the visualization of exported meshes.
- Baker optimizes mesh density using fast built-in engine geometry scripts, so geometry density is better distributed.
- Performance issues related to reading render targets were addressed, and the whole generation process is working over 50 times faster.
- The new static mesh generator provides more precise results and supports bigger meshes, thanks to shortening generation time.
- Exporting is simplified as the target mesh can be pinned to the blueprint and overridden every time it changes.

The video below presents the optimized output mesh generated in the editor with wireframe preview enabled:

<MediaVideo src="/images/2024/11/2024-11-18-12-41-11.mp4" />

Unfortunately, there are still some limitations:

- Geometry Scriprs works only in the editor, so generating static meshes in runtime is no longer supported.
- Generating huge meshes may take some time as the system is implemented partially in blueprints.
- The generator works only for rivers and lakes. Building static mesh for the ocean does make sense, as it should be dynamic.
- The output mesh can’t be blended with the ocean because it uses another surface rendering mode.

## Buoyancy Editor

The buoyancy editor is my first attempt to make an editor based on a 3D preview viewport. Previously, configuration buoyancy was quite a challenge as it required restarting the game using temporary debug pontoons and the trial and error method to find proper values. Now it’s different! You can see the preview of pontoons in a separate editor. Configure it in the editor view and watch your adjustment in runtime! All changes are saved in the bouncy data asset to be easily shared between different bouncy components and managed in the content browser.

The **EUW_BuoyancyEditor** editor can be found in folder **/FluidFlux/Editor/Blueprints/** and run by clicking RightButton -> Run Editor Utility Widget.

<MediaVideo src="/images/2024/11/2024-11-21-19-23-08.mp4" />

A tutorial presenting all editor options and documentation describing the workflow is coming soon.

## Unified velocity advection

This update brings many changes in how the velocity of the simulation is interpreted inside the Niagara particles and surface shader. In the previous version, the speed of surface waves differed from that of particles advected on the surface. This inaccuracy is fixed by unifying velocity units and transferring them into world space. This improvement allowed me to create exciting examples like advected foam and bioluminescent plankton.

> Advancing particles again. How many particles do we need? All of them ! :> #UnrealEngine #VFX pic.twitter.com/JFJ928Z0aH
>
> — Krystian Komisarek (@ImaginaryBlend) [July 18, 2024](https://twitter.com/ImaginaryBlend/status/1813730706151075882)

As a result of changes, the BP_FluxRotatorActor (FluxRiverMap) detects water velocity correctly, and rotation is calculated precisely from the fluid flow. It is a good start to create complicated mechanisms driven by the simulation.

<MediaVideo src="/images/2024/11/2024-11-18-12-04-27.mp4" />

Another fantastic improvement is calling the water speed depending on the depth relative to the surface; this change gives a more realistic effect for objects deep in water as they move slower. The image below presents the scale of velocity when depth changes. This means the FluxData component output may differ depending on the sampling height. The change also applies to all particles in water; the dust on the surface will move faster than dust deep in water.

![](/images/2024/10/depth-speed-2.png)

*Chart showing how water speed decreases with depth. The speed drops off exponentially, approaching very low values around 100 meters*

## Vehicles

Until now, example demo boats were working as floating meshes on water, but Fluid Flux 3.0 introduces a new drivable motorboat implementation that extends this functionality and provides valuable examples:

- The boat actor uses the new bouncy system configured using a bouncy data asset.
- Movement is controlled by a single force pushing from the motor attached behind. Parameters of speed and engine can be easily adjusted.
- Get close to the bot and press E to start driving the vehicle.
- Additionally, the demo boat implements camera movement with direction adjustment, and it was tested in multiplayer.
- The implementation can be extended to work as a ship or another type of vehicle.

> I’m having fun testing the new buoyancy system – applying just a single force to steer the boat (green arrow). 🚤<br>
> I have to implement a foam generator next.<br>
> <br>
> The example vehicle will be included in the demo 🙂 #UnrealEngine5 #gamedev pic.twitter.com/oHn5NoeyqU
>
> — Krystian Komisarek (@ImaginaryBlend) [October 15, 2024](https://twitter.com/ImaginaryBlend/status/1846164655426736609)

## Rain particles

Some of you asked about integrating the Fluid Flux with other water systems like UDS or Infinity Weather. I cannot provide it yet, but at least this update introduces more functionalities and examples addressing weather-related limitations. I’m presenting a new Niagara particle effect integrated with water that simulates raindrops:

> It’s rainy today🌧️Raindrops hit the surface, creating splashes, and ripples that slowly move with the fluid flow. #UnrealEngine5 #VFX #gamedev pic.twitter.com/g0DbcumzzJ
>
> — Krystian Komisarek (@ImaginaryBlend) [July 28, 2024](https://twitter.com/ImaginaryBlend/status/1817707859045404949)

List of features:

- The effect implemented in the Niagara on GPU.
- The Niagara effect needs to be used with **BP_FluxNiagaraActor** to read the information from Fluid Flux water.
- The system spawns a minimum number of rain particles around the camera and automatically repositions when the camera moves.
- The spawning area moves with the camera, so it’s essential to set a new BP_FluxNiagaraActor.**InfiniteExtend**=true flag; otherwise, the effect may disappear when the actor is not in the camera frustum.
- The collision between the water drop and the fluid surface is made by sampling the surface and comparing the difference between water height and particle position.
- Spawned particles support three rendering states:<br>
  **Water drops** spawn particles in camera space and render stretched drops with refraction.<br>
  **Water splashes** – animated splash billboards generated when a drop hits the water surface.<br>
  **Water rings** – animated raindrop rings generated when a drop hits the water surface, and moves with the water flow.

## Large World Coordinates

The improved version of Fluid Flux handles LWC (large world coordinates) and should work correctly at a distance of up to 150km from the center of the level on the x and y axes. This use-case can be tested on the FluxOceanMap, where you can find the teleport actor that will move the character to another location far from the center of the map. I won’t spoil what else is there; you should try it yourself!

![](/images/2024/11/LWC_test-1.png)

Pushing Fluid Flux to its limit is crucial for me; therefore, many tests were made on large-scale coordinates. However, it’s important to notice what is the status of this feature:

- I’ve addressed and improved everything I found: underwater post-process glitches, simulation domain update bugs, disappearing surface meshes, swimming detection, Niagara particle warnings
- This does not mean the coastline or simulation domain can cover 150km of area. For now, the system is mainly ready for ships traveling through the open ocean.
- LWC required a workaround based on a respawning effect every few kilometers, which is automated in runtime. However, you may notice some glitches in the editor preview that can be fixed by repositioning the surface actor. Debug help menu previews show distance from the center.

## Underwater

A new curve-based waterline configuration is an entirely new way to set up the precise appearance of the waterline’s refraction light transmittance, shadow, and blur.

![](/images/2024/11/waterline.png)

*Curves representing effects on waterline (red = shadow, green = blur, blue = color, alpha = refraction)*

<MediaVideo src="/images/2024/11/2024-11-22-10-11-08.mp4" />

In previous versions, the underwater post-process caused a noticeable banding effect in dark waters due to very low scattered light. The latest update mitigates this issue by using white noise to mask the imperfections.

![](/images/2024/11/banding.png)

*Notice the soft inrerpolation of the colors on t he right side of the screen.*

## Other improvements

### Optimizations

High performance is crucial for this project. I decided to extend the surface rendering system to select material permutations based on the effect active in a specific area. This means that the system selects possibly the cheapest material by excluding the code needed for rendering simulation/coastline/ocean waves, depending on what the player sees. This change gives a significant performance boost, especially on coastline maps (at least +10 FPS) that previously were the most expensive.

### Wind Direction

Additionally, the FluxOceanWave actor supports dynamic changes in wind direction. The blueprint function can control it. The example is presented in the OceanMap level blueprint that randomizes wind and direction every few seconds.

### Gernster water (experimental)

The Fluid Flux wave system uses prebaked FFT water animation. This solution is efficient and visually appealing, but unfortunately, it is not configurable enough, and ocean waves look almost the same in every project. New Gerstner water mode is my first test to make water movement more realistic and configurable.<br>
Right now, only surface materials support Gernster water, which means it is only a visual effect because gameplay can’t read water surface height from it yet.

> I’ve improved coastline shading 🌊 and tested an alternative Gerstner wave mode. The Fluid Flux update is almost ready! 🙂 #UnrealEngine5 #VFX pic.twitter.com/TpA4EsJYiZ
>
> — Krystian Komisarek (@ImaginaryBlend) [July 26, 2024](https://twitter.com/ImaginaryBlend/status/1816890396867187148)

### Exporters

- Unified fixed, improved, and cleaned exporter code now exporting should cooperate better with the repositories.
- Fixed repetitive patterns on the ocean after exporting the coastline domain data.

### Surface actor improvements

- Added soft references to external content.
- Support for nDisplay, raytracing, and path tracing (Experimental with limitations)
- Added SDF masking support
- Improved underwater visibility detection
- Added surface mesh modes based on instanced mesh and configurable mesh dentistry
- Custom editor for color preset data assets with automatic preview in the editor (Open SurfaceEditorTab)

![](/images/2024/11/editortab.png)

### Use cases

For example, demo levels get a bit complicated. They may look overwhelming for new users, so I added a folder called **Demo/Maps/**, where I plan to put more straightforward examples, presenting the basic configuration and testing scenario for a specific setup.

Please let me know if you need some specific use cases.

## Future

I never imagined that so many developers would use my product, and this is an excellent opportunity to thank you for believing in my project and using it in many spectacular ways. I am always impressed with your work, and it fuels me to do more stuff, so please don’t forget to share your creative projects with the community on my Discord!

- **Substrate** – A separate path for substrate UE 5.5 will be released soon.
- **Scalability** – I know you need more extensive simulations, coastlines, and worlds, and I plan to address that.
- **Multiplayer** – I plan to implement multiplayer for ocean, coastline, and pre-baked simulation states.
- **Plugin** – [A new C++ version called **Fluid Flux Plugin** is currently being developed.](https://imaginaryblend.com/2024/10/01/2597/)
- **Documentation** – I plan to rewire documentation and supplement it with additional videos.

That concludes the update. I want to thank everyone for their patience and for discovering and reporting many bugs and improvements. Seeing my pack being used in your unique projects has been gratifying. Thank you all!
