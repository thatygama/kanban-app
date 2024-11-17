import requestApi from '@/helpers/request-helper';

export const state = () => ({
  user: null,
  token: null,
});

export const mutations = {
  setUser(state, user) {
    state.user = user;
  },
  setToken(state, token) {
    state.token = token;
  },
  clearAuth(state) {
    state.user = null;
    state.token = null;
  },
};

export const actions = {
  async login({ commit }, { email, password }) {
    try {
      const response = await requestApi('login', 'POST', false, { email, password });

      if (response.status) {
        const { token, user } = response.result.data;

        commit('setToken', token);
        commit('setUser', user);

        localStorage.setItem('authorization_user', token);
        localStorage.setItem('user_data', JSON.stringify(user));

        return { success: true };
      }

      return { success: false, message: response.error };
    } catch (err) {
      console.log('Erro: ', err);
      return { success: false, message: 'Erro ao tentar logar. Tente novamente.' };
    }
  },
  async logout({ commit }) {
    try {
      const response = await requestApi('logout', 'POST', true);
      if (response.status) {
        commit('clearAuth');
        localStorage.removeItem('authorization_user');
        localStorage.removeItem('user_data');
      } else {
        throw new Error(response.error || 'Erro ao deslogar');
      }
    } catch (error) {
      console.error('Erro no logout:', error.message);
    }
  },
};
