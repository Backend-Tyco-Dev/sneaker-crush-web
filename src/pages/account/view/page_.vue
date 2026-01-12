<template>
    <div>
        <div class="bg-main">
            <b-container class="py-5 text-white">
                <b-row class="mb-3">
                    <b-col cols="auto" class="nowrap">
                        <h2 class="mb-0">
                            <b>{{$viewer.user.username}}</b>
                        </h2>
                    </b-col>
                    <b-col cols="auto" class="va">
                        <div class="p-2 vam hoverable" @click="edit()">
                            <i class="fa fa-edit"></i>
                        </div>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols="3">
                        <div class="mt-1">
                            <b>{{$viewer.user.email}}</b>
                        </div>
                    </b-col>
                </b-row>
            </b-container>
        </div>
        <b-container class="my-5 py-5">
            <b-row>
                <b-col cols="4">
                    <rounded class="sm h-100 bg-light grad-purple-hover shadow-bottom va text-center text-hover-white hoverable">
                        <div class="vam text-uppercase h6 mb-0 font-weight-bold">
                            <i class="far fa-heart mr-2"></i>Favorites
                        </div>
                    </rounded>
                </b-col>
                <b-col cols="4">
                    <rounded class="sm py-4 bg-light grad-purple-hover shadow-bottom va text-center text-hover-white hoverable">
                        <div class="vam text-uppercase h6 mb-0 font-weight-bold">
                            <i class="fa fa-dollar-sign mr-2"></i>Currency converter
                            <span class="text-muted ml-2">
                                USD<i class="fa fa-angle-down ml-1"></i>
                            </span>
                        </div>
                    </rounded>
                    <rounded class="sm py-4 mt-3 bg-light grad-purple-hover shadow-bottom va text-center text-hover-white hoverable">
                        <div class="vam text-uppercase h6 mb-0 font-weight-bold">
                            <i class="far fa-comments mr-2"></i>Send feedback
                        </div>
                    </rounded>
                </b-col>
                <b-col cols="4">
                    <rounded class="sm py-4 twitter text-white shadow-bottom va text-center hoverable">
                        <div class="vam text-uppercase h6 mb-0 font-weight-bold">
                            <i class="fab fa-twitter mr-2"></i>Twitter
                        </div>
                    </rounded>
                    <rounded class="sm py-4 mt-3 instagram shadow-bottom va text-center text-white hoverable">
                        <div class="vam text-uppercase h6 mb-0 font-weight-bold">
                            <i class="fab fa-instagram mr-2"></i>Instagram
                        </div>
                    </rounded>
                </b-col>
            </b-row>
            <block-adwert type="quad" class="mt-5"></block-adwert>
        </b-container>
    </div>
</template>

<script>
    export default {
        methods: {
            edit() {
                this.$router.push({name: 'account-profile'});
            }
        }
    };
</script>

<style lang="scss" scoped>
    .twitter {
        background-color: #1d9eef;
    }
    .instagram {
        background: linear-gradient(right bottom, #FED373 4%, #F15245 30%, #D92E7F 62%, #9B36B7 85%, #515ECF);
    }
</style>
