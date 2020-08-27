import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
//import styles from './App.css';
import Layout from '../src/hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'; 
import Checkout from '../src/containers/Checkout/Checkout';
import Orders from '../src/containers/Orders/Orders';
import FormikAuth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
//import NotificationsSystem from 'reapop';
//import theme from 'reapop-theme-wybo';

class App extends Component{
  
  render(){
    return (
      <div>
        {/* <NotificationsSystem theme={theme} /> */}
        <Layout>
          <Switch>            
            <Route path='/checkout' component={Checkout}/>
            <Route path='/orders' component={Orders}/>
            <Route path='/logout' component={Logout}/>
            <Route path='/authenticate' component={FormikAuth}/>
            <Route path='/' exact component={BurgerBuilder}/>
          </Switch>          
        </Layout>
      </div>
    );
  }
}


export default App;
