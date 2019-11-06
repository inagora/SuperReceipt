import SuperReceipt from './SuperReceipt.vue';
import './plugins/elementui.js';

Vue.component('x-superreceipt', SuperReceipt);

export function init(config, Vue) {
    let el = config.el || '#superReceiptContainer';
    if(typeof el === 'string') {
        el = document.querySelector(el);
    } else if(el.length) {
        el = el[0];
    }

    if(!(el instanceof HTMLElement)) {
        console.log('The container is not a dom, please check!');
        return null;
    }
    el.innerHTML = '<x-superreceipt ref="superreceipt" :config="config"></x-superreceipt>';
    if(!Vue) {
        Vue = window.Vue;
    }
    if(!Vue || !Vue.version || Vue.version<'2') {
		console.error('Please ensure Vue is installed.');
		return null;
	}
    let app = new Vue({
        data: {
            config
        }
    }).$mount(el);
    return app.$refs.superreceipt;
} 