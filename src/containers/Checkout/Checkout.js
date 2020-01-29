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

    componentDidMount(){
        //extracting our ingredients via search params that we passing through the router props
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        for(let param of query.entries()){
            //['salad', '1'] - query.entries()
            console.log("param[0]", param[0])
            ingredients[param[0]] = +param[1];
        }
        //setting state with extracted ingredients
        this.setState({ingredients: ingredients})
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
            </div>
        );
    }
 };

 export default Checkout;