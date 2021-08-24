import React, { useState } from 'react';
import API from '../api';

const Users = () => {
    const [users, setUsers] = useState(API.users.fetchAll());
    const handleDelete = (userId) => {
        const newArray = users.filter(user => user._id !== userId);
        setUsers(newArray);
    };

    const renderPhrase = (number) => {
        let phrase = '';
        phrase = (number > 4 || number === 1)
            ? 'человек тусанет'
            : 'человека тусанут';
        return `${number} ${phrase}`;
    };

    const renderQualities = (qualities) => {
        let classes = 'me-1 badge bg-';
        return qualities.map((quality) => {
            return <span key={quality._id} className={classes + quality.color}>{ quality.name }</span>
        });
    };

    const renderUser = (user) => {
        return (
            <tr key={ user._id }>
                <td>{ user.name }</td>
                <td>{ renderQualities(user.qualities) }</td>
                <td>{ user.profession.name }</td>
                <td>{ user.completedMeetings }</td>
                <td>{ user.rate }/5</td>
                <td>
                    <button onClick={() => handleDelete(user._id)} className="btn btn-danger btn-sm">Delete</button>
                </td>
            </tr>
        );
    };

    const renderUsers = (users) => {
        return (
        <>
            <h2 className="m-2">
                <span className="badge bg-primary">
                    { renderPhrase(users.length) } с тобой сегодня
                </span>
            </h2>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">Имя</th>
                    <th scope="col">Качества</th>
                    <th scope="col">Профессия</th>
                    <th scope="col">Встретился, раз</th>
                    <th scope="col">Оценка</th>
                    <th scope="col"> </th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => renderUser(user))}
                </tbody>
            </table>
        </>
        );
    };

    return (
        <>
            { users.length !== 0
                ? renderUsers(users)
                : <h2 className="m-2"><span className="badge bg-danger">Никто с тобой не тусанет</span></h2>
            }
        </>
    );
}

export default Users;
