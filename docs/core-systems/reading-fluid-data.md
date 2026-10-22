# Reading fluid data

Fluid Flux uses Niagara **asynchronous readback events** to retrieve data from fluid render targets and pass it to blueprints. This feature is used in multiple situations:

- buoyancy and floating objects
- automatic dam breaking
- interaction detection
- swimming system
- fluid sound source analyzer
- underwater camera detection
- spawning splashes

The following demo actors present the functionality of `FluxDataComponent`:

- Demo/Environment/`BP_FluxDataReadbackExample` – Basic data component test: reading water information and rendering an arrow of direction on the surface of water.
- Demo/Environment/`BP_FluxRotatorActor` – Rotating wheel reading the data from water under the mesh.
- Demo/Environment/`BP_FluxBoatPawn` – Advanced use case that reads multiple readback locations automatically sent by the buoyancy component. As a result, it generates water samples at all locations.

The current water state at the readback location is read from the GPU and stored in component attributes:

- **Flux Surface Location** – The location on the water surface.
- **Flux Fluid Velocity** – Velocity of water on the surface.
- **Flux Fluid Height** – Height of the water relative to the ground. It may be incorrect in the open ocean, where the ground height map does not exist.

The `BP_FluxDataComponent` listener samples water at a specific location (Readback Locations) relative to the owner component specified by **OwnerComponentTag** and **OwnerSocketName** in the case of skeletal meshes.

![](/images/2021/09/readback-owner.jpg)

By default, the component reads data from the fluid in every frame; however, for optimization, it can be configured to refresh with a lower frequency using the **ReadbackEventInterval** parameter.

Users can also bind to the event dispatcher **OnReceiveParticleData** to get the event every time the system receives data from Niagara.

::: info
Use the **Debug** option in `FluxDataComponent` to make sure that the component follows your actor and samples the correct values.
:::
