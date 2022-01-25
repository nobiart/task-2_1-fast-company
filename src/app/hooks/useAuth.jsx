import React, { useContext } from 'react';
import PropTypes from 'prop-types';

const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
    return <AuthProvider.Provider>{children}</AuthProvider.Provider>;
};

AuthProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export default AuthProvider;
