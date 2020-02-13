import React from 'react';
import classes from '../Burger/Burger.css';
import BurgerIngredient from '../Burger/BurgerIngredient/BurgerIngredient'

const burger = (props) => {

    let transFormedIngredinets = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <BurgerIngredient key={igKey + i} type={igKey}/>
            });
            })
            .reduce((arr, el) => (
                arr.concat(el)
            ), []);
            
        //console.log("transformed Ingr: ", transFormedIngredinets);
        
    if(transFormedIngredinets.length === 0){
        transFormedIngredinets = <p>Please start adding ingridients!</p>
    }
    //console.log(props);
    return (
        
        
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {
                transFormedIngredinets
            }
            <BurgerIngredient type="bread-bottom"/>
        </div>
    )
}

export default burger;