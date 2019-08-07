<template>
  <div class="media border p-3">
    <div class="media-body">
      <h4>
        {{ user.first_name }}
        <!--small>
          <i>Posted on {{activity.createdAt}}</i>
        </small-->
      </h4>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Modi tenetur doloribus deleniti aperiam eum dicta ut neque consectetur?
        Eos id omnis voluptate delectus asperiores officiis sint facilis perferendis doloremque excepturi.
      </p>
      <div class="user-control">
        <a
          class="btn btn-warning"
          @click="$emit('toggleUpdate', true)">Edit</a>
        <a
          class="btn btn-danger"
          @click="deleteUser">Delete</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserDetail',
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  methods: {
    deleteUser() {
      store.deleteUser(this.activity);
    },
  },
};
</script>

<style scoped>

</style>
