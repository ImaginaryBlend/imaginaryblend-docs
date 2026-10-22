# Showcase

What Fluid Flux offers and how it looks in action: features, the executable demo, feature presentations, screenshots from the demo maps and projects made with the package.

## Features

### Simulation

- **Realtime shallow water simulation** – fluid data modifiers, wave generator, and extendable interface. See [Simulation Domain](/core-systems/simulation-domain).
- **Fluid state management** – advanced fluid state management and loading state in gameplay. See [Fluid state](/core-systems/simulation-domain#fluid-state).
- **Static mesh generator** – a tool for generating ultra-fast static meshes with flow maps baked into vertex color and UV. See [Mesh generator](/core-systems/simulation-domain#mesh-generator).
- **Flow advection** – velocity-based fluid flow advection method for foam, caustics and waves.

### Rendering

- **Fluid surface rendering** – caustics, wetness, underwater, waterline, advected foam, advected waves, blending with the ocean, dynamic audio detection. See [Surface actor](/core-systems/surface-actor).
- **Ocean wave blending** – rendering tillable ocean heightmap texture in a single pass. See [Recreating Ocean](/core-systems/simulation-domain#recreating-ocean).
- **Coastline** – coastline wave break rendering. See [Coastline Domain](/core-systems/coastline-domain).
- **Underwater glass** – underwater glass and spline-based tunnels, lights, decals. See [Glass system](/core-systems/glass-system).

### Interaction and gameplay

- **Fluid Interaction** – simple, cheap ripple solver moving with character, optimized to an absolute minimum. See [Interactions](/core-systems/interactions).
- **Niagara environment interaction** – high-quality effects, bouncy plants, character swimming, boats. See [Niagara integration](/core-systems/niagara-integration).
- **Async readback** – Niagara fluid async readback system for sampling height and fluid flow in blueprints. See [Reading fluid data](/core-systems/reading-fluid-data).
- **Vehicles** – possessable vehicle system implemented especially for boats. See [Vehicle driver](/core-systems/player-character#vehicle-driver).
- **Surface particles** – simulation-driven surface particles (leaves and dust).
- **Dynamic audio** – dynamic audio analyzer. The sound source is positioned based on fluid movement.
- **Replication** – replicated ocean waves and vehicle movement. See [Multiplayer](/compatibility/multiplayer).

### Implementation

- **Simple by design** – clean implementation and interface designed with the KISS (Keep It Simple, Stupid) rule in mind.
- **Efficient and GPU-friendly** – simulation and rendering run on the GPU; fluid data is read back asynchronously only where gameplay needs it. See [Performance](/product/performance).
- **Demo examples** – ready-to-use example maps show how to set up each system and integrate it with characters. Core systems do not depend on the demo content. See [Project structure](/core-systems/project-structure).

## Executable demo

The executable demo is available on [itch.io](https://imaginaryblend.itch.io/fluid-flux). Please try the demo before purchasing. Feature presentations are available in the [Videos](#videos) section below.

## Videos

Presentations of Fluid Flux features. More videos are available on the [Imaginary Blend YouTube channel](https://www.youtube.com/channel/UCtA9XJo3PIV0Cij5ZTcHr_Q) and in the [tutorial playlist](https://www.youtube.com/playlist?list=PLU2BtkTjRiuiW1MVy0VJopQqV5JYQECf8) (some videos are already deprecated).

<div class="video-grid">

<div>

**Fluid Flux 3.0 – Underwater tunnel**

<YouTube id="-py91uoMVNo" />

</div>
<div>

**Fluid Flux 2.0 – Coastline**

<YouTube id="zLmiqJJI5ZQ" />

</div>
<div>

**Real-time waterfall simulation**

<YouTube id="6uyPh1OuPl4" />

</div>
<div>

**Real-time river simulation**

<YouTube id="EfzhMqZyilI" />

</div>
<div>

**Voxel Plugin**

<YouTube id="vJLU2CLuyNg" />

</div>

</div>

Step-by-step video tutorials are collected on the [Tutorials](/getting-started/tutorials) page.

## Gallery

Screenshots from the Fluid Flux demo maps. Click an image to enlarge it.

<div class="gallery">

![](/images/2022/04/Screen_007.jpg)
![](/images/2022/04/Screen_008.jpg)
![](/images/2022/04/Screen_003.jpg)
![](/images/2022/04/Screen_004.jpg)
![](/images/2022/04/Screenshot_004.jpg)
![](/images/2022/04/river3.jpg)
![](/images/2022/04/Screen_10.jpg)
![](/images/2022/04/Screen_11.jpg)
![](/images/2022/04/Screen_12.jpg)
![](/images/gallery/glass-tunnel.jpg)
![](/images/gallery/waterfall-swimming.jpg)
![](/images/gallery/coastline-waves.jpg)
![](/images/gallery/sunset-beach.jpg)
![](/images/gallery/underwater-swimming.jpg)
![](/images/gallery/island-coastline.jpg)
![](/images/gallery/sunset-boat.jpg)

</div>

## Games

Projects that use Fluid Flux:

- [Senua’s Saga: Hellblade II](https://store.steampowered.com/app/2461850/Senuas_Saga_Hellblade_II/)
- [Brushify - Beach Pack](https://youtu.be/JsQo13cPIkg)
- [Tides of Tomorrow](https://www.youtube.com/watch?v=wy7TP81eBc8)
- [Restore your island](https://store.steampowered.com/app/2698420/Restore_Your_Island/)
- [DrainSim](https://store.steampowered.com/app/2963800/DrainSim/)
- [Kayak VR: Mirage](https://www.youtube.com/watch?v=FxlRZYqLZWE)
- [King Krab](https://store.steampowered.com/app/2523690/King_Crab/)
- [SOUNDGRASS](https://youtu.be/X1RRcRy8PU4)

::: info Show us your project
Let me know if you'd like to see your project included on this list! Share it on [Discord](https://discord.gg/rG2q3SB5EB) or send it to [imaginaryblend@gmail.com](mailto:imaginaryblend@gmail.com).
:::
