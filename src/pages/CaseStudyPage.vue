<script setup lang="ts">
defineProps<{ slug: string }>()
</script>

<template>
  <div class="container">
    <h1>{{ slug }}</h1>
  </div>
</template>
