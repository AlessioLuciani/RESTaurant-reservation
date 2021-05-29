<template>
  <div class="maina">
    <h1>{{ currentRestaurant.nome }}</h1>
    <span
      class="fa fa-star"
      style="font-size: 20px"
      v-for="index in 5"
      :key="index"
      :class="{
        checked:
          index <= (currentRestaurant.rating ? currentRestaurant.rating : 3),
      }"
    />
    <h4>
      {{
        currentRestaurant.indirizzo
          ? currentRestaurant.indirizzo
          : 'Via Pietro Cavallini 25, 00193 Rome Italy'
      }}
    </h4>

    <div style="margin-top: 50px; min-width: 1000px; background-color: red;">
      <img
        style="display: inline-block; width: 450px"
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
          <input type="radio" id="lunch" value="lunch" v-model="bookingData.service">
          <label>Lunch</label>&nbsp;&nbsp;
          <input type="radio" id="dinner" value="dinner" v-model="bookingData.service">
          <label>Dinner</label>
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
          <label>Additional notes:</label> <br />
          <textarea v-model="bookingData.notes" placeholder=" ... "
          style="width: 220px;padding:20px"></textarea>
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
      <div v-bind:key="index" v-for="(item, index) in currentMenu">
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

interface Meal {
    item: string,
    price: string,
}

interface Menu {
    category: string,
    meals: Array<Meal>,
}

interface RestaurantObj {
    id: string,
    email: string,
    nome: string,
    indirizzo: string,
    rating: string,
    picture: string,
    menu: Array<Menu>,
}

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["mounted", "currentHour"] }] */
/* eslint operator-linebreak: [2, "after"] */
export default class Restaurant extends Vue {
  bookingData = {
    guests: 1,
    date: new Date().toISOString().slice(0, 10),
    time: this.currentHour,
    service: 'lunch',
    notes: '',
  };

  underscoreCurrentRestaurant = {};

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
    } else {
      this.underscoreCurrentRestaurant = JSON.parse(this.$route.params.nome as string);
    }
  }

  get currentHour() {
    return new Date().toLocaleTimeString().slice(0, 5);
  }

  onSubmit() {
    console.log('Submitting the following order:');
    console.log(this.bookingData);
    if (
      localStorage.authEmail === undefined ||
      localStorage.authToken === undefined
    ) {
      console.log('You are not authenticated!');
    }
    const reservation = {
      rest_email: (this.currentRestaurant as RestaurantObj).email,
      date: this.bookingData.date,
      service: this.bookingData.service,
      time: this.bookingData.time,
      seats: this.bookingData.guests,
      notes: this.bookingData.notes,
      email: localStorage.authEmail,
      status: 'pending',
      authToken: localStorage.authToken,
    };
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open('POST', 'http://localhost:12004/reserve', true);
    xmlHttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xmlHttp.onreadystatechange = () => {
      if (xmlHttp.readyState === 4) {
        const response = JSON.parse(xmlHttp.responseText);
        console.log(response);
      }
    };
    xmlHttp.send(JSON.stringify(reservation));

    alert('Request of reservation correctly sent to the restaurant!');
    router.replace('/');
  }

  get currentRestaurant() {
    return this.underscoreCurrentRestaurant;
  }

  get restaurantProvided() {
    return Object.keys(this.$route.params).length > 0;
  }

  get currentMenu() {
    if (!this.restaurantProvided) {
      return this.exampleMenu;
    }
    return (this.currentRestaurant as RestaurantObj).menu;
  }

  get restaurantPic() {
    if (this.restaurantProvided) {
      return (this.currentRestaurant as RestaurantObj).picture;
    }
    return '../assets/557px-Barbieri_-_ViaSophia25668.jpg';
  }
}
</script>

<style>
@import url(https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css);
.maina {
  max-width: 1200px;
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
