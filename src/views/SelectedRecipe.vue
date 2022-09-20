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
        console.log(this.$route.params.id)
        this.card = await Posts.getOne(this.$route.params.id);
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