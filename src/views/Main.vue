<template>
  <div class="home">
    <p>name: {{ name }}</p>
    <p>count: {{ count }}</p>
    <br/>
    <button v-on:click="rankingShown = true">Ranking</button>
    <OverlayModal v-if="rankingShown" v-on:click="rankingShown = false">
      <Ranking/>
    </OverlayModal>
  </div>
</template>

<script lang="ts">
import {useRouter} from "vue-router";
import {defineComponent, ref} from "vue";
import {KEY_ID} from "@/composables/LocalStorage";
import {getData, onData, incrementData, increment} from "@/firebase/firebase";
import {Counter, DB_NAME} from "@/composables/FireStore";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Shake from 'shake.js';
import Ranking from "@/components/Ranking.vue";
import OverlayModal from "@/components/OverlayModal.vue";

export default defineComponent({
  components: {OverlayModal, Ranking},
  setup() {
    const id = ref("");
    const name = ref("");
    const count = ref(0);

    const rankingShown = ref(false);

    const s = localStorage.getItem(KEY_ID);
    if (!s) {
      useRouter().push({name: "Register"});
    } else {
      id.value = s;
    }

    getData(DB_NAME, id.value).then((v: Counter) => {
      name.value = v.name;
    });

    onData(DB_NAME, id.value, (c: Counter) => {
      count.value = c.count;
    });

    function Incrementer(millisec: number, callback: (i: number) => void) {
      let diff = 0;

      function refresh() {
        if (diff > 0) {
          callback(diff);
          diff = 0;
        }
      }

      setInterval(refresh, millisec)

      return {
        increment() {
          diff++;
        }
      }
    }

    const incrementer = Incrementer(500, (i) => {
      incrementData(DB_NAME, id.value, {
        count: increment(i)
      });
    });

    const shake = new Shake({
      threshold: 12,
      timeout: 100
    });

    shake.start();

    window.addEventListener("shake", () => {
      incrementer.increment();
      count.value++;
    }, false);

    return {id, name, count, rankingShown}
  }
})
</script>

<style>

html {
  height: 100%;
}

body {
  height: 100%;
}

.home {
  width: 100%;
  height: 100%;
}
</style>
