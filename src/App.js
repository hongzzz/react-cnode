import React, {Suspense} from 'react';
import { hot } from 'react-hot-loader/root';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Header from 'Com/Header';
import Loading from 'Com/Loading';
import routes from '@/routes';
import styles from './App.css';

const App = () => (
  <Router>
    <div className={styles.app}>
      <Header/>
      <main>
        <Suspense fallback={<Loading/>}>
          <Switch>
            {
              routes.map((route, index) =>
                <Route exact path={route.path} component={route.component} key={index}/>
              )
            }
          </Switch>
        </Suspense>
      </main>
    </div>
  </Router>
);

export default hot(App);
