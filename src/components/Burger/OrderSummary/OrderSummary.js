 import React from 'react';
 import Aux from '../../../hoc/Aux';

 const orderSummary = (props) => {

     const ingredientsSummary = props.ingredients;
     //Here we form the list of ingredients that will be shown in a Modal and will be updated dynamically...
     const ingredientsList = Object.keys(ingredientsSummary)
        .map((igKey) => {
            return <li key={igKey}>
                <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
            </li>
         });

     return (
         <Aux>
             <h3>Your order</h3>
             <p>A delicious burger with the following ingredients</p>
             <ul>
                {ingredientsList}
             </ul>
             <p>Continue to Checkout?</p>
         </Aux>
     );
 };

 export default orderSummary;