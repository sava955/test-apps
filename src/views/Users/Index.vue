<template>
  <div>
    <!--UserUpdate v-if="isUpdateActive" :activity="activity" @toggleUpdate="changeUpdateState" /-->
    <!--UserDetail v-else :activity="activity" @toggleUpdate="changeUpdateState" /-->
    <UserDetail
      :users="users"
      @toggleUpdate="changeUpdateState" />
  </div>
</template>
<script>
import UserDetail from '../UserDetail/Index';
import UserUpdate from '../UserUpdate/Index';

export default {
  name: 'UsersList',
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

