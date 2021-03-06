<template>
    <button 
        v-if="!conf.isImport"
        :class="['sr-btn', themeCls, sizeCls]" 
        :disabled="conf.disabled"
        :style="conf.style"
        @click="$emit('click')">{{conf.text}}</button>
    <div v-else class="sr-btn-container">
        <input
            type="file"
            :visible="conf.disabled"
            :class="['sr-btn sr-input', themeCls, sizeCls]"
            @change="change">
        <button 
            :disabled="conf.disabled"
            :visible="conf.visible"
            :class="['sr-btn', themeCls, sizeCls]">{{conf.text}}</button>
    </div>
</template>

<script>
/**
 * 单个按钮
 */
export default {
    name: 'x-button',
    props: ['conf'],
    data() {
        let otherConf = {};
		let conf = {};
		for(let k in this.conf){
			if(['text','type','nativeType', 'icon', 'size', 'disabled', 'cls', 'style', 'click', 'visible'].includes(k)){
				conf[k] = this.conf[k];
			}else{
				otherConf[k] = this.conf[k];
			}
		}
        return Object.assign({
			text: '',
			type: 'default',
			nativeType: 'button',
			icon: '',
			size: 'medium',
			disabled: false,
			cls: '',
			visible: true,
			style: null,
			otherConf
		}, conf);
    },
    computed: {
        themeCls() {
            let typeClasses = {
                default: 'sr-btn-default',
				primary: 'sr-btn-primary',
				success: 'sr-btn-success',
				danger: 'sr-btn-danger',
				warning: 'sr-btn-warning',
				info: 'sr-btn-info',
				link: 'sr-btn-link'
            };
            let cls = typeClasses[this.type];
            return cls;
        },
        sizeCls() {
            let classes = {
				lg: 'sr-btn-lg',
				md: 'sr-btn-md',
				sm: 'sr-btn-sm'
			};
			let size = 'md';
			if(this.size=='large')
				size = 'lg';
			else if(this.size=='small')
				size = 'sm';
			return classes[size];
        }
    },
    watch: {
        'conf.disabled'(val){
            this.disabled = val;
        },
        'conf.visible'(val){
            this.visible = val;
        }
    },
    methods: {
        change(e) {
            this.$emit('click', e);
        }
    }
}
</script>

<style lang="scss">
    .sr-btn-container {
        position: relative;
    }
    .sr-btn{
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 400;
        line-height: 1.499;
        color: #212529;
        -webkit-user-select: none;
        user-select: none;
        background-color: transparent;
        border: 1px solid transparent;
        padding: 0 15px;
        font-size: 12px;
        height: 32px;
        border-radius: 4px;
        transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
        margin: 0;
        font-family: inherit;
        cursor: pointer;
        outline: none;
        
        &:disabled{
            cursor: not-allowed;
            opacity: 0.65;
        }

        &-icon{
            display: inline-block;
            vertical-align: middle;
        }
        &-text{
            display: inline-block;
            vertical-align: middle;
        }

        &-lg{
            padding: 0 15px;
            font-size: 16px;
            border-radius: 4px;
            height: 40px;
        }
        &-sm{
            padding: 0 7px;
            font-size: 12px;
            border-radius: 4px;
            height: 24px;
        }
        &-sm &-icon{
            font-size: 14px;
        }
        
        &-default {
            background-color: #fff;
            border-color: #d9d9d9;
        }
        &-default:hover {
            color: #409eff;
            border-color: #c6e2ff;
            background-color: #ecf5ff;
        }
        &-primary{
            color: #fff;
            background-color: #409eff;
            border-color: #409eff;
        }
        &-primary:hover {
            color: #fff;
            background: #66b1ff;
            border-color: #66b1ff;
        }
        &-success {
            color: #fff;
            background-color: #67c23a;
            border-color: #67c23a;
        }
        &-success:hover {
            color: #fff;
            background: #85ce61;
            border-color: #85ce61;
        }
        &-danger {
            color: #fff;
            background-color: #dc3545;
            border-color: #dc3545;
        }
        &-danger:hover {
            color: #fff;
            background-color: #c82333;
            border-color: #bd2130;
        }
        &-warning {
            color: #fff;
            background-color: #ffc107;
            border-color: #ffc107;
        }
        &-warning:hover {
            color: #fff;
            background-color: #e0a800;
            border-color: #d39e00;
        }
        &-info {
            color: #fff;
            background-color: #17a2b8;
            border-color: #17a2b8;
        }
        &-info:hover {
            color: #fff;
            background-color: #138496;
            border-color: #117a8b;
        }
        &-link {
            font-weight: 400;
            color: #007bff;
            text-decoration: none;
        }
        &-link:hover {
            color: #0056b3;
        }
        &-link:hover &-text{
            text-decoration: underline;
        }

        &-icon + &-text{
            margin-left: 5px;
        }

        &-sm > &-icon + &-text{
            margin-left: 3px;
        }

    }
    .sr-input {
        position: absolute;
        width: 100%;
        opacity: 0;
        padding: 0;
    }
</style>


