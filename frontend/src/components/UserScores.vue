<template>
    <div class="container">
        <div class="row">
            <div class="col text-center" >Highscore</div>
            <div class="col text-center" >Total Score</div>
            <div class="col text-center" >Total Playtime</div>
            <div class="col text-center" >Average Score</div>
            <div class="col text-center" >Games Played</div>
        </div>
        <div class="row">
            <div class="col text-center" >{{ this.userScores.highscore }}</div>
            <div class="col text-center" >{{ this.userScores.totalScore }}</div>
            <div class="col text-center" >{{ this.userScores.totalPlaytime }}</div>
            <div class="col text-center" >{{ this.userScores.averageScore  }}</div>
            <div class="col text-center" >{{ this.userScores.gamesPlayed }}</div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        userScores: {
            type: Object
        }
    },
}
</script>

<style scoped>
* {
    font-size: 1.2em;
}
</style>
