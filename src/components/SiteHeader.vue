<script setup lang="ts">
import { profile } from '../content/profile'

const nav = [
  { label: 'Work', hash: '#work' },
  { label: 'Experience', hash: '#experience' },
  { label: 'About', hash: '#about' },
  { label: 'Contact', hash: '#contact' },
]
</script>

<template>
  <header class="header">
    <div class="container header__inner">
      <RouterLink to="/" class="header__name">{{ profile.name }}</RouterLink>
      <nav class="header__nav" aria-label="Primary">
        <RouterLink v-for="item in nav" :key="item.hash" :to="{ path: '/', hash: item.hash }">
          {{ item.label }}
        </RouterLink>
      </nav>
      <div class="header__links">
        <a :href="`mailto:${profile.email}`" aria-label="Email">Email</a>
        <a :href="profile.github" target="_blank" rel="noreferrer" aria-label="GitHub">GitHub</a>
        <a :href="profile.linkedin" target="_blank" rel="noreferrer" aria-label="LinkedIn">LinkedIn</a>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 10;
  background: color-mix(in srgb, var(--bg) 88%, transparent);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border);
}

.header__inner {
  display: flex;
  align-items: center;
  gap: var(--space-5);
  padding-block: var(--space-4);
}

.header__name {
  font-family: var(--font-display);
  font-size: var(--step-1);
  color: var(--text);
}

.header__name:hover {
  text-decoration: none;
  color: var(--accent);
}

.header__nav {
  display: flex;
  gap: var(--space-4);
  margin-left: auto;
}

.header__nav a,
.header__links a {
  font-family: var(--font-mono);
  font-size: var(--step--1);
  color: var(--text-muted);
}

.header__nav a:hover,
.header__links a:hover {
  color: var(--text);
  text-decoration: none;
}

.header__links {
  display: flex;
  gap: var(--space-3);
  padding-left: var(--space-4);
  border-left: 1px solid var(--border);
}

@media (max-width: 640px) {
  .header__nav {
    display: none;
  }
  .header__links {
    margin-left: auto;
  }
}
</style>
