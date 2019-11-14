<template>
    <div class="sr-top-toolbar">
        <template v-for="(btn, index) in btns">
            <x-button 
                :key="index"
                :conf="btn"
                @click="triggerClick($event, btn)"></x-button>
        </template>
    </div>
</template>

<script>
import XButton from './components/Button.vue';
export default {
    name: 'toptoolbar',
    components: {
        XButton
    },
    inject: {
        topToolbar: {
            default: []
        }
    },
    data() {
        return {
            btns: this.topToolbar
        }
    },
    methods: {
        triggerClick(e, btn) {
            // 特殊按钮处理
            if(btn.isPrint) { // 打印
                let f = document.getElementById('printf');
                f.contentDocument.write(document.querySelector('.print-content').innerHTML);
                f.contentDocument.close();
                f.contentWindow.print();
            } else if(btn.isImport) {
                btn.change(e);
            } else {
                btn.click();
            }
        }
    }
}
</script>

<style lang="scss">
.sr-top-toolbar{
	border-bottom: 1px solid #d0d0d0;
	padding: 10px 0 0 10px;
	display: flex;
	flex-wrap: wrap;
	align-items: center;

	&-separator{
		display: inline-block;
		width: 1px;
		overflow: hidden;
		margin-right: 8px;
		margin-bottom: 10px;
		background-color: #d0d0d0;
	}
	&-space{
		width: 10px;
	}

	.sr-btn{
		margin-right: 3px;
		margin-bottom: 10px;
	}

}
</style>


