<template>
    <div class="sr-title">
        <div class="sr-title-left">{{titles.left.titleText}}</div>
        <div class="sr-title-middle">{{titles.middle.titleText}}</div>
        <div class="sr-title-right">{{titles.right.titleText}}</div>
    </div>
</template>

<script>
export default {
    name: 'XTitle',
    inject: {
        title: {
            default: {}
        }
    },
    data() {
        let titles = Object.keys(this.title).map(key => {
            let titleItem = this.title[key];
            if(typeof titleItem === 'string') {
                let titleObj = {
                    titleText: titleItem,
                    titleIcon: ''
                }
                this.title[key] = titleObj;
            }
            return this.title[key];
        });
        return {
            titles: this.title
        }
    }
}
</script>

<style lang="scss">

</style>
