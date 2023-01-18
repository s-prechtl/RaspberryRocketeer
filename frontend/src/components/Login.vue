<template>
  <h2>Enter a username</h2>
  <div class="form-floating mb-3">
    <input type="email" class="form-control" id="floatingInput" placeholder="example name" v-model="username">
    <label for="floatingInput">Username</label>
  </div>
  <button type="button" class="btn btn-primary" @click="setUser()">Confirm</button>
</template>

<script>
import {User} from "@/model/User";

export default {
  name: "Login",
  data() {
    return {
      username: '',
      user: null,
    }
  },
  emits: ['userChange'],
  methods: {
    async setUser() {
      let user = await User.getByName(this.username);
      if (user.errors) {
        user = await User.create(this.username);
      }

      if (user.errors) {
        console.error("Something when wrong when logging in, please contact admin!")
        return;
      }

      if (user) {
        this.user = user;
        this.$emit('userChange', this.user);
      }
    },
  }
}
</script>

<style scoped>

</style>