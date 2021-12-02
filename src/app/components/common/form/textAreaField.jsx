import React from 'react';
import PropTypes from 'prop-types';

const TextAreaField = ({ label, name, value, onChange, error }) => {
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };
    const getInputClasses = () => {
        return 'form-control' + (error ? ' is-invalid' : '');
    };
    return (
        <div className="mb-4">
            {label && (
                <label htmlFor={name} className="form-label">
                    {label}
                </label>
            )}
            <textarea
                className={getInputClasses()}
                id={name}
                name={name}
                rows="3"
                value={value}
                onChange={handleChange}
            />
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

TextAreaField.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    error: PropTypes.string,
    onChange: PropTypes.func
};

export default TextAreaField;
