# Niagara integration

The Niagara integration is based on three elements:

1. `BP_FluxNiagaraActor` communicates with the simulation and sends data to the Niagara system.
2. **NE_FluxData** emitter should be inherited by the Niagara system to read the data.

   ![](/images/2021/09/niagara.jpg)

3. NMS_FluxData is a specialized module that extracts simulation data from **Stage Transients** variables to drive the particles.

   ![](/images/2021/09/stagetrans.jpg)

All particle systems (trash, plants, splashes) in the pack are constructed similarly; feel free to check and modify the examples.
