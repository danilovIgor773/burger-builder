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
import * as actionCreators from '../../store/actions/index';


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
        onAddedIngredient: (ingName) => dispatch(actionCreators.addIngredient(ingName)),
        onRemovedIngredient: (ingName) => dispatch(actionCreators.removeIngredient(ingName))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));