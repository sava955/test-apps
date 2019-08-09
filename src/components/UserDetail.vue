<template>
  <div class="media border p-3">
    <img
      :src="user.avatar"
      alt="avatar"
      class="mr-3 mt-3 rounded-circle"
      style="width:60px;">
    <div class="media-body">
      <h4 class="text-capitalize">
        {{ user.id + '. ' + user.first_name + ' ' + user.last_name }}
      </h4>
      <span v-if="user.birth_date"><strong>Date of birth: </strong>{{ user.birth_date | prettyTime }}</span>
      <br>
      <span><strong>Email: </strong>{{ user.email }}</span>
      <br>
      <span v-if="user.phone_number"><strong>Phone number: </strong>{{ user.phone_number }}</span>
      <div class="user-control d-flex justify-content-end">
        <a
          class="btn btn-success"
          @click="$emit('toggleUpdate', true)">Edit</a>
        <a
          class="btn btn-danger"
          @click.prevent="($event) => showDeleteUserWarning($event, user.id)">Delete</a>
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
    showDeleteUserWarning(e, userId) {
      e.stopPropagation()
      const isConfirm = confirm('Are you sure you want to delete this user?')

      if (isConfirm) {
        this.$store.dispatch('users/deleteUser', userId)
          .then(res => {
            console.log(res)
          });
      }
    }
  }
};
</script>

<style scoped>
   .media {
     margin: 10px;
   }

   .btn {
     color: #fff !important;
   }

   .btn:hover {
     cursor: pointer;
   }
   
   .btn-success {
     margin-right: 10px;
   }
</style>
