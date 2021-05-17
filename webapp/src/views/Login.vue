<template>
  <div class="main">
    <h1>Login to RESTaurant Reservation</h1>
    <p>
      Don't have an account?
      <router-link to="/signup"> Sign up here! </router-link>
    </p>
    <form style="margin-top: 50px" v-on:submit="onSubmit">
      <label for="user-email">Email:</label> <br />
      <input
        v-model="email"
        type="email"
        id="user-email"
        placeholder="johhn.doe@gmail.com"
        required
      />
      <br />
      <label
        v-if="responseError.length > 0"
        style="color: red; font-size: 12px"
        for="user-confirm-password"
        >{{ responseError }}</label
      >
      <br />
      <br />
      <label for="user-password">Password:</label> <br />
      <input
        v-model="password"
        type="password"
        id="user-password"
        placeholder="query123@"
        required
      />
      <br />
      <br />
      <input style="margin-top: 50px" type="submit" value="Login" />
    </form>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import router from '../router';
import Utils from '../utils';

@Options({
  components: {},
})
/* eslint class-methods-use-this: ["error", { "exceptMethods": ["mounted", "signInSilently"] }] */
export default class Login extends Vue {
  email = '';

  password = '';

  responseError = '';

  mounted() {
    Utils.signInSilently();
  }

  onSubmit(): void {
    const user = {
      email: this.email,
      password: this.password,
    };

    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open('POST', 'http://localhost:12001/login', true);
    xmlHttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xmlHttp.onreadystatechange = () => {
      if (xmlHttp.readyState === 4) {
        const response = JSON.parse(xmlHttp.responseText);
        this.responseError = '';
        if (response.error !== undefined) {
          this.responseError = response.error;
        } else {
          localStorage.authToken = response.token;
          localStorage.authEmail = user.email;
          console.log('Current authToken', localStorage.authToken);
          router.replace('/explore');
        }
      }
    };
    xmlHttp.send(JSON.stringify(user));
  }
}
</script>

<style>
.main {
  max-width: 700px;
  height: 800px;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  max-height: 100%;
  overflow: auto;
}

form input {
  min-width: 200px;
  padding: 2px 10px 2px 10px;
  font-size: 16px;
}

label {
  font-size: 18px;
}
</style>
