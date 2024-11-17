import { publicRoutes } from '@/config';
import requestApi from '@/helpers/request-helper';

export default async function ({ route, redirect, store }) {
  if (route.name !== 'NotFound') {
    const token = localStorage.getItem('authorization_user');
    if (!token) {
      if (publicRoutes.includes(route.path)) {
        return;
      }
      return redirect('/');
    }

    try {
      const response = await requestApi('validate-token', 'POST', true);

      if (!response.status) {
        store.commit('auth/clearAuth');
        if (publicRoutes.includes(route.path)) {
          return;
        }
        return redirect('/');
      }

      if (!store.state.auth.user) {
        store.commit('auth/setUser', JSON.parse(localStorage.getItem('user_data')));
      }

      if (publicRoutes.includes(route.path)) {
        return redirect('/tarefas');
      }
    } catch (error) {
      console.error('Erro ao validar o token:', error);
      store.commit('auth/clearAuth');
      if (publicRoutes.includes(route.path)) {
        return;
      }
      return redirect('/');
    }
  }
}
