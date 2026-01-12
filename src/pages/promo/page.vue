<template>
    <div>
        <div class="cont text-center py-3">
            <b-container class="text-left">
                <b-row class="info">
                    <b-col cols="12" xl="auto" class="text-center va text-nowrap order-2 order-xl-1">
                        <div class="vam pt-4 px-2">
                            <img class="img-fluid" src="/static/no-1.png" />
                            <div class="text-uppercase h1 mt-4 txt">
                                <div>
                                    Sneaker App
                                </div>
                                <div>
                                    Worldwide!
                                </div>
                            </div>
                            <div class="mt-4">
                                <a href="https://itunes.apple.com/app/sneaker-crush-release-dates/id661034398" target="_blank">
                                    <img class="img-fluid apps" src="/static/app-apple.png" />
                                </a><a href="https://play.google.com/store/apps/details?id=sneakercrush.mobile.sc" class="ml-3" target="_blank">
                                    <img class="img-fluid apps" src="/static/app-google.png" />
                                </a>
                            </div>
                            <div class="text-uppercase mt-4">
                                <b>Never miss another release!</b>
                            </div>
                        </div>
                    </b-col>
                    <b-col class="text-center order-1 order-xl-2">
                        <img class="img-fluid" src="/static/app-promo.png" />
                    </b-col>
                </b-row>
                <div class="text-center text-xl-right pr-0 pr-xl-5 pb-5 pb-xl-0 pt-3 pt-xl-0 mt-3 mb-5">
                    <a href="mailto:david@thesneakercrush.com" target="_blank" class="btn wt text-uppercase text-white">
                        <div class="small">
                            <i class="fa fa-envelope mr-2"></i>Contact
                        </div>
                    </a><a href="https://twitter.com/thesneakercrush" target="_blank" class="btn wt text-uppercase text-white ml-3">
                        <div class="small">
                            <i class="fab fa-twitter mr-2"></i>Follow
                        </div>
                    </a>
                </div>
            </b-container>
        </div>
        <nav-footer class="d-block d-xl-none"></nav-footer>
    </div>
</template>

<style lang="scss" scoped>
    .cont {
        // position: relative;
        background-image: url('/static/bg-promo.png');
        background-repeat: no-repeat;
        background-size: cover;
        background-position: right top;
        @media (min-width: 1200px) {
            // position: fixed;
            // top: 0;
            // left: 0;
            // right: 0;
            // bottom: 0;
        }
        @media (orientation: landscape) {
            background: none;
            &:before {
                content: '';
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: -1;

                background-image: url('/static/bg-promo.png');
                background-repeat: no-repeat;
                background-size: cover;
                background-position: right top;
            }
        }
        @media (max-width: 1200px) and (orientation: portrait) {
            background: none;
            &:before {
                content: '';
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: -1;

                background-image: url('/static/bg-promo-top.png'), url('/static/bg-promo-bottom.png');
                background-size: contain, contain;
                background-repeat: no-repeat, no-repeat;
                background-position: left top, left bottom;
            }
        }
    }
    .info {
        @media (min-width: 1200px) {
            padding-top: 180px;
        }
    }
    .apps {
        height: 44px;
    }
    .txt {
        font-weight: 300;
    }
    .wt {
        background-color: rgba(255, 255, 255, .2);
    }
</style>