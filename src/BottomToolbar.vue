<template>
    <div class="sr-bottom-toolbar">
        <template v-for="(btn, index) in btns">
            <x-button 
                :key="index"
                :conf="btn"
                @click="triggerClick(btn)"></x-button>
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
        bottomToolbar: {
            default: []
        }
    },
    data() {
        return {
            btns: this.bottomToolbar
        }
    },
    methods: {
        triggerClick(btn) {
            btn.click();
        }
    }
}
</script>

<style lang="scss">
.sr-bottom-toolbar{
	border-top: 1px solid #d0d0d0;
	padding: 10px 0 0 10px;
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
		margin-right: 8px;
		margin-bottom: 10px;
	}

}
</style>


