<template>
  <div class="col-1 text-left">{{this.entry.rank}}</div>
  <div class="col text-left">{{this.entry.username}}</div>
  <div class="col text-right">{{this.entry.score}}</div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: "LeaderboardEntry",
  props: {
    entry: {
      type: Object,
      default: () => ({}),
    },
  },
})
</script>

<style scoped>
* {
  font-size: 1.5em;
}
</style>