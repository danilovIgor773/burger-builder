import React from 'react';
import classes from '../Order/Order.css';

const order = (props) => {
    return(
        <div className={classes.Order}>
            <p>Ingredients: Salad(1)</p>
            <p>Total price: <strong>USD 5.8</strong></p>
        </div>
    )
}

export default order;