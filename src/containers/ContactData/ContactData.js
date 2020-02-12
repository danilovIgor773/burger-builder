import React, {Component} from 'react';
import classes from './ContactData.css';
import Button from '../../components/UI/Button/Button';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/UI/Input/Input';

import transformData from '../ContactData/Utility/contactDataTransformation';
import {metaDataConfig as configData} from '../ContactData/Constants/contactInfoCfg';

class ContactData extends Component{
    constructor(props){
        super(props);
        this.state = {
            orderForm: transformData(configData),
            showLoader: false,
        }
    }

    orderHandler = (event) => {
        event.preventDefault();
              
        this.setState({showLoader: true})

        const updatedFormData = {};
        for(let identifier in this.state.orderForm){
            updatedFormData[identifier] = this.state.orderForm[identifier].value;
        }

        const order = {
            orderFormData: updatedFormData,
            price: this.props.price             
        };
        
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({showLoader: false});
                this.props.history.push('/'); //it is available because router props are passed within Route component via render attr.                 
            })
            .catch(error => {
                this.setState({showLoader: false});
        });
    }

    checkValidity = (value, rules) => {
        let isValid = true;

        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength){
            isValid = value.length >= rules.minLength  && isValid;
        }

        if(rules.maxLength){
            isValid = value.length <= rules.maxLength  && isValid;
        }

        return isValid;
    }

    inputChangedHandler(event, id){
        const updatedForm = {
            ...this.state.orderForm //Here we clone our state, however we have nested object, that's why we need to make deep clone 
        };
        const formElements = {
            ...updatedForm[id]
        };

        formElements.value = event.target.value;
        //console.log('Validation in state is', updatedForm);
        
        formElements.valid = this.checkValidity(formElements.value, formElements.validation);
        formElements.touched = true;
        updatedForm[id] = formElements;

        //console.log("Valid in state", formElements.valid);
        
        this.setState({orderForm: updatedForm});
    }

    render(){
        const inputElementsConfig = [];
        for(let key in this.state.orderForm){
            inputElementsConfig.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form = (            
            <form onSubmit={this.orderHandler}>
                {inputElementsConfig.map(inputConfig =>                     
                    <Input  key={inputConfig.id}
                            elementType={inputConfig.config.elementType}
                            elementConfig={inputConfig.config.elementConfig}
                            value={inputConfig.config.value} 
                            invalid={!inputConfig.config.valid}
                            shouldValidate={inputConfig.config.validation}
                            touched={inputConfig.config.touched}
                            changed={(event) => this.inputChangedHandler(event, inputConfig.id)}/>       
                )}
                <Button btnType='Success' >ORDER</Button>            
            </form>
        )

        if(this.state.showLoader){
            form = <Spinner />;
        }
        //console.log("This.state.orderForm", this.state.orderForm);
        
               
        return(
            <div className={classes.ContactData}>
                <h4>Enter Contact Data</h4>
                {form}                
            </div>
        );
    }
};

export default ContactData;