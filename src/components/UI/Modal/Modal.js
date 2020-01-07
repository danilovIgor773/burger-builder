import React, { Component } from 'react';
import classes from '../Modal/Modal.css';
import Aux from '../../../hoc/Aux/Aux'
import Backdrop from '../Backdrop/Backdrop';


class Modal extends Component{
    
    //First steps to perfomace optimization...
    //Modal cmp wraps the OrderSummary cmp in the BurgerBuilder container cmp. So we added shouldComponentUpdate to control Modal rendering...
    //The Modal triggers by the click on ORDER NOW btn, so when using the build ctrls, there is no need to unnecessary render the Modal 

    shouldComponentUpdate(nextProps, nextState){
        return nextProps.show !== this.props.show;
    }
    
    componentDidUpdate(){
        console.log('[Modal] componentDidUpdate...');
        
    }

    render(){        
        return (
        <Aux>
            <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
            <div
                style={{
                    transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: this.props.show ? '1' : '0'
                }} 
                className={classes.Modal}>
                {this.props.children}
            </div>
        </Aux>
    );
}
}

export default React.memo(Modal);