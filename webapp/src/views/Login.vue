<template>
  <div class="main">
    <h1> Login to RESTaurant Reservation </h1>
    <p> Don't have an account? <router-link to="/signup"> Sign up here! </router-link> </p>
    <form style='margin-top: 50px;' v-on:submit='onSubmit'>
    <label for="user-email">Email:</label> <br>
    <input type="email" id='user-email' placeholder='johhn.doe@gmail.com' required> <br> <br>
    <label for="user-password">Password:</label> <br>
    <input type="password" id='user-password' placeholder='query123@' required> <br> <br>
    <input style='margin-top:50px;' type="submit" value="Login">
    </form>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  components: {
  },
})
export default class Login extends Vue {}
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
