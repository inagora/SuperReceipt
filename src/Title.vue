<template>
    <div class="sr-title">
        <div class="sr-title-content sr-title-left">{{titles.left.titleText}}</div>
        <div class="sr-title-content sr-title-middle">
            {{titles.middle.titleText}}
            <template v-if="titles.middle.titleIcon">
                <span class="sr-title-content-icon sr-title-middle-icon" v-for="(item, index) in titles.middle.titleIcon" :key="index">{{item}}</span>
            </template>
            <template v-if="titles.middle.subTitle">
                <span class="sr-title-content sr-title-subtitle">{{titles.middle.subTitle}}</span>
            </template>
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
                } else if(typeof titleItem.titleIcon === 'string') {
                    let arr = [];
                    arr.push(titleItem.titleIcon);
                    titleItem.titleIcon = arr;
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
    &-subtitle {
        display: block;
        height: 20px;
        line-height: 20px;
        margin-top: -10px;
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
            margin-right: 10px;
        }
    }
}
</style>
