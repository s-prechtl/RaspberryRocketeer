<template>
  <div class="wrapper">
    <main></main>
  </div>
</template>

<script>
import App from "@/App.vue";
export default {
  name: "Game",
  props: {
    userId: null
  },
  emits: ['gameFinished'],
  created() {
    window.addEventListener('storage', this.localStorageHandler, false);
  },
  methods: {

    localStorageHandler() {
      if (localStorage.getItem('game-isRunning') !== 'true') {
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
      return hours + ":" + minutes + ":" + seconds;
    },

    async submitGame(score, playTime) {
      let body = {
        score: score,
        playtime: playTime,
        date: new Date(),
        userId: this.userId,
      }
      await fetch(App.data().restUrl + '/game/add', {method: 'POST', body: JSON.stringify(body)});
      this.$emit('gameFinished');
    }
  },
}
</script>
