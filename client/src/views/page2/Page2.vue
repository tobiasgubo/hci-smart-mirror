<template>
    <!--<img class="img" src="../../assets/HCI_Prototyp_SmartMirror-bus.jpg">-->
  <div class="background">
    <div class="container">
      <div class="header col">ÖPNV</div>
      <div class="row">
        <Oepnv/>
        <Informations class="img"/>
      </div>
    </div>
  </div>
</template>

<script>
import Oepnv from "@/views/page2/Oepnv";
import Informations from "@/views/Informations";
export default {
  name: 'Page2',
  components: {Informations, Oepnv}
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
