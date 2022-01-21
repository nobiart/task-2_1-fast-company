import React from 'react';
import PropTypes from 'prop-types';
import { useQualities } from '../../../hooks/useQualities';

const Quality = ({ id }) => {
    const { getQuality } = useQualities();
    const { _id, color, name } = getQuality(id);
    return (
        <span key={_id} className={'me-1 badge bg-' + color}>
            {name}
        </span>
    );
};
Quality.propTypes = {
    id: PropTypes.string.isRequired
};

export default Quality;
