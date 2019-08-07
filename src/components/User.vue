<template>
  <div>
    <UserUpdate
      v-if="isUpdateActive"
      :user="user"
      @toggleUpdate="changeUpdateState" />
    <UserDetail
      v-else
      :user="user"
      @toggleUpdate="changeUpdateState" />
  </div>
</template>

<script>
import UserDetail from './UserDetail';
import UserUpdate from './UserUpdate';

export default {
  components: {
    UserDetail,
    UserUpdate,
  },
  props: {
    user: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      isUpdateActive: false,
    };
  },
  methods: {
    changeUpdateState(isUpdate) {
      this.isUpdateActive = isUpdate;
    },
  },
};
</script>

<style>

</style>

