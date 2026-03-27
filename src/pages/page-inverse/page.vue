<template>
    <div class="wrapper bg-image-cover page-inverse-layout">
        <router-view class="page-inverse-main"></router-view>
        <nav-footer></nav-footer>
    </div>
</template>

<style lang="scss" scoped>
    .page-inverse-layout {
        flex: 1;
        display: flex;
        flex-direction: column;
        min-height: 0;
    }
    .page-inverse-main {
        flex: 1 1 auto;
    }
    .wrapper {
        &:before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            z-index: -1;
            background-image: url('/static/bg.png');
            background-size: cover;
            background-position: center center;
        }
        @media (min-width: 1200px) {
            // position: fixed;
            // top: 0;
            // left: 0;
            // bottom: 0;
            // right: 0;
            // background-image: url('/static/bg.png');
            // background-size: cover;
            // background-position: center center;
            // padding-bottom: 150px;
            // &:before {
            //     display: none;
            // }
            // /deep/ .footer {
            //     position: absolute;
            //     bottom: 0;
            //     left: 0;
            //     right: 0;
            // }
        }
    }
</style>