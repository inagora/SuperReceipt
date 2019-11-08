<template>
    <el-table 
        class="sr-table"
        :data="tableConfig.tableData"
        show-summary
        border>
        <template v-for="(column, index) in tableConfig.columns">
            <el-table-column
                :key="index"
                :label="column.label"
                :prop="column.prop"></el-table-column>
        </template>
        <el-table-column v-if="tableConfig.optBtns.length > 0" label="操作">
            <template slot-scope="scope" >
                <x-button
                    v-for="(btn, index) in tableConfig.optBtns"
                    :key="index"
                    :conf="btn"
                    @click="handleClick(btn, scope)"></x-button>
            </template>
        </el-table-column>
    </el-table>
</template>
<script>
import XButton from './components/Button.vue';
export default {
    name: 'xtable',
    inject: {
        table: {
            default: {}
        }
    },
    components: {
        XButton
    },
    data() {
        let tableConfig = this.table;
        console.log(tableConfig);
        return {
            tableConfig
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
