import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./router";
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import {aliases, mdi} from "vuetify/lib/iconsets/mdi";
import "@/01-app/assets/main.scss"
import '@mdi/font/css/materialdesignicons.css'

const app = createApp(App)
const pinia = createPinia()
const vuetify = createVuetify({
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
        },
    },
    components,
    directives,
})

app.use(pinia).use(router).use(vuetify)
app.mount('#app')