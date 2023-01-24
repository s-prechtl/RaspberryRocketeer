<template>
  <div class="container">
    <div class="row">
      <h3 class="col-10"><strong>{{ this.title() }}</strong></h3>
      <div class="col-1">
        <RRButton @click="prevPage" text="<"></RRButton>
      </div>
      <div class="col-1">
        <RRButton @click="nextPage" text=">"></RRButton>
      </div>
    </div>
    <div class="row" v-if="this.page.length > 0" v-for="entry in this.page" :key="entry.rank">
      <LeaderboardEntry :entry="entry"></LeaderboardEntry>
    </div>
    <div class="row" v-else>
      Loading...
    </div>
  </div>
</template>

<script>

import LeaderboardEntry from "@/components/LeaderboardEntry.vue";
import RRButton from "@/components/RRButton.vue";
import {Rest} from "@/model/Rest";

export default {
  name: "Leaderboard",
  components: {
    LeaderboardEntry,
    RRButton,
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
    window.addEventListener('itemInserted', event => this.onItemInserted(event), false);
  },
  methods: {
    async fetchPage() {
      let res = await fetch(`${Rest.URL}/leaderboard/${this.type}?pagination=true&entriesPerPage=${this.entriesPerPage}&page=${this.pageNumber}`, {method: "GET"});
      return await res.json();
    },
    title() {
      return this.type === "totalplaytime" ? "Total Playtime" : "Highscore";
    },
    nextPage() {
      if (this.page.length !== this.entriesPerPage) return;

      this.pageNumber++;
      this.updatePage();
      if (this.page.length === 0) {
        this.prevPage();
      }
    },
    prevPage() {
      if (this.pageNumber <= 0) return;

      this.pageNumber--;
      this.updatePage();
    },
    async updatePage() {
      let tempPage = await this.fetchPage();
      for (let i = 0; i < this.entriesPerPage; i++) {
        this.page.pop();
      }
      for (const entry of tempPage) {
        this.page.push(entry);
      }
    },
    onItemInserted(event) {
      if (event.key === 'game-isRunning' && event.value === 'false') {
        this.updatePage();
      }
    }
  }
}
</script>
