# Platforms

Fluid Flux is developed and tested mainly on PC. Other platforms can be used, but each of them comes with limitations described below.

## Consoles (PS5, Xbox)

The **PS5/Xbox** shader compiler defaults to 16-bit float per channel, which means you will have to lower the precision settings in the simulation domain to make it work on console platforms. Unfortunately, this change may cause water loss, as 16bit is not precise enough to simulate conservative water flow in the long term. Please pay attention when your gameplay depends on simulation results.

## VR

The underwater post-process effects in VR mode only work when Project Settings > VR > (enable) **Instanced Stereo = false**. This rendering mode breaks rendering of the translucent meshes and should be **disabled.**

## Mobile

**Single-layer water** material mode is not supported on **mobile**. It’s an engine limitation that Epic Games should solve. Generally, this material mode does not support the absorption coefficient on mobile, so water will look different.

## VR and mobile support status

I currently do not support VR devices or mobile devices.
Dynamic fluid simulations with high precision can’t be computed on mobile devices, so only baked meshes/states can be used on this platform. I am planning to add VR and mobile support in future updates. The pack will receive a cheap surface material mode similar to the solution presented in Aquatic Surface. One user notified me that my demo maps are working without issues on Oculus Quest 2, but I haven’t tested it yet, so I can’t confirm.

## Path tracing

Path tracing is not supported because the Single Layer Water mode does not work.
