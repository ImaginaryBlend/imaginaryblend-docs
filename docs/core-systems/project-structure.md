# Project structure

The Fluid Flux project is structured in a specific manner. This brief description will help you understand the type of content available in each folder. Before starting work with the pack, familiarize yourself with its structure and the systems it provides.

![](/images/2021/09/Structure-1.png)

- **Demo** – the Demo folder is the most important for new users. The demo examples present how to use this pack, achieve effects, and integrate systems with characters. The demo files demonstrate everything covered in this documentation. None of the core systems reference any assets from the Demo folder, so **you can safely remove it** from the project at any time to reduce the project and build size.
- **Editor** – editor-related tools, icons, utilities and the procedural mesh generator.
- **Simulation** – the shallow water simulation actor and tools for controlling fluids and generating states.
- **Coastline** – generating coastline data for oceans.
- **Interaction** – a simple interaction system that adds detailed, lightweight ripple simulations.
- **Surface** – renders the surface, underwater volume, post-process and caustics, and plays audio.
- **Tools** – tools shared between systems for generating heightmaps, SDFs and procedural meshes.
- **Environment** – Niagara particle systems that read back information from the simulation, implement swimming and buoyancy, and drive particles using the fluid state.
- **Waves** – a system that generates ocean waves for the background and mixes them with the fluid simulation.

## Where to go next

The documentation follows the main actors of the pack:

- [Player character](/core-systems/player-character) – swimming and vehicles
- [Buoyancy](/core-systems/buoyancy) – floating objects, boats and ragdolls
- [Surface actor](/core-systems/surface-actor) – rendering water, color presets
- [Interactions](/core-systems/interactions) – ripples and splashes around characters and objects
- [Simulation Domain](/core-systems/simulation-domain) and [Coastline Domain](/core-systems/coastline-domain) – simulating rivers and oceans
- [Glass system](/core-systems/glass-system) – underwater glass and tunnels
