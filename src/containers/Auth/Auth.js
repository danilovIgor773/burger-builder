import React, {Component} from 'react';
import {withFormik, Form, Field} from 'formik';
import {connect} from 'react-redux';
import Button from '../../components/UI/Button/Button';
import classes from '../Auth/Auth.css';
import {
    FORM_INPUTS_DATA, 
    EMAIL_NOT_VALID,
    EMAIL_REQUIRED,
    PASSWORD_NOT_VALID,
    PASSWORD_REQUIRED
} from './constants';
import InputWrapper from './InputWrapper/InputWrapper';
import * as Yup from 'yup';
import * as actions from '../../store/actions/index';


class Auth extends Component {

    render(){
        const {errors, touched} = this.props;
        const inputClasses = [classes.InputElement];
        const form = FORM_INPUTS_DATA.map(inputData => {

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
        })
        return (
            <div className={classes.Auth}>
                <Form >
                    {form}
                    <Button type="submit" btnType="Success">SUBMIT</Button>
                </Form>
            </div>
        )
    }
}

const FormikAuth = withFormik({
    mapPropsToValues({email, password}){
        return {
            email: email || '',
            password: password || '',
        }
    }, 
    validationSchema: Yup.object().shape({
        email: Yup.string().email(EMAIL_NOT_VALID).required(EMAIL_REQUIRED),
        password: Yup.string().min(6, PASSWORD_NOT_VALID).required(PASSWORD_REQUIRED)
    }),
    handleSubmit(values, { props, setSubmitting }) {
        console.log("[Submit]", values);
        const {email, password } = values;
        props.onAuth(email, password);
        setSubmitting(false);
    }
})(Auth);

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password) => dispatch(actions.auth(email, password))
    }
}

export default connect(null, mapDispatchToProps)(FormikAuth);