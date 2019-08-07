import axios from 'axios';
import Vue from 'vue';

export default {
  namespaced: true,
  state: {
    items: [],
    item: {},
    pagination: {
      page: 1,
      per_page: 3,
      total_pages: 0,
    },
    newUser: {},
  },
  getters: {
    testingGetter() {
      return 55;
    },
  },
  actions: {
    fetchUsers({ state, commit }) {
      commit('setItems', { resource: 'users', items: [] }, { root: true });
      // commit('setPagination', {page: 1});
      axios.get(`https://reqres.in/api/users?page=${state.pagination.page}`)
        .then((res) => {
          const {
            data, page, total_pages, per_page,
          } = res.data;
          // const {data, page, total_pages, per_page} = res.data;
          console.log(res.data);
          commit('setItems', { resource: 'users', items: data }, { root: true });
          commit('setPagination', { page, total_pages });
          return state.items;
        });
    },
    createUser({ commit, state }, create) {
      debugger;
      return axios.post('https://reqres.in/api/users', create)
        .then((res) => {
          commit('addUser', create);
        });
    },
    updateUser({ commit, state }, userData) {
      return axios.put(`https://reqres.in/api/users/${userData.id}`, userData)
        .then((res) => {
          const updatedUser = res.data;
          commit('mergeUser', updatedUser);
          return state.item;
        });
    },
    deleteUser(_, userId) {
      return axios.delete(`https://reqres.in/api/users/${userId}`)
        .then((res) => {
          debugger;
          const userId = res.data;
          return userId;
        });
    },
  },
  mutations: {
    setPagination(state, { page, total_pages }) {
      Vue.set(state.pagination, 'page', page);
      Vue.set(state.pagination, 'total_pages', total_pages);
    },
    setPage(state, page) {
      Vue.set(state.pagination, 'page', page);
      console.log(page);
    },
    addUser(state, userObject) {
      state.items.push(userObject);
    },
  },
};
