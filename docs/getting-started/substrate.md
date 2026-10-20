# Substrate compatibility

::: tip Tip
Since the release of Unreal Engine 5.7, the Substrate-related chapter is no longer relevant; Substrate is officially stable and compatible with Fluid Flux.
:::

Substrate is Unreal Engine 5’s advanced material authoring framework, replacing the fixed suite of shading models and blend modes, such as Default Lit and Clear Coat, with a more expressive, modular system. Substrate is still experimental (unstable), and many developers may not support it yet.

The Fluid Flux update 3.0.3 introduces Substrate support in UE5.4 and UE5.5. However, the pack is developed by default using the standard material system. Substrate translators do not fully convert Fluid Flux materials to the new system, so you need additional patched material files to ensure compatibility.

::: info Info
In the case of Fluid Flux, there are no noticeable visual improvements or benefits from switching to the Substrate system. As a result, the entire process aims to maintain compatibility across all projects.
:::

1. Enable substrate in your project.
2. Download the [patched materials](https://drive.google.com/file/d/1jYpa3cTYVoS3Qg9um5WtDbULW9IRC0rk/view?usp=sharing) pack.
3. Unzip the files and note that the file hierarchy matches the Fluid Flux structure.
4. Copy the entire FluidFlux folder hierarchy to the Content folder in your project. Accept replacing files.
