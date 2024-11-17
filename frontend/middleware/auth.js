export default async function ({ route, redirect }) {
  const token = localStorage.getItem('authorization_user');
  if (!token) {
    return redirect('/');
  } else {
    try {
      const response = await requestApi('validate-token', 'POST', true);
      if (!response.status) {
        localStorage.removeItem('authorization_user');
        return redirect('/');
      }
    } catch (error) {
      localStorage.removeItem('authorization_user');
      return redirect('/');
    }
  }
}
