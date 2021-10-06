import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import API from '../api';
import QualitiesList from './qualitiesList';

const UserPage = ({ userId }) => {
    const history = useHistory();
    const [user, setUser] = useState();
    useEffect(() => {
        API.users.getById(userId).then((data) => setUser(data));
    });
    const handleClick = () => {
        history.push('/users');
    };
    if (user) {
        return (
            <div className="ms-3">
                <h2 className="mt-3">{user.name}</h2>
                <h3>Профессия: {user.profession.name}</h3>
                <div className="mb-3">
                    <QualitiesList qualities={user.qualities} />
                </div>
                <p>Завершенных встреч: {user.completedMeetings}</p>
                <h2>Оценка: {user.rate}</h2>
                <button onClick={handleClick}>Все пользователи</button>
            </div>
        );
    } else {
        return <h2 className="m-3">Loading</h2>;
    }
};
UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPage;
