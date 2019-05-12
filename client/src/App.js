import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import logo from './logo.svg';
import Layout from './components/Layout';
import Main from './components/pages/Main';
import ShowDetailProduct from './components/common/ShowDetailProduct/ShowDetailProduct';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/detail/:id" component={ShowDetailProduct} />
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
