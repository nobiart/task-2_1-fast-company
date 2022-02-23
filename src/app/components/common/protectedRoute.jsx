import React from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../../hooks/useAuth';
import { Redirect, Route } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, children, ...rest }) => {
    const { currentUser } = useAuth();
    return (
        <Route
            {...rest}
            render={(props) => {
                if (!currentUser) {
                    return <Redirect to="/login" />;
                }
                return Component ? <Component {...props} /> : children;
            }}
        />
    );
};

ProtectedRoute.propTypes = {
    component: PropTypes.func,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export default ProtectedRoute;
