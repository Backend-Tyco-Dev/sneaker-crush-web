<template>
    <div class="wrapper bg-image-cover">
        <router-view></router-view>
        <nav-footer></nav-footer>
    </div>
</template>

<style lang="scss" scoped>
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