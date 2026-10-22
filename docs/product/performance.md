# Performance

Many users are concerned about performance and don’t know if it requires a high-spec PC. Performance depends on the GPU, render resolution, and enabled engine options, but the product is optimized for older devices and can be adjusted for more demanding projects.

## Test results

I heavily recommend downloading the demo and testing it on the target device. Example results of my tests are presented below:

| GPU | Resolution | River map | Island map |
| --- | --- | --- | --- |
| RTX 3080 | 2560×1440 | 320-380 FPS | 260-310 FPS |
| RTX 2080 | 2560×1440 | 160-200 FPS | 110-160 FPS |
| GTX 860M (8-year-old notebook, Lenovo Y50) | 1920×1080 | 25-30 FPS | 20-25 FPS |

## Large maps

In the case of bigger maps, efficiency may sometimes be a problem. I recommend avoiding simulation resolutions larger than 1024×1024 in games. The calculation of a large-scale simulation often requires a substantial number of computations. I suggest utilizing the lowest feasible resolution for the simulation. For example, the maximum resolution in the example demos I provide is 1024×256 (BeachMap). The simulation frame can be baked into data assets and rendered without the additional cost of updating the simulation, which is incredibly efficient and valuable for rivers. You can also reduce memory usage by applying additional compression.

## Scalability

The simulation domain requires allocating floating-point render targets and updating them every frame, which can be expensive.
The size of domains can be increased by changing the precision of details per simulation cell. Ocean setup does not require allocating memory, but rendering water is limited by floating-point calculations. Far from the center of the map, floating-point precision may cause unpredictable behaviors, such as disappearing post-process or surface artifacts. The coastline domain covers up to 10 km x 10 km (2048 x 2048 at 500 cm per pixel); the ocean has been used up to 160 km x 160 km and has no fixed size limit.

| Domain | Resolution | Precision | Maximum domain size |
| --- | --- | --- | --- |
| Simulation | up to 1024 x 1024 | up to 100 cm per pixel | 1km x 1km |
| Coastline (island) | up to 2048 x 2048 | up to 500 cm per pixel | 10 km x 10 km |
| Ocean | n/a | n/a | 160 km x 160 km (no fixed limit) |
