<template>
    <b-container class="page px-2 px-lg-0">
        <rounded class="bg-white box mx-auto shadow-lg">
            <div>
                <h3 class="mb-0 font-weight-bold">
                    Sign in
                </h3>
            </div>
            <b-form novalidate @submit="login">
                <fieldset :disabled="sending">
                    <div class="mt-4">
                        <b-input type="text" class="clean" placeholder="Email" v-model="cred.email"></b-input>
                        <div class="grad-purple line"></div>
                    </div>
                    <div class="mt-4">
                        <b-input type="password" class="clean" placeholder="Password" v-model="cred.password"></b-input>
                        <div class="grad-purple line"></div>
                    </div>
                    <div class="text-right mt-2">
                        <router-link :to="{name: 'forget-password'}" class="text-dark small">Forgot password?</router-link>
                    </div>
                    <div class="text-center mt-4">
                        <s-button type="submit" class="grad-purple text-uppercase px-5" :disabled="!cred.email || !cred.password">
                            Sign in
                        </s-button>
                    </div>
                </fieldset>
            </b-form>
            <div class="text-center mt-4 small">
                Don't have an account? <router-link :to="{name: 'signup', params: $route.params}">Sign up</router-link>
            </div>
        </rounded>
    </b-container>
</template>

<script>
    import _ from 'lodash';
    export default {
        data: () => ({
            cred: {
                email: null,
                password: null
            },
            sending: false
        }),
        methods: {
            login($event) {
                $event.preventDefault();
                this.sending = true;
                this.$viewer.login(this.cred)
                    .then(() => {
                        let back = _.get(this.$route, 'params.back');
                        if (back) {
                            this.$router.push(back);
                        } else {
                            this.$router.push({name: 'account-view'});
                        }
                    })
                    .catch(error => {
                        this.$notify({type: 'error', text: 'Wrong email or password'});
                    })
                    .finally(() => {
                        this.sending = false;
                    });
            }
        }
    };
</script>

<style lang="scss" scoped>
    .page {
        padding: 120px 0;
        @media (max-width: 1200px) {
            padding: 40px 0;
            .box {
                margin-top: 0;
            }
        }
    }
    .box {
        max-width: 488px;
        padding: 150px 60px 100px 60px;
        // margin-top: 5%;
    }
</style>