<template>
  <h2>Enter a username</h2>
  <div class="form-floating mb-3">
    <input type="email" class="form-control" id="floatingInput" placeholder="example name" v-model="username">
    <label for="floatingInput">Username</label>
    <RRButton @click="setUser()" text="Confirm"></RRButton>
  </div>
</template>

<script>
import {User} from "@/model/User";
import RRButton from "@/components/RRButton.vue";

export default {
  name: "Login",
  components: {
    RRButton
  },
  data() {
    return {
      username: '',
    }
  },
  emits: ['userChange'],
  methods: {
    async setUser() {
      if (this.username === '') return;

      let user;
      user = await User.getByName(this.username);
      if (user.errors) {
        user = await User.create(this.username);
      }

      if (user.errors) {
        console.error("Something when wrong when logging in, please contact admin!")
        return;
      }

      if (user) {
        this.$emit('userChange', user);
      }
    },
  }
}
</script>

<style scoped>
input {
  border: 3px solid black;
  border-radius: 0;
  background-color: beige;
  margin-bottom: 5px;
}

input:focus {
  background: beige;
  border-color: rgba(184,134,11, 0.8);
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset, 0 0 8px rgba(184,134,11, 0.6);
}

label {
  margin-left: 10px;
}
</style>