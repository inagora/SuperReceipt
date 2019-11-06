<template>
    <div class="sr">
        <template v-for="com in coms">
            <component :is="com.com" :key="com.name"></component>
        </template>
    </div>
</template>

<script>

import XTopToolbar from './TopToolbar.vue';
import XTitle from './Title.vue';
import XForm from './Form.vue';
export default {
    name: 'x-superreceipt',
    props: ['config'],
    data() {
        let coms = {
            topToolbar: XTopToolbar,
            title: XTitle,
            form: XForm
        }
        let configKeys = Object.keys(this.config);
        // 配置的组件，如果在config中没有配置的组件不会加载
        let configCom = configKeys.filter(item => {
                if(coms[item]) {
                    return item;
                }
            });
        return {
            coms: configCom.map(item => {
                return {name:item, com: coms[item]}
            })
        }
    },
    provide() {
        let conf = Object.assign({}, this.config);
        return conf;
    }
}
</script>
