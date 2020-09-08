import React, {Component} from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
//import styles from './App.css';
import Layout from '../src/hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'; 
import Checkout from '../src/containers/Checkout/Checkout';
import Orders from '../src/containers/Orders/Orders';
import FormikAuth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';
//import NotificationsSystem from 'reapop';
//import theme from 'reapop-theme-wybo';

class App extends Component{

  componentDidMount(){
    this.props.onTryAutoSignUp();
  }
  
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

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(null, mapDispatchToProps)(App));
