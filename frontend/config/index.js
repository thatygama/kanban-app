const apiUrls = {
  production: 'https://api-prod.com.br:8000/api',
  homolog: 'https://api-homolog.com.br:8000/api',
  development: 'http://localhost:8000/api',
};

export const API_URL = apiUrls[process.env.NODE_ENV] || apiUrls.development;

export const publicRoutes = ['/', '/login', '/registrar'];
