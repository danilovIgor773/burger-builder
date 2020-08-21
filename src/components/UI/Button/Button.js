import React from 'react';
import classes from '../Button/Button.css';

const button = (props) => (
    <button 
        type={props.type ? props.type : "button"}
        className={[classes.Button, classes[props.btnType]].join(' ')}
        onClick={props.clicked} 
        disabled={props.disabled}
    >
        {props.children}
    </button>
);

export default button;