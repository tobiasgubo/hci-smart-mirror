<template>
    <div>
      Test
    </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import InputEventService from "../services/input_event_service";

@Component({
  name: "TestEventsPage",
  components: {
  }
})
export default class TestEventsPage extends Vue {
  mounted() {
    InputEventService.init();
  }
}
</script>