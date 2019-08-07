<template>
  <form>
    <div class="form-group">
      <input
        v-model="newUser.first_name"
        type="text"
        class="form-control"
        placeholder="name" >
    </div>
    <div class="form-group">
      <input
        v-model="newUser.last_name"
        type="text"
        class="form-control"
        placeholder="name" >
    </div>
    <div class="form-group">
      <input
        ref="fileInput"
        type="file"
        class="form-control"
        style="display:none"
        @change="onFileSelected">
      <button @click="$refs.fileInput.click()">Choose an avatar</button>
    </div>
    <div class="form-group">
      <input
        v-model="newUser.email"
        type="text"
        class="form-control"
        placeholder="email" >
    </div>
    <button
      class="btn btn-success"
      @click.prevent="createUser">Submit</button>
  </form>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      newUser: {
        first_name: '',
        avatar: null,
        last_name: '',
        email: '',
      },
      // selectedFile: null
    };
  },
  methods: {
    resetUser() {
      this.newUser.first_name = '';
      this.newUser.last_name = '';
      this.newUser.avatar = '';
      this.newUser.email = '';
    },
    onFileSelected(event) {
      this.newUser.avatar = event.target.files[0];
    },
    createUser() {
      debugger;
      /* const fd = new FormData();
            fd.append('first_name', this.newUser.first_name);
            fd.append('last_name', this.newUser.last_name);
            fd.append('avatar', this.selectedFile, this.selectedFile.name);
            fd.append('email', this.newUser.email); */
      this.$store.dispatch('users/createUser', this.newUser)
        .then(res => console.log(res));
    },
  },

};
</script>

<style scoped>
</style>

