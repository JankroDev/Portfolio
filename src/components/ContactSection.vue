<script setup lang="ts">
import { profile } from '../content/profile'
</script>

<template>
  <section id="contact" class="section">
    <div class="container">
      <p class="eyebrow">Contact</p>
      <h2 class="section-title">Let's talk.</h2>
      <p class="contact__lead">
        I'm open to full-time developer roles and select contract work. Email is the fastest way to reach me.
      </p>
      <div class="contact__links">
        <a :href="`mailto:${profile.email}`" class="btn btn-primary">{{ profile.email }}</a>
        <a :href="profile.linkedin" class="btn btn-ghost" target="_blank" rel="noreferrer">LinkedIn</a>
        <a :href="profile.github" class="btn btn-ghost" target="_blank" rel="noreferrer">GitHub</a>
        <a :href="profile.resumeUrl" class="btn btn-ghost" download>Resume (PDF)</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact__lead {
  font-size: var(--step-1);
  color: var(--text-muted);
  margin-bottom: var(--space-6);
}

.contact__links {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}
</style>
