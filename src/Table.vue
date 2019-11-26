<template>
    <div class="sr-table">
        <el-table 
            v-if="tableConfig.columns.length > 0"
            :data="tableConfig.tableData"
            :summary-method="getSummaries"
            show-summary
            border>
            <el-table-column
                v-if="tableConfig.isShowIndex"
                type="index"
                width="50">
            </el-table-column>
            <template v-for="(column, index) in tableConfig.columns">
                <el-table-column
                    :key="index"
                    :label="column.label"
                    :type="column.needSum"
                    :prop="column.prop">
                </el-table-column>
            </template>
            <el-table-column class="column-opt" v-if="tableConfig.optBtns.length > 0 && isShowOptBtns" label="操作">
                <template slot-scope="scope">
                    <x-button 
                        v-for="(btn, index) in tableConfig.optBtns"
                        :key="index"
                        :conf="btn"
                        v-show="btnVisible(btn)"
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
        // table: {
        //     default: {}
        // },
        // isEditable: {
        //     default: true
        // }
        config: {
            default: {}
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
                return item.visible || typeof item.visible === 'undefined';
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
        },
        getSummaries(param) {
            const { columns, data } = param;
            const sums = [];
            columns.forEach((column, index) => {
                if(index === 0) {
                    sums[index] = '总计';
                    return;
                }
                if(column.type == true) {
                    const values = data.map(item => Number(item[column.property]));
                    if(!values.every(value => isNaN(value))) {
                        sums[index] = values.reduce((prev, curr) => {
                            const value = Number(curr);
                            if(!isNaN(value)) {
                                return prev + curr;
                            } else {
                                return prev;
                            }
                        }, 0); 
                    } else {
                        sums[index] = 'N/A'
                    }
                }
            });
            return sums;
        },
        btnVisible(btn) {
            console.log(btn.visible);
            if(btn.visible instanceof Function) {
                return btn.visible();
            } else {
                return btn.visible || typeof btn.visible === 'undefined';
            }
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
    .el-table td, .el-table th {
        padding: 0;
    }
    .el-table__empty-block {
        font-size: 12px;
        min-height: 42px;
    }
    .el-table__empty-text {
        line-height: 42px;
    }
    .cell {
        font-size: 12px;
    }
}
</style>
