import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import QualitiesList from './qualitiesList';

const User = ({ _id, users }) => {
    const history = useHistory();
    const handleSave = () => {
        history.push('/users');
    };
    const getUserById = (id) => {
        return users.find((user) => user._id === id);
    };
    const user = getUserById(_id);
    return (
        <>
            {user
                ? (
                    <div className="m-3">
                        <h2>{user.name}</h2>
                        <h3>Профессия: {user.profession.name}</h3>
                        <div className="mb-2">
                            <QualitiesList qualities={user.qualities} />
                        </div>
                        <h4>Завершено встреч: {user.completedMeetings}</h4>
                        <h5>Оценка: {user.rate}/5</h5>
                        <button
                            onClick={() => {
                                handleSave();
                            }}
                        >
                            Все пользователи
                        </button>
                    </div>
                )
                : (
                    <h3 className="m-3">Loading...</h3>
                )}
        </>
    );
};
User.propTypes = {
    _id: PropTypes.string,
    users: PropTypes.array
};

export default User;
