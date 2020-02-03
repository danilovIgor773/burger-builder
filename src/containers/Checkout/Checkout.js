import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../ContactData/ContactData'; 


 class Checkout extends Component{
  
     constructor(props){
         super(props);
         
         const query = new URLSearchParams(this.props.location.search);
         const ingredients = {};
         let price = 0;
         for(let param of query.entries()){
             //['salad', '1'] - query.entries()
             if(param[0] === 'price'){
                 price = param[1];
             }else{
                ingredients[param[0]] = +param[1];
             }
             
         }
         console.log("Constructor ingredients are", ingredients);
         
         this.state={
            ingredients:ingredients, //retrieved data passed via query params assigned directly into state
            totalPrice: price
        }         
     }
 

    
    //Handle routing in checkout - goes back to the previous page
    cancelHandler = () => (
        this.props.history.goBack()
    );

    //Here we replace the page when clicking, should be modified...
    continueHandler = () => (
        this.props.history.replace('/checkout/contact-data')
    )

    render(){
        //console.log("fromCheckout", this.props);
        
        return(
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients}
                    canceled={this.cancelHandler}
                    continued={this.continueHandler}
                    />
                <Route 
                    path={this.props.match.url + '/contact-data'}
                    render={(props) => (
                        <ContactData    
                            ingredients={this.state.ingredients}
                            price={this.state.totalPrice}
                            {...props} />
                        )} />
            </div>
        );
    }
 };

 export default Checkout;