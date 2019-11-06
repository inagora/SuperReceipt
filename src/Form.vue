<template>
    <el-form :model="formData">
        <el-form-item>
            <el-input></el-input>
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
        return {
            forms: this.form,
            formData: {}
        }
    }
}
</script>

