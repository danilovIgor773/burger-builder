import React from 'react';
import classes from '../Order/Order.css';

const order = (props) => {
    const ingredients = [];

    for(let igName in props.ingredients){
        ingredients.push({
            name: igName,
            amount: props.ingredients[igName]
        })
    }

    let outputIngredients = ingredients.map(ingredient =>(
        <span 
            className={classes.Ingredients} key={ingredient.name}>
                {ingredient.name} ({ingredient.amount})
            </span>
    ))


    return( 
        <div className={classes.Order}>
            <p>Ingredients: {outputIngredients}</p>
            <p>Total price: <strong>{props.price.toFixed(2)}</strong></p>
        </div>
    )
}

export default order;