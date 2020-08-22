import Vue from "vue";
import Vuex from "vuex";
import bcryptjs from "bcryptjs";
import randomWords from "random-words";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    passwords: [],
  },
  mutations: {
    addPassword: (state, password) => {
      const { passwords } = state;
      passwords.push(password);
      state.passwords = passwords;
    },
  },
  actions: {
    generatePassword: async ({ commit }, { siteName }) => {
      const wordSoup = randomWords(4);
      const password = await bcryptjs.hash(wordSoup.join(""), 10);
      const dateCreated = new Date(Date.now());
      commit("addPassword", { siteName, password, dateCreated });
    },
  },
});
