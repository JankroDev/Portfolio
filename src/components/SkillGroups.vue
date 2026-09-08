<script setup lang="ts">
import { skillGroups } from '../content/skills'
import StackTags from './StackTags.vue'
</script>

<template>
  <section id="skills" class="section">
    <div class="container">
      <p class="eyebrow">Skills</p>
      <h2 class="section-title">What I work in.</h2>
      <div class="groups">
        <div v-for="group in skillGroups" :key="group.name" class="group">
          <h3 class="group__name">{{ group.name }}</h3>
          <StackTags :items="group.items" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.groups {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-5);
}

/* An odd number of groups leaves the last card alone on its row; let it fill. */
.group:last-child:nth-child(odd) {
  grid-column: 1 / -1;
}

.group {
  padding: var(--space-5);
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
}

.group__name {
  font-size: var(--step-1);
  margin-bottom: var(--space-3);
}

@media (max-width: 640px) {
  .groups {
    grid-template-columns: 1fr;
  }
}
</style>
