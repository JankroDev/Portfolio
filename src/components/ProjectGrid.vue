<script setup lang="ts">
import { projects } from '../content/projects'
import ProjectCard from './ProjectCard.vue'
</script>

<template>
  <section id="work" class="section">
    <div class="container">
      <p class="eyebrow">Selected work</p>
      <h2 class="section-title">Six projects, all in production.</h2>
      <div class="grid">
        <ProjectCard v-for="p in projects" :key="p.slug" :project="p" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-6) var(--space-5);
}

@media (max-width: 1024px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
