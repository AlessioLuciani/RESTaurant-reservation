<template>
  <div class="mainb">
    <h1>Dashboard</h1>
    <p v-if="!isLogged" style="margin-top: 10px">
      Please <router-link to="/login">login</router-link> to see the dashboard
    </p>

    <div v-if="isLogged" style="margin-top: 50px; margin-left: 150px;">
      <table style="margin-left: auto; margin-right: auto">
        <tr>
          <th
            v-bind:key="index"
            v-for="(item, index) in reservationKeys"
            style="
              padding-right: 25px;
              padding-left: 25px;
              padding-bottom: 10px;
              font-size: 18px;
            "
          >
            <p>{{ item }}</p>
          </th>
        </tr>
        <tr
          v-bind:key="index"
          v-for="(item, index) in activeReservations"
        >
          <th
            v-bind:key="idx"
            v-for="(meal, idx) in item"
            style="
              padding-right: 25px;
              padding-left: 25px;
              padding-bottom: 20px;
              font-size: 18px;
            "
          >
            <p style="font-weight: 400">{{ meal }}</p>
          </th>

          <th style='width: 140px;'>
            <input
              type="button"
              style="margin-bottom: 20px; padding: 5px 8px 5px 8px; width: 150px; font-size: 15px;"
              value="Cancel reservation"
              v-if="isPending(index)"
              v-on:click="cancelReservation(index)"
            />
          </th>
        </tr>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Utils from '../utils';

@Options({
  components: {},
})

/* eslint import/no-cycle: [2, { maxDepth: 1 }] */
/* eslint class-methods-use-this:
["error", { "exceptMethods": ["isLogged", "mounted", "reservationKeys"] }]
*/
export default class Home extends Vue {
  isLogged = Utils.isLogged;

  mounted() {
    console.log('mounted');
    Utils.isLogged = false;
    this.isLogged = false;
    Utils.loginUser(
      localStorage.authEmail,
      localStorage.authToken,
      (response) => {
        Utils.isLogged = response.error === undefined;
        this.isLogged = Utils.isLogged;
        console.log('Auth type ', localStorage.authType);
      },
    );
  }

  get reservationKeys() {
    return ['Restaurant', 'Date', 'Person', 'Status'];
  }

  isPending(index: number) {
    return this.activeReservations[index].status === 'Pending';
  }

  cancelReservation(index: number) {
    // TODO: cancel the reservation in the db
    this.activeReservations.splice(index, 1);
  }

  // TODO: change this with real data
  activeReservations = [
    {
      // TODO: we can add here a link to the actual restaurant
      // it would be easier to do a query using the restaurant id
      restaurant: 'Da igor',
      date: new Date().toISOString().slice(0, 10),
      person: 2,
      status: 'Pending',
    },
    {
      restaurant: 'Da toni',
      date: new Date().toISOString().slice(0, 10),
      person: 4,
      status: 'Accepted',
    },
    {
      restaurant: 'Da roberto',
      date: new Date().toISOString().slice(0, 10),
      person: 1,
      status: 'Canceled',
    },
  ];
}
</script>

<style>

.mainb {
  max-width: 1000px;
  height: 800px;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  max-height: 100%;
}
</style>
