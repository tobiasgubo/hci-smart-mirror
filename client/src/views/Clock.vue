<template>
  <div v-if="hourtime != ''">
    <div v-text="hours + minutes + seconds"></div> <p v-text="day + month + year"></p>
  </div>
</template>

<script>

export default {
  name: 'Clock',
  data(){
    return {
      hours: 0,
      minutes: 0,
      seconds: 0,
      hourtime:'',
      day: 0,
      month: 0,
      year: 0,
      currentDate: ''
    };
  },
  mounted() {
    this.timer = window.setTimeout(this.updateDateTime, 1000);
    this.timer2 = window.setTimeout(this.updateDate, 1000);
  },
  beforeDestroy() {
    window.clearTimeout(this.timer);
    window.clearTimeout(this.timer2);
  },
  methods: {
    updateDateTime(){
      const now = new Date();
      this.hours = this.getZeroPad(now.getHours()) + ":";
      this.minutes = this.getZeroPad(now.getMinutes()) + ":";
      this.seconds = this.getZeroPad(now.getSeconds());
      this.hourtime = this.hours;
      this.timer = window.setTimeout(this.updateDateTime, 1000);
    },
    updateDate(){
      const today = new Date();
      //this.day = this.getZeroPad(today.getDay()) + ".";
      this.day = String(today.getDate()).padStart(2, '0') + ".";
      this.month = String(today.getMonth() + 1).padStart(2, '0') + ".";
      this.year = today.getFullYear();
      this.currentDate = this.day;
      this.timer2 = window.setTimeout(this.updateDate, 1000);
    },
    getZeroPad (n) {
      return (parseInt(n, 10) >= 10 ? '' : '0') + n
    },
  }
}
</script>

<style scoped>
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

.time_position {
  /*vertical-align: middle;
  margin-top: 100vh;
  transform: translateY(calc(-100% - 20px));
  line-height: 90px;*/
}


/*.clock {
  background: #fff;
  border: 0.0rem solid #fff;
  border-radius: 0.0rem;
  margin-bottom: 0em;*/
/*display: inline-block;
}*/

/*.clock__hourtime {
  font-size: 2rem;
  position: absolute;
  top: 2px;
  right: 8px;
}*/
</style>