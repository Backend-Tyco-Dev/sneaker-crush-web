<template>
    <div class="page-simple-layout">
        <router-view class="mh"></router-view>
        <nav-footer></nav-footer>
    </div>
</template>

<style lang="scss">
    .page-simple-layout {
        flex: 1;
        display: flex;
        flex-direction: column;
        min-height: 0;
    }
    .mh {
        flex: 1 1 auto;
        min-height: 720px;
    }
</style>