<template>
  <div class="media border p-3">
    <div class="media-body">
      <div class="form-group">
        <img
          :src="modifiedUser.avatar"
          alt="avatar"
          class="mr-3 mt-3 rounded-circle"
          style="width:60px;"
        />
        <input
          ref="fileInput"
          type="file"
          class="form-control"
          style="display:none"
          @change="onFileSelected"
        />
        <button @click.prevent="$refs.fileInput.click()" class="btn btn-success">Choose an avatar</button>
      </div>
      <div class="form-group">
        <input v-model="modifiedUser.first_name" type="text" class="form-control" />
        <div
          class="summary text-red"
          v-if="$v.modifiedUser.first_name.$error"
        >First Name is required.</div>
      </div>
      <div class="form-group">
        <input v-model="modifiedUser.last_name" type="text" class="form-control" />
        <div class="summary text-red"
             v-if="$v.modifiedUser.last_name.$error"
             >Last Name is required.</div>
      </div>
      <div class="form-group" v-if="modifiedUser.birth_date">
        <datepicker v-model="modifiedUser.birth_date"></datepicker>
      </div>
      <div class="form-group">
        <input v-model="modifiedUser.email" type="text" class="form-control" />
        <div class="summary text-red" v-if="$v.modifiedUser.email.$error">Provide a real email.</div>
      </div>
      <div class="form-group" v-if="modifiedUser.phone_number">
        <VuePhoneNumberInput v-model="modifiedUser.phone_number" class="phone-nmb" />
      </div>
      <div class="user-control d-flex justify-content-end">
        <a class="btn btn-success" @click="updateUser">Update</a>
        <a class="btn btn-danger" @click="$emit('toggleUpdate', false)">Cancle</a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import VuePhoneNumberInput from "vue-phone-number-input";
import "vue-phone-number-input/dist/vue-phone-number-input.css";
import Datepicker from "vuejs-datepicker";
import { email, required } from "vuelidate/lib/validators";

export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  components: {
    Datepicker,
    VuePhoneNumberInput
  },
  validations: {
    modifiedUser: {
      first_name: { required },
      last_name: { required },
      email: { email, required }
    }
  },
  data() {
    return {
      modifiedUser: { ...this.user }
    };
  },
  methods: {
    onFileSelected(event) {
      this.modifiedUser.avatar = require("@/assets/images/updated-avatar.png");
    },
    updateUser() {
      this.$v.modifiedUser.$touch();
      if (this.$v.modifiedUser.$error) {
        return;
      } else {
        this.$store
          .dispatch("users/updateUser", this.modifiedUser)
          .then(res => {
            this.$emit("toggleUpdate", false);
          });
      }
    }
  }
};
</script>

<style scoped>
.text-red {
  color: red;
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

