<template>
  <div class="background">
    <div class="login pt-3">
      <h1
        style="
          font-family: 'Lucida Bright';
          margin-top: 10rem;
          margin-bottom: 1rem;
        "
      >
        Login
      </h1>
      <div class="container">
        <div class="row">
          <div class="col-sm"></div>
          <div class="col-sm">
            <form>
              <div class="form-group">
                <input
                  type="email"
                  v-model="username"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Email"
                />
                <!-- placeholder="Phone number, username, or email"-->
              </div>
              <div class="form-group">
                <input
                  type="password"
                  v-model="password"
                  class="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                />
              </div>
              <button
                type="button"
                @click="login()"
                class="btn btn-primary"
                style="margin: 8px"
              >
                Submit
              </button>
              <!-- YOU DON'T HAVE AN ACCOUNT? SIGN UP -->
              <p class="new-account">
                Don't have an account?
                <a href="/signup"> Sign up </a>
              </p>
            </form>
          </div>
          <div class="col-sm"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//umjesto firebase:
import { Auth } from '@/services/index'
import  store  from '@/store';

export default {
  //name: "login",
  data() {
    return {
      username: '',
      password: '',

      
    }
  },
  methods: {
    async login() {    
      console.log(Auth);
      let success = await Auth.login(this.username, this.password);
      console.log("Login Status: " + success);

      this.store = Auth.getUser()
      store.username=this.store.username;
      store.isAuthenticated = true;
      this.$router.replace({ path: '/'})    
  } 

  },
}

</script>

<style scoped>
.btn {
  text-align: right;
  background-color: rgb(159, 159, 159);
  border-color: grey;
}

.btn:hover {
  background-color: #dd6824 !important;
  border-color: grey !important;
}

.form-control {
  margin-top: 10px !important;
}
</style>
