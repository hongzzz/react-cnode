import {lazy} from 'react';

// 按需加载路由
const Home = lazy(() => import(/* webpackChunkName: "home" */"Page/Home"));
const About = lazy(() => import(/* webpackChunkName: "about" */"Page/About"));
const Page404 = lazy(() => import(/* webpackChunkName: "page404" */"Page/Page404"));

export default [
  {
    path: '/',
    component: Home
  },
  {
    path: '/about',
    component: About
  },
  {
    path: '/about/:id',
    component: About
  },
  {
    component: Page404 // default
  }
];