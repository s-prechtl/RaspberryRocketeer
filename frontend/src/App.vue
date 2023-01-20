<template>
  <div class="container everything">
    <div class="row">
      <Header></Header>
    </div>
    <div class="row">
      <UserScores :userScores="userScores" ></UserScores>
    </div>
    <div class="row">
      <Game v-if="user" class="col">
      </Game>
      <Login v-else @userChange="(event) => this.user = event">
      </Login>
    </div>
    <div class="row">
      <div class="col-4">
        <Leaderboard type="highscore"></Leaderboard>
      </div>
      <div class="offset-4 col-4">
        <Leaderboard type="totalplaytime"></Leaderboard>
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
import Login from "@/components/Login.vue";
import {User} from "@/model/User";

export default defineComponent({
  name: 'App',
  components: {
    Login,
    UserScores,
    Leaderboard,
    Game,
    Header,
  },
  data() {
    return {
      userScores: {},
      userId: 1,
      user: null,
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
  },
  async created() {
    this.userScores = await this.fetchUserScores();
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

.everything {
  margin-bottom: 4em;
}
</style>
