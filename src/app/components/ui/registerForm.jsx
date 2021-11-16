import React, { useEffect, useState } from 'react';
import API from '../../api';
import { validator } from '../../utils/validator';
import TextField from '../common/form/textField';
import SelectField from '../common/form/selectField';

function RegisterForm() {
    const [data, setData] = useState({ email: '', password: '', profession: '' });
    const [professions, setProfession] = useState();
    const [errors, setErrors] = useState({});
    useEffect(() => {
        API.professions.fetchAll().then((data) => setProfession(data));
    }, []);
    // useEffect(() => {
    //     console.log(professions);
    // }, [professions]);
    const handleChange = ({ target }) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validatorConfig = {
        email: {
            isRequired: {
                message: 'Email is required'
            },
            isEmail: {
                message: 'This field requires an email value'
            }
        },
        password: {
            isRequired: {
                message: 'Password is required'
            },
            isCapitalSymbol: {
                message: 'Missing capital symbol'
            },
            isContainDigit: {
                message: 'Missing required digit'
            },
            min: {
                message: 'Minimum 8 chars required',
                value: 8
            }
        },
        profession: {
            isRequired: {
                message: 'Profession is required'
            }
        }
    };
    useEffect(() => {
        validate();
    }, [data]);
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
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
            <SelectField
                label="Выберите профессию"
                name="profession"
                value={data.profession}
                defaultOption="Choose..."
                options={professions}
                onChange={handleChange}
                error={errors.profession}
            />
            <button
                type="submit"
                disabled={!isValid}
                className="btn btn-primary w-100 mx-auto"
            >
                Submit
            </button>
        </form>
    );
}

export default RegisterForm;
