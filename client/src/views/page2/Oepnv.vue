<template>
    <div class="col-10 mt-15">
      <!--<img src="../../assets/bustafel_uhrzeit.jpeg">-->
      <table class="rvv_table">

        <tr style="background-color: blue;">
          <th colspan="4" style="padding-left: 10px;">Universität Bussteig E</th>
          <th colspan="1">17:34</th>
        </tr>
        <tr>
          <th colspan="2">Linie</th>
          <th colspan="2">Ziel</th>
          <th colspan="1">Abfahrt</th>
        </tr>
        <tr>
          <td colspan="2">6</td>
          <td colspan="2">Roter-Brach-Weg   </td>
          <td colspan="1">in 3 min</td>
        </tr>
        <tr>
          <td colspan="2">6</td>
          <td colspan="2">Roter-Brach-Weg</td>
          <td colspan="1">in 13 min</td>
        </tr>
        <tr>
          <td colspan="2">6</td>
          <td colspan="2">Roter-Brach-Weg</td>
          <td colspan="1">in 23 min</td>
        </tr>
        <tr>
          <td colspan="2">6</td>
          <td colspan="2">Roter-Brach-Weg</td>
          <td colspan="1">in 33 min</td>
        </tr>
      </table>

    </div>
</template>

<script>
import axios from "axios";
import cheerio from "cheerio";

export default {
  name: "Oepnv",
  data () {
    return {
      info: null,
      limitedReached: false,
      busses: [], // Hier werden die Trips gespeichert
      maximumTripsToShow: 6, // Max. number of trips to show
      stopTo: null,  // The names of the destination stops. If not set, display all destinations
      stopFromID: 4014080, 	// (Universität) // 4014037 (Graßer Weg),		// Get your stopID from: https://www.bayern-fahrplan.de/XML_COORD_REQUEST?&jsonp=jQuery17203101277124009285_1524132000786&boundingBox=&boundingBoxLU=11.953125%3A49.15297%3AWGS84%5BDD.DDDDD%5D&boundingBoxRL=12.304688%3A48.922499%3AWGS84%5BDD.DDDDD%5D&coordOutputFormat=WGS84%5BDD.DDDDD%5D&type_1=STOP&outputFormat=json&inclFilter=1&_=1524132001290
    }
  },
  mounted () {
    //const axios = require('axios');

    axios
        //.get('https://api.coindesk.com/v1/bpi/currentprice.json')
        .get('https://cors-anywhere.herokuapp.com/http://www.bayern-fahrplan.de/xhr_departures_monitor?limit=25&zope_command=dm_next&nameInfo_dm=4014080', {headers: {'Access-Control-Allow-Origin': '*'}})
        // .get('http://webcode.me/')
        //.get('https://masteringjs.io/tutorials/axios/response-body', {headers: {'Access-Control-Allow-Origin': 'http://localhost:8080'}})
        .then(response => {
          // this.info = console.log(response.data);
          this.info = response.data;
          // this.info = console.log(response.status);
          // this.info = console.log(response.statusText);
          // this.info = console.log(response.headers);
          // this.info = console.log(response.config);
        })

    this.busses = [];
    const $ = cheerio.load(this.info + "");

    this.limitedReached = false;

    $(".trip").each(function(){
      if(this.limitedReached === true){
        return;
      }

      const busObj = {direction: "", detailInfo: "", delay: "", departure: "", route: ""};
      const busData = $(this);

      // Set defaults
      busObj.delay = "0";
      busObj.detailInfo = "";
      busObj.departure = "00:00";
      busObj.direction = "";
      busObj.route = "tbd.";

      let busDelay = busData.find(".delay");

      if (busDelay.length > 0){
        busObj.delay = busDelay.text().trim();
      }
      else {
        busDelay = busData.find(".nodelay");
        busObj.delay = "0";
      }

      // If there was no object found, the 'delay' is 0
      if (busDelay.length > 0) {
        busObj.departure = busDelay.parent().children().remove().end().text().trim();
      } else {
        busObj.departure = busData.find("span").first().text().trim();
      }

      let tdCnt = 0;
      $(busData.find("td")).each(function(){
        tdCnt++;
        if (!$(this).hasClass("icon")){
          // Direction, e.g. 'Klinikum'
          if (tdCnt === 3 && $(this).text().trim() !== ""){
            busObj.direction = $(this).text().trim();
          }
          // Additional information, e.g. 'Bstg. A'
          if (tdCnt === 4 && $(this).text().trim() !== ""){
            busObj.detailInfo = $(this).text().trim();
          }
        } else {
          // Route, e.g. '2'
          if ($(this).find("a").first().text().trim() !== ""){
            busObj.route = $(this).find("a").first().text().trim();
          }
        }
      });

        this.busses = this.addTrip(busObj, this.busses);
      /*if (payload.config.stop_to.length === 0) {
        trips = RVVHelper.addTrip(tripObj, trips, payload.config);
      }
      else {
        // Iterate over destinations
        for(var i = 0; i < payload.config.stop_to.length; i++)
        {
          if (tripObj.direction === payload.config.stop_to[i])
          {
            trips = RVVHelper.addTrip(tripObj, trips, payload.config);
          }
        }
      }*/
    });

    return this.busses;

  },
  computed: {
    getRemainingMinutes(sDeparture){
      if (sDeparture.length !== 5){
        return sDeparture;
      }
      const dtNow = new Date();
      const dtGiven = new Date(
          dtNow.getFullYear(),
          dtNow.getMonth(),
          dtNow.getDate(),
          sDeparture.substr(0,2),
          sDeparture.substr(3,2),
          dtNow.getSeconds());

      // If the bus is departing on the next day, increment the day property
      if (dtNow.getHours() > sDeparture.substr(0,2)) {
        dtGiven.setDate(dtGiven.getDate() + 1);
      }
      // If the bus is departing on the next day, increment the day property
      if (dtNow.getHours() > sDeparture.substr(0,2)) {
        dtGiven.setDate(dtGiven.getDate() + 1);
      }

      let diff = (dtGiven.getTime() - dtNow.getTime()) / 1000;
      diff /= 60;
      return Math.round(diff);
    },
    addTrip(busObj, busses){
      // Calculate remaining minutes
      busObj.remainingMinutes = this.getRemainingMinutes(busObj.departure);

      // Check special conditions
      if (busses.length > 0) {
        // Case 1: Remove the first of 2 duplicated trips for route "Graßer Weg" => "Schwabenstraße"
        if (busObj.direction === "Schwabenstraße" && this.stopFromID === 4014037){
          if ((busObj.departure).substr(3,2) - (busses[busses.length -1].departure).substr(3,2) === 2)
          {
            busses.pop();
          }
        }
        // Case 2: tbd.
        // Case 3: tbd.
        // Case 4: tbd.
        // ...
      }


      // Check, if trip limit is already reached
      if (busses.length <= this.maximumTripsToShow) {
        busses.push(busObj);
      }
      /*else {
        this.limitedReached = true;
      }*/
      return this.busses;
    },
  }
}
</script>

<style scoped>
th, td {
  font-size: 30px;
  padding: 5px 50px 5px;
}

th {
  font-weight: bold;
}

tr:nth-child(even) {
  background-color: rgb(40, 40, 40);
}

table {
  height: 100%;
  width: 100%;
}

</style>