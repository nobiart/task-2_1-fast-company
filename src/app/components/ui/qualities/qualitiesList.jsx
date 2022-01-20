import React from 'react';
import Quality from './quality';
import { useQualities } from '../../../hooks/useQuality';
import PropTypes from 'prop-types';

const QualitiesList = ({ qualities }) => {
    const { allQualities, isLoading } = useQualities();
    const userQualities = allQualities.filter((q) => qualities.includes(q._id));
    if (!isLoading) {
        return (
            <>
                {userQualities.map((quality) => (
                    <Quality key={quality._id} {...quality} />
                ))}
            </>
        );
    } else {
        return 'Loading...';
    }
};

QualitiesList.propTypes = {
    qualities: PropTypes.array
};

export default QualitiesList;
