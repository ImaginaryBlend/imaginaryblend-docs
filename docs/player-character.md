# Player character

The demo maps showcase the features of Fluid Flux with the help of example classes like **BP_DemoCharacter,** which provide a fully functional implementation of the character interacting with water. The Fluid Flux build for UE 5.3+ uses **Enhanced Input**, which implements character input inside the project.

Character-related implementation is simplified to a minimum and encapsulated in separate classes, making the transfer of implementation even more straightforward. This document does not provide a detailed step-by-step description of implementing character, but highlights the components and features used. More detailed descriptions can be found in the sections dedicated to these tools:

| Component | Description |
| --- | --- |
| **FluxDataComponent** | Used for extracting surface information (velocity, height, and volume) from the water system. Provides that to other systems. |
| **FluxInteractionComponent** | It generates waves after interaction on the water surface. |
| **FluxBuoyancyComponent** | Character floating on water. Activates only when the character switches to a ragdoll state. |
| **FluxSwimmingComponent** | Implements swimming movement. It changes the character’s state when it’s in water and can swim (not ragdoll). |
| **FluxDriverComponent** | Implements communication between the vehicle and the character, which allows possession. |
| **FluxModifierForceComponent** | Simulation modifier that moves water around the character only inside the domain area. |

> The easiest way to investigate how components are used in the character is to click the right mouse button on **Component -> “find references,”** the engine will show you all the places where it is implemented.

**Disabling the help panel**

After running the demo, you can notice the help panel located in the bottom right corner of the screen, which is helpful for testing features in the maps. The panel is added automatically. If you use an example character in your project and want to remove this HUD, there are many ways to choose:

1. Add ToggleVisible in “begin play” FluidFluxPlayerController like this:

   <!-- ![image.png](/images/help-panel-toggle-visible.png) -->

2. Remove the “Create BP_HudWidged” node in the player controller
3. Switch the game mode (controller) in your level from the demo to your game controller.

## Swimming component

In general, swimming is not a prominent feature of this product; it is more of an additional example that presents one of many ways to do it. The swimming example is demonstrated in DemoCharacter and requires several components to function properly.

1. Swimming requires **PhysicsVolume** on the map with **PhysicsVolume.Water Volume=true** is used to activate swimming when the character is inside.
2. The swimming system requires **Character.BP_FluxDataComponent** that provides data from water.
3. The **BP_FluxSwimmingComponent** implements movement for you and controls CharacterMovement, which is required.
4. Open and click the right mouse button on **BP_FluxSwimming -> “find references,”** and you will see how it is controlled using input.
5. The swimming animation depends on the character animation blueprint implementation and will vary in every project, so there are many ways to implement it. My simple example switches animation when **SwimmingState** is detected in SwimmingComponent.

## Vehicle driver

The Fluid Flux has a unique vehicle pawn actor that can be possessed and controlled. The actor **BP_FluxBuoyancyVehiclePawn** is a template for the vehicle that can be inherited and implemented as needed.

The vehicle system supports many valuable features:

- Smooth physics replication with quantization
- Smooth camera movement with adjustment to direction
- Jump force action
- Enhanced input
- Customizable movement
- Interaction trails
- Possessed by the closest character (attaching player)

An example of the use of the vehicle class is implemented in the **BP_FluxBoatPawn** actor placed on demo maps.

![](/images/2025/01/motorboat.jpg)

*Motorboat properties that users can adjust.*

The movement of the motorboat vehicle is implemented in the function **UpdateSteering,** which converts the input to the motor force applied to the virtual location of a propeller in the water. All the input is replicated, and the system also implements a custom synchronization of the vehicle’s physical body.

The possessing system requires adding **BP_FluxDriverComponent** to the player pawn. This class binds OnInteractionEvent, which executes when the input is activated. This simple class bridges the vehicle and the driver.

## Buoyancy component

The **buoyancy** is an upward force exerted by a fluid that opposes the weight of a partially or wholly immersed object. The **BP_FluxByouancyComponent** calculates physical forces based on the configuration set using a **PDA_FluxBuoyancyData** data asset. Additionally, the system supports **drag** and **current** forces that use fluid velocity to determine movement.

> Multiple byouancy copomonents can share the same **Data Assets.** The Data asset can be also switched dynamically based on requrements (for example destroyed ship that is drowning can use another data asset).

Example use cases of the buoyancy system can be found in the demo actors:

- **BP_FluxCrate** – the most straightforward actor with one pontoon.
- **BP_FluxBoatPawn** – a combination of multiple pontoons attached to the static mesh.
- **BP_DemoCharacter** – ragdoll is made of pontoons attached to a skeletal mesh.

**Limitations:**

- The buoyancy forces require a physical body, which means it can’t be used in a sequencer that does not simulate rigid body physics in the editor.
- Only spherical pontoons are supported, and this approximation is not precise, especially for hard-edged meshes.
- The system requires FluxDataComponent to read the surface height and velocity weight.

**Adding a buoyancy system to the actor:**

1. Add **BP_FluxByouancyComponent** to the actor.
2. Add **BP_FluxDataComponent** to the actor – this will be responsible for reading water height.
3. Create a new **DataAsset** that will store buoyancy settings. You can copy/use examples. *DA_BuoyancyBoat, DA_BuoyancyCrate, DA_BuoyancyRagdoll,* or create a new one. **ContentBrowswer->Right button-> Miscellaneous ->DataAsset->PDA_FluxBuoyancyData**.
4. Set a newly created data asset for your actor component: BP_FluxBuoyancyComponent.**DataAsset**
5. Set **ComponentTag** = “FluxBuoyancyOwner” in the actor component (mesh) that should be used as a parent of **Buoyancy** transformations.

The actor is already configured, but you must edit **FluxBuoyancyData** and adjust the parameters. You can do it with the help of the **EUW_FluxBuoyancyEditor** tool described below.

**Using FluxBuoyancyEditor Editor**

FluxBuoyancyEditor is an Editor Utility Tool created to preview and edit buoyancy settings in a 3d viewport.

1. Open the folder */Game/FluidFlux/Editor/Widgets/ in the Content Browser*
2. Click the Right button on the editor utility *EUW_FluxBuoyancyEditor* and choose **RunEditorUtilityWidged**
3. Select the actor class with a configured buoyancy system. Example boat.

   ![](/images/2025/01/editorb.jpg)

4. Now you can edit the data asset settings in the right panel. When work is done, click **Save Asset**.

**Editor controls:**

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

> You can run the game and edit buoyancy setting in runtime, everything will be update and you will see the changes in your game.

**Good practices and solving problems:**

- If the **boat is flipping**, then adjust the center of mass Z location (set it to a lower value so it will behave stably)
- Try to fit the pontoons to the mesh geometry. It is more precise when detecting water and behaves more predictably.
- Adjust the side drag to stop boats from sliding sideways.
- Edit FluxBuoyancyEditor and game in runtime mode.
- Make sure the physical body has **Tag** set to FluxBuoyancyOwner
- Use the **DrawDebug** option to visualize pontoons in runtime.
- In the **BP_FluxBuoyancyComponent,** UsePontoonsInFluxData forces Flux data to generate custom readback points for every pontoon; it is precise but may also be slow in case of many pontoons.
