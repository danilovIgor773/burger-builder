import React, {Component} from 'react';
import classes from './ContactData.css';
import Button from '../../components/UI/Button/Button';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/UI/Input/Input';

class ContactData extends Component{
    state = {
        name: '',
        email: '',
        address:{
            street: '',
            postalCode: ''
        },
       showLoader: false,
    }

    orderHandler = (event) => {
        event.preventDefault();
        console.log("Passed ingredinets in contact-data", this.props.ingredients);
        console.log("Total price is", this.props.price);
        
        
        this.setState({showLoader: true})

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer:{
                name: "Igor Danilov",
                address: {
                    street: 'test street #1',
                    zipCode: '123545',
                    country: 'Uzbekistan'
                },
                email: 'danilovigor773@gmail.com'
            },
            deliveryMethod: 'fastest' 
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

    render(){
        let form = (
            <form>
                <Input inputtype='input' type='text' name='name' placeholder='Enter your Name' />
                <Input inputtype='input' type='email' name='email' placeholder='Enter your Mail'/>
                <Input inputtype='input' type='text' name='street' placeholder='Enter your Street'/>
                <Input inputtype='input' type='text' name='postal' placeholder='Enter your Postal Code'/>
            </form>
        );

        if(this.state.showLoader){
            form = <Spinner />;
        }

        return(
            <div className={classes.ContactData}>
                <h4>Enter Contact Data</h4>
                {form}    
                <Button btnType='Success' clicked={this.orderHandler}>ORDER</Button>
            </div>
        );
    }
};

export default ContactData;