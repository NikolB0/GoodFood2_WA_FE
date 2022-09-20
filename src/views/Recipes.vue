<template>
    <div>
    <div  :key="card.id" v-for="card in cards">
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
        'store.searchTerm': _.debounce(function(val) {
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
    margin-bottom: 20px;
}
</style>