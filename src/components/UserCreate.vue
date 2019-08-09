<template>
  <form>
    <h3 class="title">Create User</h3>
    <div class="form-group">
      <input v-model="newUser.first_name" type="text" class="form-control" placeholder="First Name" />
      <div class="summary text-red" v-if="$v.newUser.first_name.$error">First Name is required.</div>
    </div>
    <div class="form-group">
      <input v-model="newUser.last_name" type="text" class="form-control" placeholder="Last Name" />
      <div class="summary text-red" v-if="$v.newUser.last_name.$error">Last Name is required.</div>
    </div>
    <div class="form-group">
      <datepicker v-model="newUser.birth_date" placeholder="Birthday"></datepicker>
    </div>
    <div class="form-group">
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
      <input v-model="newUser.email" type="text" class="form-control" placeholder="Email" />
      <div class="summary text-red" v-if="$v.newUser.email.$error">Enter a real email.</div>
    </div>
    <div class="form-group">
      <VuePhoneNumberInput v-model="newUser.phone_number" class="phone-nmb" />
    </div>
    <button class="btn btn-success" @click.prevent="createUser">Submit</button>
  </form>
</template>

<script>
import axios from "axios";
import { email, required } from "vuelidate/lib/validators";
import VuePhoneNumberInput from "vue-phone-number-input";
import "vue-phone-number-input/dist/vue-phone-number-input.css";
import Datepicker from "vuejs-datepicker";

export default {
  data() {
    return {
      newUser: {
        first_name: "",
        avatar: null,
        birth_date: "",
        last_name: "",
        email: "",
        phone_number: ""
      }
    };
  },
  components: {
    VuePhoneNumberInput,
    Datepicker
  },
  validations: {
    newUser: {
      first_name: { required },
      last_name: { required },
      email: { email, required }
    }
  },
  methods: {
    resetUser() {
      this.newUser.first_name = "";
      this.newUser.last_name = "";
      this.newUser.birth_date = "";
      this.newUser.avatar = null;
      this.newUser.email = "";
      this.newUser.phone_number = ""
    },
    onFileSelected(event) {
      this.newUser.avatar = event.target.files[0];
    },
    createUser() {
      this.$v.newUser.$touch()
      if (this.$v.newUser.$error) { return }
      else {
        this.newUser.avatar = require("@/assets/images/avatar.png")
        this.$store
          .dispatch("users/createUser", this.newUser)
          .then(res => {
            this.resetUser()
          })
      }
    }
  }
}
</script>

<style scoped>
.title {
  padding-bottom: 10px;
}
.text-red {
  color: red;
}
</style>

