<template>
    <b-container class="page px-2 px-lg-0">
        <rounded class="bg-white box mx-auto shadow-lg">
            <div>
                <h3 class="mb-0 font-weight-bold">
                    Sign up
                </h3>
            </div>
            <b-form novalidate @submit="send" :disabled="loading">
                <div class="mt-4">
                    <b-input type="text" class="clean" placeholder="Username" v-model="record.username"></b-input>
                    <div class="grad-purple line"></div>
                </div>
                <div class="mt-4">
                    <b-input type="text" class="clean" placeholder="Email" v-model="record.email"></b-input>
                    <div class="grad-purple line"></div>
                </div>
                <div class="mt-4">
                    <b-input type="password" class="clean" placeholder="Password" v-model="record.password"></b-input>
                    <div class="grad-purple line"></div>
                </div>
                <div class="text-center mt-5">
                    <s-button type="submit" class="grad-purple text-uppercase px-5">
                        Sign up
                    </s-button>
                </div>
            </b-form>
            <div class="text-center mt-4 small">
                Already have an account? <router-link :to="{name: 'signin'}">Sign in</router-link>
            </div>
        </rounded>
    </b-container>
</template>

<script>
    import _ from 'lodash';
    export default {
        data: () => ({
            record: {
                username: '',
                email: '',
                password: ''
            },
            loading: false
        }),
        methods: {
            send($event) {
                $event.preventDefault();
                if (!this.loading) {
                    this.loading = true;
                    this.$gql.request(`
                        mutation($record:JSON) {
                            registerUser(record: $record)
                        }
                    `, {
                        record: this.record
                    })
                    .then(({registerUser}) => {
                        if (registerUser) {
                            let viewer = this.$viewer;
                            viewer.logged = true;
                            viewer.user = registerUser.user;
                            viewer.token = registerUser.token;

                            let back = _.get(this.$route, 'params.back');
                            if (back) {
                                this.$router.push(back);
                            } else {
                                this.$router.push({name: 'account-view'});
                            }
                        }
                    }, (errors) => {
                        // console.log(error.response.errors);
                        let error = _.get(errors, 'response.errors[0].message', 'error');
                        this.$notify({type: 'error', text: _.split(error, '').map((c, i) => i == 0 ? _.capitalize(c) : c).join('')});
                    })
                    .finally(() => {
                        this.loading = false;
                    });
                }
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
        margin-top: 5%;
    }
</style>