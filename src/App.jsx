import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './routes.js'
import {Header} from './cmps/Header.jsx'
import {Footer} from './cmps/Footer.jsx'
import {withRouter} from 'react-router'

const App = (props) => {
  const isHomepage = props.location.pathname === "/";

  return (
  
    <div className="App">
      <Header isHomepage={isHomepage}/>
      <div className="marg-top-80"></div>

      <Switch>
      { routes.map(route => <Route key={ route.path } exact component={ route.component } path={ route.path } />) }
      </Switch>
      <Footer />
    </div>
  );
};

export default withRouter(App);
