<script setup lang="ts">
import { profile } from '../content/profile'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="container footer__inner">
      <span>© {{ year }} {{ profile.name }}</span>
      <span>
        Built with Vue 3, TypeScript, and Vite.
        <a :href="profile.repoUrl" target="_blank" rel="noreferrer">Source</a>
      </span>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  border-top: 1px solid var(--border);
  padding-block: var(--space-6);
  color: var(--text-muted);
  font-family: var(--font-mono);
  font-size: var(--step--1);
}

.footer__inner {
  display: flex;
  justify-content: space-between;
  gap: var(--space-4);
  flex-wrap: wrap;
}
</style>
