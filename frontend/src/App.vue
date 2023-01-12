<template>
  <div class="container">
    <div class="row">
      <Header></Header>
    </div>
    <div class="row">
      <UserScores :userScores="userScores" ></UserScores>
    </div>
    <div class="row">
      <Game class="col">
      </Game>
    </div>
    <div class="row">
      <div class="col">
        <Leaderboard :title="'Highscore'" :data="higscoreLeaderboard"></Leaderboard>
      </div>
      <div class="col">
        <Leaderboard :title="'Total Playtime'" :data="totalPlaytimeLeaderboard"></Leaderboard>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Leaderboard from './components/Leaderboard.vue';
import UserScores from './components/UserScores.vue';
import Game from './components/Game.vue';
import Header from './components/Header.vue';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

export default defineComponent({
  name: 'App',
  components: {
    UserScores,
    Leaderboard,
    Game,
    Header,
  },
  data() {
    return {
      userScores: {},
      higscoreLeaderboard: [],
      totalPlaytimeLeaderboard: [],
      userId: 1,
    }
  },
  methods: {
    async fetchFromApi(path: string, method: "GET" | "POST") {
    let res: Response = await fetch("http://localhost:3000" + path, {method: method,});
    return await res.json();
    },
    async fetchUserScores() {
      return await this.fetchFromApi(`/user/${this.userId}/scores`, "GET");
    },
    async fetchLeaderboard(type: "highscore" | "totalplaytime") {
      return await this.fetchFromApi(`/leaderboard/${type}`, "GET");
    },
  },
  async created() {
    this.userScores = await this.fetchUserScores();
    this.higscoreLeaderboard = await this.fetchLeaderboard("highscore")
    this.totalPlaytimeLeaderboard = await this.fetchLeaderboard("totalplaytime")
  }
});
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

* {
  font-family: 'Press Start 2P', serif;
}

.row {
  margin-top:2em;
}

</style>
