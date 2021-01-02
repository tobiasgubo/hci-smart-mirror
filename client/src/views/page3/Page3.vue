<template>
    <!--<img class="img" src="../../assets/HCI_Prototyp_SmartMirror-arbeitsweg.jpg">-->
  <div class="background">
    <div class="container">
      <div class="header col">Arbeitsweg & Verkehrslage</div>
      <div class="row">
        <Arbeitsweg/>
        <Informations class="img"/>
      </div>
    </div>
  </div>
</template>

<script>
import Arbeitsweg from "@/views/page3/Arbeitsweg";
import Informations from "@/views/Informations";
export default {
  name: 'Page3',
  components: {Informations, Arbeitsweg}
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
