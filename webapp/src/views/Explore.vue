<template>
  <div class="main">
    <h1>Welcome to the explore page!</h1>
    <input class="form-control" type="text" v-model="query" />
    <ul class="dropdown" style="width: 100%">
      <li
        class="dropdown-content"
        v-bind:key="index"
        v-for="(item, index) in matches"
        v-on:click="onItemClicked(index)"
      >
        <img
          src="../assets/loupe.svg"
          style="height: 16px; float: left; margin-top: 4px;"
          class="filter-green"
        />
        <p style="padding-left: 30px;"> {{ item.message }} </p>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import router from '../router';

@Options({
  components: {},
})

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["onItemClicked"] }] */
export default class Explore extends Vue {
  items = [
    { message: 'Foo', id: '1' },
    { message: 'Bar', id: '2' },
    { message: 'AA', id: '42' },
    { message: 'AB', id: '2' },
  ];

  query = '';

  selectedIndex = -1;

  get matches() {
    if (this.query.length <= 0) {
      return [];
    }
    return this.items.filter(
      (item) => item.message.toLowerCase().indexOf(this.query.toLowerCase()) >= 0,
    );
  }

  onItemClicked(index: number) {
    this.selectedIndex = index;
    console.log('Selected index is', index);
    const selectedRestaurant = this.matches[index];
    console.log(selectedRestaurant);
    router.replace({
      name: 'Restaurant',
      params: selectedRestaurant,
    });
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

.form-control {
  width: 470px;
  padding: 4px 10px 4px 40px;
  font-size: 22px;
  background: url('../assets/loupe.svg') no-repeat scroll 10px 8px;
  background-size: 18px 18px;
  margin-top: 50px;
}

label {
  font-size: 18px;
}

.dropdown {
  font-size: 20px;
  position: relative;
  display: inline-block;
}

.dropdown-content {
  text-align: left;
  display: inline-block;
  background-color: #f9f9f9;
  width: 500px;
  padding: 5px 10px 5px 10px;
  box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.1);
  z-index: 1;
}

.dropdown-content:hover {
  background-color: #e0e0e0;
  cursor: pointer;
}

.filter-green {
  filter: invert(43%) sepia(0%) saturate(317%) hue-rotate(207deg) brightness(92%) contrast(82%);
}
</style>
