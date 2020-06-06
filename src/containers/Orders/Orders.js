import React, {Component} from 'react';
import { connect } from 'react-redux';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as actionCreators from '../../store/actions/index';

class Orders extends Component{
    state={
        orders:[],
        loading: true
    }

    componentDidMount(){
       this.props.onFetchOrders();
    }

    render(){
        const { orders } = this.props;
        let ordersToRender = null;
        if(orders){
            ordersToRender = orders.map(order => (
                <Order 
                    ingredients={order.ingredients}
                    price={+order.price}
                    key={order.id}/>
            )); 
        }
        return(
            <div>
                {ordersToRender}
            </div>            
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.orders.orders
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(actionCreators.fetchOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));