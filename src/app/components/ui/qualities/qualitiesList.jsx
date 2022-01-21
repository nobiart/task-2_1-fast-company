import React from 'react';
import Quality from './quality';
import { useQualities } from '../../../hooks/useQualities';
import PropTypes from 'prop-types';

const QualitiesList = ({ qualities }) => {
    const { isLoading } = useQualities();
    if (isLoading) return 'Loading...';
    return (
        <>
            {qualities.map((quality) => (
                <Quality key={quality} id={quality} />
            ))}
        </>
    );
};

QualitiesList.propTypes = {
    qualities: PropTypes.array
};

export default QualitiesList;
