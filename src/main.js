import { createApp } from 'vue'
import App from './App.vue'
import i18n from './plugins/i18n'
import './composables/useTheme' // Initialize theme on load
import './assets/style.css'

const app = createApp(App)
app.use(i18n)
app.mount('#app')
