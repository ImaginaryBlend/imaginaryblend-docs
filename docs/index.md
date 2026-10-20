# Features

Fluid Flux is a real-time water system for Unreal Engine, built on 2D shallow-water simulation – from interactive rivers and floods to coastlines and open oceans. Below you will find what the package offers and where each feature is described in the documentation.

<HeroSlideshow />

<div class="link-cards">

[**Download on FAB**<br>Buy and install Fluid Flux](https://www.fab.com/listings/196c70cd-1283-4249-bf6b-c3019d1cbe11)
[**Executable demo**<br>Free demo on itch.io](https://imaginaryblend.itch.io/fluid-flux)
[**Showcase**<br>Videos, gallery and games](/showcase/)
[**Getting started**<br>Installation and project setup](/getting-started/installation)

</div>

## Simulation

- **Realtime shallow water simulation** – fluid data modifiers, wave generator, and extendable interface. See [Simulation Domain](/guide/simulation-domain).
- **Fluid state management** – advanced fluid state management and loading state in gameplay. See [Fluid state](/guide/simulation-domain#fluid-state).
- **Static mesh generator** – a tool for generating ultra-fast static meshes with flow maps baked into vertex color and UV. See [Mesh generator](/guide/simulation-domain#mesh-generator).
- **Flow advection** – velocity-based fluid flow advection method for foam, caustics and waves.

## Rendering

- **Fluid surface rendering** – caustics, wetness, underwater, waterline, advected foam, advected waves, blending with the ocean, dynamic audio detection. See [Surface actor](/guide/surface-actor).
- **Ocean wave blending** – rendering tillable ocean heightmap texture in a single pass. See [Recreating Ocean](/guide/simulation-domain#recreating-ocean).
- **Coastline** – coastline wave break rendering. See [Coastline Domain](/guide/coastline-domain).
- **Underwater glass** – underwater glass and spline-based tunnels, lights, decals. See [Glass system](/guide/glass-system).

## Interaction and gameplay

- **Fluid Interaction** – simple, cheap ripple solver moving with character, optimized to an absolute minimum. See [Interactions](/guide/interactions).
- **Niagara environment interaction** – high-quality effects, bouncy plants, character swimming, boats. See [Niagara integration](/guide/surface-actor#niagara-integration).
- **Async readback** – Niagara fluid async readback system for sampling height and fluid flow in blueprints. See [Reading fluid data](/guide/surface-actor#reading-fluid-data).
- **Vehicles** – possessable vehicle system implemented especially for boats. See [Vehicle driver](/guide/player-character#vehicle-driver).
- **Surface particles** – simulation-driven surface particles (leaves and dust).
- **Dynamic audio** – dynamic audio analyzer. The sound source is positioned based on fluid movement.
- **Replication** – replicated ocean waves and vehicle movement. See [Multiplayer](/compatibility/multiplayer).

## Implementation

- **Clean, efficient, GPU-friendly** – implementation and interface designed with the KISS (Keep It Simple, Stupid) rule in mind.

## Trailer

<YouTube id="EfzhMqZyilI" />

## Executable demo

The executable demo is available for free on [itch.io](https://imaginaryblend.itch.io/fluid-flux). Please try the demo before purchasing.

<YouTube id="-py91uoMVNo" />

## Where to go next

Before planning a project, read the [Limitations](/introduction/limitations) page, including the [compatibility summary](/introduction/limitations#compatibility).

<div class="link-cards">

[**Limitations**<br>Read before purchasing](/introduction/limitations)
[**Compatibility**<br>Substrate, multiplayer, platforms](/introduction/limitations#compatibility)
[**Documentation**<br>Actors, systems and tools](/guide/player-character)
[**Release notes**<br>What changed in each version](/release-notes/)
[**Support**<br>Discord, email, license](/support/)

</div>
