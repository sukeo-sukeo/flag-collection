import { createApp } from 'vue'
import App from './App.vue'
import L from "leaflet"
import "leaflet/dist/leaflet.css";
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

loadFonts()

createApp(App)
  .provide("L", L)
  .use(vuetify)
  .mount('#app')
