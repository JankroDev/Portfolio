<script lang="ts">
export const SCRIPT_URLS = {
  player: 'https://public.storysoft.io/static/@storysoft/storysoft-player/latest/storysoftPlayer.es.js',
  webframe: 'https://public.storysoft.io/static/@storysoft/storysoft-webframe/latest/storysoftWebframe.es.js',
} as const

const UPGRADE_TIMEOUT_MS = 8000

type Kind = keyof typeof SCRIPT_URLS

let scripts: Partial<Record<Kind, HTMLScriptElement>> = {}
let failedKinds: Partial<Record<Kind, boolean>> = {}

export function resetScriptCache() {
  scripts = {}
  failedKinds = {}
}

// Reports success/failure via a synchronous callback (rather than a Promise)
// so a caller's state update lands in the same tick as the DOM 'error'
// event, ahead of Vue's microtask-scheduled render flush.
// Returns an unsubscribe function the caller must invoke on unmount so the
// listener (and the closure it holds) doesn't outlive the component.
function loadScript(kind: Kind, onError: () => void): () => void {
  if (failedKinds[kind]) {
    onError()
    return () => {}
  }
  let script = scripts[kind]
  if (!script) {
    script = document.createElement('script')
    script.type = 'module'
    script.src = SCRIPT_URLS[kind]
    script.dataset.storysoft = kind
    document.head.appendChild(script)
    scripts[kind] = script
  }
  const handleError = () => {
    failedKinds[kind] = true
    onError()
  }
  script.addEventListener('error', handleError)
  return () => script!.removeEventListener('error', handleError)
}
</script>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import type { ProjectEmbed, ProjectImage } from '../content/types'

const props = defineProps<{ embed: ProjectEmbed; fallback?: ProjectImage }>()

const failed = ref(false)
let timer: ReturnType<typeof setTimeout> | undefined
let unsubscribe: (() => void) | undefined

onMounted(() => {
  const tag = `storysoft-${props.embed.kind}`
  timer = setTimeout(() => {
    if (typeof customElements === 'undefined' || !customElements.get(tag)) failed.value = true
  }, UPGRADE_TIMEOUT_MS)

  unsubscribe = loadScript(props.embed.kind, () => {
    failed.value = true
  })
})

onBeforeUnmount(() => {
  if (timer) clearTimeout(timer)
  if (unsubscribe) unsubscribe()
})
</script>

<template>
  <div class="embed">
    <template v-if="failed">
      <img v-if="fallback" :src="fallback.src" :alt="fallback.alt" />
      <p class="embed__note">The live StorySoft embed could not load here, so this is a screenshot instead.</p>
    </template>
    <component :is="`storysoft-${embed.kind}`" v-else v-bind="embed.attrs" />
  </div>
</template>

<style scoped>
.embed {
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: var(--space-5);
  overflow: hidden;
}

.embed__note {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--text-muted);
  margin: var(--space-3) 0 0;
}
</style>
