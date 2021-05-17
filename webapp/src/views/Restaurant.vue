<template>
  <div class="maina">
    <h1>Restaurant {{ currentRestaurant.message }}</h1>
    <span
      class="fa fa-star"
      style="font-size: 20px"
      v-for="index in 5"
      :key="index"
      :class="{ checked: index <= stars }"
    />
    <h4>Via Pietro Cavallini 25, 00193 Rome Italy</h4>

    <div style="margin-top: 50px; min-width: 1000px">
      <img
        style="display: inline-block"
        src="../assets/557px-Barbieri_-_ViaSophia25668.jpg"
      />
      <div style="height: 50px; min-width: 400px; float: right">
        <h2>Reserve a table</h2>
        <br />
        <form v-on:submit.prevent="onSubmit">
          <input
            type="date"
            v-model="bookingData.date"
            :min="bookingData.date"
            style="width: 220px"
          />
          <br />
          <br />
          <input
            type="time"
            v-model="bookingData.time"
            :min="currentHour"
            style="width: 220px"
            required
          />
          <br />
          <br />
          <input
            style="padding: 5px 10px 5px 10px; width: 240px"
            type="submit"
            value="Book now"
          />
        </form>
      </div>
    </div>
    <br />
    <h1>Menu</h1>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import router from '../router';

@Options({
  components: {},
})

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["mounted", "currentHour"] }] */
export default class Restaurant extends Vue {
  stars = 3;

  bookingData = {
    guests: 1,
    date: new Date().toISOString().slice(0, 10),
    time: '20:30',
  };

  created() {
    if (!this.restaurantProvided) {
      // TODO: if available, query restaurantData API with the latest available restaurant
      // an idea is to append restaurant id to the url and fetch the data
      alert('No restaurant provided!');
      router.replace('/');
    }
  }

  get currentHour() {
    return new Date().toLocaleTimeString().slice(0, 5);
  }

  onSubmit() {
    console.log(this.bookingData);
    
  }

  get currentRestaurant() {
    return this.$route.params;
  }

  get restaurantProvided() {
    return Object.keys(this.currentRestaurant).length > 0;
  }

  get restaurantPic() {
    return this.restaurantProvided
      ? this.currentRestaurant.picture
      : '../assets/557px-Barbieri_-_ViaSophia25668.jpg';
  }
}
</script>

<style>
@import url(https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css);
.maina {
  max-width: 1000px;
  margin: auto;
}

.form-control {
  width: 470px;
  padding: 4px 10px 4px 40px;
  font-size: 22px;
  background: url('../assets/loupe.svg') no-repeat scroll 10px 8px;
  background-size: 18px 18px;
}

.checked {
  color: orange;
}
</style>
