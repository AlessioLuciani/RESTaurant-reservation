<template>
  <div class="mainb">
    <h1>Dashboard</h1>
    <p v-if="!isLogged" style="margin-top: 10px">
      Please <router-link to="/login">login</router-link> to see the dashboard
    </p>

  <div v-if="isLogged" style="margin-top: 50px;">
    <table style="margin-left: auto; margin-right: auto">
      <tr>
        <th
          v-bind:key="index"
          v-for="(item, index) in reservationKeys"
          style="
            padding-right: 20px;
            padding-left: 20px;
            padding-bottom: 10px;
            font-size: 16px;
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
            padding-right: 20px;
            padding-left: 20px;
            padding-bottom: 20px;
            font-size: 16px;
          "
        >
          <p style="font-weight: 400"  v-bind:style="{'color': meal==='pending' ? 'orange':'black'}"> {{ meal }}</p>
        </th>

        <th style='width: 100px;'>
          <input
            type="button"
            style="margin-bottom: 20px; padding: 5px 0px 5px 0px; width: 90px; font-size: 16px;color:red;"
            value="Refuse"
            v-if="isPending(index)"
            v-on:click="cancelReservation(index)"
          />
          
        </th>
        <th style='width: 100px;'>
          <input
            type="button"
            style="margin-bottom: 20px; padding: 5px 0px 5px 0px; width: 90px; font-size: 15px;color:green"
            value="Accept"
            v-if="isPending(index)"
            v-on:click="acceptReservation(index)"
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

interface ReservationObj {
    id: string,
    rest_email: string,
    date: string,
    service: string,
    hour: string,
    seats: string,
    Notes: string,
    cust_email:string,
    status:string,
}


/* eslint import/no-cycle: [2, { maxDepth: 1 }] */
/* eslint class-methods-use-this:
["error", { "exceptMethods": ["isLogged", "mounted", "reservationKeys"] }]
*/
export default class Home extends Vue {
  isLogged = Utils.isLogged;

  activeReservations={}

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

    const xmlHttp = new XMLHttpRequest();
    const url = 'http://localhost:12004/reserve?authToken=' + localStorage.authToken + '&email=' + localStorage.authEmail + '&user_type=' + localStorage.authType;
    xmlHttp.open('GET', url, true);
    const self = this;
    xmlHttp.onreadystatechange = function () {
      if (xmlHttp.readyState === 4) {
        self.activeReservations = JSON.parse(xmlHttp.responseText);
        console.log(self.activeReservations);
      }
    };
    xmlHttp.send();
  }

  get reservationKeys() {
    /*if (this.activeReservations === undefined) {
      return [];
    }
    const object = Object.keys((this.activeReservations as Array<string>)[0]);
    object[0] = 'Reservation Code';
    return object;*/
    return ['Reservation Code', 'Rest Mail', 'Date', 'Service', 'Hour', 'Seats', 'Notes', 'Cust Mail', 'Status'];
  }

  isPending(index: number) {
    console.log((this.activeReservations as Array< ReservationObj>)[index].status);
    console.log((this.activeReservations as Array< ReservationObj>)[index].status === 'pending');
    return (this.activeReservations as Array< ReservationObj>)[index].status === 'pending';
  }

  cancelReservation(index: number) {
    // TODO: cancel the reservation in the db
    return this.activeReservations;
  }

  acceptReservation(index: number) {
    // TODO: cancel the reservation in the db
    return this.activeReservations;
  }
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
