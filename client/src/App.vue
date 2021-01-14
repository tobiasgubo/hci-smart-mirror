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
      <router-view class="full-screen" />
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
  lastEvent = Date.now()

  mounted() {
    InputEventService.init();
    this.state = 42;
    InputEventService.on(
      this.onWakeUp,
      this.onSwipeLeft,
      this.onSwipeRight,
      this.onSwipeUp,
      this.onSwipeDown
    );
  }

  setSleepTimout() {
    this.lastEvent = Date.now()
    setTimeout(() => {
      if(Date.now() - this.lastEvent > 5000) {
          this.state = 42;
          this.onChangePage();
      }
    }, 5000);
  }

  onChangePage() {
    this.setSleepTimout();
    switch (this.state) {
      case 42:
        this.$router.push("/");
        break;
      case 0:
        this.$router.push("/page_1");
        break;
      case 1:
        this.$router.push("/page_2");
        break;
      case 2:
        this.$router.push("/page_3");
        break;
      case 3:
        this.$router.push("/page_4");
        break;
    }
  }

  onWakeUp() {
    console.log("onWakeUp Console Item");
    this.state = 0;
    console.log(this.state);
    this.onChangePage();
  }

  onSwipeLeft() {
    console.log("onSwipeLeft");
    this.state = (this.state + 1) % 4;
    console.log(this.state);
    this.onChangePage();
  }

  onSwipeRight() {
    console.log("onSwipeRight");
    if (this.state === 0) {
      this.state = 3;
    } else {
      this.state = (this.state - 1) % 4;
    }
    console.log(this.state);
    this.onChangePage();
  }

  onSwipeUp() {
    console.log("onSwipeUp");
    this.onChangePage();
  }

  onSwipeDown() {
    console.log("onSwipeDown");
    this.onChangePage();
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
