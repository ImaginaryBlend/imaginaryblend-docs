# Open world and large worlds

## Open world

A dedicated **open-world** setup has **not been tested**. The demo examples show how the system can be used. I can’t promise anything more at this point of development. Just assume that you get what you see in my videos, no more, no less.

## Large World Coordinates

The improved version of Fluid Flux handles LWC (large world coordinates) and should work correctly at a distance of up to 150 km from the center of the level on the X and Y axes. This use case can be tested on the `FluxOceanMap`, where you can find the teleport actor that will move the character to another location far from the center of the map. I won’t spoil what else is there; you should try it yourself!

![](/images/2024/11/LWC_test-1.png)

Pushing Fluid Flux to its limit is crucial for me; therefore, many tests were made on large-scale coordinates. However, note the current status of this feature:

- I’ve addressed and improved everything I found: underwater post-process glitches, simulation domain update bugs, disappearing surface meshes, swimming detection and Niagara particle warnings.
- This does not mean the coastline or simulation domain can cover an area of 150 km. For now, the system is mainly ready for ships traveling through the open ocean.
- LWC required a workaround based on a respawning effect every few kilometers, which is automated at runtime. However, you may notice some glitches in the editor preview that can be fixed by repositioning the surface actor. The debug help menu shows the distance from the center.
