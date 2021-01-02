<template>
  <div class="col-2 mt-15">
    <Clock class="clock_css"/>
    <!--<p>Donnerstag, 26.11.2020, 08:15 Uhr</p>-->
    <img class="img1" src="../assets/Wetter.png">
    <br>
    <img class="img2" src="../assets/rss_feed.png">
  </div>
</template>

<script>

import Clock from "@/views/Clock";
export default {
  name: "Informations",
  /*props: {
    infoHour: String,
    infoMinute: String,
    infoSecond: String
  }*/
  components: {Clock}
}
</script>

<style>
.img1 {
  width: 150%;
  height: 38%;
}

.img2 {
  width: 150%;
  height: 50%;
}

.clock_css{
  font-size: 24px;
}


</style>