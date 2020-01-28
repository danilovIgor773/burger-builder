import React, {Component} from 'react';

import _ from 'lodash';
import axios from '../../axios-orders';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 0.8,
    bacon: 0.3
};

class BurgerBuilder extends Component{

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        showLoader: false,
        error: false
    }

    componentDidMount(){
        //Retrieving data from server and updating state for our ingredients...
        axios.get('https://burger-builder-f92a7.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data})
            })
            .catch(error => {
                this.setState({error: true})
            })
    }

    updatePurchaseButton (ingredients){
        let sum = Object.keys(ingredients)
            .map(igKey => {return ingredients[igKey]})
            .reduce((acc, element) => {
                return acc + element;
            }, 0)

            this.setState({purchasable: sum > 0})
    }

    addIngredientsHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const addedPrice = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = addedPrice + oldPrice;
        //console.log("new price after adding ingredient ", newPrice);
        
        this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
        this.updatePurchaseButton(updatedIngredients);         
    }

    removeIngredientHandler = (type) => {
        const currentCount = this.state.ingredients[type];
        const updatedCount = currentCount <= 0 ? 0 : currentCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };

        updatedIngredients[type] = updatedCount;
        const addedPrice = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - addedPrice;

        this.setState({ingredients: updatedIngredients, totalPrice: newPrice})
        this.updatePurchaseButton(updatedIngredients);
    }

    toggleModalHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        //Updating state to show the spinner
        // this.setState({showLoader: true})

        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer:{
        //         name: "Igor Danilov",
        //         address: {
        //             street: 'test street #1',
        //             zipCode: '123545',
        //             country: 'Uzbekistan'
        //         },
        //         email: 'danilovigor773@gmail.com'
        //     },
        //     deliveryMethod: 'fastest' 
        // };
        
        // axios.post('/orders.json', order)
        //     .then(response => {
        //         this.setState({showLoader: false, purchasing: false});                
        //     })
        //     .catch(error => {
        //         this.setState({showLoader: false, purchasing: false});
        //     });

        //Here we want when clicking redirect to the checkout page...
        this.props.history.push('/checkout');
    }   

    render(){
        console.log(this.props);
        
        const disabledInfo =  _.mapValues({...this.state.ingredients}, (o) => {
            let flag =  o <= 0;
            return flag;
        });

        //Defaults values before data will be retrieved from server...
        let burger = (this.state.error ? 
                    <h3 style={{textAlign: 'center', margin: '10px'}}>Service is unavailable! Please try again later!</h3> 
                    : <Spinner />);
        let orderSummary =  null;

        if(this.state.ingredients){ //Checking if data is successfully retrieved from server..
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients}/>
                        <BuildControls 
                            addIngredients={this.addIngredientsHandler}
                            removeIngredients={this.removeIngredientHandler}
                            disabled={disabledInfo}
                            price={this.state.totalPrice}
                            purchasable={this.state.purchasable}
                            ordered={this.toggleModalHandler}
                    />
                </Aux>
            );
            //Setting orderSummary with retrieved ingredients from server..
            orderSummary = <OrderSummary 
                            ingredients={this.state.ingredients}
                            purchaseCancel={this.purchaseCancelHandler}
                            purchaseContinue={this.purchaseContinueHandler}
                            price={this.state.totalPrice}
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

export default withErrorHandler(BurgerBuilder, axios);