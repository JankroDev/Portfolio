<script setup lang="ts">
import type { Project } from '../content/types'
import StackTags from './StackTags.vue'

defineProps<{ project: Project }>()
</script>

<template>
  <RouterLink :to="`/work/${project.slug}`" class="card">
    <div class="card__media">
      <img v-if="project.thumbnail" :src="project.thumbnail" :alt="`${project.title} screenshot`" loading="lazy" />
      <div v-else class="card__placeholder">
        <span aria-hidden="true">{{ project.title }}</span>
        <small>NDA · no screenshots</small>
      </div>
    </div>
    <div class="card__body">
      <div class="card__meta">{{ project.employer }} · {{ project.year }}</div>
      <h3 class="card__title">{{ project.title }}</h3>
      <p class="card__summary">{{ project.summary }}</p>
      <StackTags :items="project.stack" :max="4" />
    </div>
  </RouterLink>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  color: var(--text);
  transition: border-color var(--duration) var(--ease), box-shadow var(--duration) var(--ease),
    transform var(--duration) var(--ease);
}

.card:hover {
  text-decoration: none;
  border-color: var(--accent);
  transform: translateY(-2px);
  box-shadow: 0 16px 32px -20px rgba(0, 0, 0, 0.6);
}

.card__media {
  aspect-ratio: 16 / 10;
  background: var(--bg);
  border-bottom: 1px solid var(--border);
  overflow: hidden;
}

.card__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top left;
  transition: transform 400ms var(--ease);
}

.card:hover .card__media img {
  transform: scale(1.03);
}

.card__placeholder {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  padding: var(--space-5);
  font-family: var(--font-display);
  font-size: var(--step-2);
  background:
    repeating-linear-gradient(135deg, transparent 0 9px, var(--border) 9px 10px),
    var(--bg);
}

.card__placeholder small {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--text-muted);
  margin-top: var(--space-1);
}

.card__body {
  padding: var(--space-5);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.card__meta {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--text-muted);
}

.card__title {
  font-size: var(--step-1);
}

.card__summary {
  color: var(--text-muted);
  margin: 0 0 var(--space-1);
  font-size: var(--step--1);
  flex: 1;
}
</style>
