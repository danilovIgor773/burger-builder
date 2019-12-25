import React, {Component} from 'react';
//import styles from './App.css';
import Layout from './components/Layout/Layout'; 

class App extends Component{
  constructor(props){
    super(props)
    console.log("Props", props);
  }
  
  render(){
    return (
      <div>
        <Layout>
          <p>Test</p>
        </Layout>
      </div>
    );
  }
}


export default App;
