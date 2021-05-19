<template>
    <div class="sr">
        <template v-for="com in coms">
            <component :is="com.com" :key="com.name" :name="com.name" :tableConfig="config[com.name]"></component>
            <slot :name="com.name"></slot>
        </template>
        <div class="mask" v-show="config.loading">
            <div class="loading">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
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

<style>
.mask {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 99;
    display: flex;
    justify-content: center;
    align-items: center;
}
.loading{
    width: 80px;
    height: 40px;
    margin: 0 auto;
    margin-top:100px;
}
.loading span{
    display: inline-block;
    width: 8px;
    height: 100%;
    border-radius: 4px;
    background: lightgreen;
    animation: load 1.04s ease infinite;
}
@keyframes load{
    0%,100%{
        height: 40px;
        background: lightgreen;
    }
    50%{
        height: 60px;
        margin-top: -20px;
        background: lightblue;
    }
}
.loading span:nth-child(2){
    animation-delay:0.13s;
}
.loading span:nth-child(3){
    animation-delay:0.26s;
}
.loading span:nth-child(4){
    animation-delay:0.39s;
}
.loading span:nth-child(5){
    animation-delay:0.52s;
}
</style>

