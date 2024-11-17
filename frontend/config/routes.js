export default [
  {
    path: '/',
    name: 'Home',
    component: 'pages/auth/login.vue',
  },
  {
    path: '/login',
    name: 'Login',
    component: 'pages/auth/login.vue',
  },
  {
    path: '/registrar',
    name: 'RegisterUser',
    component: 'pages/auth/register.vue',
  },
  {
    path: '/tarefas',
    name: 'Tasks',
    component: 'pages/tasks/index.vue',
  },
  {
    path: '/tarefas/tarefa/:id?',
    name: 'Task',
    component: 'pages/tasks/task.vue',
    props: true,
  },
  {
    path: '*',
    name: 'NotFound',
    component: 'pages/notFound.vue',
  },
];
