<template>
  <div class="maina">
    <h1>Restaurant {{ currentRestaurant.message }}</h1>
    <span
      class="fa fa-star"
      style="font-size: 20px"
      v-for="index in 5"
      :key="index"
      :class="{
        checked:
          index <= (currentRestaurant.stars ? currentRestaurant.stars : 3),
      }"
    />
    <h4>
      {{
        currentRestaurant.address
          ? currentRestaurant.address
          : 'Via Pietro Cavallini 25, 00193 Rome Italy'
      }}
    </h4>

    <div style="margin-top: 50px; min-width: 1000px">
      <img
        style="display: inline-block; width: 550px"
        src="../assets/557px-Barbieri_-_ViaSophia25668.jpg"
      />
      <div style="height: 50px; min-width: 400px; float: right">
        <h2>Reserve a table</h2>
        <br />
        <form v-on:submit.prevent="onSubmit">
          <label for="guestNum">Guests:</label> <br />
          <input
            id="guestNum"
            type="number"
            min="1"
            style="width: 220px"
            v-model="bookingData.guests"
            required
          />
          <br />
          <br />
          <label for="date">Day:</label> <br />
          <input
            type="date"
            id="date"
            v-model="bookingData.date"
            :min="bookingData.date"
            style="width: 220px"
          />
          <br />
          <br />
          <label for="time">Time:</label> <br />
          <input
            type="time"
            id="time"
            v-model="bookingData.time"
            :min="currentHour"
            style="width: 220px"
            required
          />
          <br />
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
    <br />
    <div>
      <h1>Menu</h1>
      <br />
      <div v-bind:key="index" v-for="(item, index) in exampleMenu">
        <h2>{{ item['category'] }}</h2>
        <div class="column" v-bind:key="idx" v-for="(meal, idx) in item.meals">
          {{ meal.item }} - {{ meal.price }}
        </div>
        <br />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import router from '../router';
import Utils from '../utils';

@Options({
  components: {},
})

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["mounted", "currentHour"] }] */
/* eslint operator-linebreak: [2, "after"] */
export default class Restaurant extends Vue {
  bookingData = {
    guests: 1,
    date: new Date().toISOString().slice(0, 10),
    time: this.currentHour,
  };

  exampleMenu = [
    {
      category: 'Antipasti',
      meals: [
        { item: 'prosciutto', price: '5.5$' },
        { item: 'suppli', price: '1.5$' },
      ],
    },
    {
      category: 'Primi',
      meals: [
        { item: 'pasta al sugo', price: '2.5$' },
        { item: 'pizza', price: '9.5$' },
      ],
    },
    {
      category: 'Secondi',
      meals: [
        { item: 'carne', price: '15.5$' },
        { item: 'pesce', price: '11.5$' },
      ],
    },
  ];

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
    if (
      localStorage.authEmail === undefined ||
      localStorage.authToken === undefined
    ) {
      console.log('You are not authenticated!');
    }
    Utils.loginUser(
      localStorage.authEmail,
      localStorage.authToken,
      (response) => {
        if (response.error === undefined) {
          console.log('Booking request sent!');
        } else {
          console.log('You are not authenticated!');
        }
      },
    );
  }

  get currentRestaurant() {
    return this.$route.params;
  }

  get restaurantProvided() {
    return Object.keys(this.currentRestaurant).length > 0;
  }

  get restaurantPic() {
    if (this.restaurantProvided) {
      return this.currentRestaurant.picture;
    }
    return '../assets/557px-Barbieri_-_ViaSophia25668.jpg';
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
