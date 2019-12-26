import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import _ from 'lodash';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 0.8,
    bacon: 0.3
};

class BurgerBuilder extends Component{

    state = {
        ingredients:{
            salad: 0,
            meat: 0,
            cheese: 0,
            bacon: 0
        },
        totalPrice: 4
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
        console.log("new price after adding ingredient ", newPrice);
        
        this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
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

    }

    render(){
        const disabledInfo =  _.mapValues({...this.state.ingredients}, (o) => {
            let flag =  o <= 0;
            return flag;
        });
        
        return(
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                  addIngredients={this.addIngredientsHandler}
                  removeIngredients={this.removeIngredientHandler}
                  disabled={disabledInfo}
                />
            </Aux>           
        );
    }
}

export default BurgerBuilder;