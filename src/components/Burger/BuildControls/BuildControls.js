import React from 'react';
import classes from '../BuildControls/BuildControls.css';
import BuildControl from '../BuildControls/BuildControl/BuildControl';

const controls = [
    {label: 'salad', type: 'salad'},
    {label: 'cheese', type: 'cheese'},
    {label: 'meat', type: 'meat'},
    {label: 'bacon', type: 'bacon'}
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
         {controls.map(ctrl => (
             <BuildControl
                key={ctrl.label}
                label={ctrl.label}
                added={() => props.addIngredients(ctrl.type)}
                removed={() => props.removeIngredients(ctrl.type)}
                disabled={props.disabled[ctrl.type]}
              />
         ))}
    </div>
);


export default buildControls;