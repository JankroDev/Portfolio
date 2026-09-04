import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import './styles/tokens.css'
import './styles/base.css'

const app = createApp(App)
app.config.compilerOptions.isCustomElement = (tag) => tag.startsWith('storysoft-')
app.use(router)
app.mount('#app')
