export const actions = {
  nuxtServerInit({ commit }, { req }) {
    if (process.client) {
      const token = localStorage.getItem('authorization_user');
      const user = localStorage.getItem('user_data');

      if (token) {
        commit('auth/setToken', token);
      }
      if (user) {
        commit('auth/setUser', JSON.parse(user));
      }
    }
  },
};
