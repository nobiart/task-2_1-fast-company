import React, { useState, useEffect } from 'react';
import Users from './components/users';
import API from './api';

const App = () => {
    const [users, setUsers] = useState();
    useEffect(() => {
        API.users.fetchAll().then((data) => setUsers(data));
    }, []);
    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };
    const handleToggleBookmark = (id) => {
        setUsers(
            users.map((user) => {
                if (user._id === id) {
                    return { ...user, status: !user.status };
                }
                return user;
            })
        );
    };
    return (
        <>
            { users && (
                <Users
                    onDelete={handleDelete}
                    onToggleBookmark={handleToggleBookmark}
                    users={users}
                />
            )}
        </>
    );
};

export default App;
