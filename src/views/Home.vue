<template>
    <!-- <div class="row"> -->
    <div class="row">
        <div v-if="store.authenticated">
            <div @click="gotoDetails(card)" :key="card.id" v-for="card in cards">
                <Card :info="card" />
            </div>
        </div>
        <!-- <div class="col-sm-12 col-md-8">
            <router-link :to="{ name: 'newrecipe' }">
                <button type="Novi post" style="margin-bottom: 10px" class="btn btn-primary btn-block d-md-none" id="publishbttn">
                    Add Recipe
                </button>
            </router-link>
            <router-view :term="term" />
        </div> -->
        <div class="col-4">
            <span v-if="auth.authenticated">
                Current account: {{ store.username }}
                <br />
                <br />
            </span>
            <router-link :to="{ name: 'newrecipe' }">
                <button v-if="auth.authenticated" type="Novi post"
                    class="btn btn-primary btn-block d-none d-md-block">Add Recipe</button>
            </router-link>
        </div>
    </div>
</template>

<script>
import _ from 'lodash';
import { Posts } from '@/services';
import Card from '@/components/Card.vue';
import store from '@/store.js';
import { Auth } from '@/services';

export default {
    props: ['term'],
    data() {
        return {
            store,
            auth: Auth.state,
            cards: []
        }
    },
    name: 'home',
    watch: {
        'store.searchTerm': _.debounce(function (val) {
            this.fetchPosts(val);
        }, 500)
    },
    created() {
        this.fetchPosts();
        this.account();
    },
    methods: {
        account() {
            if (this.auth.authenticated) {
                this.user = Auth.account();
                this.store = Auth.account();
                console.log("Authenticated:", this.auth.authenticated)
                store.username = this.store.username;
                console.log(store.username);
            }
        },
        async fetchPosts(term) {
            term = term || store.searchTerm;
            this.cards = await Posts.getAll(term);
        },
        gotoDetails(card) {
            this.$router.push({ path: `post/${card.id}` });
        }
    },
    components: {
        Card
    }
};
</script>

<style scoped>

#publishbttn {
  text-align: right;
  background-color: rgb(159, 159, 159);
  border-color: grey;
}

#publishbttn:hover {
  background-color: #dd6824 !important;
  border-color: grey !important;
}

</style>
