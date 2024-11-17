import { API_URL } from '@/config';

async function requestApi(route, method = 'GET', token = false, body = false) {
  try {
    const userLoggedToken = localStorage.getItem('authorization_user');
    if (!token || (token && userLoggedToken)) {
      const config = {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${userLoggedToken}` : '',
        },
      };

      if (body) {
        config.body = JSON.stringify(body);
      }

      const response = await fetch(`${API_URL}/${route}`, config);
      let result = await response.json();

      if (!response.ok) {
        return { status: false, error: result.message };
      }
      return { status: true, result };
    }

    localStorage.removeItem('authorization_user');
    localStorage.removeItem('user_data');
    return { status: false, error: 'Falha ao autenticar' };
  } catch (error) {
    console.log('Erro: ', error)
    return { status: false, error: 'Erro! Falha ao autenticar' };
  }
}
export default requestApi;
