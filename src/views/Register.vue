<template>
  <div class="about">
    <h1>Shake Phone</h1>
    <p>Enter your name:</p>
    <form>
      <input type="text" v-model="name"/>
      <input @click="enterClicked" type="button" value="Enter">
    </form>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import {useRouter} from "vue-router";
import {addData} from "@/firebase/firebase"
import {Counter, DB_NAME} from "@/composables/FireStore";
import {KEY_ID} from "@/composables/LocalStorage";

export default defineComponent({
  setup() {
    const name = ref("");
    const router = useRouter();

    const onSuccess = (id: string): void => {
      localStorage.setItem(KEY_ID, id);
      console.log("id: ", id)
      router.push("/");
    }

    const enterClicked = () => {
      const data: Counter = {
        name: name.value,
        count: 0
      };
      console.log(data);
      addData(DB_NAME, data, onSuccess
      );
    };

    return {name, enterClicked}
  }
})
</script>