import React, {lazy, Suspense} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Header from 'Com/Header';
import './index.less';

// 按需加载路由
const Home = lazy(() => import(/* webpackChunkName: "home" */"Com/Home"));
const About = lazy(() => import(/* webpackChunkName: "about" */"Com/About"));
const Page404 = lazy(() => import(/* webpackChunkName: "page404" */"Com/Page404"));

const App = () => (
  <Router>
    <div className="app">
      <Header/>
      <main>
        <Suspense fallback={<div>loading...</div>}>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/about" component={About}/>
            <Route component={Page404}/>
          </Switch>
        </Suspense>
      </main>
    </div>
  </Router>
);

export default App;
