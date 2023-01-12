<template>
    <h3>{{ title }}</h3>
    <div class="container">
        <div class="row" v-for="entry in data" :key="entry.rank" >
            <div class="col-1 text-left">{{entry.rank}}</div>
            <div class="offset-1 col text-left">{{entry.username}}</div>
            <div class="col text-left">{{entry.score}}</div>
        </div>
    </div>
</template>

<script>

export default {
    name: "Leaderboard",
    props: {
        title: {
            type: String
        },
        data: {
            type: Array
        }
    }
}
</script>
