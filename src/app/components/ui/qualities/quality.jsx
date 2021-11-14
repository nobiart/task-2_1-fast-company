import React from 'react';
import PropTypes from 'prop-types';

const Quality = ({ _id, color, name }) => {
    const classes = 'me-1 badge bg-';
    return (
        <span key={_id} className={classes + color}>
            {name}
        </span>
    );
};
Quality.propTypes = {
    _id: PropTypes.string,
    color: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
};

export default Quality;
