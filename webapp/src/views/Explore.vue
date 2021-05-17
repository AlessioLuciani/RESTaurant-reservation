<template>
  <div class="main">
    <h1> Welcome to the explore page! </h1>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  components: {
  },
})
export default class Explore extends Vue {}
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
