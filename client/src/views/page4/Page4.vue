<template>
    <!--<img class="img" src="../../assets/HCI_Prototyp_SmartMirror-mensaplan.jpg">-->
  <div class="background">
    <div class="container">
      <div class="row">
        <div class="header col">Mensaplan</div>
        <Mensa/>
        <Informations class="img"/>
      </div>
    </div>
  </div>
</template>

<script>
import Mensa from "@/views/page4/Mensa";
import Informations from "@/views/Informations";
export default {
  name: 'Page4',
  components: {Informations, Mensa}
}
</script>

<style scoped>
.background {
  color: white;
  background-color: black;
}

.header {
  display: inline-block;
  color: white;
  font-family: 'Nunito', sans-serif;
  font-size: 46px;
  font-weight: 300;
  text-align: center;
  position: relative;
}

.img {
  height: 100%;
  height: 100%;

  margin: auto;
  object-fit: contain;
}
</style>
