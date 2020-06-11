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

const addIngredient = (state, action) => {
    const updatedIngredient = {
        [action.ingredientName]: state.ingredients[action.ingredientName] + 1
    };
    const updatedIngredients = updateStateObject(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
    }            
    return updateStateObject(state, updatedState);
}

const removeIngredient = (state, action) => {
    const updatedIng = {
        [action.ingredientName]: state.ingredients[action.ingredientName] - 1
    };
    const updatedIngs = updateStateObject(state.ingredients, updatedIng);
    const updatedStateObj = {
        ingredients: updatedIngs,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
    }            
    return updateStateObject(state, updatedStateObj);
}

const initIngredients = (state, action) => {
    return updateStateObject(state, {
        ingredients: action.ingredients,
        totalPrice: 4,
        error: false
    });
}

const fetchIngredientsFailed = (state) => {
    return updateStateObject(state, { error: true });
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
        case actionTypes.INIT_INGREDIENTS: return initIngredients(state, action);
        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state);
        default: return state
    }
}

export default reducer;