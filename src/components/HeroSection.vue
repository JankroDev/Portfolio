<script setup lang="ts">
import { profile } from '../content/profile'
</script>

<template>
  <section class="hero">
    <div class="container">
      <p class="eyebrow">{{ profile.title }} · Cambridge, Ohio</p>
      <h1 class="hero__headline">{{ profile.headline }}</h1>
      <p class="hero__pitch">{{ profile.pitch }}</p>
      <div class="hero__actions">
        <RouterLink :to="{ path: '/', hash: '#work' }" class="btn btn-primary">See the work</RouterLink>
        <a :href="profile.resumeUrl" class="btn btn-ghost" download>Download resume</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  padding-block: var(--space-8) var(--space-8);
  background:
    radial-gradient(48rem 26rem at 82% -12%, color-mix(in srgb, var(--accent) 16%, transparent), transparent 68%),
    radial-gradient(36rem 22rem at -6% 108%, color-mix(in srgb, var(--accent) 7%, transparent), transparent 72%);
}

.hero__headline {
  max-width: 14ch;
  margin-bottom: var(--space-5);
}

.hero__pitch {
  font-size: var(--step-1);
  color: var(--text-muted);
  max-width: 38rem;
  margin-bottom: var(--space-6);
}

.hero__actions {
  display: flex;
  gap: var(--space-3);
  flex-wrap: wrap;
}
</style>
