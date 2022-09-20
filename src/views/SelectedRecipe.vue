<template>
    <!-- <div v-if="card"> -->
        <Card :info="card" :showcomments="true" />
    <!-- </div> -->
</template>

<script>
import Card from '@/components/Card.vue';
import store from '@/store.js';
import { Posts } from '@/services';

export default {
    props: ['id'],
    data() {
        return {
            card: {}
        };
    },
    async mounted() {
        this.card = await Posts.getOne(this.id);
        console.log(this.card)
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