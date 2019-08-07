<template>
  <div class="media border p-3">
    <img
      :src="user.avatar"
      alt="John Doe"
      class="mr-3 mt-3 rounded-circle"
      style="width:60px;">
    <div class="media-body">
      <h4>
        {{ user.id + '. ' + user.first_name + ' ' + user.last_name }}
      </h4>
      <span><strong>Email: </strong>{{ user.email }}</span>
      <div class="user-control">
        <a
          class="btn btn-warning"
          @click="$emit('toggleUpdate', true)">Edit</a>
        <a
          class="btn btn-danger"
          @click.prevent="showDeleteUserWarning">Delete</a>
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
  methods: {
    /* showDeleteUserWarning(e, userId) {
      e.stopPropagation();
      const isConfirm = confirm('Are you sure you want to delete this user?');

      if (isConfirm) {
        debugger;
        this.$store.dispatch('users/deleteUser', userId)
          .then(res => {
            console.log(res);
          });
      }
    } */
    showDeleteUserWarning() {
      debugger;
      this.$store.dispatch('users/deleteUser', this.user.id)
        .then(id => console.log(id));
    },
  },
};
</script>

<style scoped>
</style>
