<template>
  <ul>
    <li v-for="(item, index) in ranking" v-bind:key="item">{{ index + 1 }}. {{ item.name }} : {{ item.count }}</li>
  </ul>
</template>

<script lang="ts">
import {defineComponent, PropType, ref} from "vue";
import {Counter, DB_NAME} from "@/composables/FireStore";
import {limit, onQueryData, orderBy} from "@/firebase/firebase";

export default defineComponent({
  props: {
    limit: {
      type: Number as PropType<number>,
      default: 10
    }
  },
  setup(props){
    const ranking = ref<Counter[]>([]);

    onQueryData(DB_NAME, [orderBy("count", "desc"), limit(props.limit)], (type, data) => {
      const elm = ranking.value.find(el => el.name === data.name);
      switch (type) {
        case "added":
          ranking.value.push({
            name: data.name,
            count: data.count
          });
          break;
        case "modified":
          if (elm) elm.count = data.count;
          ranking.value.sort((a, b) => b.count - a.count);
          break;
        case "removed":
          if (elm) {
            const index = ranking.value.indexOf(elm);
            if (index > 0) ranking.value.splice(index, 1);
          }
          break;
      }
    });

    return {ranking}
  }
})
</script>

<style scoped>

</style>