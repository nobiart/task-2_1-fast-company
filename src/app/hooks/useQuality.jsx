import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import qualityService from '../services/qualityService';

const QualityContext = React.createContext();

export const useQualities = () => {
    return useContext(QualityContext);
};

export const QualityProvider = ({ children }) => {
    const [isLoading, setLoading] = useState(true);
    const [allQualities, setAllQualities] = useState([]);
    const [error, setError] = useState(null);

    async function getQualitiesList() {
        try {
            const { content } = await qualityService.get();
            setAllQualities(content);
            setLoading(false);
        } catch (error) {
            errorCatcher(error);
        }
    }
    function getUserQuality(id) {
        return allQualities.find((q) => q._id === id);
    }
    useEffect(() => {
        getQualitiesList();
        console.log('qualities hook', allQualities);
    }, []);
    useEffect(() => {
        if (error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);
    function errorCatcher(error) {
        console.log('qualities error', error);
        const { message } = error.response.data;
        setError(message);
        setLoading(false);
    }
    return (
        <QualityContext.Provider value={{ isLoading, allQualities, getUserQuality }}>
            { children }
        </QualityContext.Provider>
    );
};

QualityProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node]
    )
};
