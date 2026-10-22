# Limitations

<blockquote class="ib-quote"><p>With great power comes great responsibility.</p></blockquote>

I am committed to being a reliable marketplace creator, so I must communicate the limitations and disadvantages of using simulations. The Fluid Flux system is somewhat **overhyped**, so please read the description below before purchasing and ensure everything aligns with your expectations and requirements. Ensuring that is crucial for the [Refund Policy](/purchase/refund-policy).

The system is advanced, so it may be **overwhelming for beginners**. The code is clean and elegant, but reading blueprints and analyzing example code are required.

## Shallow water simulation

- The Fluid Flux simulation is based on the **Shallow Water Equations** (SWE). It is calculated in 2D on a heightfield mesh, meaning all obstacles are rendered to a height using top-down projection. Fluid can not be simulated in caves. However, the algorithm can ignore particular objects, such as bridges, so they do not interfere with the simulation.
- While Fluid Flux represents a significant advancement for the game industry, it also introduces additional challenges. Controlling and adjusting simulations can be demanding; sometimes, a single parameter change can alter the fluid flow across an entire map.
- The simulation area can’t be **rotated**. The product supports only axis-aligned rectangular volumes.
- The simulation area can’t be **moved** in runtime. **Movable volume** is one of the most important features for future updates.
- The simulation domain does not support the **wave break** effect because the fluid approximation lacks the necessary data to render it.
- **Niagara** fluid readback used for buoyancy and fluid detection returns results with (at least) one frame delay. It’s good enough for most features, like swimming-fluid detection, but not 100% reliable. **Trace hits** with dynamic fluids are not supported at this time.
- Simulation is deterministic under certain conditions: the same machine and simulation parameters. Still, there are likely differences in floating-point operations across GPUs, so it can’t work fully deterministically.

## Known issues

- “Real-Time” render mode is required to simulate in the editor. Otherwise, the view will not refresh after each frame. Plants also will not load properly on the map if you are not in “Real-Time” render mode in the editor. Its limitation of blueprints: I don’t have any event that could be executed after loading and adjusting Niagara effects.
- Rendering a translucent underwater mesh is a challenging problem. Single-layer water materials do not support translucency, so translucent objects are invisible when viewed from above the water. The Fluid Flux mesh-based post-process material implementation is more functional because it can be overlaid before translucent meshes.
- Shadows on water may look a bit blocky. This is a limitation of the single-layer water material in Unreal. Epic improved it in version UE5.3, and it should look better. The fix is described in [Project settings → Rendering settings](/getting-started/project-settings#rendering-settings).
- The maximum heightmap range is 32000 units. This limitation was introduced with Unreal Engine. The problem concerns rendering clamped colors to render targets for unexplained reasons.
- Statistically generated mesh of water can be inconsistent with the waterline post-process. This issue will be addressed in the future.
- Platform-specific issues (consoles, VR, mobile, path tracing) are listed in [Compatibility → Platforms](/compatibility/platforms).

## Scalability and performance

Domain size limits, memory and example performance results are described on the [Performance](/product/performance) page.

## Compatibility

How Fluid Flux works together with various Unreal Engine systems, platforms and third-party plugins. Each entry links to a page with details.

| Feature | Status | Details |
| --- | --- | --- |
| Substrate | Supported | Natively compatible since Unreal Engine 5.7. UE 5.4–5.5 require patched materials. [Substrate](/compatibility/substrate) |
| Multiplayer | Experimental | Ocean is replicated, simulation runs client-side. [Multiplayer](/compatibility/multiplayer) |
| Open world | Not tested | No dedicated open-world setup has been tested. [Open world](/compatibility/open-world#open-world) |
| Large World Coordinates | Supported | Works up to 150 km from the center of the level, mainly for open-ocean use. [Large World Coordinates](/compatibility/open-world#large-world-coordinates) |
| Sequencer | Partial | Simulation can’t be previewed in the Sequencer editor; Movie Render works in real-time mode. [Sequencer](/core-systems/simulation-domain#sequencer) |
| Consoles (PS5, Xbox) | Supported with limitations | 16-bit shader precision requires lower simulation precision. [Platforms](/compatibility/platforms#consoles-ps5-xbox) |
| VR | Limited | Underwater post-process requires Instanced Stereo disabled. [Platforms](/compatibility/platforms#vr) |
| Mobile | Not supported | Only baked meshes/states; single-layer water is not supported on mobile. [Platforms](/compatibility/platforms#mobile) |
| Path tracing | Not supported | Single Layer Water mode does not work with path tracing. [Platforms](/compatibility/platforms#path-tracing) |
| Voxel Plugin | Partial | Works with heightfield projection only – no caves or planets. [Third-party plugins](/compatibility/plugins#voxel-plugin) |
| Water Plugin | Not supported | Combining the materials is possible, but not officially supported. [Third-party plugins](/compatibility/plugins#water-plugin) |
| ALS, UDS, Fluid Ninja | No official integration | Integrations are planned. [Third-party plugins](/compatibility/plugins#als-uds-fluid-ninja-and-other-packs) |

## Good and bad practices

- Avoid using a high simulation resolution, as you will quickly run out of memory; 1024×1024 seems like a good compromise.
- Don’t make your gameplay rely on fluid simulation in multiplayer because it can’t be synchronized.
- Avoid using Fluid Flux on flat surfaces; subtle slopes are always better.
- Avoid hard-edged geometry (boxes). It can be approximated wrongly in height maps, and steep slopes sometimes look terrible.
- Try not to overestimate this system. If I haven’t prepared the ocean with ships and a vast island covered by rivers and simulated lakes, there is probably a reason for that.
- Try not to update the simulation ground in every frame. It may cost you significant performance.
- Meshes using materials with “PixelDepthOffset” active may not render correctly in a ground height map. A simple workaround is described in the chapter [Ground Capture → Solving issues](/core-systems/ground-capture#solving-issues).
