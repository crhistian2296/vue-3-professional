import {createApp} from 'vue';
import {createPinia} from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import './style.css';
import 'highlight.js/styles/stackoverflow-light.css'
import 'highlight.js/lib/common';
import hljsVuePlugin from "@highlightjs/vue-plugin";

import App from './App.vue';
import {router} from './router';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const app = createApp(App);

app.use(hljsVuePlugin)
app.use(pinia);
app.use(router);

app.mount('#app');
