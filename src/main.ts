import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import './styles/tokens.css'
import './styles/base.css'

const app = createApp(App)
// Mirrors the isCustomElement rule in vite.config.ts. That build-time rule is
// the one that actually applies to compiled SFCs (it runs at compile time,
// before this file executes); this runtime copy only matters for templates
// compiled at runtime (e.g. via the string compiler), which this app doesn't use.
app.config.compilerOptions.isCustomElement = (tag) => tag.startsWith('storysoft-')
app.use(router)
app.mount('#app')
