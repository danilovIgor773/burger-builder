import React, {Component} from 'react';
import classes from './ContactData.css';
import Button from '../../components/UI/Button/Button';

class ContactData extends Component{
    statet = {
        name: '',
        email: '',
        address:{
            street: '',
            postalCode: ''
        }
    }

    render(){
        return(
            <div className={classes.ContactData}>
                <h4>Enter Contact Data</h4>
                <form>
                    <input className={classes.Input} type='text' name='name' placeholder='Enter your Name' />
                    <input className={classes.Input} type='email' name='email' placeholder='Enter your Mail'/>
                    <input className={classes.Input} type='text' name='street' placeholder='Enter your Street'/>
                    <input className={classes.Input} type='text' name='postal' placeholder='Enter your Postal Code'/>
                </form>
                <Button btnType='Success'>ORDER</Button>
            </div>
        );
    }
};

export default ContactData;