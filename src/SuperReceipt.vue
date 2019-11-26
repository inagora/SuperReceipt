<template>
    <div class="sr">
        <template v-for="com in coms">
            <component :is="com.com" :key="com.name" :name="com.name" :tableConfig="config[com.name]"></component>
        </template>
    </div>
</template>

<script>

import XTopToolbar from './TopToolbar.vue';
import XTitle from './Title.vue';
import XForm from './Form.vue';
import XTable from './Table.vue';
import XBottomToolbar from './BottomToolbar.vue';
export default {
    name: 'x-superreceipt',
    props: ['config'],
    data() {
        let coms = {
            topToolbar: XTopToolbar,
            title: XTitle,
            form: XForm,
            bottomToolbar: XBottomToolbar
        }
        let configKeys = Object.keys(this.config);
        // 有多个table的需求
        let tableKeys = this.config.tableKeys;
        if(tableKeys && tableKeys.length > 0) {
            tableKeys.forEach(item => {
                coms[item] = XTable;
            });
        } else {
            coms.table = XTable;
        }
        
        // 配置的组件，如果在config中没有配置的组件不会加载
        let configCom = configKeys.filter(item => {
            if(coms[item]) {
                return item;
            }
        });
        return {
            coms: configCom.map(item => { // 格式化组件
                return {name:item, com: coms[item]}
            })
        }
    },
    provide() {
        // let conf = Object.assign({}, this.config);
        return {
            config: this.config
        };
    }
}
</script>
