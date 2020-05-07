import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';
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
        let summary = <Redirect to='/' />

        if(this.props.ingredients){
            const purchasedRedirect = this.props.purchased ? <Redirect to='/'/> : null;
            summary = (
                <div>
                    {purchasedRedirect}
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

        return summary;
    }
 };

 const mapStateToProps = state => {
     return {
         ingredients: state.burgerBuilder.ingredients,
         price: state.burgerBuilder.totalPrice,
         purchased: state.orders.purchased
     }
 }

 export default connect(mapStateToProps)(Checkout);