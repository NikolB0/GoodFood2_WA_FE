<template>
     <div id="app">
        <div class="bg-white">
            <div class="container">
                <div class="row">
                    <div class="col">
                        <nav class="navbar navbar-expand-lg navbar-light mb-2">
                            <router-link class="navbar-brand" :to="{ name: 'recipes' }">
                                <img src="./assets/logo.png" height="60" style="margin-left: 10px !important" />
                            </router-link>
                            <button
                                class="navbar-toggler"
                                type="button"
                                data-toggle="collapse"
                                data-target="#navbarSupportedContent"
                                aria-controls="navbarSupportedContent"
                                aria-expanded="false"
                                aria-label="Toggle navigation"
                            >
                                <span class="navbar-toggler-icon"></span>
                            </button>

                            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                                <form class="form-inline my-2 my-lg-0 mr-auto ml-5" style="margin-left: 180px;">
                                    <input
                                        v-model="store.searchTerm"
                                        class="form-control mr-sm-2"
                                        type="search"
                                        placeholder="Pretraga..."
                                        aria-label="Search"
                                    />
                                </form>
                                <router-link v-if="!auth.authenticated" class="btn btn-info my-2 my-sm-0 mr-2" style="margin-left:10px;" to="/login">
                                    Login
                                </router-link>
                                <span v-if="auth.authenticated">
                                    <a @click="logout" class="btn btn-info my-2 my-sm-0 mr-2" href="#">Logout</a>
                                </span>
                                <router-link
                                    v-if="!auth.authenticated"
                                    class="btn btn-outline my-2 my-sm-0 mr-2"
                                    to="/signup"
                                >
                                    Signup
                                </router-link>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </div>

        <div class="container">
            <router-view />
        </div>

    </div>
</template>

<script>
import store from '@/store.js';
import { Auth } from '@/services'

export default {
  //name: 'app',
  data() {

    return {
      store,
      auth: Auth.state
    };
  },
  methods: {
    
      logout() {
        Auth.logout();
        this.$router.go();
      },
       account(){
      if(this.auth.authenticated){
      this.user = Auth.account();
      this.store = Auth.account();
      console.log("Authenticated:", this.auth.authenticated)
          store.username=this.store.username;
      }
    },
    created() {
      this.account();
    }
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.bg-white {
    background-color: white;
    border-bottom: #ccc 1px solid;
    margin-bottom: 20px;
    padding: 10px;
    padding-left: 1px;
}

#nav.navbar {
  padding: 30px;
  background-color: #f7d2bd;
  height: 80px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #dd6824;
    }
  }
}

.btn-info {  
    color: white !important;
    background: #dd6824 !important;
    border-color: #dd6824 !important;
    margin-left: 10px;
}

.btn-primary {
    color: #dd6824;
    background: none;
    border-color: #dd6824;
}

#search {
  display: block;
  text-align: center;
}

.container mt-5 {
  display: flex;
  align-content: center;
}

</style>
