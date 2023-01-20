<template>
  <div class="container">
    <div class="row">
      <h3 class="col-10"><strong>{{ this.title() }}</strong></h3>
      <div class="col-1">
        <Button @click="prevPage" text="<"></Button>
      </div>
      <div class="col-1">
        <Button @click="nextPage" text=">"></Button>
      </div>
    </div>
    <div class="row" v-for="entry in this.page" :key="entry.rank" >
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
      entriesPerPage: 5,
      page: []
    }
  },
  props: {
      type: "totalplaytime" | "highscore",
  },
  created() {
    this.updatePage();
  },
  updated() {
    this.updatePage()
  },
  methods: {
    async fetchPage() {
      let res = await fetch(`http://localhost:3000/leaderboard/${this.type}?pagination=true&entriesPerPage=${this.entriesPerPage}&page=${this.pageNumber}`, {method: "GET"});
      return await res.json();
    },
    title() {
      return this.type === "totalplaytime" ? "Total Playtime" : "Highscore";
    },
    nextPage() {
      this.pageNumber++;
      this.updatePage();
    },
    prevPage() {
      if (this.pageNumber > 0) this.pageNumber--;
      this.updatePage();
    },
    async updatePage() {
      let tempPage = await this.fetchPage();
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
