# Ground capture

Ground capture is a key component of Fluid Flux systems, ensuring that fluids interact correctly with the environment by requiring a defined container or boundary. It detects water blockers using a top-down projection of the scene, which generates a height map. The height map, also called a ground map, is a specialized texture where each pixel represents the height of the underlying geometry. This process enables precise identification of fluid boundaries and supports realistic interactions with complex terrain.

In the Fluid Flux pack, this task is handled by **FluxHeightmapComponent**, which is used in both the simulation and coastline domains. The generated height data play a pivotal role in determining the appearance and movement of water on slopes.

## Visibility options

The ground scene capture component renders the current scene into a heightmap texture. Sometimes, we must exclude certain actors, such as bridges, that should not block fluid. In the ‘**Domain:Heightmap: CaptureVisibility**‘ tab, you can find options that may help determine which meshes should be visible in the heightmap:

![](/images/2021/09/captureOptions.jpg)

**VisibilityMode** can be used to determine whether the capture actor should render the entire scene and exclude specified actors (**HideAllListed**) or build a list of actors that should be used as blockers (**ShowOnlyListed**).

- **ActorsReferences** – exclude chosen actor objects from your scene
- **Actors of Class** – can be used for excluding by type of actor class and its child classes
- **ActorsWithTag** = “**FluxHide**“: Every actor that uses this tag will be added to the list of excluded objects.

  ![](/images/2021/09/hide.png)

- Use the **M_PhantomMesh** material to render the mesh only during ground capture processing (which is invisible to the world). This technique is suitable for imitating soft waterfall slopes or creating an alternative ground version when the environment is more complex (like indoor meshes).

## Solving issues

If something is not rendering properly in the height map, you can investigate the issue without simulating the fluid. The debug preview option is the most crucial feature for domain actors. It displays a height map that blocks water in the scene when problems, bugs, or unexpected behavior occur.

There are many ways to configure the debug preview:

| Domain DebugAttribute | Description |
| --- | --- |
| DebugHiddenInGame | Debugging is visible only in the editor. You can turn it off to see how the ground map is generated at runtime (sometimes, there may be a difference, for example, when the map is loading for a long time and the ground map captures the LOD details). |
| DebugPreview | Enable/Disable debug mesh. |
| DebugSelectedOnly | Allows you to preview debug only when the domain is selected. |

![](/images/2021/09/debug_ground.jpg)

*Debug preview. Notice colored horizontal lines coating the geometry of the environment.*

Not every detail will be captured on the ground map, and accuracy depends on the grid scale (attribute AreaWorldPixelSize). The shader renders this preview by coloring lines based on slope and exposing the ground’s discontinuities.

| Visualization | Description |
| --- | --- |
| **Green lines** | Easy to simulate, very stable fluid. |
| **Blue lines** | It has a good slope for moving fluid in some direction. |
| **Red lines** | The area may become unstable if fluid flows over it, but it is suitable for walls. |
| **White lines** | Some caves may expose holes in the fluid mesh. |
| **Fully red polygons** | Represent holes and discontinuities in the mesh. Eliminate them if fluid can flow into this area. |

**Landscape or mesh is not rendering to the ground map**

If the “PixelDepthOffset” feature is used in the material, it may not be rendered to a ground map, which can cause issues with some simulations. You can easily fix this in your material with a simple modification. Use the **MF_FluxPixelDepthOffset** material node to disable “PixelDepthOffset” while rendering the ground map.

The **M_Photoscan_Master** material is an example of a workaround for this problem using the **MF_FluxPixelDepthOffset** node.

![](/images/2021/09/pixel-depth-300x83.jpg)

**Wrong Domain Z location:**

Remember: after adding the **Domain actor to** your map, you must adjust the domain actor’s height (Z position) based on your landscape. The debug grid on top of the landscape geometry indicates everything works fine.

**Groundmap works in the editor, but it breaks in the build or at runtime.**

There is a slight difference between testing in PIE and running the Shipping/Development build. Understanding this issue is crucial for finding a solution. The editor uses assets that are already loaded and can render them immediately. However, when you run the executable, the system has to stream landscapes and meshes. When the Fluid Flux system captures the ground map and the scene has not yet been streamed, it may result in inaccuracies, such as a flat ground map or the use of lower LOD levels. There are several potential solutions:

1. Increasing the **SimulationDomain.RuntimeCaptureDelay** – delay is the simplest way to determine if this is the issue in your case. If, after increasing the value, the ground is captured correctly, it indicates that the ground was not ready when it was initially captured. However, this is not the optimal solution because you cannot predict how fast the game will load on various target devices. Low-end PCs and consoles may load more slowly, which can result in unpredictable behavior.
2. **OnLevelLoaded** events – The most effective approach is to use **SimulationDomain.RuntimeCaptureDelay = -1** and execute the function **SimulationDomain.BeginPlaySimulation** by hand from an event that notifies you when the level is loaded and ready for use. Unfortunately, there are no such events in the blueprint, so you will need to track this on your own in C++.
3. Setting **SimulationDomain.UseInitialStateGround=true** forces the system to utilize the ground map from the data stored in the exported **SimulationDomain.InitialState**
