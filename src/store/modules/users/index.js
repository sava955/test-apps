import axios from 'axios';
import Vue from 'vue';

export default {
  namespaced: true,
  state: {
    items: [],
    pagination: {
      page: 1,
      per_page: 3,
      total_pages: 0,
    },
    newUser: {},
  },
  getters: {
  },
  actions: {
    fetchUsers({ state, commit }) {
      commit('setItems', { resource: 'users', items: [] }, { root: true });
      axios.get(`https://reqres.in/api/users?page=${state.pagination.page}`)
        .then((res) => {
          const {
            data, page, total_pages, per_page,
          } = res.data;
          commit('setItems', { resource: 'users', items: data }, { root: true });
          commit('setPagination', { page, total_pages });
          commit('sortItems', res.data);
          return state.items;
        });
    },
    createUser({ commit, state }, create) {
      return axios.post('https://reqres.in/api/users', create)
        .then((res) => {
          commit('addUser', res.data)
          Vue.router.push({
            name: 'home.index',
          });
        });
    },
    updateUser({ commit, state }, userData) {
      return axios.put(`https://reqres.in/api/users/${userData.id}`, userData)
        .then((res) => {
          commit('mergeUpdate', userData);
          return state.items;
        });
    },
    deleteUser({commit}, userId) {
      return axios.delete('https://reqres.in/api/users/' + userId)
        .then((res) => {
          localStorage.removeItem('user', 'data');
          commit('deleteUser', userId)
        });
    }
  },
  mutations: {
    setPagination(state, { page, total_pages }) {
      Vue.set(state.pagination, 'page', page);
      Vue.set(state.pagination, 'total_pages', total_pages);
    },
    setPage(state, page) {
      Vue.set(state.pagination, 'page', page);
    },
    sortItems(state, prop) {
      let list = state.items;
      Vue.set(list.sort((a, b) => a[prop] < b[prop] ? - 1 : 1))
    },
    addUser(state, userObject) { 
      const newPage = state.items.slice(0,2)
      state.items = [userObject, ...newPage]
    },
    deleteUser(state, userId) {
      let index = state.items.findIndex(user => user.id == userId)
      state.items.splice(index, 1)
    },
    mergeUpdate(state, updatedUser) {
      let item = state.items.findIndex(item => item.id == updatedUser.id);
      state.items.splice(item, 1, {
        'id': updatedUser.id,
        'avatar': updatedUser.avatar,
        'first_name': updatedUser.first_name,
        'last_name': updatedUser.last_name,
        'birth_date': updatedUser.birth_date,
        'email': updatedUser.email,
        'phone_number': updatedUser.phone_number
      })
    }
  }
};
