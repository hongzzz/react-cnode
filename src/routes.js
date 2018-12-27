import { lazy } from 'react';

// 按需加载路由
const Home = lazy(() => import(/* webpackChunkName: "Home" */ 'Page/Home'));
const About = lazy(() => import(/* webpackChunkName: "About" */ 'Page/About'));
const Page404 = lazy(() =>
  import(/* webpackChunkName: "Page404" */ 'Page/Page404')
);
const Login = lazy(() => import(/* webpackChunkName: "Login" */ 'Page/Login'));
const User = lazy(() => import(/* webpackChunkName: "User" */ 'Page/User'));
const Topic = lazy(() => import(/* webpackChunkName: "Topic" */ 'Page/Topic'));

export default [
  {
    path: ['/', '/topics/:tab'],
    component: Home
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/user/:name',
    component: User
  },
  {
    path: '/topic/:id',
    component: Topic
  },
  {
    path: '/about',
    component: About
  },
  {
    component: Page404 // default
  }
];
