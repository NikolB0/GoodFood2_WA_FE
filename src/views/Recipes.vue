<template>
    <div style="display:flex; flex-direction: column; align-items: flex-end;">
        <router-link :to="{ name: 'newrecipe' }">
            <div type="Novi post" style="margin-bottom: 25px; margin-top: 8px" class="btn btn-primary btn-block" id="publishbttn">
                Add Recipe
            </div>
        </router-link>
        <div class="col-lg-12" :key="card.id" v-for="card in cards" style="display:flex; flex-direction: column; align-items: center;">
            <div @click="gotoDetails(card)">
                <Card :info="card" />
            </div>
        </div>
    </div>
</template>

<script>
import _ from 'lodash';
import { Posts } from '@/services';
import Card from '@/components/Card.vue';
import store from '@/store.js';

export default {
    data() {
        return {
            store,
            cards: []
        };
    },
    watch: {
        'store.searchTerm': _.debounce(function (val) {
            this.fetchPosts(val);
        }, 500)
    },
    created() {
        this.fetchPosts();
    },
    name: 'posts',
    methods: {
        async fetchPosts(term) {
            this.cards = await Posts.getAll();
        },
        gotoDetails(card) {
            this.$router.push({ path: `/selectedrecipe/${card.id}` });
        }
    },
    components: {
        Card
    }
};
</script>

<style scoped>
button {
    margin-bottom: 30px;
}

#publishbttn {
  text-align: right;
  background-color: rgb(159, 159, 159);
  border-color: #dd6824;
  border-width: 2px;
  width: 10rem;
  text-align: center;
}

#publishbttn:hover {
  background-color: #dd6824 !important;
  border-color: grey !important;
}
</style>