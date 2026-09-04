<script setup lang="ts">
import { profile } from '../content/profile'
</script>

<template>
  <section id="about" class="section">
    <div class="container about">
      <div>
        <p class="eyebrow">About</p>
        <h2 class="section-title">Self-taught, customer-tested.</h2>
      </div>
      <div class="about__body">
        <p v-for="(para, i) in profile.about" :key="i">{{ para }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about {
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: var(--space-6);
}

.about__body p {
  font-size: var(--step-1);
  line-height: 1.6;
}

.about__body p:first-child {
  color: var(--text);
}

.about__body p:not(:first-child) {
  color: var(--text-muted);
}

@media (max-width: 1024px) {
  .about {
    grid-template-columns: 1fr;
  }
}
</style>
