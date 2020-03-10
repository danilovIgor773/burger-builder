import React, {Component} from 'react';
import {connect} from 'react-redux';

import _ from 'lodash';
import axios from '../../axios-orders';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions';


class BurgerBuilder extends Component{

    state = {
        purchasing: false,
        showLoader: false,
        error: false
    }

    componentDidMount(){
        //Retrieving data from server and updating state for our ingredients...
        // axios.get('https://burger-builder-f92a7.firebaseio.com/ingredients.json')
        //     .then(response => {
        //         this.setState({ingredients: response.data})
        //     })
        //     .catch(error => {
        //         this.setState({error: true})
        //     })
    }

    updatePurchaseButton (ingredients){
        let sum = Object.keys(ingredients)
            .map(igKey => {return ingredients[igKey]})
            .reduce((acc, element) => {
                return acc + element;
            }, 0)

            return sum > 0; // Enable or disable ORDER btn
    }  
  

    toggleModalHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        //Updating state to show the spinner
      

        //Here we create our query params via encodeURIComponent(str) and then pass them to the search field...
        // const queryParams = [];
        // for(let i in this.props.ingredients){
        //     //console.log("i is: ", i);
        //     //here we create an array of query params that looks like ['bacon=1', 'salad=1', 'cheese=1', 'meat=1']...
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ingredients[i]))                
        // }
        // queryParams.push('price=' + this.props.price);
        // //Here we create a string joined via '&' to pass them as query string through the roter-related props
        // //String looks like 'bacon=1&cheese=1&....'
        // const queryString = queryParams.join('&');
        //console.log("query string", queryString);
        //console.log("query params", queryParams);
        

        //Here we want when clicking redirect to the checkout page...
        //We also passing our ingredients to checkout for actual burger that the user has built        
        this.props.history.push({ pathname: '/checkout' });
    }   

    render(){
        //console.log(this.props);
        
        const disabledInfo =  _.mapValues({...this.props.ingredients}, (o) => {
            let flag =  o <= 0;
            return flag;
        });

        //Defaults values before data will be retrieved from server...
        let burger = (this.state.error ? 
                    <h3 style={{textAlign: 'center', margin: '10px'}}>Service is unavailable! Please try again later!</h3> 
                    : <Spinner />);
        let orderSummary =  null;

        if(this.props.ingredients){ //Checking if data is successfully retrieved from server..
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingredients}/>
                        <BuildControls 
                            addIngredients={this.props.onAddedIngredient}
                            removeIngredients={this.props.onRemovedIngredient}
                            disabled={disabledInfo}
                            price={this.props.price}
                            purchasable={this.updatePurchaseButton(this.props.ingredients)}
                            ordered={this.toggleModalHandler}
                    />
                </Aux>
            );
            //Setting orderSummary with retrieved ingredients from server..
            orderSummary = <OrderSummary 
                            ingredients={this.props.ingredients}
                            purchaseCancel={this.purchaseCancelHandler}
                            purchaseContinue={this.purchaseContinueHandler}
                            price={this.props.price}
                            />;
        }
        
        if(this.state.showLoader){
            //add spinner...
            orderSummary = <Spinner />;
        }
                            
        return(
            <Aux>                
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>           
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onAddedIngredient: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onRemovedIngredient: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));