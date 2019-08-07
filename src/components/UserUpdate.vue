<template>
  <div class="media border p-3">
    <div class="media-body">
      <div class="form-group">
        <input
          v-model="modifiedUser.first_name"
          type="text"
          class="form-control">
      </div>
      <div class="form-group">
        <input
          v-model="modifiedUser.last_name"
          type="text"
          class="form-control">
      </div>
      <div class="form-group">
        <input
          v-model="modifiedUser.email"
          type="text"
          class="form-control">
      </div>
      <div class="user-control">
        <a
          class="btn btn-warning"
          @click="updateUser">Update</a>
        <a
          class="btn btn-danger"
          @click="$emit('toggleUpdate', false)">Cancle</a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      modifiedUser: { ...this.user },
    };
  },
  methods: {
    updateUser() {
      this.$store.dispatch('users/updateUser', this.modifiedUser)
        .then((res) => {
          debugger;
          console.log(res.data);
          this.$emit('toggleUpdate', false);
        });
    },
  },
};
</script>

<style scoped>

</style>

