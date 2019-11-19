<template>
    <el-form v-if="isEditable" class="sr-form" ref="formData" label-position="left" :model="formData">
        <el-form-item 
            class="sr-form-item" 
            v-for="(form, index) in forms" 
            :key="index" 
            :required="form.isRequired"
            :error="form.error"
            :prop="form.prop"
            :show-message="false"
            :inline-message="true"
            label-width="100px"
            :label="form.label">
            <el-input 
                v-if="['input', 'textarea', 'button', 'number', 'password'].includes(form.type)"
                :size="form.size"
                :disabled="form.disabled"
                :type="form.type"
                :placeholder="form.placeholder"
                v-model="formData[form.prop]"
                @change="handleChange"
                autosize></el-input>
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
                v-if="form.type === 'switch'"></el-switch>
            <el-checkbox
                v-if="form.type === 'checkbox'"
                :size="form.size"
                :disabled="form.disabled"
                v-model="formData[form.prop]"></el-checkbox>
            <el-date-picker
                v-if="['datetime', 'date'].includes(form.type)"
                :size="form.size"
                :disabled="form.disabled"
                :type="form.type"
                value-format="yyyy-MM-dd HH:mm:ss"
                v-model="formData[form.prop]"></el-date-picker>
            <el-select
                v-if="form.type === 'select'"
                :type="form.type"
                :size="form.size"
                :disabled="form.disabled"
                v-model="formData[form.prop]"
                @change="handleChange($event, form)"
                :placeholder="form.placeholder">
                <el-option
                    v-for="option in form.options"
                    :key="option.value"
                    :label="option.label"
                    :value="option.value"></el-option>    
            </el-select>
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
            :label="form.label">
            <div v-if="form.type === 'radio' || form.type === 'switch' || form.type === 'checkbox'">{{formData[form.prop] ? '是' : '否'}}</div>
            <div v-else v-text="formData[form.prop]"></div>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    name: 'xform',
    inject: {
        form: {
            default: []
        },
        formData: {
            default: {}
        },
        isEditable: {
            default: true
        }
    },
    data() {
        let rules = [];
        this.form.forEach(item => {
            let rule = {};
            rule[item.prop] = item.rule;
            rules.push(rule);
        });
        return {
            forms: this.form,
            inputVal: '',
            rules: rules
        }
    },
    methods: {
        handleInput(form, event) {
            console.log(event);
            form.input(222);
        },
        handleChange(val, form) {
            form.change && form.change(val);
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
    margin: 30px auto;
    &-item {
        width: 300px;
        display: flex;
        margin-right: 40px;
    }
    .el-form-item__content {
        margin-left: 10px !important;
    }
    .el-form-item {
        margin-bottom: 0px;
    }
}
</style>


