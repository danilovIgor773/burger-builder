import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

class Orders extends Component{
    state={
        orders:[],
        loading: true
    }

    componentDidMount(){
        
        axios.get('/orders.json')
            .then(response => {
                const fetchedOrders = [];
                for(let key in response.data){
                    fetchedOrders.push({
                        ...response.data[key],
                        id:key
                    })
                }
                //console.log("fetched orders are", fetchedOrders);
                
                this.setState({loading: false, orders:fetchedOrders})
            })
            .catch(err => {
                this.setState({loading: false})
            })
    }

    render(){
        return(
            <div>
                {this.state.orders.map(order => (
                    <Order 
                        ingredients={order.ingredients}
                        price={+order.price}
                        key={order.id}/>
                ))}
            </div>            
        );
    }
}

export default withErrorHandler(Orders, axios);