import React, {Component} from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component{
          constructor(props){
            super(props);

            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null}); // Here we set the error to null to be sure that request doesn't affect our state.error.
                return req;
            })

            this.resInterceptor = axios.interceptors.response.use(res => res,
                error => {
                    this.setState({error: error}); // Here we update our state in case the error will be occured during the response
                })
        }
        state = {
            error: null
        };

        errorConfirmeHandler = () => {
            this.setState({error: null});
        }

        componentWillUnmount(){
            //Here we do clean up work with axios instances, to prevent memory leakage
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }


        render(){
            return (
                <Aux>
                    <Modal 
                        show={this.state.error}
                        modalClosed={this.errorConfirmeHandler}
                    >
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Aux>
            );
        }
    }
};

export default withErrorHandler;