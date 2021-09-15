<template>
  <h1>ランキング</h1>
  <p>PCからはランキングの表示のみ可能です</p>
  <Ranking />
</template>

<script>
import Ranking from "../components/Ranking";
import {defineComponent} from "vue";

export default defineComponent({
  components:{
    Ranking
  }
})
</script>

<style scoped>

</style>