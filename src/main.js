import Vue from 'vue'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import App from './App.vue'
import router from './router'

import utils from './lib/utils'
Vue.prototype.utils = utils

Vue.prototype.$http = axios
Vue.use(ElementUI);


Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
