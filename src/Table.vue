<template>
    <div class="sr-table">
        <el-table 
            v-if="tableConfig.columns.length > 0"
            :data="tableConfig.tableData"
            show-summary
            border>
            <template v-for="(column, index) in tableConfig.columns">
                <el-table-column
                    :key="index"
                    :label="column.label"
                    :prop="column.prop">
                </el-table-column>
            </template>
            <el-table-column class="column-opt" v-if="tableConfig.optBtns.length > 0 && isShowOptBtns" label="操作">
                <template slot-scope="scope">
                    <x-button 
                        v-for="(btn, index) in tableConfig.optBtns"
                        :key="index"
                        :conf="btn"
                        v-show="btn.visible"
                        @click="handleClick(btn, scope)"></x-button>
                </template>
            </el-table-column>
        </el-table>
        <iframe id="printf" src="" width="0" height="0" frameborder="0" style="display: none;">
            <div class="print-content">
                <table class="print-table" cellspacing="0" cellpadding="0" width="100%" style="border: 1px solid #EBEEF5;">
                    <tr class="print-table-head" style="color: #909399; font-weight: 500;">
                        <td style="padding: 12px 10px; border-bottom: 1px solid #EBEEF5; border-right: 1px solid #EBEEF5;" v-for="(item, index) in printData" :key="index">{{item.label}}</td>
                    </tr>
                    <tr class="print-table-row" v-for="(item, index) in tableConfig.tableData" :key="index">
                        <td style="padding: 12px 10px; border-bottom: 1px solid #EBEEF5; border-right: 1px solid #EBEEF5;" v-for="(item2, index2) in printData" :key="index2">{{item[item2.prop]}}</td>
                    </tr>
                </table>
            </div>
        </iframe>
    </div>
</template>
<script>
import XButton from './components/Button.vue';
export default {
    name: 'xtable',
    props: ['name', 'tableConfig'],
    inject: {
        table: {
            default: {}
        },
        isEditable: {
            default: true
        }
    },
    components: {
        XButton
    },
    data() {
        let tableName = this.name;
        let tableConfig = this.tableConfig;
        let printData = [];
        tableConfig.columns.forEach(item => {
            printData.push(item);
        });
        let isShowOptBtns = tableConfig.optBtns.some(item => {
            if(typeof item.visible === 'function') {
                return item.visible();
            } else {
                return item.visible;
            }
        });
        return {
            tableConfig,
            printData,
            isShowOptBtns: isShowOptBtns
        }
    },
    methods: {
        handleClick(btn, scope) {
            btn.click(scope);
        }
    }
}
</script>
<style lang="scss">
.sr-table {
    .sr-btn {
        display: inline-block;
        margin-right: 20px;
    }
}
</style>
