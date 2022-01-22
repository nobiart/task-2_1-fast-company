import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import SelectField from '../../common/form/selectField';
import API from '../../../api';
import TextAreaField from '../../common/form/textAreaField';
import { validator } from '../../../utils/validator';

function AddCommentForm({ onSubmit }) {
    const initialState = {
        userId: '',
        content: ''
    };
    const [data, setData] = useState(initialState);
    const [users, setUsers] = useState();
    const [errors, setErrors] = useState({});
    useEffect(() => {
        API.users.fetchAll().then((data) => setUsers(data));
    }, []);
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validatorConfig = {
        userId: {
            isRequired: {
                message: 'Please select user'
            }
        },
        content: {
            isRequired: {
                message: 'Message field is required'
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
        onSubmit(data);
        setData(initialState);
    };
    return (
        <div className="card mb-2">
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <h2>New comment</h2>
                    <SelectField
                        name="userId"
                        value={data.userId}
                        defaultOption="Select user..."
                        options={users}
                        onChange={handleChange}
                        error={errors.userId}
                    />
                    <TextAreaField
                        label="Message"
                        name="content"
                        id="content"
                        value={data.content}
                        onChange={handleChange}
                        error={errors.content}
                    />
                    <button type="submit" className="btn btn-primary" disabled={!isValid}>
                        Publish
                    </button>
                </form>
            </div>
        </div>
    );
}

AddCommentForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
};

export default AddCommentForm;
