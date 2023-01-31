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
  data(){
    return {
      username: '',
      _user: null,
    }
  },
  emits: ['userChange'],
  methods: {
    async setUser(){
      let user;
      user = await User.getByName(this.username);
      if(user.errors){
        user = await User.create(this.username);
      }

      if(user.errors){
        console.error("Something when wrong when logging in, please contact admin!")
      }

      if(user){
        this.user(user);
      }
    },
    user(user){
      this._user = user;
      localStorage.setItem("frontend-ready", "true");
      this.$emit('userChange', this._user);
    }
  }
}
</script>

<style scoped>
input {
  border: 3px solid black;
  background-color: beige;
}
</style>