import React from 'react';
import classes from '../Burger/Burger.css';
import BurgerIngredient from '../Burger/BurgerIngredient/BurgerIngredient'

const burger = (props) => {
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            <BurgerIngredient type="salad"/>
            <BurgerIngredient type="cheese"/>
            <BurgerIngredient type="bread-bottom"/>
        </div>
    )
}

export default burger;