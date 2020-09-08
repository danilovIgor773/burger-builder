import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import {withFormik, Form, Field} from 'formik';
import {connect} from 'react-redux';
import Button from '../../components/UI/Button/Button';
import classes from '../Auth/Auth.css';
import {
    FORM_INPUTS_DATA, 
    EMAIL_NOT_VALID,
    EMAIL_REQUIRED,
    PASSWORD_NOT_VALID,
    PASSWORD_REQUIRED,
    getErrorTextByMessage
} from './constants';
import InputWrapper from './InputWrapper/InputWrapper';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as Yup from 'yup';
import * as actions from '../../store/actions/index';


class Auth extends Component {
    state = {
        isSignUp: false
    };

    componentDidMount(){
        if(!this.props.buildingBurger && this.props.authRedirect){
            this.props.onSetAuthRedirectPath();
        }
    }

    switchAuthMode = () => {
        this.setState(prevState => {
            return {
                isSignUp: !prevState.isSignUp
            }
        })
    }

    render(){
        const {errors, touched, loading, error} = this.props;
        let {isSignUp} = this.state;
        this.props.values.signUpFlag = isSignUp;
        let errorMessage = null;
        let authRedirect = null;

        if(error){
            errorMessage = <p className={classes.ValidationError}>{getErrorTextByMessage(error)}</p>
        }
        
        const inputClasses = [classes.InputElement];
        let form = FORM_INPUTS_DATA.map(inputData => {

            touched[inputData.type] &&
            errors[inputData.type] &&
            inputClasses.push(classes.Invalid);

            return (
                <InputWrapper 
                    error={errors[inputData.type]}
                    touched={touched[inputData.type]} 
                    key={inputData.id} 
                    label={inputData.label}
                >
                    <Field 
                        className={inputClasses.join(' ')}
                        type={inputData.type}
                        placeholder={inputData.placeholder}
                        name={inputData.name}
                    />
                </InputWrapper>
            )
        });
        if(loading) {
            form = <Spinner />
        }
        if(this.props.isAuthenticated){
            authRedirect = <Redirect to={this.props.authRedirect} />
        }
        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <Form >
                    {form}
                    <Button type="submit" btnType="Success">SUBMIT</Button>
                </Form>
                <Button 
                    btnType="Danger"
                    clicked={this.switchAuthMode}    
                >
                        SWITCH TO {this.state.isSignUp ? "SIGNIN" : "SIGNUP"}
                    </Button>                
            </div>
        )
    }
}

const FormikAuth = withFormik({
    mapPropsToValues({email, password}){
        return {
            email: email || '',
            password: password || '',
            signUpFlag: false
        }
    }, 
    validationSchema: Yup.object().shape({
        email: Yup.string().email(EMAIL_NOT_VALID).required(EMAIL_REQUIRED),
        password: Yup.string().min(6, PASSWORD_NOT_VALID).required(PASSWORD_REQUIRED)
    }),
    handleSubmit(values, { props, setSubmitting}) {
        const {email, password, signUpFlag } = values;
        props.onAuth(email, password, signUpFlag);
        setSubmitting(false);
    }
})(Auth);

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirect: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, signUpFlag) => dispatch(actions.auth(email, password, signUpFlag)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormikAuth);