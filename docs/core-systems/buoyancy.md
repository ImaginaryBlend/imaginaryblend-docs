# Buoyancy

The **buoyancy** is an upward force exerted by a fluid that opposes the weight of a partially or wholly immersed object. The `BP_FluxBuoyancyComponent` calculates physical forces based on the configuration set using a `PDA_FluxBuoyancyData` data asset. Additionally, the system supports **drag** and **current** forces that use fluid velocity to determine movement.

::: info
Multiple buoyancy components can share the same **Data Assets.** The Data asset can be also switched dynamically based on requirements (for example destroyed ship that is drowning can use another data asset).
:::

Example use cases of the buoyancy system can be found in the demo actors:

- `BP_FluxCrate` – the most straightforward actor with one pontoon.
- `BP_FluxBoatPawn` – a combination of multiple pontoons attached to the static mesh.
- `BP_DemoCharacter` – ragdoll is made of pontoons attached to a skeletal mesh.

## Implementation

To make an actor float, it needs a buoyancy component that applies the forces, a data component that reads the water height and velocity under the actor, and a data asset that describes the shape of the floating body as a set of pontoons. The steps below connect these elements; once they are in place, the actor reacts to the water automatically – it floats, drifts with the current and slows down in water.

1. Add `BP_FluxBuoyancyComponent` to the actor.
2. Add `BP_FluxDataComponent` to the actor – this will be responsible for reading water height.
3. Create a new **DataAsset** that will store buoyancy settings. You can copy/use examples. *`DA_BuoyancyBoat`, `DA_BuoyancyCrate`, `DA_BuoyancyRagdoll`,* or create a new one. **Content Browser → Right button → Miscellaneous → `DataAsset->PDA_FluxBuoyancyData`**.
4. Set a newly created data asset for your actor component: `BP_FluxBuoyancyComponent.DataAsset`
5. Set **ComponentTag** = “`FluxBuoyancyOwner`” in the actor component (mesh) that should be used as a parent of **Buoyancy** transformations.

The actor is already configured, but you must edit `FluxBuoyancyData` and adjust the parameters. You can do it with the help of the `EUW_FluxBuoyancyEditor` tool described below.

## Buoyancy Editor

`FluxBuoyancyEditor` is an Editor Utility Tool created to preview and edit buoyancy settings in a 3d viewport.

1. Open the folder */Game/FluidFlux/Editor/Widgets/ in the Content Browser*
2. Click the Right button on the editor utility *`EUW_FluxBuoyancyEditor`* and choose **Run Editor Utility Widget**
3. Select the actor class with a configured buoyancy system. Example boat.

   ![](/images/2025/01/editorb.jpg)

4. Now you can edit the data asset settings in the right panel. When work is done, click **Save Asset**.

### Editor controls

- Mouse Left button – selecting buoyancy pontoon (switching to pontoon settings)
- No selection – shows global parameters
- Mouse Right button drag – camera rotation
- Mouse scroll – camera distance change

The buoyancy geometry is represented as a list of spherical **pontoons** that approximate the body’s shape**.** Every pontoon has parameters that should be customized for specific use cases:

| Parameter | Description |
| --- | --- |
| Socket | Name of bone or socket used for attaching the pontoon. |
| Radius | The radius of the pontoon sphere. |
| Offset | Offset relative to the Socket or parent component. |
| DensityWeight | Scale of the density (larger density means a heavier object and less buoyant) |
| DragWeight | The scale of the drag effect (how fluid movement pushes the pontoon) |

::: tip
You can run the game and edit buoyancy setting in runtime, everything will be update and you will see the changes in your game.
:::

## Troubleshooting

This section describes typical problems users may encounter when working with the buoyancy system, together with explanations and possible solutions.

- If the **boat is flipping**, then adjust the center of mass Z location (set it to a lower value so it will behave stably)
- Try to fit the pontoons to the mesh geometry. It is more precise when detecting water and behaves more predictably.
- Adjust the side drag to stop boats from sliding sideways.
- Edit `FluxBuoyancyEditor` and game in runtime mode.
- Make sure the physical body has **Tag** set to `FluxBuoyancyOwner`
- Use the **DrawDebug** option to visualize pontoons in runtime.
- In the `BP_FluxBuoyancyComponent`, UsePontoonsInFluxData forces Flux data to generate custom readback points for every pontoon; it is precise but may also be slow in case of many pontoons.
- The buoyancy forces require a physical body, which means it can’t be used in a sequencer that does not simulate rigid body physics in the editor.
- Only spherical pontoons are supported, and this approximation is not precise, especially for hard-edged meshes.
- The system requires `FluxDataComponent` to read the surface height and velocity weight.
