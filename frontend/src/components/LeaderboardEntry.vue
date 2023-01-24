<template>
  <div class="col-1 text-right">{{this.entry.rank}}</div>
  <span class="col offset-1 text-left username">{{this.entry.username}}</span>
  <div class="col-2 text-right">{{this.entry.score}}</div>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
import {Leaderboard, LeaderboardEntry} from "@/model/Leaderboard";

export default defineComponent({
  name: "LeaderboardEntry",
  props: {
    entry: {
      type: Object as PropType<LeaderboardEntry<string>>,
      default: () => ({}),
    },
  },
})
</script>

<style scoped>
* {
  font-size: 1.5em;
}
.username {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>