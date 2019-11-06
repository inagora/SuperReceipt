<template>
    <el-form class="sr-form" :model="formData">
        <el-form-item 
            class="sr-form-item" 
            v-for="(form, index) in forms" 
            :key="index" 
            :label="form.label">
            <el-input 
                v-if="['input', 'textarea', 'button', 'checkbox', 'number', 'password', 'radio'].includes(form.type)"
                :size="form.size"
                :disabled="form.disabled"
                :type="form.type"
                :placeholder="form.placeholder"
                @input="handleInput(form, $event)"
                autosize></el-input>
            <el-date-picker
                v-if="['datetime', 'date'].includes(form.type)"
                :type="form.type"
                :placeholder="form.placeholder"></el-date-picker>
            <el-select
                v-if="form.type === 'select'"
                :type="form.type"
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
        }
    },
    data() {
        console.log(this.form);
        return {
            forms: this.form,
            formData: {}
        }
    },
    methods: {
        handleInput(form, event) {
            console.log(event);
            form.input(222);
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


