 import React from 'react';
 import Aux from '../../../hoc/Aux/Aux';
 import Button from '../../UI/Button/Button';


 const orderSummary = ({ingredients, price, purchaseCancel, purchaseContinue}) => {
    const ingredientsSummary = ingredients;
        //Here we form the list of ingredients that will be shown in a Modal and will be updated dynamically...
    const ingredientsList = Object.keys(ingredientsSummary)
        .map((igKey) => {
            return <li key={igKey}>
                <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {ingredients[igKey]}
            </li>
        });
    
    return (
        <Aux>
            <h3>Your order</h3>
            <p>A delicious burger with the following ingredients</p>
            <ul>
                {ingredientsList}
            </ul>
            <p><strong>Total Price: {price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType='Danger' clicked={purchaseCancel}>CANCEL</Button>
            <Button btnType='Success' clicked={purchaseContinue}>CONTINUE</Button>
        </Aux>
    ); 


 }; 
 export default orderSummary;