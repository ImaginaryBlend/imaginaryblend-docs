# Limitations

With great power comes great responsibility. I am committed to being a reliable marketplace creator, so I must communicate the limitations and disadvantages of using simulations. The Fluid Flux system is somewhat **overhyped**, so please read the description below before purchasing and ensure everything aligns with your expectations and requirements. Ensuring that is crucial for the [Refund Policy](https://imaginaryblend.com/2023/06/11/refund-policy/).

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
- **Single-layer water** material mode is not supported on **mobile**. It’s an engine limitation that Epic Games should solve. Generally, this material mode does not support the absorption coefficient on mobile, so water will look different.
- Path tracing is not supported because the Single Layer Water mode does not work.
- The **PS5/Xbox** shader compiler defaults to 16-bit float per channel, which means you will have to lower the precision settings in the simulation domain to make it work on console platforms. Unfortunately, this change may cause water loss, as 16bit is not precise enough to simulate conservative water flow in the long term. Please pay attention when your gameplay depends on simulation results.
- Statistically generated mesh of water can be inconsistent with the waterline post-process. This issue will be addressed in the future.
- The underwater post-process effects in VR mode only work when Project Settings > VR > (enable) **Instanced Stereo = false**. This rendering mode breaks rendering of the translucent meshes and should be **disabled.**

## Scalability

The simulation domain requires allocating floating-point render targets and updating them every frame, which can be expensive.
The size of domains can be increased by changing the precision of details per simulation cell. Ocean setup does not require allocating memory, but rendering water is limited by floating-point calculations. You may encourage many unpredictable behaviors, such as disappearing post-process and surfacing far from the center of the map; 20 km in every direction is the limit.

| Domain | Resolution | Precision | Maximum domain size |
| --- | --- | --- | --- |
| Simulation | up to 1024 x 1024 | up to 100 cm per pixel | 1km x 1km |
| Coastline (island) | up to 2048 x 2048 | up to 1000 cm per pixel | 20 km x 20 km (pixel size 500 cm) |
| Ocean | n/a | n/a | 40 km x 40 km (limit of floating point) |

## Performance

Many users are concerned about performance and don’t know if it requires a high-spec PC. Performance depends on the GPU, render resolution, and enabled engine options, but the product is optimized for older devices and can be adjusted for more demanding projects.

I heavily recommend downloading the demo and testing it on the target device. Example results of my tests are presented below:

| GPU | Resolution | River map | Island map |
| --- | --- | --- | --- |
| RTX 3080 | 2560×1440 | 320-380 FPS | 260-310 FPS |
| RTX 2080 | 2560×1440 | 160-200 FPS | 110-160 FPS |
| GTX 860M (8-year-old notebook, Lenovo Y50) | 1920×1080 | 25-30 FPS | 20-25 FPS |

In the case of bigger maps, efficiency may sometimes be a problem. I recommend avoiding simulation resolutions larger than 1024×1024 in games. The calculation of a large-scale simulation often requires a substantial number of computations. I suggest utilizing the lowest feasible resolution for the simulation. For example, the maximum resolution in the example demos I provide is 1024×256 (BeachMap). The simulation frame can be baked into data assets and rendered without the additional cost of updating the simulation, which is incredibly efficient and valuable for rivers. You can also reduce memory usage by applying additional compression.

## Multiplayer

Fluid Flux is not inherently designed for multiplayer environments. However, under specific conditions and certain limitations, it can be utilized in multiplayer scenarios as a visual addition through carefully crafted gameplay design. This chapter outlines the challenges, technical limitations, and potential workarounds developers should consider when integrating Fluid Flux into multiplayer games.

The table below presents the current status of multiplayer support inside different domain types.

| Domain type | Status | Description |
| --- | --- | --- |
| Ocean | Replicated | The server sends the wave time and wind settings to the clients. |
| Coastline | **Client-side** | Coastline time replication has not been implemented yet. |
| Simulation (dynamic) | **Client-side** | It can easily desynchronize between the client and the server. The wave generator uses render time, so it is not yet deterministic. |
| Simulation state | Works | The state is the same for the client and server. It does not require any replication. |

### Technical Limitations

1. **Client-Side Simulation**: Fluid Flux uses Niagara readback to sample water data, which is essential for GPU computations. However, Niagara does not function on dedicated servers, making it impossible to process critical data from the server side. Simulations are calculated client-side only, and Niagara Readback results are automatically sent to the server. This approach is unsafe for games that rely on an authoritative server, which can be problematic for competitive gameplay.
2. **Bandwidth Constraints**: The simulation involves substantial dynamic data changes, which are challenging to synchronize over a network due to limited bandwidth. Transmitting large amounts of fluid data in real-time is impractical for most multiplayer setups. Simulations can quickly desynchronize without mechanisms to correct discrepancies between the server and clients, leading to inconsistent results across players.
3. **Non-Deterministic Behavior Across GPUs**: While the simulation is deterministic on the same machine under controlled conditions, differences in floating-point operations across GPUs can lead to minor discrepancies, complicating synchronization.
4. **State Recovery Issues**: Synchronizing the simulation’s state is particularly challenging when new players join or frame spikes occur. The system cannot recover smoothly from these situations, even with limits on the number of accumulated iterations per frame. In situations like this, storing prebaked simulation states that can be loaded after the player joins the game is recommended. For example, the state of the water the client should be prepared for when the dam breaks.
5. **Vehicle Replication**: The demo maps include a drivable board system that works in multiplayer. However, client-side movement lacks smoothness and would require external plugins to improve actor physics replication. Unreal Engine 5.5 introduces features such as the “mover” and enhanced physics replication for multiplayer games, which will be used in future versions of Fluid Flux.

Fluid Flux’s multiplayer capabilities are experimental and come with notable limitations. It’s not recommended in competitive gameplay. Developers should weigh these limitations carefully and design gameplay around them to ensure a stable and enjoyable experience for players.

## Open-world

The accurate **open-world** setup has **not been tested**. The demo examples show how the system can be used. I can’t promise anything more at this point of development. Just assume that you get what you see in my videos, no more, no less.

## Voxel Plugin

Fluid Flux can be used in combination with the **Voxel Plugin**, but it is also limited to heightfield projection, so caves and planets are unsupported.

<YouTube id="vJLU2CLuyNg" />

Use `Simulation.RuntimeCaptureDelay` = 1.0 to force the simulation to wait for the voxel plugin map to generate a mesh before rendering it to the height map.
The heightmap in this presentation is updated every frame using **CaptureGroundHeightmap**. It is inefficient and should probably be optimized to update the area around the brush only when something changes on the map. The **UpdateGroundMap**(Position, Size) function would be a better choice.

## Good and bad practices

- Avoid using a high simulation resolution, as you will quickly run out of memory; 1024×1024 seems like a good compromise.
- Don’t make your gameplay rely on fluid simulation in multiplayer because it can’t be synchronized.
- Avoid using Fluid Flux on flat surfaces; subtle slopes are always better.
- Avoid hard-edged geometry (boxes). It can be approximated wrongly in height maps, and steep slopes sometimes look terrible.
- Try not to overestimate this system. If I haven’t prepared the ocean with ships and a vast island covered by rivers and simulated lakes, there is probably a reason for that.
- Try not to update the simulation ground in every frame. It may cost you significant performance.
- Meshes using materials with “PixelDepthOffset” active may not render correctly in a ground height map. A simple workaround is described in the chapter [Ground Capture → Solving issues](/guide/ground-capture#solving-issues).
