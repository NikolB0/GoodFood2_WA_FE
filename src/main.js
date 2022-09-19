import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Croppa from 'vue-croppa'; // import nove komponente
import 'vue-croppa/dist/vue-croppa.css';
import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false;
Vue.use(Croppa); // koristit ćemo ju posvuda bez posebnog importa
Vue.use(BootstrapVue);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
