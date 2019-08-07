<template>
  <div class="media border p-3">
    <div class="media-body">
      <div class="form-group">
        <input
          v-model="modifiedUser.title"
          type="text"
          class="form-control">
      </div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Modi tenetur doloribus deleniti aperiam eum dicta ut neque consectetur?
        Eos id omnis voluptate delectus asperiores officiis sint facilis perferendis doloremque excepturi.
      </p>
      <div class="user-control">
        <a
          class="btn btn-warning"
          @click="updateUser">Update</a>
        <a
          class="btn btn-danger"
          @click="$emit('toggleUpdate', false) ">Cancle</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserUpdate',
  props: {
    activity: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      modifiedUser: { ...this.activity },
    };
  },
  methods: {
    updateUser() {
      store.updateUser(this.modifiedUser)
        .then(() => {
          this.$emit('toggleUpdate', false);
        });
    },
  },
};
</script>

<style scoped>

</style>

