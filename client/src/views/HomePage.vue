<template>
    <!--<img class="img" src="../assets/HCI_Prototyp_SmartMirror-home.jpg">-->
  <div class="background">
    <div class="container d-flex h-100">
      <div class="row justify-content-center align-self-center">
        <Clock class="clock__time"/>
      </div>
    </div>
  </div>
</template>

<script>

import Clock from "@/views/Clock";
export default {
  name: 'HomePage',
  components: {Clock},
}
</script>

<style>
.img {
  height: 100%;
  height: 100%;

  margin: auto;
  object-fit: contain;
}

.background {
  color: white;
  background-color: black;
}

.clock__time {
  background: black;
  display: inline-block;
  color: white;
  font-family: 'Nunito', sans-serif;
  font-size: 8rem;
  font-weight: 300;
  text-align: center;
  position: relative;
}

.clock__time p {
  background: black;
  display: inline-block;
  color: white;
  font-family: 'Nunito', sans-serif;
  font-size: 3rem;
  font-weight: 300;
  text-align: center;
  position: relative;
}

</style>
