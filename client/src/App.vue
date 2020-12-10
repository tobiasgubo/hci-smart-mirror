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

}
</script>

<style scoped>
.full-screen {
  width: 100%;
  height: 100%;

  background-color: black;
}
</style>
