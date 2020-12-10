<template>
  <v-app>
    <!--
    <v-app-bar app color="primary">
      <div class="d-flex align-center">
        <v-btn to="/" text> Home </v-btn>
        <v-btn to="/test-events" text> Test Events </v-btn>
      </div>
    </v-app-bar>
    -->

    <v-main class="full-screen">
      <router-view class="full-screen"/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import InputEventService from "./services/input_event_service";

@Component({
  name: "App",
  components: {},
})
export default class App extends Vue {
  state = -10;

  mounted() {
    InputEventService.init();
    this.state = 42
    InputEventService.on(this.onWakeUp, this.onSwipeLeft, this.onSwipeRight, this.onSwipeUp, this.onSwipeDown);
  }

  onWakeUp() {
    console.log("onWakeUp Console Item");
    this.state = 0;
    console.log(this.state);
  }

  onSwipeLeft() {
    console.log("onSwipeLeft");
    this.state = (this.state+1) % 4;
    console.log(this.state);
  }

  onSwipeRight() {
    console.log("onSwipeRight");
    this.state = (this.state-1) % 4;
    console.log(this.state);
  }

  onSwipeUp() {
    console.log("onSwipeUp");
  }

  onSwipeDown() {
    console.log("onSwipeDown");
  }
}
</script>

<style scoped>
.full-screen {
  width: 100%;
  height: 100%;

  background-color: black;
}
</style>
