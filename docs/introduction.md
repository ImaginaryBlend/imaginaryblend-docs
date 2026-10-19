# Introduction

<YouTube id="-py91uoMVNo" />

- **Category:** Blueprints
- **Update:** 3.0.4 (10.01.2025)
- **Unreal Engine:** 4.26 - 5.51
- **Platforms:** VR, PC, Console

The Fluid Flux is a powerful water system based on 2D shallow-water fluid simulations.

Fluid Flux is a comprehensive solution for simulating realistic water surfaces and fluid interactions within Unreal Engine. This documentation outlines its core features, tools, and best practices to help users achieve optimal results.

A foundational understanding of the Unreal Editor, Blueprint visual scripting, and content management is beneficial when working with the system. Following the outlined procedures will ensure a streamlined workflow and effective implementation across various project types.

## Installation

You can purchase Fluid Flux on the Fab marketplace and install it using the **FAB plugin**.

Fluid Flux receives frequent updates, so always use the latest version. The latest version is listed on the Unreal Marketplace page and at the beginning of the documentation.

Following the [installation/update procedure](https://imaginaryblend.com/2024/01/17/marketplace-product-update-process/) ensures a smooth transition and minimizes the risk of potential issues arising during the update process.

---

List of plugins required by Fluid Flux:

![](/images/2021/09/plugins-1.png)

- *UE Fab Plugin (installation)*
- *PythonScriptPlugin, (editor tools)*
- *EditorScriptingUtilities, (editor tools)*
- *GeometryScripting, (mesh generator)*
- *ProceduralMeshComponent,*
- *Niagara,*

---

In the final stage of configuring the project, make sure that the **project settings** are properly configured:

| Setting | Value | Description |
| --- | --- | --- |
| **DBuffer** | **Enabled** | It’s required for proper decal rendering (wetness and caustics). If you don’t want to use those effects, you can disable the decal material in the surface actor. |
| **CustomDepth-Stencil Pass** | **Enabled** | This feature is required to render underwater depth maps. |
| **Velocity Pass** | **Write During Base Pass** | This feature improves the motion vector rendering. |
| **Default Renderer Motion Vector** | **Precise** | This feature improves the motion vector rendering. |
| **Mask material only in early Z-pass** | **False** | Required for proper tunnel capturing. |
| **HighQualityTranslucencyReflections** | **Disabled** | This option can cause a crash when used in conjunction with the substrate. |
| **(config) r.OIT.SortedPixels** | **Disabled** | This option may cause wrong translucent sorting in underwater materials. |

Additionally, if you plan to use a grooming system (such as hair) in your project, ensure the post-process runs after the grooming materials are finished. Use these console commands to force the order:
**r.HairStrands.ComposeAfterTranslucency 0**

Ensure that **Real-time rendering** is active in your viewport, as it is required to simulate fluid motion in the editor.

![](/images/2021/09/realtime.png)

## Substrate compatibility

> Since the release of Unreal Engine 5.7, the Substrate-related chapter is no longer relevant; Substrate is officially stable and compatible with Fluid Flux.

Substrate is Unreal Engine 5’s advanced material authoring framework, replacing the fixed suite of shading models and blend modes, such as Default Lit and Clear Coat, with a more expressive, modular system. Substrate is still experimental (unstable), and many developers may not support it yet.

The Fluid Flux update 3.0.3 introduces Substrate support in UE5.4 and UE5.5. However, the pack is developed by default using the standard material system. Substrate translators do not fully convert Fluid Flux materials to the new system, so you need additional patched material files to ensure compatibility.

> In the case of Fluid Flux, there are no noticeable visual improvements or benefits from switching to the Substrate system. As a result, the entire process aims to maintain compatibility across all projects.

1. Enable substrate in your project.
2. Download the [patched materials](https://drive.google.com/file/d/1jYpa3cTYVoS3Qg9um5WtDbULW9IRC0rk/view?usp=sharing) pack.
3. Unzip the files and note that the file hierarchy matches the Fluid Flux structure.
4. Copy the entire FluidFlux folder hierarchy to the Content folder in your project. Accept replacing files.

## Project structure

The Fluid Flux project is structured in a specific manner. This brief description will help you understand the type of content available in each folder. Before starting work with the pack, familiarize yourself with its structure and the systems it provides.

![](/images/2021/09/Structure-1.png)

- **Demo** – The Demo folder is the most important for new users. The demo examples present how to use this pack, achieve effects, and integrate systems with characters. The demo files demonstrate everything covered in this documentation. The product does not link files in the Demo folder, and **you can remove it** from the project at any time to optimize build/project size.
- **Editor** – editor-related tools, icons, utilities, procedural mesh generator
- **Simulation** – Shallow water simulation actor and tools for controlling fluids and generating states.
- **Coastline** – Generating coastline data for oceans.
- **Interaction** – A simple system of interactions that adds detailed, lightweight ripple fluid simulations.
- **Surface** – Renders surface, underwater volume, post-process, caustics, and plays audio.
- **Tools** – Multiple tools that are shared between systems for generating heightmaps, SDF, and procedural meshes.
- **Environment** – Niagara particle systems that allow readback information from simulation, implementing swimming, buoyancy, and drive particles using the fluid state.
- **Waves** is a system designed to generate ocean waves for the background and mix them with fluid simulation.

## Reporting Bugs

This [Support and Reporting Bugs](https://imaginaryblend.com/2024/03/29/reporting-bugs/) guide provides essential guidance on reporting system errors. Learn how to identify, report, and analyze bugs to ensure smooth support.
