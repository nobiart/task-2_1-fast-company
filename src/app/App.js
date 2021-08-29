import React, {useState} from 'react';
import Users from './components/users';
import API from '../api';
import SearchStatus from './components/searchStatus';

const App = () => {
    const [users, setUsers] = useState(API.users.fetchAll());
    const handleDelete = (userId) => {
        const newArray = users.filter(user => user._id !== userId);
        setUsers(newArray);
    };
    const handleToggleBookmark = (id) => {
        const updatedUsers = users.filter((user) => {
            if (user._id === id) {
                user.status = !user.status;
                return user;
            }
            return user;
        });
        setUsers(updatedUsers);
    };
    return (
        <>
            <SearchStatus
                length={users.length}
            />
            <Users
                onDelete={handleDelete}
                onToggleBookmark={handleToggleBookmark}
                users={users}
            />
        </>
    )
}

export default App;
