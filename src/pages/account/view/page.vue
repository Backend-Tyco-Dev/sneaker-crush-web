<template>
    <div>
        <div class="bg-main d-none d-xl-block">
            <b-container class="py-5 text-white">
            </b-container>
        </div>
        <b-container class="my-3 my-xl-5 py-5">
            <b-row>
                <b-col cols="12" xl="4">
                    <div class="h4 font-weight-bold mb-4">
                        Account
                    </div>
                    <!-- <rounded class="sm py-4 px-4 bg-light grad-purple-hover shadow-bottom va text-hover-white hoverable">
                        <div class="vam text-uppercase h6 mb-0 font-weight-bold">
                            <i class="far fa-user mr-2"></i>Profile
                        </div>
                    </rounded> -->
                    <router-link :to="{name: 'account-favorites'}" class="text-dark">
                        <rounded class="sm py-4 px-4 mt-3 bg-light grad-purple-hover shadow-bottom va text-hover-white hoverable text-center text-xl-left">
                            <div class="vam text-uppercase h6 mb-0 font-weight-bold">
                                <i class="far fa-heart mr-2"></i>Favorites
                            </div>
                        </rounded>
                    </router-link>
                    <a href="mailto:david@thesneakercrush.com" class="text-dark">
                        <rounded class="sm py-4 px-4 mt-3 bg-light grad-purple-hover shadow-bottom va text-hover-white hoverable text-center text-xl-left">
                            <div class="vam text-uppercase h6 mb-0 font-weight-bold">
                                <i class="far fa-comments mr-2"></i>Send feedback
                            </div>
                        </rounded>
                    </a>
                </b-col>
                <b-col cols="12" xl="4" class="pt-5 pt-xl-0">
                    <fieldset :disabled="saving">
                        <div class="h4 font-weight-bold mb-4">
                            Profile
                        </div>
                        <div class="mt-4">
                            <b-input type="text" class="clean" placeholder="Username" v-model="update.username"></b-input>
                            <div class="grad-purple line"></div>
                        </div>
                        <div class="mt-4">
                            <b-input type="text" class="clean" placeholder="Email" v-model="update.email"></b-input>
                            <div class="grad-purple line"></div>
                        </div>
                        <div class="mt-4">
                            <b-input type="password" class="clean" placeholder="Password" v-model="update.password"></b-input>
                            <div class="grad-purple line"></div>
                        </div>
                        <div class="mt-4">
                            <s-button class="w-100 grad-purple px-5" @click="save()">
                                Save changes
                            </s-button>
                            <s-button class="btn-link w-100 px-5 mt-3" @click="deleteAccountAsk()">
                                Close account
                            </s-button>
                        </div>
                    </fieldset>
                </b-col>
                <b-col cols="12" class="d-block d-xl-none py-5">
                    <rounded class="sm py-4 px-4 bg-light grad-purple-hover shadow-bottom va text-hover-white hoverable text-center text-xl-left" @click="logout()">
                        <div class="vam text-uppercase h6 mb-0 font-weight-bold">
                            <i class="fa fa-sign-out-alt mr-2"></i>Logout
                        </div>
                    </rounded>
                </b-col>
                <b-col cols="12" xl="4">
                    <b-row>
                        <b-col cols="6" xl="12">
                            <block-adwert type="quad"></block-adwert>
                        </b-col>
                        <b-col cols="6" class="d-block d-xl-none">
                            <block-adwert type="quad"></block-adwert>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
        </b-container>
        <b-modal v-model="modals.deleteAccount.state" title="Delete account" cancel-title="Yes" ok-title="Cancel" @cancel="deleteAccount()">
            Are you sure?
        </b-modal>
    </div>
</template>

<script>
    import _ from 'lodash';
    import viewer from '@/modules/viewer';
    export default {
        data: () => ({
            saving: false,
            update: {
                username: _.get(viewer, 'user.username'),
                email: _.get(viewer, 'user.email'),
                password: ''
            },
            modals: {
                deleteAccount: {
                    state: false
                }
            }
        }),
        methods: {
            edit() {
                this.$router.push({name: 'account-profile'});
            },
            logout() {
                this.$viewer.logout();
                this.$router.push('/');
            },
            deleteAccountAsk() {
                let modal = this.modals.deleteAccount;
                modal.state = true;
            },
            deleteAccount() {
                this.$gql.request(`mutation{deleteSelf}`)
                    .then(() => {
                        this.$viewer.logout();
                        this.$router.push('/');
                    }, () => {

                    });
            },
            save() {
                if (!this.saving) {
                    this.saving = true;
                    let update = _.cloneDeep(this.update);
                    this.$gql.request(`
                        mutation($update:JSON){
                            updateSelf(update:$update) {
                                username
                                email
                            }
                        }
                    `, {
                        update
                    })
                    .then(({updateSelf}) => {
                        if (updateSelf) {
                            let user = this.$viewer.user;
                            user.username = updateSelf.username;
                            user.email = updateSelf.email;
                            this.update.password = '';
                        }
                    })
                    .catch(error => {
                        let errors = _.get(error, 'response.errors', []);
                        _.each(errors, error => {
                            if (error.message == 'username already used') {
                                this.$notify({type: 'error', text: 'Username already used'});
                            }
                            if (error.message == 'email already used') {
                                this.$notify({type: 'error', text: 'Email already used'});
                            }
                            if (error.message == 'bad email') {
                                this.$notify({type: 'error', text: 'Bad email'});
                            }
                        });
                    })
                    .finally(() => {
                        this.saving = false;
                    });
                }
            }
        },
        mounted() {
            
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
