<template>
 <div>
      <h2
        style="
          font-family: 'Lucida Bright';
          margin-top: 2rem;
          margin-bottom: 1rem;"
      >
        Add Recipe
      </h2>
  <form @submit.prevent="postRecipe" class="mb-5">
    <div class="input-group">
      <div class="input-group-prepend">
        <span class="input-group-text" id="">Title</span>
      </div>
      <input v-model="title" type="text" class="form-control" />
    </div>

    <div class="input-group">
      <div class="input-group-prepend">
        <span class="input-group-text">URL</span>
      </div>
    <input v-model="imageData" type="text" name="scriptPicture" class="form-control" id="scriptPicture"/>
   </div>

    <div class="input-group">
      <div class="input-group-prepend">
        <span class="input-group-text">Description</span>
      </div>
        <textarea v-model="description" type="text" class="form-control"></textarea>
      </div>
      <!-- možda imageDecription -->
   
    <button type="submit" class="btn btn-primary ml-2" id="publishbttn">Publish</button>
  </form>
</div>
</template>

<script>
import { Posts } from "@/services";
import Card from "@/components/Card.vue";
import store from "@/store.js";

export default {
  data() {
    return {
      store,
      imageData: '',
      title: "",
      description: "",
    };
  },
  // name: "newrecipe",
  methods: {
    getImageBlob() {
      // Advanced: kako omotati klasičnu callback funkciju u Promise
      return new Promise((resolve, reject) => {
        this.imageData.generateBlob((blobData) => {
          if (blobData != null) {
            resolve(blobData);
          } else {
            reject("Error with getting image.");
          }
        });
      });
    },
    async postRecipe() {
      let blob = this.getImageBlob();
      console.log(blob)
      let post = {
        createdBy: this.store.username,
        postedAt: Date.now(),
        title: this.title,
        description: this.description,
        imageData: this.imageData
      };
      let newrecipe = await Posts.add(post);
      console.log("Spremljeni post", newrecipe.data);
      this.$router.push({ name: "recipes" });
    },
  },
};
</script>

<style lang="scss">
.card-body {
  padding: 0px;
}

img:hover {
  cursor: pointer;
}

.btn-post {
  width: 200px;
}

#publishbttn {
  text-align: right;
  background-color: rgb(159, 159, 159);
  border-color: grey;
}

#publishbttn:hover {
  background-color: #dd6824 !important;
  border-color: grey !important;
}

.croppa-container {
  border: 3px dashed gray;
  width: 400px;
  display: block;
  margin-bottom: 10px;
}

.input-group {
  margin-bottom: 20px;
  margin-top: 20px;
}

.textarea {
  height: 200px;
}
</style>
