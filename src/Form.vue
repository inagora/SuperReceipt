<template>
    <el-form v-if="config.isEditable" class="sr-form" ref="formData" label-position="left" :model="formData">
        <el-form-item 
            :class="['sr-form-item', form.type]" 
            v-for="(form, index) in forms" 
            :key="index" 
            :required="form.isRequired"
            :error="form.error"
            :prop="form.prop"
            :show-message="false"
            :inline-message="true"
            label-width="120px"
            style="display: flex"
            v-show="formVisible(form)"
            :label="form.label">
            <el-input 
                v-if="['input', 'button', 'number', 'password'].includes(form.type)"
                :size="form.size"
                :disabled="form.disabled"
                :type="form.type"
                :rows="2"
                :placeholder="form.placeholder"
                v-model="formData[form.prop]"
                @keyup.enter.native="handleEnter(form)"
                style="flex: 1; width: 100%; height: 22px; line-height: 22px;"></el-input>
            <el-input 
                v-if="form.type === 'textarea'"
                :size="form.size"
                :disabled="form.disabled"
                :type="form.type"
                :rows="form.rows"
                :resize="form.resize"
                :placeholder="form.placeholder"
                v-model="formData[form.prop]"
                style="flex: 1; width: 100%; line-height: 22px;"
                :autosize="form.autosize"></el-input>
            <template v-if="form.type === 'radio'">
                <el-radio 
                    v-for="(radio, index) in form.radios"
                    v-model="formData[form.prop]" 
                    :size="form.size"
                    :disabled="form.disabled"
                    :label="radio.label"
                    :key="index">{{radio.text}}</el-radio>
            </template>
            <el-switch
                v-model="formData[form.prop]"
                :size="form.size"
                :disabled="form.disabled"
                style="flex: 1; width: 100%; height: 22px; line-height: 22px;"
                v-if="form.type === 'switch'"></el-switch>
            <el-checkbox
                v-if="form.type === 'checkbox'"
                :size="form.size"
                :disabled="form.disabled"
                style="flex: 1; width: 100%; height: 22px; line-height: 22px;"
                v-model="formData[form.prop]"></el-checkbox>
            <el-date-picker
                v-if="['datetime', 'date'].includes(form.type)"
                :size="form.size"
                :disabled="form.disabled"
                :type="form.type"
                style="flex: 1; width: 100%; height: 22px; line-height: 22px;"
                :value-format="form.format"
                v-model="formData[form.prop]"></el-date-picker>
            <el-select
                v-if="form.type === 'select'"
                :type="form.type"
                :size="form.size"
                :disabled="form.disabled"
                :filterable="form.filterable"
                v-model="formData[form.prop]"
                @change="handleChange($event, form)"
                style="flex: 1; width: 100%; height: 22px; line-height: 22px;"
                :placeholder="form.placeholder">
                <el-option
                    v-for="option in form.options"
                    :key="option.value"
                    :label="option.label"
                    :value="option.value"></el-option>    
            </el-select>
            <el-cascader
                v-if="form.type === 'cascader'"
                :type="form.type"
                :size="form.size"
                :disabled="form.disabled"
                v-model="formData[form.prop]"
                :options="form.options"
                @change="handleChange($event, form)"
                style="flex: 1; width: 100%; height: 22px; line-height: 22px;"
                :placeholder="form.placeholder">   
            </el-cascader>
            <template v-if="form.type === 'address'">
                <el-select
                    v-for="(select, index) in form.selects"
                    :key="index"
                    :type="select.type"
                    :size="select.size"
                    :inline="false"
                    :disabled="select.disabled"
                    :filterable="select.filterable"
                    v-model="formData[select.prop]"
                    @change="handleChange($event, select)"
                    :style="{flex: 1, width: '100px', height: '22px', 'line-height': '22px', 'margin-right': '10px'}"
                    :placeholder="select.placeholder">
                    <el-option
                        v-for="option in select.options"
                        :key="option.value"
                        :label="option.label"
                        :value="option.value"></el-option>    
                </el-select>
                <el-input 
                    v-if="form.input"
                    :size="form.input.size"
                    :disabled="form.input.disabled"
                    :type="form.input.type"
                    :placeholder="form.input.placeholder"
                    v-model="formData[form.input.prop]"
                    style="flex: 1; width: 300px; height: 22px; line-height: 22px;"
                    autosize></el-input>
            </template>
            <div v-if="['text', 'label'].includes(form.type)" v-html="formData[form.prop]"></div>
        </el-form-item>
    </el-form>
    <el-form v-else class="sr-form" ref="formData" label-position="left" :model="formData">
        <el-form-item 
            class="sr-form-item" 
            v-for="(form, index) in forms" 
            :key="index" 
            :required="form.isRequired"
            :error="form.error"
            :prop="form.prop"
            :inline-message="true"
            label-width="100px"
            v-show="formVisible(form)"
            :label="form.label">
            <div v-if="form.type === 'radio' || form.type === 'switch' || form.type === 'checkbox'">{{formData[form.prop] == '0' || formData[form.prop] == false ? '否' : '是'}}</div>
            <div v-else v-text="formData[form.prop]"></div>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    name: 'xform',
    inject: {
        config: {
            default: {}
        }
    },
    data() {
        let rules = [];
        this.config.form.forEach(item => {
            let rule = {};
            rule[item.prop] = item.rule;
            rules.push(rule);
        });
        return {
            forms: this.config.form,
            inputVal: '',
            rules: rules
        }
    },
    computed: {
        formData() {
            return this.config.formData;
        }
    },
    methods: {
        handleInput(form, event) {
            console.log(event);
            form.input(222);
        },
        handleChange(val, form) {
            form.change && form.change(val);
        },
        formVisible(form) {
            if(form.visible instanceof Function) {
                return form.visible();
            } else {
                return form.visible || typeof form.visible === 'undefined';
            }
        },
        handleEnter(form) {
            form.change && form.change(this.formData[form.prop]);
        }
    },
    watch: {
        'config.isEditable': function(val) {
            this.config.isEditable = val;
        }
    }
}
</script>
<style lang="scss">
.sr-form {
    display: flex;
    justify-content: flex-start;
    margin-top: 30px;
    flex-wrap: wrap;
    width: 100%;
    margin: 30px 0;
    &-item {
        width: 33%;
        display: flex;
    }
    .el-form-item__content {
        margin-left: 10px !important;
        width: 200px;
        line-height: 22px !important;
        margin-bottom: 3px;
        font-size: 12px;
    }
    .el-form-item {
        margin-bottom: 0px;
    }
    .el-form-item__label {
        line-height: 22px !important;
        height: 22px;
        font-size: 12px;
        padding-left: 5px;
    }
    .el-input--mini .el-input__inner {
        height: 22px;
        line-height: 22px;
    }
    .el-input__icon {
        line-height: 22px !important;
    }
    .el-radio {
        margin-right: 0;
    }
}
.address {
    display: block;
    width: 100%;
    margin-top: 8px;
}
.address .el-form-item__content {
    width: auto !important;
    margin-left: 0 !important;
}
</style>


