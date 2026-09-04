<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { getProject, getAdjacent } from '../content/projects'
import StackTags from '../components/StackTags.vue'
import StorySoftEmbed from '../components/StorySoftEmbed.vue'

const props = defineProps<{ slug: string }>()
const router = useRouter()

const project = computed(() => getProject(props.slug))
const adjacent = computed(() => getAdjacent(props.slug))

watchEffect(() => {
  if (!project.value) router.replace('/')
})
</script>

<template>
  <article v-if="project" class="case">
    <div class="container">
      <RouterLink :to="{ path: '/', hash: '#work' }" class="case__back">← All work</RouterLink>

      <header class="case__header">
        <p class="eyebrow">{{ project.employer }} · {{ project.year }}</p>
        <h1>{{ project.title }}</h1>
        <p class="case__summary">{{ project.summary }}</p>
        <dl class="case__meta">
          <div><dt>Role</dt><dd>{{ project.role }}</dd></div>
          <div><dt>Stack</dt><dd><StackTags :items="project.stack" /></dd></div>
        </dl>
      </header>

      <StorySoftEmbed v-if="project.embed" :embed="project.embed" :fallback="project.images[0]" class="case__embed" />

      <div v-if="project.images.length" class="gallery">
        <figure v-for="img in project.images" :key="img.src">
          <img :src="img.src" :alt="img.alt" loading="lazy" />
          <figcaption>{{ img.alt }}</figcaption>
        </figure>
      </div>

      <div class="case__body">
        <section v-for="s in project.sections" :key="s.heading" class="case__section">
          <h2>{{ s.heading }}</h2>
          <p v-for="(para, i) in s.paragraphs" :key="i">{{ para }}</p>
        </section>

        <section v-if="project.links?.length" class="case__section">
          <h2>Links</h2>
          <ul class="case__links">
            <li v-for="link in project.links" :key="link.href">
              <a :href="link.href" target="_blank" rel="noreferrer">{{ link.label }} ↗</a>
            </li>
          </ul>
        </section>
      </div>

      <nav v-if="adjacent" class="pager" aria-label="Other projects">
        <RouterLink :to="`/work/${adjacent.prev.slug}`" class="pager__prev">
          <span class="pager__label">Previous</span>
          <span class="pager__title">{{ adjacent.prev.title }}</span>
        </RouterLink>
        <RouterLink :to="`/work/${adjacent.next.slug}`" class="pager__next">
          <span class="pager__label">Next</span>
          <span class="pager__title">{{ adjacent.next.title }}</span>
        </RouterLink>
      </nav>
    </div>
  </article>
</template>

<style scoped>
.case {
  padding-block: var(--space-7) var(--space-8);
}

.case__back {
  display: inline-block;
  font-family: var(--font-mono);
  font-size: var(--step--1);
  color: var(--text-muted);
  transition: color var(--duration) var(--ease);
}

.case__back:hover {
  color: var(--accent);
  text-decoration: none;
}

.case__header {
  margin-block: var(--space-6) var(--space-7);
  max-width: 48rem;
}

.case__summary {
  font-size: var(--step-1);
  color: var(--text-muted);
  margin-block: var(--space-4) var(--space-5);
}

.case__meta {
  display: flex;
  gap: var(--space-6);
  flex-wrap: wrap;
  margin: 0;
}

.case__meta dt {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-muted);
  margin-bottom: var(--space-1);
}

.case__meta dd {
  margin: 0;
}

.case__embed {
  margin-bottom: var(--space-7);
}

.gallery {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-5);
  margin-bottom: var(--space-7);
}

.gallery figure:first-child {
  grid-column: 1 / -1;
}

.gallery figure {
  margin: 0;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: border-color var(--duration) var(--ease);
}

.gallery figure:hover {
  border-color: var(--accent);
}

.gallery img {
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  object-position: top;
  transition: transform 400ms var(--ease);
}

.gallery figure:first-child img {
  aspect-ratio: 21 / 9;
}

.gallery figure:hover img {
  transform: scale(1.02);
}

.gallery figcaption {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--text-muted);
  padding: var(--space-3) var(--space-4);
  border-top: 1px solid var(--border);
}

.case__body {
  max-width: var(--measure);
  display: grid;
  gap: var(--space-6);
}

.case__section h2 {
  font-size: var(--step-2);
  margin-bottom: var(--space-3);
}

.case__section p {
  font-size: var(--step-1);
}

.case__links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: var(--space-4);
  flex-wrap: wrap;
}

.pager {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4);
  margin-top: var(--space-8);
  border-top: 1px solid var(--border);
  padding-top: var(--space-5);
}

.pager a {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  color: var(--text);
  padding: var(--space-4);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--bg-elevated);
  transition: border-color var(--duration) var(--ease), background-color var(--duration) var(--ease);
}

.pager a:hover {
  text-decoration: none;
  border-color: var(--accent);
  background: var(--accent-soft);
}

.pager__next {
  text-align: right;
}

.pager__label {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--text-muted);
}

.pager__title {
  font-family: var(--font-display);
  font-size: var(--step-1);
}

@media (max-width: 640px) {
  .gallery {
    grid-template-columns: 1fr;
  }
  .gallery figure:first-child img {
    aspect-ratio: 16 / 10;
  }
  .pager {
    grid-template-columns: 1fr;
  }
  .pager__next {
    text-align: left;
  }
}
</style>
