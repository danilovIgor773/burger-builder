import React, {Component} from 'react';
//import styles from './App.css';
import Layout from '../src/hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'; 
import Checkout from '../src/containers/Checkout/Checkout';

class App extends Component{
  
  render(){
    return (
      <div>
        <Layout>
          <BurgerBuilder />
          <Checkout />
        </Layout>
      </div>
    );
  }
}


export default App;
