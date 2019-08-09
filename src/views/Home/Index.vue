<template>
  <v-layout>
    <v-card contextual-style="dark">
      <span slot="header">{{ $t('general.welcome') }}</span>
      <div slot="body">
        <div class="container">
          <div class="d-flex justify-content-end">
              <button class="btn filter" @click="sortBy('id')">Get By Id</button>
              <button class="btn filter" @click="sortBy('first_name')">Get By Name</button>
          </div>
          <div class="row">
            <div class="col-sm-4">
              <UserCreate />
            </div>
            <div class="col-sm-8">
                <User
                v-for="user in users"
                :user="user"
                :key="user.id" />
              <paginate
                :page-count="pagination.total_pages"
                :click-handler="fetchPaginatedUsers"
                :prev-text="'Prev'"
                :next-text="'Next'"
                :container-class="'paginationContainer'"
              />
            </div>
          </div>
        </div>
      </div>
    </v-card>
  </v-layout>
</template>

<script>
/* ============
 * Home Index Page
 * ============
 *
 * The home index page.
 */

import VLayout from '@/layouts/Default.vue';
import VCard from '@/components/Card.vue';
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex';
import User from '@/components/User';
import UserCreate from '@/components/UserCreate';

export default {
  /**
   * The name of the page.
   */
  name: 'HomeIndex',

  /**
   * The components that the page can use.
   */
  components: {
    VLayout,
    VCard,
    User,
    UserCreate,
  },
  computed: {
    ...mapState({
      users: state => state.users.items,
      pagination: state => state.users.pagination,
    })
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    ...mapActions('users', ['fetchUsers']),
    handleFetchedUsers() {
      const filter = {};
      filter.page = this.pagination.page;

      return this.fetchUsers({ filter });
    },
    fetchPaginatedUsers(page) {
      this.setPage(page);
      this.handleFetchedUsers();
    },
    setPage(page) {
      this.$store.commit('users/setPage', page);
    },
    sortBy(prop) {
      this.$store.commit('users/sortItems', prop);
    }
  },
};
</script>

<style>
.filter {
  margin-right: 10px;
  border-bottom: 3px solid #28a745;
  border-radius: 0;
}

.filter:hover {
  border-bottom: none;
  color: #28a745;
}
.paginationContainer {
  display: inline-block;
  padding-left: 0;
  margin: 20px 0;
  border-radius: 4px;
}

.paginationContainer li {
  display: inline;
  font-size: 18px;
}

.paginationContainer a {
  position: relative;
  float: left;
  padding: 6px 12px;
  margin-left: -1px;
  line-height: 1.42857143;
  color: #28a745;
  text-decoration: none;
  background-color: #fff;
  border: 1px solid #ddd;
}

.paginationContainer .active a {
  z-index: 2;
  color: #fff;
  cursor: default;
  background-color: #28a745;
  border-color: #28a745;
}

.paginationContainer .disabled a {
  color: #777;
  cursor: not-allowed;
  background-color: #fff;
  border-color: #ddd;
}
</style>
