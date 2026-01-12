<template>
    <div class="footer">
        <div class="top">
            <b-container>
                <b-row class="py-4">
                    <b-col cols="12" lg="6" class="py-2 py-lg-0">
                        <form ref="form" id="subForm" class="js-cm-form" action="https://www.createsend.com/t/subscribeerror?description=" method="post" data-id="30FEA77E7D0A9B8D7616376B90063231DA69B31C51AAD87089A75972379659B39E70EE0469035DE4A5F8334AC95589452C5306261C6D2C99B12BB00327455418">
                            <b-row>
                                <b-col class="va pr-0 pr-lg-2">
                                    <s-input ref="email" class="d-inline-block vam js-cm-email-input" name="cm-vhrhrr-vhrhrr" type="email" id="fieldEmail" placeholder="Email">
                                    </s-input>
                                </b-col>
                                <b-col cols="auto" class="h-100 va pl-2">
                                    <button type="submit" ref="button" class="d-none js-cm-submit-button"></button>
                                    <s-button type="button" class="grad-purple px-4 px-md-5 vam js-cm-submit-button" @click="send()">
                                        Subscribe
                                    </s-button>
                                </b-col>
                            </b-row>
                        </form>
                    </b-col>
                    <b-col class="text-center text-lg-right">
                        <b-row>
                            <b-col cols="12" xl="" class="va text-nowrap">
                                <div class="apps d-inline-block vam">
                                    <a href="https://play.google.com/store/apps/details?id=sneakercrush.mobile.sc" target="_blank" class="d-inline-block app google mr-3">
                                    </a><a href="https://itunes.apple.com/app/sneaker-crush-release-dates/id661034398" target="_blank" class="d-inline-block app apple">
                                    </a>
                                </div>
                            </b-col>
                            <b-col cols="auto" class="va ml-5 text-nowrap d-none d-xl-block">
                                <div class="d-inline-block vam">
                                    <a href="https://www.facebook.com/SneakerCrush/" target="_blank" class="social grad-purple-hover va mr-2">
                                        <i class="fab fa-facebook-f vam"></i>
                                    </a>
                                    <a href="https://www.instagram.com/sneakercrush" target="_blank" class="social grad-purple-hover va mr-2">
                                        <i class="fab fa-instagram vam"></i>
                                    </a>
                                    <a href="https://twitter.com/sneakercrush" target="_blank" class="social grad-purple-hover va mr-2">
                                        <i class="fab fa-twitter vam"></i>
                                    </a>
                                    <!-- <a href="#" target="_blank" class="social grad-purple-hover va">
                                        <i class="fab fa-linkedin-in vam"></i>
                                    </a> -->
                                </div>
                            </b-col>
                        </b-row>
                    </b-col>
                </b-row>
            </b-container>
        </div>
        <div class="bottom grad-purple">
            <b-container class="h-100">
                <b-row class="h-100 py-3">
                    <b-col cols="12" sm="" class="va text-center text-sm-left">
                        <router-link to="/" class="d-inline-block logo vam"></router-link>
                    </b-col>
                    <b-col cols="12" sm="" class="va text-center text-sm-right text-xl-center text-nowrap py-2 py-sm-0">
                        <router-link :to="{name: 'release-list'}" class="text-white text-uppercase vam mr-2"><b>Releases</b></router-link>
                        <router-link :to="{name: 'catalog-list'}" class="text-white text-uppercase vam mx-2"><b>Catalog</b></router-link>
                        <router-link :to="{name: 'news-list'}" class="text-white text-uppercase vam mx-2"><b>News</b></router-link>
                        <a href="http://sneakercrushshop.com" target="_blank" class="text-white text-uppercase vam ml-2"><b>Store</b></a>
                    </b-col>
                    <b-col cols="12" md="" class="text-center text-md-right d-block d-xl-none py-2 py-md-0">
                        <div class="d-inline-block vam">
                            <a href="https://www.facebook.com/SneakerCrush/" target="_blank" class="social white va mr-2">
                                <i class="fab fa-facebook-f vam"></i>
                            </a>
                            <a href="https://www.instagram.com/sneakercrush" target="_blank" class="social white va mr-2">
                                <i class="fab fa-instagram vam"></i>
                            </a>
                            <a href="https://twitter.com/sneakercrush" target="_blank" class="social white va mr-2">
                                <i class="fab fa-twitter vam"></i>
                            </a>
                            <!-- <a href="#" target="_blank" class="social white va">
                                <i class="fab fa-linkedin-in vam"></i>
                            </a> -->
                        </div>
                    </b-col>
                    <b-col cols="12" xl="" class="va text-uppercase text-center text-xl-right text-white text-nowrap">
                        © 2019 <b>Sneaker Crush</b>
                    </b-col>
                </b-row>
            </b-container>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            send() {
                let form = this.$refs.form;
                let email = this.$refs.email.$el.value;
                let button = this.$refs.button;
                if (email) {
                    button.click();
                } else {
                    this.$notify('Enter email');
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    .footer {
        overflow: hidden;
    }
    .top {
        background-color: #000;
    }
    .bottom {
        font-size: 10pt !important;
    }
    .apps {
        font-size: 0px;
    }
    .app {
        background-size: contain;
        background-repeat: no-repeat;
        height: 39px;
        &.google {
            width: 131px;
            background-image: url('/static/app-google.png');
        }
        &.apple {
            width: 116px;
            background-image: url('/static/app-apple.png');
        }
    }
    .logo {
        height: 30px;
        width: 186px;
        background-image: url('/static/logo-white.svg');
        background-repeat: no-repeat;
        background-size: contain;
    }
    a.social {
        display: inline-block;
        border-radius: 100px;
        color: #888888;
        border: 1px solid #888888;
        width: 28px;
        height: 28px;
        text-align: center;
        box-sizing: border-box;
        &:visited {
            color: #888888;
        }
        &:hover {
            color: #fff !important;
            border: none;
        }

        &.white {
            color: #fff;
            border-color: #fff;
            &:hover {
                border: 1px solid #fff;
            }
        }
    }
</style>