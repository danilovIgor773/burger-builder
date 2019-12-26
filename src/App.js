import React, {Component} from 'react';
//import styles from './App.css';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'; 

class App extends Component{
  constructor(props){
    super(props)
    console.log("Props", props);
  }
  
  render(){
    return (
      <div>
        <Layout>
          <BurgerBuilder />
        </Layout>
      </div>
    );
  }
}


export default App;
