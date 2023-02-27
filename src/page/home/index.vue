<template>
    <div>
        <page-header />
        <page-content />
        <page-footer />
    </div>
</template>

<script>

import pageHeader from './header/index.vue';
import pageContent from './content/index.vue';
import pageFooter from './footer/index.vue';

export default {
    name: 'CD',
    components: {
        pageHeader,
        pageContent,
        pageFooter
    }
}
</script>

<style></style>