<template>
    <div class="sr-bottom-toolbar" :style="{'justify-content': formatBottomToolbarAlign}">
        <template v-for="(btn, index) in btns">
            <x-button 
                :key="index"
                :conf="btn"
                v-show="btnVisible(btn)"
                @click="triggerClick($event, btn)"></x-button>
        </template>
    </div>
</template>

<script>
import XButton from './components/Button.vue';
export default {
    name: 'bottomtoolbar',
    components: {
        XButton
    },
    inject: {
        config: {
            default: {}
        }
    },
    data() {
        return {
            btns: this.config.bottomToolbar
        }
    },
    computed: {
        formatBottomToolbarAlign() {
            let align = 'flex-end';
            switch(this.config.bottomToolbarAlign) {
                case 'left':
                    align = 'flex-start';
                    break;
                case 'center':
                    align = 'center';
                    break;
                case 'right':
                    align = 'flex-end';
                    break;
                default: 
                    align = 'flex-end';
            }
            return align;
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
        },
        btnVisible(btn) {
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
.sr-bottom-toolbar{
	border-top: 1px solid #d0d0d0;
	padding: 10px 15px 0 10px;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
    justify-content: flex-end;
    margin-top: 30px;

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


