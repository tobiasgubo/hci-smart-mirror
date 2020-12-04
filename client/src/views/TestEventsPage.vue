<template>
  <v-container>
  <h1>Last received events</h1>
  <v-list>
    <v-list-item v-for="(event, i) in events" :key="i">
      {{event}}
    </v-list-item>
  </v-list>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import InputEventService from "../services/input_event_service";

@Component({
  name: "TestEventsPage",
  components: {},
})
export default class TestEventsPage extends Vue {
  events: string[] = [];

  mounted() {
    InputEventService.init();
    InputEventService.on(this.onWakeUp, this.onSwipeLeft, this.onSwipeRight, this.onSwipeUp, this.onSwipeDown);
  }

  onWakeUp() {
    console.log("onWakeUp Console Item");
    this.events.push("onWakeUp List Item");
  }

  onSwipeLeft() {
    console.log("onSwipeLeft");
    this.events.push("onSwipeLeft");
  }

  onSwipeRight() {
    console.log("onSwipeRight");
    this.events.push("onSwipeRight");
  }

  onSwipeUp() {
    console.log("onSwipeUp");
    this.events.push("onSwipeUp");
  }

  onSwipeDown() {
    console.log("onSwipeDown");
    this.events.push("onSwipeDown");
  }
}
</script>