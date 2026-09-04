<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ items: string[]; max?: number }>()
const shown = computed(() => (props.max ? props.items.slice(0, props.max) : props.items))
</script>

<template>
  <ul class="tags" aria-label="Technologies">
    <li v-for="item in shown" :key="item" class="tag">{{ item }}</li>
  </ul>
</template>

<style scoped>
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  list-style: none;
  margin: 0;
  padding: 0;
}

.tag {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--accent);
  background: var(--accent-soft);
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 0.15rem 0.6rem;
  white-space: nowrap;
}
</style>
