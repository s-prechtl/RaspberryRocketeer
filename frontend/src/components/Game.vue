<template>
  <div class="wrapper">
    <main></main>
  </div>
</template>

<script>
import App from "@/App.vue";
import {Rest} from "@/model/Rest";

export default {
  name: "Game",
  props: {
    userId: null
  },
  emits: ['gameFinished'],
  created() {
    window.addEventListener('itemInserted', event => this.localStorageHandler(event), false);
  },
  methods: {
    localStorageHandler(event) {
      if (event.key !== 'game-isRunning') return;

      if (event.value === 'false') { //means game is over
        let playTime = this.msToHMS(Number(localStorage.getItem('game-playTime')));
        let score = Number(localStorage.getItem('game-score'));
        this.submitGame(score, playTime);
      }
    },

    msToHMS(ms) {
      // 1- Convert to seconds:
      let seconds = ms / 1000;
      // 2- Extract hours:
      const hours = parseInt(String(seconds / 3600)); // 3,600 seconds in 1 hour
      seconds = seconds % 3600; // seconds remaining after extracting hours
      // 3- Extract minutes:
      const minutes = parseInt(String(seconds / 60)); // 60 seconds in 1 minute
      // 4- Keep only seconds not extracted to minutes:
      seconds = seconds % 60;
      return ((hours < 10) ? "0" : "") + hours + ":" + ((minutes < 10) ? "0" : "") + minutes + ":" + ((seconds < 10) ? "0" : "") + Math.floor(seconds);
    },

    async submitGame(score, playTime) {
      let body = {
        score: score,
        playtime: playTime,
        date: new Date().toISOString().substring(0, 10),
        userId: this.userId,
      }
      let header = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };
      await fetch(Rest.URL + '/game/add', {method: 'POST', body: JSON.stringify(body), headers: header});
      this.$emit('gameFinished');
    }
  },
}
</script>
