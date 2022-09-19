<template>
     <div id="app">
        <div class="bg-white">
            <div class="container">
                <div class="row">
                    <div class="col">
                        <nav class="navbar navbar-expand-lg navbar-light mb-2">
                            <router-link class="navbar-brand" :to="{ name: 'posts' }">
                                <img src="/assets/logo.svg" height="60" />
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
                                <form class="form-inline my-2 my-lg-0 mr-auto ml-5">
                                    <input
                                        v-model="searchTerm"
                                        class="form-control mr-sm-2"
                                        type="search"
                                        placeholder="Pretraga..."
                                        aria-label="Search"
                                    />
                                </form>
                                <router-link v-if="!authenticated" class="btn btn-info my-2 my-sm-0 mr-2" to="/login">
                                    Login
                                </router-link>
                                <span v-if="authenticated">
                                    <a @click="logout" class="btn btn-info my-2 my-sm-0 mr-2" href="#">Logout</a>
                                </span>
                                <router-link
                                    v-if="!authenticated"
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

        <!-- <div id="footer" class="text-center mt-5">Ovo je footer. (c) 2019 mi svi skupa.</div> -->
    </div>
</template>

<script type="text/javascript">
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from '@/store';

// firebase.auth().onAuthStateChanged((user) => {
//  const currentRoute = router.currentRoute;
 
//  if (user) {
//     // User is signed in.
//     console.log('*** User', user.email);
//     store.currentUser = user.email;

//     if (!currentRoute.meta.needsAuth) {
//         router.push({ name: 'home' });
//     }
//  } else {
//     // User is not signed in.
//     console.log('*** No user');
//     store.currentUser = null;
//     //kick me out
//     if (currentRoute.meta.needsAuth) {
//         router.push({ name: 'login' });
//     }
//   }
// });

export default {
  //name: 'app',
  data() {
    return {
      store
    };
  },
  methods: {
      logout() {
        firebase.auth().signOut().then(() => this.$router.push({ name: 'login' }));
      },
  },
  // mounted: {
  //   firebase.auth().onAuthStateChanged(user => {
  //           if (user) {
  //               console.log('User is logged in with email ' + user.email);
  //               this.authenticated = true;
  //               db.collection('korisnici')
  //                   .doc(user.email)
  //                   .get()
  //                   .then(doc => {
  //                       if (doc.exists) {
  //                           console.log('Document data:', doc.data());
  //                           this.tipKorisnika = doc.data().tipProfila;
  //                       } else {
  //                           // doc.data() will be undefined in this case
  //                           console.log('No such document!');
  //                       }
  //                   });
  //               this.userEmail = user.email;
  //               if (this.$route.name === 'login') this.$router.push({ name: 'posts' }).catch(err => console.log(err));
  //           } else {
  //               console.log('User is not logged in');
  //               this.authenticated = false;
  //               if (this.$route.name !== 'login') this.$router.push({ name: 'login' }).catch(err => console.log(err));
  //           }
  //       });
  //     }
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
