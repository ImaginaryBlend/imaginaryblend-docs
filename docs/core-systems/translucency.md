# Translucency

Rendering translucent objects underwater is a challenging problem. Single-layer water materials do not support translucency, so translucent objects are invisible when viewed from above the water.

I recommend using dithering instead of translucency.

The underwater volume post-process implementation is more functional because it can be overlaid with translucent meshes. This means that a translucent mesh is rendered on top of the post-process volume, but developers must handle the fading.

![](/images/2021/09/fade.jpg)

*Example translucent mesh fading implementation.*

Final effect:

<MediaVideo src="/images/2021/09/2023-12-13-19-51-17.mp4" />
