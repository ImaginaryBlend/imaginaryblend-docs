<script setup>
defineProps({ id: { type: String, required: true } })
</script>

<template>
  <div class="video-frame">
    <iframe
      :src="`https://www.youtube.com/embed/${id}`"
      title="YouTube video"
      loading="lazy"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>
</template>
