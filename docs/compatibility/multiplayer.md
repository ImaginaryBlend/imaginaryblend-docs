# Multiplayer

Fluid Flux is not inherently designed for multiplayer environments. However, under specific conditions and certain limitations, it can be utilized in multiplayer scenarios as a visual addition through carefully crafted gameplay design. This chapter outlines the challenges, technical limitations, and potential workarounds developers should consider when integrating Fluid Flux into multiplayer games.

The table below presents the current status of multiplayer support inside different domain types.

| Domain type | Status | Description |
| --- | --- | --- |
| Ocean | Replicated | The server sends the wave time and wind settings to the clients. |
| Coastline | **Client-side** | Coastline time replication has not been implemented yet. |
| Simulation (dynamic) | **Client-side** | It can easily desynchronize between the client and the server. The wave generator uses render time, so it is not yet deterministic. |
| Simulation state | Works | The state is the same for the client and server. It does not require any replication. |

## Technical limitations

1. **Client-Side Simulation**: Fluid Flux uses Niagara readback to sample water data, which is essential for GPU computations. However, Niagara does not function on dedicated servers, making it impossible to process critical data from the server side. Simulations are calculated client-side only, and Niagara Readback results are automatically sent to the server. This approach is unsafe for games that rely on an authoritative server, which can be problematic for competitive gameplay.
2. **Bandwidth Constraints**: The simulation involves substantial dynamic data changes, which are challenging to synchronize over a network due to limited bandwidth. Transmitting large amounts of fluid data in real-time is impractical for most multiplayer setups. Simulations can quickly desynchronize without mechanisms to correct discrepancies between the server and clients, leading to inconsistent results across players.
3. **Non-Deterministic Behavior Across GPUs**: While the simulation is deterministic on the same machine under controlled conditions, differences in floating-point operations across GPUs can lead to minor discrepancies, complicating synchronization.
4. **State Recovery Issues**: Synchronizing the simulation’s state is particularly challenging when new players join or frame spikes occur. The system cannot recover smoothly from these situations, even with limits on the number of accumulated iterations per frame. In situations like this, storing prebaked simulation states that can be loaded after the player joins the game is recommended. For example, a water state prepared for the moment when the dam breaks.
5. **Vehicle Replication**: The demo maps include a drivable boat system that works in multiplayer. However, client-side movement lacks smoothness and would require external plugins to improve actor physics replication. Unreal Engine 5.5 introduces features such as the “mover” and enhanced physics replication for multiplayer games, which will be used in future versions of Fluid Flux.

Fluid Flux’s multiplayer capabilities are experimental and come with notable limitations. They are not recommended for competitive gameplay. Developers should weigh these limitations carefully and design gameplay around them to ensure a stable and enjoyable experience for players.
