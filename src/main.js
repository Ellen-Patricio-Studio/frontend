import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VCalendar from 'v-calendar';
import 'v-calendar/style.css'

import App from './App.vue'
import router from './router'

import '@/assets/styles/main.scss'

const app = createApp(App)

app.use(createPinia())
app.use(VCalendar, {})
app.use(router)

app.mount('#app')
