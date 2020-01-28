import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'; 


 class Checkout extends Component{
    state={
         ingredients:{
             salad: 1,
             meat: 1,
             bacon: 1,
             cheese: 1
         }
    }

    cancelHandler = () => (
        this.props.history.goBack()
    );

    continueHandler = () => (
        this.props.history.replace('/checkout/contact-data')
    )

    render(){
        console.log("fromCheckout", this.props);
        
        return(
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients}
                    canceled={this.cancelHandler}
                    continued={this.continueHandler}
                    />
            </div>
        );
    }
 };

 export default Checkout;