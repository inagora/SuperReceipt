<template>
    <div class="sr">
        <x-top-toolbar></x-top-toolbar>
    </div>
</template>

<script>

import XTopToolbar from './TopToolbar.vue';
export default {
    name: 'x-superreceipt',
    props: ['config'],
    components: {
        XTopToolbar
    },
    provide() {
        let conf = Object.assign({}, this.config);
        return conf;
    }
}
</script>
