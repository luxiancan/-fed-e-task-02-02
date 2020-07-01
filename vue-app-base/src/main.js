import Vue from 'vue'
import App from './App.vue'

import './style.less'

Vue.config.productionTip = false

const fn = () => {
    console.log('============ main.js is working~ ============')
}
fn()

new Vue({
    render: h => h(App)
}).$mount('#app')
