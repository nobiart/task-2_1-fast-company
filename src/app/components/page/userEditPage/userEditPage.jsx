import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import API from '../../../api';
import TextField from '../../common/form/textField';
import SelectField from '../../common/form/selectField';
import RadioField from '../../common/form/radioField';
import MultiSelectField from '../../common/form/multiSelectField';
import { validator } from '../../../utils/validator';
import { useHistory } from 'react-router-dom';

const UserEditPage = ({ userId }) => {
    const history = useHistory();
    const [user, setUser] = useState();
    const [qualities, setQualities] = useState({});
    const [professions, setProfession] = useState([]);
    const [errors, setErrors] = useState({});
    useEffect(() => {
        API.users.getById(userId).then((data) => setUser(data));
        API.professions.fetchAll().then((data) => setProfession(data));
        API.qualities.fetchAll().then((data) => setQualities(data));
    }, []);
    const handleChange = (target) => {
        if (target) {
            let { name, value } = target;
            if (name === 'profession') {
                Object.keys(professions).forEach((profession) => {
                    if (professions[profession]._id === value) {
                        value = professions[profession];
                    }
                });
            }
            if (name === 'qualities') {
                const newQualities = [];
                Object.keys(qualities).forEach((quality) => {
                    value.forEach((val) => {
                        if (qualities[quality]._id === val.value) {
                            newQualities.push(qualities[quality]);
                        }
                    });
                });
                value = newQualities;
            }
            setUser((prevState) => ({
                ...prevState,
                [name]: value
            }));
        }
    };
    const validate = () => {
        const errors = validator(user, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const validatorConfig = {
        name: {
            isRequired: {
                message: 'Name is required'
            }
        },
        email: {
            isRequired: {
                message: 'Email is required'
            },
            isEmail: {
                message: 'This field requires an email value'
            }
        }
    };
    const isValid = Object.keys(errors).length === 0;
    useEffect(() => {
        validate();
    }, [user]);
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        console.log('user', user);
        API.users
            .update(userId, user)
            .then((data) => setUser(data))
            .then(() => history.push(`/users/${userId}`));
    };
    const handleBack = () => {
        history.push(`/users/${userId}`);
    };
    return (
        <div className="container mt-3">
            <button className="btn btn-primary my-4" onClick={handleBack}>
                <i className="bi bi-caret-left" />
                Back
            </button>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="shadow p-4">
                        <h2 className="mb-3">Edit User</h2>
                        {user ? (
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    label="Name"
                                    id="name"
                                    name="name"
                                    value={user.name}
                                    onChange={handleChange}
                                    error={errors.name}
                                />
                                <TextField
                                    label="Email"
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={user.email}
                                    onChange={handleChange}
                                    error={errors.email}
                                />
                                <SelectField
                                    label="Select profession"
                                    name="profession"
                                    value={user.profession._id}
                                    defaultOption="Choose..."
                                    options={professions}
                                    onChange={handleChange}
                                />
                                <RadioField
                                    label="Change gender"
                                    options={[
                                        { name: 'Male', value: 'male' },
                                        { name: 'Female', value: 'female' },
                                        { name: 'Other', value: 'other' }
                                    ]}
                                    value={user.sex}
                                    name="sex"
                                    onChange={handleChange}
                                />
                                {user.qualities && (
                                    <MultiSelectField
                                        defaultValue={user.qualities.map(
                                            (quality) => ({
                                                label: quality.name,
                                                value: quality._id
                                            })
                                        )}
                                        label="Change qualities"
                                        options={qualities}
                                        name="qualities"
                                        onChange={handleChange}
                                    />
                                )}
                                <button
                                    type="submit"
                                    className="btn btn-success w-100"
                                    disabled={!isValid}
                                >
                                    Update
                                </button>
                            </form>
                        ) : (
                            <h4 className="mt-3">Loading</h4>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

UserEditPage.propTypes = {
    userId: PropTypes.string
};

export default UserEditPage;
