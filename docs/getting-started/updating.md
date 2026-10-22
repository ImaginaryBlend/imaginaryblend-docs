# Updating process

Due to the extensive scope of package updates, some issues may be overlooked during development and testing, which can affect your project. Make sure you have at least a few days to fully integrate the new version with your project in case you need my help.

An update may include:

- new features and example maps,
- better memory management, bug fixes and performance optimizations,
- compatibility with the latest technologies,
- a more user-friendly experience,
- improved quality and efficiency.

However, be aware of potential issues when updating:

- removed, renamed or moved files and attributes,
- your changes being overwritten,
- new bugs.

I strongly recommend using a version control system (**Perforce, Git, SVN**) for your projects – it is the safest way to avoid unexpected problems and lost changes. **Making a copy of your project** before downloading the update is also recommended.

## Recommended steps

Please note that I might not automatically handle the removal or renaming of assets during the update process. Consequently, there is a possibility of “ghost files” from the previous version of the product. To mitigate any potential issues, follow these steps when updating:

1. Ensure that the update for the engine version you use is already available on the **Fab product page**.
2. Navigate to the Content/**FluidFlux** folder in your project – this is where the product is installed.
3. Copy the Content/**FluidFlux** folder as a backup in case of unexpected issues after the update.
4. Delete the entire old version of the product (the **FluidFlux** folder).
5. **Add** the new version to your project with the Fab plugin (**Add to Project**, see [Installation](/getting-started/installation#installing-from-fab)). It is installed into a fresh **FluidFlux** folder, ensuring a clean update.
6. Run your project, **test** the example maps in the demo folder, and check if the product still works correctly with your project.

## Modifying the pack

It’s best to avoid **making modifications** to the pack by yourself. If you need to make changes, I recommend inheriting classes/materials and overriding functions. Store child classes and custom material instances outside the pack folder. If you need minor modifications that could improve usability, let me know – we will find a solution, and it may be included in the next update.

In case of any problem, contact me using the support email at [imaginaryblend@gmail.com](mailto:imaginaryblend@gmail.com).

::: tip
Before updating, read the [release notes](/updates/) of the new version – they list changes that are not backward compatible.
:::
