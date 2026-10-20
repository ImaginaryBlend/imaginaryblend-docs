# Updating process

Due to the extensive scope of package updates, certain aspects might have been overlooked during the development and testing phases, and it may be dangerous for your project, so make sure you will have at least a few days to fully integrate the new version with your project in case you need my help.

Changes that update may include:

- Adding new features and example maps
- Enhancing memory management, fixing bugs, optimizing performance,
- Ensuring compatibility with the latest technologies,
- Providing a better user-friendly experience,
- Improving quality and efficiency,

However, be mindful of potential issues when updating.

- Removing, renaming, moving files and attributes,
- Overriding your changes,
- Adding new bugs,

I strongly recommend using a version control system (**Perforce, GIT, SVN**) for your projects, which is the safest way to avoid unexpected problems and blackout changes. **Making a copy of your project** before downloading the update is strongly recommended to ensure a smooth transition.

## Recommended steps

Please note that I might not automatically handle the removal or renaming of assets during the update process. Consequently, there is a possibility of “ghost files” from the previous version of the product. To mitigate any potential issues, it is recommended to follow these steps for updating:

1. Ensure that the update for the engine version you use is already available on the **marketplace** page.
2. Navigate to the Content/**UpdatedPackage** folder in your project.
3. Copy the Content/**UpdatedPackage** for backup in case of unexpected issues that may occur after the update.
4. Remove or delete the entire old version of the product from the **UpdatedPackage** folder.
5. **Download** the new version of the product and extract it into the **UpdatedPackage** folder, ensuring a fresh and clean update.
6. Run your project, **test** the example maps in the demo folder, and check if the product still works correctly with your project.

## Modifying the pack

It’s best to avoid **making modifications** to the pack by yourself. If you need to make changes, I recommend inheriting classes/materials and overriding functions. Store child classes and custom material instances outside the pack folder. If you need minor trivial modifications that could improve usability, you can let me know. We will figure out some solution and maybe put it into the next update.

In case of any problem, contact me using the support email at [imaginaryblend@gmail.com](mailto:imaginaryblend@gmail.com).

::: tip
Before updating, read the [release notes](/updates/) of the new version – they list changes that are not backward compatible.
:::
