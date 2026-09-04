<script setup lang="ts">
import { experience } from '../content/experience'
</script>

<template>
  <section id="experience" class="section">
    <div class="container">
      <p class="eyebrow">Experience</p>
      <h2 class="section-title">Where I've shipped.</h2>
      <ol class="timeline">
        <li
          v-for="item in experience"
          :key="item.company + item.role"
          class="timeline__item"
          :class="{ 'timeline__item--compact': item.compact }"
        >
          <div class="timeline__when">{{ item.start }} – {{ item.end }}</div>
          <div class="timeline__what">
            <h3 class="timeline__role">{{ item.role }}</h3>
            <div class="timeline__company">{{ item.company }} · {{ item.location }}</div>
            <p class="timeline__summary">{{ item.summary }}</p>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.timeline {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: var(--space-6);
}

.timeline__item {
  position: relative;
  display: grid;
  grid-template-columns: 11rem 1fr;
  gap: var(--space-5);
  padding-left: var(--space-5);
  border-left: 1px solid var(--border);
}

.timeline__item::before {
  content: '';
  position: absolute;
  top: 0.4rem;
  left: -5px;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--bg);
  border: 1px solid var(--text-muted);
}

.timeline__item:first-child {
  border-left-color: var(--accent);
}

.timeline__item:first-child::before {
  border-color: var(--accent);
  background: var(--accent);
  box-shadow: 0 0 0 4px var(--accent-soft);
}

.timeline__when {
  font-family: var(--font-mono);
  font-size: var(--step--1);
  color: var(--text-muted);
  padding-top: 0.35rem;
}

.timeline__role {
  font-size: var(--step-1);
}

.timeline__company {
  color: var(--text-muted);
  margin-block: var(--space-1) var(--space-3);
}

.timeline__summary {
  margin: 0;
}

.timeline__item--compact {
  padding-block: var(--space-1);
}

.timeline__item--compact::before {
  width: 7px;
  height: 7px;
  left: -4px;
}

.timeline__item--compact .timeline__role {
  font-size: var(--step-0);
  font-family: var(--font-body);
  font-weight: 500;
}

.timeline__item--compact .timeline__company {
  margin-block: var(--space-1) var(--space-1);
}

.timeline__item--compact .timeline__summary {
  color: var(--text-muted);
  font-size: var(--step--1);
}

@media (max-width: 640px) {
  .timeline__item {
    grid-template-columns: 1fr;
    gap: var(--space-2);
  }
}
</style>
