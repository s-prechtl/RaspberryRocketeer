<template>
  <button>{{ text }}</button>
</template>

<script lang="ts">
export default {
  name: "Button",
  props: {
    text: {
      type: String
    },
  }
}
</script>

<style scoped>
button {
  border: 3px solid black;
  background-color: beige;
}
</style>