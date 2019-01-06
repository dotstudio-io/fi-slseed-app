import VeeValidate from 'vee-validate';
import VueAxios from 'vue-axios';
import VueI18n from 'vue-i18n';
import axios from 'axios';
import Vue from 'vue';

import Moment from '@/plugins/moment';
import Toastr from '@/plugins/toastr';
import JQuery from '@/plugins/jquery';
import Auth from '@/plugins/auth';

import App from '@/app';

import http from '@/configs/http';
import router from '@/router';
import store from '@/store';

import './registerServiceWorker';

axios.defaults.baseURL = http.baseURL;

Vue.config.productionTip = false;

// IMPORTANT: Keep this order!
Vue.use(VueAxios, axios);
Vue.use(Auth);
Vue.use(VeeValidate);
Vue.use(VueI18n);
Vue.use(Toastr);
Vue.use(Moment);
Vue.use(JQuery);

const i18n = new VueI18n({
  locale: 'en'
});

new Vue({
  render: h => h(App),
  // template: '<app/>',
  el: '#app',
  router,
  store,
  i18n,
  http
}).$mount('#app');
