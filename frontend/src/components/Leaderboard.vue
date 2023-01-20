<template>
  <div class="container">
    <div class="row">
      <h3 class="col-10"><strong>{{ title }}</strong></h3>
      <div class="col-1">
        <Button @click="prevPage" text="<"></Button>
      </div>
      <div class="col-1">
        <Button @click="nextPage" text=">"></Button>
      </div>
    </div>
    <div class="row" v-for="entry in page" :key="entry.rank" >
      <LeaderboardEntry :entry="entry" ></LeaderboardEntry>
    </div>
  </div>
</template>

<script>

import LeaderboardEntry from "@/components/LeaderboardEntry.vue";
import Button from "@/components/Button.vue";

export default {
  name: "Leaderboard",
  components: {
    LeaderboardEntry,
    Button,
  },
  data() {
    return {
      pageNumber: 0,
      entriesPerPage: 3,
      page: [],
    }
  },
  props: {
      title: String,
      leaderboard: Array,
  },
  updated() {
    this.updatePage()
    console.log(this.leaderboard)
  },
  methods: {
    nextPage() {
      if (this.pageNumber < (this.leaderboard.length / this.entriesPerPage) - 1) this.pageNumber++;
      this.updatePage();
    },
    prevPage() {
      if (this.pageNumber > 0) this.pageNumber--;
      this.updatePage();
    },
    updatePage() {
      let tempPage = this.leaderboard.slice(this.entriesPerPage * this.pageNumber, this.entriesPerPage * (this.pageNumber + 1));
      for (let i = 0; i < this.entriesPerPage; i++) {
        this.page.pop()
      }
      for (const entry of tempPage) {
        this.page.push(entry)
      }
    }
  }
}
</script>
