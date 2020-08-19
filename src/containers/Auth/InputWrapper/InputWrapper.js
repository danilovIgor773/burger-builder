import React from 'react';
import classes from '../InputWrapper/InputWrapper.css';

const InputWrapper = (props) => {
    let validationError = null;
    if(props.error && props.touched){
        validationError = <p className={classes.ValidationError}>{props.error}</p>;
    }
    
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {props.children}
            {validationError}
        </div>
    );
} 

export default InputWrapper;