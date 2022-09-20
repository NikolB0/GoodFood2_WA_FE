<template>
    <div class="signup pt-3">
      <h1 style="font-family: 'Lucida Bright'; margin-top: 10rem; margin-bottom: 1rem;">Signup</h1>
      <div class="container">
        <div class="row">
          <div class="col-sm"></div>
          <div class="col-sm">
            <form @submit.prevent="signup">
              <div class="form-group">
                <label form="email"
                  >Email Address</label
                >
                <input
                  type="email"
                  v-model="email"
                  class="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="Enter e-mail address"
                />
              </div>
              <div class="form-group">
                <label form="password">Password</label>
                <input
                  type="password"
                  v-model="password"
                  class="form-control"
                  id="Password"
                  placeholder="Password"
                />
                <small id="password" class="form-text text-muted">
                  Your password should be at least 6 characters long.
                </small>
                <div class="form-group">
                  <label form="repeatPassword">Repeat password</label>
                  <input
                    type="password"
                    v-model="passwordRepeat"
                    class="form-control"
                    id="repeatPassword"
                    placeholder="Re-enter password"
                  />
                </div>
              </div>
              <button type="button" @click="signup" class="btn btn-primary">
                Sign Up
              </button>
            </form>
          </div>
          <div class="col-sm"></div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  //umjesto firebase:  
  import { Auth, Signup } from '@/services'
  
  export default {
    data() {
      return {
        email: "",
        password: "",
        passwordRepeat: "",
      };
    },
    methods: {
      async signup() {
        if ((this.password == (this.passwordRepeat) && this.password != "")) {
          let success = await Signup.signup(this.email, this.password);
          console.log('Signup status: ', success);
          this.$router.push({name: 'login' });
          
        } else {
          alert("Lozinke se ne podudaraju!");
        }
      },
    },
  };
  </script>

<style scoped>
    .btn {
      text-align: right;
      background-color: rgb(159, 159, 159);
      border-color: grey;
      margin-top: 10px;
    }
    
    .btn:hover {  
      background-color:#dd6824 !important;
      border-color: grey !important;
    }
    </style>