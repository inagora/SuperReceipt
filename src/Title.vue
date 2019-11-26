<template>
    <div class="sr-title">
        <div class="sr-title-content sr-title-left">{{titles.left.titleText}}</div>
        <div class="sr-title-content sr-title-middle">
            {{titles.middle.titleText}}
            <span class="sr-title-content-icon sr-title-middle-icon" v-if="titles.middle.titleIcon">{{titles.middle.titleIcon}}</span>
        </div>
        <div class="sr-title-content sr-title-right">{{titles.right.titleText}}</div>
        <el-form>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'XTitle',
    inject: {
        config: {
            default: {}
        }
    },
    data() {
        return {
            titles: this.formatTitle()
        }
    },
    methods: {
        formatTitle() {
            let defaultTitle = {
                left: {
                    titleText: '',
                    titleIcon: ''
                },
                middle: {
                    titleText: '',
                    titleIcon: ''
                },
                right: {
                    titleText: '',
                    titleIcon: ''
                }
            }
            let formTitle = Object.assign(defaultTitle, this.config.title);
            Object.keys(formTitle).forEach(key => {
                let titleItem = formTitle[key];
                if(typeof titleItem === 'string') {
                    let titleObj = {
                        titleText: titleItem,
                        titleIcon: ''
                    }
                    formTitle[key] = titleObj;
                }
            });
            return formTitle;
        }
    },
    watch: {
        'config.title': {
            handler(val) {
                this.titles = this.formatTitle();
            },
            deep: true
        }
    }
}
</script>

<style lang="scss">
.sr-title {
    display: flex;
    height: 60px;
    line-height: 60px;
    font-weight: 500;
    font-size: 22px;
    padding: 0 15px;
    &-left, &-right {
        width: 200px;
        font-size: 16px;
    }
    &-left {
        text-align: left;
    }
    &-right {
        text-align: right;
    }
    &-middle {
        flex: 1;
        font-weight: bold;
        text-align: center;
        &-icon {
            font-size: 12px;
            color: red;
            border: 1px solid red;
            padding: 3px 10px;
            border-radius: 5px;
        }
    }
}
</style>
