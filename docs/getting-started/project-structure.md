# Project structure

The Fluid Flux project is structured in a specific manner. This brief description will help you understand the type of content available in each folder. Before starting work with the pack, familiarize yourself with its structure and the systems it provides.

![](/images/2021/09/Structure-1.png)

- **Demo** – The Demo folder is the most important for new users. The demo examples present how to use this pack, achieve effects, and integrate systems with characters. The demo files demonstrate everything covered in this documentation. The product does not link files in the Demo folder, and **you can remove it** from the project at any time to optimize build/project size.
- **Editor** – editor-related tools, icons, utilities, procedural mesh generator
- **Simulation** – Shallow water simulation actor and tools for controlling fluids and generating states.
- **Coastline** – Generating coastline data for oceans.
- **Interaction** – A simple system of interactions that adds detailed, lightweight ripple fluid simulations.
- **Surface** – Renders surface, underwater volume, post-process, caustics, and plays audio.
- **Tools** – Multiple tools that are shared between systems for generating heightmaps, SDF, and procedural meshes.
- **Environment** – Niagara particle systems that allow readback information from simulation, implementing swimming, buoyancy, and drive particles using the fluid state.
- **Waves** is a system designed to generate ocean waves for the background and mix them with fluid simulation.

## Where to go next

The documentation follows the main actors of the pack:

- [Player character](/guide/player-character) – swimming and vehicles
- [Buoyancy component](/guide/buoyancy) – floating objects, boats and ragdolls
- [Surface actor](/guide/surface-actor) – rendering water, interactions, color presets
- [Simulation Domain](/guide/simulation-domain) and [Coastline Domain](/guide/coastline-domain) – simulating rivers and oceans
- [Glass system](/guide/glass-system) – underwater glass and tunnels
