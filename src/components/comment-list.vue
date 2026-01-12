<template>
    <div class="cont">
        <div class="comment-list" ref="cont">
            <div class="text-center py-3" v-if="loadMore">
                <s-button class="grad-purple px-4" @click="loadPrev()" :disabled="loading">
                    Load previous comments
                </s-button>
            </div>
            <div v-for="(comment, index) in items" :key="index" class="border-bottom pb-3 my-3 pl-4 hoverable" @click="answer(comment)">
                <b-row>
                    <b-col class="small">
                        <b>{{comment.author.username}}</b>
                    </b-col>
                    <b-col cols="auto" class="text-muted small">
                        {{comment.timestamp | ago}}
                    </b-col>
                </b-row>
                <div class="mt-3 small">
                    {{comment.message}}
                </div>
            </div>
            <div class="text-center text-muted small my-4" v-if="!items || items && !items.length">
                Nothing here.
            </div>
        </div>
        <div class="mt-3">
            <fieldset :disabled="sending">
                <b-row>
                    <b-col>
                        <b-textarea v-model="text" class="text pl-4" no-resize max-rows="3" placeholder="Add a comment..."></b-textarea>
                        <div class="text-muted small mt-1 pl-4" v-if="answerTo">
                            Answer to <b>{{answerTo}}</b><i class="fa fa-times ml-2 hoverable" @click="answerTo = null"></i>
                        </div>
                    </b-col>
                    <b-col cols="auto" class="align-self-end1">
                        <s-button class="grad-purple px-5" @click="post()">
                            Post
                        </s-button>
                    </b-col>
                </b-row>
            </fieldset>
        </div>
    </div>
</template>

<script>
    import _ from 'lodash';

    let timer;

    export default {
        props: {
            value: {
                type: Object,
                default: () => ({})
            },
            id: String,
            type: String
        },
        data: () => ({
            text: null,
            answerTo: null,
            sending: false,
            loading: false
        }),
        computed: {
            items() {
                return _.reverse(_.get(this.value, 'items') || []);
            },
            loadMore() {
                let info = _.get(this.value, 'pageInfo') || {};
                return info ? info.itemCount > this.items.length : false;
            }
        },
        methods: {
            answer(item) {
                let username = _.get(item, 'author.username');
                if (_.get(this.$viewer, 'user.username') != username) {
                    this.answerTo = username;
                }
            },
            loadPrev() {
                if (!this.loading) {
                    this.loading = true;
                    let contEl = this.$refs.cont;
                    let contScrollY = contEl && contEl.scrollTop || 0;
                    let contScrollHeight = contEl && contEl.scrollHeight;
                    let page = (this.value.pageInfo.currentPage || 0) + 1;
                    this.$gql.request(`query($filter: JSON){
                        CommentPagination(filter: $filter, sort:{timestamp: -1}, perPage: 5, page: ${page}) {
                            items {
                                _id
                                author{
                                    username
                                }
                                message
                                timestamp
                            }
                            pageInfo {
                                itemCount
                                currentPage
                                hasPreviousPage
                                hasNextPage
                            }
                        }
                    }`, {
                        filter: {
                            subject_id: this.id,
                            subject_type: this.type
                        }
                    })
                    .then(({CommentPagination}) => {
                        let items = _.concat(_.reverse(CommentPagination.items), this.value.items);
                        items = _.uniqBy(items, '_id');
                        this.value.items = _.reverse(items);
                        this.value.pageInfo = CommentPagination.pageInfo;
                        this.$emit('input', this.value);
                        setTimeout(() => {
                            if (contEl) {
                                let diff = contScrollHeight - (contEl && contEl.scrollHeight || 0);
                                contEl.scrollTop = contEl.scrollTop - diff;
                            }
                        });
                    })
                    .finally(() => {
                        this.loading = false;
                    });
                }
            },
            post() {
                if (this.$viewer.logged) {
                    if (!this.sending) {
                        this.sending = true;
                        let message = this.text;
                        if (this.answerTo) {
                            message = `@${this.answerTo} ` + message;
                        }
                        let record = {
                            subject_type: this.type,
                            subject_id: this.id,
                            message
                        };
                        this.$gql.request(`mutation($record:JSON){createComment(record:$record){author{username} message timestamp}}`, {record})
                            .then(({createComment}) => {
                                if (createComment) {
                                    this.value.items = _.reverse(_.concat(this.value.items, [createComment]));
                                    this.value.pageInfo.itemCount++;
                                    this.$emit('input', this.value);
                                    this.text = '';
                                    this.answerTo = null;
                                }
                            })
                            .finally(() => {
                                this.sending = false;
                            });
                    }
                } else {
                    this.$router.push({name: 'signin', params: {back: _.pick(this.$route, ['name', 'params'])}});
                }
            }
        },
        mounted() {
            timer = setInterval(() => {
                this.$forceUpdate();
            }, 60 * 1000);
        },
        destroyed() {
            clearInterval(timer);
        }
    };
</script>

<style lang="scss" scoped>
    .text {
        border-radius: 0;
        font-size: 14px;
        border: none;
        border-bottom: 1px solid #ddd;
    }
    .comment-list {
        @media (min-width: 992px) {
            max-height: 500px;
            overflow-x: hidden;
            overflow-y: auto;
            padding-right: 10px;
        }
    }
</style>