import React, { useEffect, useState } from 'react';
// import { validator } from '../../utils/validator';
import TextField from '../common/form/textField';
import CheckBoxField from '../common/form/checkBoxField';
import * as yup from 'yup';

const LoginForm = () => {
    const [data, setData] = useState({
        email: '',
        password: '',
        stayOn: false
    });
    const [errors, setErrors] = useState({});
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validateScheme = yup.object().shape({
        password: yup
            .string()
            .required('Password is required')
            .matches(/(?=.*[A-Z])/, 'Missing capital symbol')
            .matches(/(?=.*[0-9])/, 'Missing required digit')
            .matches(
                /(?=.*[!@#$%^&*])/,
                'Missing required special character !@#$%^&*'
            )
            .matches(/(?=.{8,})/, 'Minimum 8 chars required'),
        email: yup
            .string()
            .required('Email is required')
            .email('This field requires an email value')
    });
    // const validatorConfig = {
    //     email: {
    //         isRequired: {
    //             message: 'Email is required'
    //         },
    //         isEmail: {
    //             message: 'This field requires an email value'
    //         }
    //     },
    //     password: {
    //         isRequired: {
    //             message: 'Password is required'
    //         },
    //         isCapitalSymbol: {
    //             message: 'Missing capital symbol'
    //         },
    //         isContainDigit: {
    //             message: 'Missing required digit'
    //         },
    //         min: {
    //             message: 'Minimum 8 chars required',
    //             value: 8
    //         }
    //     }
    // };
    useEffect(() => {
        validate();
    }, [data]);
    const validate = () => {
        // const errors = validator(data, validatorConfig);
        validateScheme
            .validate(data)
            .then(() => setErrors({}))
            .catch((err) => setErrors({ [err.path]: err.message }));
        // setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        console.log(data);
    };
    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Email"
                id="email"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />
            <TextField
                label="Password"
                type="password"
                id="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
            />
            <CheckBoxField
                value={data.stayOn}
                onChange={handleChange}
                name="stayOn"
            >
                Оставаться в системе
            </CheckBoxField>
            <button
                type="submit"
                disabled={!isValid}
                className="btn btn-primary w-100 mx-auto"
            >
                Submit
            </button>
        </form>
    );
};

export default LoginForm;
