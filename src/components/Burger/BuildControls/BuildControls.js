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
         {controls.map(ctrl => (
             <BuildControl
              key={ctrl.label}
              label={ctrl.label}
              added={() => props.addIngredients(ctrl.type)}/>
         ))}
    </div>
);


export default buildControls;