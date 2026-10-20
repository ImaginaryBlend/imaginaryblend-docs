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

- **Realtime shallow water simulation** – fluid data modifiers, wave generator, and extendable interface. See [Simulation Domain](/core-systems/simulation-domain).
- **Fluid state management** – advanced fluid state management and loading state in gameplay. See [Fluid state](/core-systems/simulation-domain#fluid-state).
- **Static mesh generator** – a tool for generating ultra-fast static meshes with flow maps baked into vertex color and UV. See [Mesh generator](/core-systems/simulation-domain#mesh-generator).
- **Flow advection** – velocity-based fluid flow advection method for foam, caustics and waves.

## Rendering

- **Fluid surface rendering** – caustics, wetness, underwater, waterline, advected foam, advected waves, blending with the ocean, dynamic audio detection. See [Surface actor](/core-systems/surface-actor).
- **Ocean wave blending** – rendering tillable ocean heightmap texture in a single pass. See [Recreating Ocean](/core-systems/simulation-domain#recreating-ocean).
- **Coastline** – coastline wave break rendering. See [Coastline Domain](/core-systems/coastline-domain).
- **Underwater glass** – underwater glass and spline-based tunnels, lights, decals. See [Glass system](/core-systems/glass-system).

## Interaction and gameplay

- **Fluid Interaction** – simple, cheap ripple solver moving with character, optimized to an absolute minimum. See [Interactions](/core-systems/interactions).
- **Niagara environment interaction** – high-quality effects, bouncy plants, character swimming, boats. See [Niagara integration](/core-systems/surface-actor#niagara-integration).
- **Async readback** – Niagara fluid async readback system for sampling height and fluid flow in blueprints. See [Reading fluid data](/core-systems/surface-actor#reading-fluid-data).
- **Vehicles** – possessable vehicle system implemented especially for boats. See [Vehicle driver](/core-systems/player-character#vehicle-driver).
- **Surface particles** – simulation-driven surface particles (leaves and dust).
- **Dynamic audio** – dynamic audio analyzer. The sound source is positioned based on fluid movement.
- **Replication** – replicated ocean waves and vehicle movement. See [Multiplayer](/requirements/compatibility/multiplayer).

## Implementation

- **Clean, efficient, GPU-friendly** – implementation and interface designed with the KISS (Keep It Simple, Stupid) rule in mind.

## Trailer

<YouTube id="EfzhMqZyilI" />

## Executable demo

The executable demo is available for free on [itch.io](https://imaginaryblend.itch.io/fluid-flux). Please try the demo before purchasing.

<YouTube id="-py91uoMVNo" />

## Where to go next

Before planning a project, read the [Limitations](/requirements/limitations) page, including the [compatibility summary](/requirements/limitations#compatibility).

<div class="link-cards">

[**Limitations**<br>Read before purchasing](/requirements/limitations)
[**Compatibility**<br>Substrate, multiplayer, platforms](/requirements/limitations#compatibility)
[**Documentation**<br>Actors, systems and tools](/core-systems/player-character)
[**Release notes**<br>What changed in each version](/updates/)
[**Support**<br>Discord, email, license](/help/support)

</div>
