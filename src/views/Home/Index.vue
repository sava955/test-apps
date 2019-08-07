<template>
  <v-layout>
    <v-card contextual-style="dark">
      <span slot="header">{{ $t('general.welcome') }}</span>
      <div slot="body">
        <div class="container">
          <!--h2>{{ fullAppName }}</h2-->
          <div class="row">
            <div class="col-sm-3">
              <UserCreate />
            </div>
            <div class="col-sm-9">
              <!--UsersList v-for="activity in activities" :activity="activity" :key="activity.id" /-->
              <User
                v-for="user in users"
                :user="user"
                :key="user.id" />
              <!--div class="activity-length">Currently {{activityLength}}</div-->
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
    }),
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    ...mapActions('users', ['fetchUsers']),
    handleFetchedUsers() {
      const filter = {};
      // filter['total_pages'] = this.pagination.total_pages;
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
  },
};
</script>

<style>
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
  color: #00d1b2;
  text-decoration: none;
  background-color: #fff;
  border: 1px solid #ddd;
}

.paginationContainer .active a {
  z-index: 2;
  color: #fff;
  cursor: default;
  background-color: #00d1b2;
  border-color: #00d1b2;
}

.paginationContainer .disabled a {
  color: #777;
  cursor: not-allowed;
  background-color: #fff;
  border-color: #ddd;
}
</style>
