<template>
  <div class="mainb">
    <h1>Dashboard</h1>
    <p v-if="!isLogged" style="margin-top: 10px">
      Please <router-link to="/login">login</router-link> to see the dashboard
    </p>

  <div v-if="isLogged" style="margin-top: 50px;">

    <div style="border-bottom:2px solid black;">
      <center><img src="../assets/user.png" style="width:80px;height:50px;"></center>
      <br>
      <center><p>{{ getMail() }}</p></center>
      <br>
      <center v-if="isRestaurant()"><p>Restaurant Account</p></center>
      <center v-if="!isRestaurant()"><p>User Account</p></center>
      <br>
      <center v-if="!isRestaurant()"><p>You have done <b>{{ getNRes() }}</b>
      Reservation</p></center>
      <center v-if="isRestaurant()"><p>You have received <b>{{ getNRes() }}</b>
      Reservation</p></center>
      <br><br>
    </div>

    <br>
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
          <p style="font-weight: 400"
          v-bind:style="{'color': meal==='pending' ? 'orange':
          meal==='accepted' ? 'green' : meal==='refused' ? 'red' : 'black'}"
          > {{ meal }}
          </p>
        </th>

        <th style='width: 100px;'>
          <input
            type="button"
            id="button-style-1"
            value="Refuse"
            v-if="isPending(index) && isRestaurant()"
            v-on:click="cancelReservation(index)"
          />
        </th>
        <th style='width: 100px;'>
          <input
            id="button-style-2"
            type="button"
            value="Accept"
            v-if="isPending(index) && isRestaurant()"
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

/* eslint-disable camelcase */
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

  mail='';

  isRest = false;

  activeReservations = {}

  mounted() {
    console.log('mounted');
    Utils.isLogged = false;
    this.isLogged = false;
    this.mail = localStorage.authEmail;

    if (localStorage.authType === '0') {
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
    if (localStorage.authType === '1') {
      console.log('dentro2');
      this.isRest = true;
      Utils.loginRestaurant(
        localStorage.authEmail,
        localStorage.authToken,
        (response) => {
          Utils.isLogged = response.error === undefined;
          this.isLogged = Utils.isLogged;
          console.log('Auth type ', localStorage.authType);
        },
      );
    }
    if (localStorage.authEmail !== undefined) {
      const xmlHttp = new XMLHttpRequest();
      const url = `http://localhost:12004/reserve?authToken=${localStorage.authToken}&email=${localStorage.authEmail}&user_type=${localStorage.authType}`;
      xmlHttp.open('GET', url, true);
      // const self = this;
      xmlHttp.onreadystatechange = (function () {
        if (xmlHttp.readyState === 4) {
          this.activeReservations = JSON.parse(xmlHttp.responseText);
          console.log(this.activeReservations);
        }
      }).bind(this);
      xmlHttp.send();
    }
  }

  get reservationKeys() {
    return ['Rest Mail', 'Date', 'Service', 'Hour', 'Seats', 'Notes', 'Cust Mail', 'Status', 'Reservation Code'];
  }

  isToDisplay(meal: string, item:string) {
    console.log(item);
    if (item in this.reservationKeys) {
      return true;
    }
    return false;
  }

  isPending(index: number) {
    console.log((this.activeReservations as Array< ReservationObj>)[index].status);
    console.log((this.activeReservations as Array< ReservationObj>)[index].status === 'pending');
    return (this.activeReservations as Array< ReservationObj>)[index].status === 'pending';
  }

  getNRes() {
    return (this.activeReservations as Array< ReservationObj>).length;
  }

  isRestaurant() {
    return this.isRest === true;
  }

  getMail() {
    return this.mail;
  }

  cancelReservation(index: number) {
    const code = (this.activeReservations as Array< ReservationObj>)[index].id;
    console.log((this.activeReservations as Array< ReservationObj>)[index]);
    console.log(code);
    const reservation = {
      res_id: code, status: 'refused', authToken: localStorage.authToken, email: localStorage.authEmail,
    };
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open('PATCH', 'http://localhost:12004/reserve', true);
    xmlHttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xmlHttp.onreadystatechange = () => {
      if (xmlHttp.readyState === 4) {
        console.log(JSON.parse(xmlHttp.responseText));
        window.location.reload();
      }
    };
    xmlHttp.send(JSON.stringify(reservation));
  }

  acceptReservation(index: number) {
    const code = (this.activeReservations as Array< ReservationObj>)[index].id;
    console.log((this.activeReservations as Array< ReservationObj>)[index]);
    console.log(code);
    const reservation = {
      res_id: code, status: 'accepted', authToken: localStorage.authToken, email: localStorage.authEmail,
    };
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open('PATCH', 'http://localhost:12004/reserve', true);
    xmlHttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xmlHttp.onreadystatechange = () => {
      if (xmlHttp.readyState === 4) {
        console.log(JSON.parse(xmlHttp.responseText));
        window.location.reload();
      }
    };
    xmlHttp.send(JSON.stringify(reservation));
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

#button-style-1 {
  margin-bottom: 20px;
  padding: 5px 0px 5px 0px;
  width: 90px;
  font-size: 16px;
  color:red;
}

#button-style-2 {
  margin-bottom: 20px;
  padding: 5px 0px 5px 0px;
  width: 90px;
  font-size: 15px;
  color:green;
}
</style>
