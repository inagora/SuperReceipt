<template>
    <div class="sr-table">
        <div class="sr-table-title" v-if="tableConfig.title" :style="{'text-align': tableConfig.title.align}">
            {{tableConfig.title.text}}
        </div>
        <el-table 
            class="tb-edit"
            ref="table"
            v-if="tableConfig.columns.length > 0"
            :data="tableConfig.tableData"
            :summary-method="getSummaries"
            :show-summary="tableConfig.isShowSummary"
            @cell-dblclick="handleCellClick"
            :header-cell-style="tableConfig.headerStyle"
            :row-style="rowStyle"
            :empty-text="tableConfig.emptyText"
            @selection-change="handleSelectionChange"
            @select="handleSelect"
            @select-all="handleSelectAll"
            border>
            <el-table-column
                v-if="tableConfig.isSelect"
                type="selection"
                width="55">
            </el-table-column>
            <el-table-column
                v-if="tableConfig.isShowIndex"
                type="index"
                label="NO"
                width="50">
            </el-table-column>
            <template v-for="(column, index) in tableConfig.columns">
                <el-table-column
                    :key="index"
                    :label="column.label"
                    :type="column.needSum"
                    v-if="column.editable"
                    header-align="center"
                    class-name="edit-style"
                    :align="column.align"
                    :prop="column.prop"
                    :width="column.width">
                    <template slot-scope="scope">
                        <template v-if="scope.row.seen">
                            <el-input v-if="!column.editType || column.editType === 'input'" size="mini" :type="column.inputType" @blur="handleBlur($event, scope.row, column.change)" @keyup.enter.native="handleEnter(scope.row, column.change)" v-model="scope.row[column.prop]"/>
                            <el-select v-else-if="column.editType === 'select'" size="mini" @change="handleChange(scope.row, column.change)" v-model="scope.row[column.prop]">
                                <el-option v-for="(item, index) in column.options" :key="index" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </template>
                        <template v-else>
                            <span v-if="!column.editType" v-html="scope.row[column.prop]"></span>
                            <span v-else-if="column.editType === 'select'">{{getSelectLabel(scope.row, column)}}</span>
                        </template>
                    </template>
                </el-table-column>
                <el-table-column
                    :key="index"
                    :label="column.label"
                    :type="column.needSum"
                    :width="column.width"
                    :align="column.align"
                    v-else
                    :prop="column.prop">
                    <template slot-scope="scope">
                        <span v-html="scope.row[column.prop]"></span>
                    </template>
                </el-table-column>
            </template>
            <el-table-column class="column-opt" :width="tableConfig.optColumnsConf.width ? tableConfig.optColumnsConf.width : '45px'" v-if="tableConfig.optBtns.length > 0 && isShowOptBtns && tableConfig.optColumnsConf" :label="tableConfig.optColumnsConf.label ? tableConfig.optColumnsConf.label : '操作'">
                <template slot-scope="scope">
                    <x-button 
                        v-for="(btn, index) in tableConfig.optBtns"
                        :key="index"
                        :conf="btn"
                        v-show="btnVisible(btn, scope)"
                        @click="handleClick(btn, scope)"></x-button>
                </template>
            </el-table-column>
            <el-table-column class="column-opt" v-if="tableConfig.optBtns.length > 0 && isShowOptBtns && !tableConfig.optColumnsConf" label="操作">
                <template slot-scope="scope">
                    <x-button 
                        v-for="(btn, index) in tableConfig.optBtns"
                        :key="index"
                        :conf="btn"
                        v-show="btnVisible(btn, scope)"
                        @click="handleClick(btn, scope)"></x-button>
                </template>
            </el-table-column>
        </el-table>
        <iframe id="printf" src="" width="0" height="0" frameborder="0" style="display: none;">
            <div class="print-content">
                <div style="display: flex; flex-wrap: wrap; margin-bottom: 20px;">
                    <div v-for="(item, index) in config.form" :key="index" style="width: 50%; display: inline-block;">
                        <label style="width: 100px; display: inline-block; text-align: left; margin-right: 10px;">{{item.label}}</label>
                        <label>{{formatValue(item)}}</label>
                    </div>
                </div>
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
    mounted() {
        this.$nextTick(() => {
            this.tableConfig.tableData.forEach(row => {
                this.$refs.table.toggleRowSelection(row, row.selected ? row.selected : false);
            });
        });
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
            isShowOptBtns: isShowOptBtns,
            sumParams: null,
        }
    },
    computed: {
        formatValue() {
            return function(propItem) {
                let val = this.config.formData[propItem.prop];
                if(propItem.type === 'radio' || propItem.type === 'switch' || propItem.type === 'checkbox') {
                    return val == '0' || val == false ? '否' : '是';
                }
                return this.config.formData[propItem.prop]
            }
        }
    },
    watch: {
        'tableConfig.tableData'(val) {
            this.tableConfig.tableData = val;
            this.$nextTick(() => {
                this.tableConfig.tableData.forEach(row => {
                    this.$refs.table.toggleRowSelection(row, row.selected ? row.selected : false);
                });
            });
        }
    },
    methods: {
        handleClick(btn, scope) {
            btn.click(scope);
        },
        getSummaries(param) {
            this.sumParams = param;
            let { columns, data } = param;
            const sums = [];
            if(this.tableConfig.sumMode === 'selected') data = data.filter(item => item.selected);
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
                        sums[index] = parseFloat(sums[index].toFixed(2)); 
                    } else {
                        sums[index] = '0'
                    }
                }
            });
            return sums;
        },
        btnVisible(btn, scope) {
            if(btn.visible instanceof Function) {
                return btn.visible(scope);
            } else {
                return btn.visible || typeof btn.visible === 'undefined';
            }
        },
        handleCellClick(row, column, cell, event) {
            row.seen = true;
        },
        handleEnter(row, change) {
            row.seen = false;
            change && change(row);
        },
        handleBlur(ctx, row, change) {
            if(ctx.relatedTarget == null) {
                row.seen = false;
                change && change(row);
            }
        },
        handleChange(row, change) {
            row.seen = false;
            change && change(row);
        },
        rowStyle({row, rowIndex}) {
            return row.style;
        },
        handleSelect(selection, row) {
            if(this.tableConfig.sumMode === 'selected') {
                row.selected = !row.selected;
                this.sumParams.data = selection;
                this.getSummaries(this.sumParams);
            }
            this.tableConfig.change && this.tableConfig.change(selection, row);
        },
        handleSelectionChange(val) {
            this.tableConfig.selectChange && this.tableConfig.selectChange(val);
        },
        handleSelectAll(selection) {
            selection.forEach(item => {
                item.selected = true;
            });
            if(this.tableConfig.sumMode === 'selected') {
                if(selection.length !== 0) {
                    this.sumParams.data = selection;
                } else {
                    this.sumParams.data.forEach(item => {
                        item.selected = false;
                    });
                }
                this.getSummaries(this.sumParams);
            }
            this.tableConfig.selectAllChange && this.tableConfig.selectAllChange(selection);
        },
        getSelectLabel(row, column) {
            let val = row[column.prop];
            let options = column.options;
            let filterOption = options.filter(item => {
                return item.value === val;
            });
            if(filterOption.length === 0) return val;
            return filterOption[0].label; 
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
    &-title {
        height: 36px;
        line-height: 36px;
        color: #666666;
    }
    // .tb-edit .el-input {
    //     display: none;
    // }
    // .tb-edit .current-row .el-input {
    //     display: block;
    // }
    // .tb-edit .current-row .el-input+span {
    //     display: none;
    // }
    .edit-style {
        background-color: lightyellow;
    }
    .is-leaf {
        background-color: #ffffff;
    }
}
</style>
