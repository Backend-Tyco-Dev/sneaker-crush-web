<template>
    <div class="page-simple-layout">
        <router-view class="mh"></router-view>
        <nav-footer class="page-simple-footer"></nav-footer>
    </div>
</template>

<style lang="scss">
    /* Fill app-router (flex:1) so nothing shows below the footer. .mh grows so the
       footer sits at the bottom of the viewport on short pages (About, Contact). */
    .page-simple-layout {
        flex: 1 1 0%;
        min-height: 0;
        display: flex;
        flex-direction: column;
        width: 100%;
    }
    .mh {
        flex: 1 1 0%;
        min-height: 0;
        display: flex;
        flex-direction: column;
    }
    .page-simple-footer {
        flex-shrink: 0;
    }
</style>