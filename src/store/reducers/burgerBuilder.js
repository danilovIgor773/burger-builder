import * as actionTypes from '../actions/actionTypes';
import { updateStateObject } from '../utility';

const initialState = {
    ingredients: null,
    error: false,
    totalPrice: 4
};


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 0.8,
    bacon: 0.3
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.ADD_INGREDIENT:
            const updatedIngredient = {
                [action.ingredientName]: state.ingredients[action.ingredientName] + 1
            };
            const updatedIngredients = updateStateObject(state.ingredients, updatedIngredient);
            const updatedState = {
                ingredients: updatedIngredients,
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            }            
            return updateStateObject(state, updatedState);
        case actionTypes.REMOVE_INGREDIENT:
            const updatedIng = {
                [action.ingredientName]: state.ingredients[action.ingredientName] - 1
            };
            const updatedIngs = updateStateObject(state.ingredients, updatedIng);
            const updatedStateObj = {
                ingredients: updatedIngs,
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            }            
            return updateStateObject(state, updatedStateObj);
        case actionTypes.INIT_INGREDIENTS: 
            return updateStateObject(state, {
                ingredients: action.ingredients,
                totalPrice: 4,
                error: false
            });
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return updateStateObject(state, { error: true });
        default: 
            return state
    }
}

export default reducer;