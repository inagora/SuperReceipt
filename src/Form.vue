<template>
    <el-form class="sr-form" :model="formData">
        <el-form-item 
            class="sr-form-item" 
            v-for="(form, index) in forms" 
            :key="index" 
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
                    :label="radio.label"
                    :key="index">{{radio.text}}</el-radio>
            </template>
            <el-switch
                v-model="formData[form.prop]"
                v-if="form.type === 'switch'"></el-switch>
            <el-checkbox
                v-if="form.type === 'checkbox'"
                v-model="formData[form.prop]"></el-checkbox>
            <el-date-picker
                v-if="['datetime', 'date'].includes(form.type)"
                :type="form.type"
                v-model="formData[form.prop]"></el-date-picker>
            <el-select
                v-if="form.type === 'select'"
                :type="form.type"
                v-model="formData[form.prop]"
                :placeholder="form.placeholder">
                <el-option
                    v-for="option in form.options"
                    :key="option.value"
                    :label="option.label"
                    :value="option.value"></el-option>    
            </el-select>
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
        }
    },
    data() {
        console.log(this.form);
        return {
            forms: this.form,
            inputVal: ''
        }
    },
    methods: {
        handleInput(form, event) {
            console.log(event);
            form.input(222);
        },
        handleChange(val) {
            console.log(val);
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
    width: 80%;
    margin: 30px auto;
    &-item {
        min-width: 250px;
        display: flex;
        margin-right: 40px;
    }
}
</style>


