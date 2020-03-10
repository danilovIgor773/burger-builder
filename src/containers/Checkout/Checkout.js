import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../ContactData/ContactData'; 
import {connect} from 'react-redux';


 class Checkout extends Component{
  
    
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
                    ingredients={this.props.ingredients}
                    canceled={this.cancelHandler}
                    continued={this.continueHandler}
                    />
                <Route 
                    path={this.props.match.url + '/contact-data'}
                    component={ContactData} />
            </div>
        );
    }
 };

 const mapStateToProps = state => {
     return {
         ingredients: state.ingredients,
         price: state.totalPrice
     }
 }

 export default connect(mapStateToProps)(Checkout);