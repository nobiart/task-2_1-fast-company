import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Pagination from './pagination';
import { paginate } from '../utils/paginate';
import API from '../api';
import GroupList from './groupList';
import SearchStatus from './searchStatus';
import UsersTable from './usersTable';
import _ from 'lodash';
import { useParams } from 'react-router-dom';
import UserPage from './userPage';
import TextField from './textField';

const UsersList = () => {
    const params = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfession] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' });
    const [users, setUsers] = useState();
    let [searchValue, setSearchValue] = useState('');
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
    const pageSize = 8;
    useEffect(() => {
        API.professions.fetchAll().then((data) => setProfession(data));
    }, []);
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);
    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
        searchValue = '';
        setSearchValue('');
    };
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const handleSort = (item) => {
        setSortBy(item);
    };
    const handleSearch = ({ target }) => {
        setSelectedProf();
        setSearchValue(target.value);
    };
    const { userId } = params;
    if (users) {
        const filteredUsers = selectedProf
            ? users.filter(
                (user) =>
                    JSON.stringify(user.profession) ===
                    JSON.stringify(selectedProf)
            )
            : users.filter((user) => user.name.toLowerCase().includes(searchValue));
        const count = filteredUsers.length;
        const sortedUsers = _.orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        );
        const usersCrop = paginate(sortedUsers, currentPage, pageSize);
        const clearFilter = () => {
            setSelectedProf();
        };
        return (
            <>
                {userId
                    ? (
                        <UserPage users={users} _id={userId} />)
                    : (
                        <div className="d-flex">
                            {professions && (
                                <div className="d-flex flex-column flex-shrink-0 p-3">
                                    <GroupList
                                        selectedItem={selectedProf}
                                        items={professions}
                                        onItemSelect={handleProfessionSelect}
                                    />
                                    <button
                                        className="btn btn-secondary m-2"
                                        onClick={clearFilter}
                                    >
                                        Очистить
                                    </button>
                                </div>
                            )}
                            <div className="d-flex flex-column">
                                <SearchStatus length={count} />
                                <TextField
                                    id="search"
                                    name="search"
                                    value={searchValue}
                                    onChange={handleSearch}
                                />
                                {count > 0 && (
                                    <UsersTable
                                        users={usersCrop}
                                        onSort={handleSort}
                                        selectedSort={sortBy}
                                        onDelete={handleDelete}
                                        onToggleBookmark={handleToggleBookmark}
                                    />
                                )}
                                <div className="d-flex justify-content-center">
                                    <Pagination
                                        itemsCount={count}
                                        pageSize={pageSize}
                                        currentPage={currentPage}
                                        onPageChange={handlePageChange}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
            </>
        );
    }
    return <h4 className="m-3">Loading...</h4>;
};
UsersList.propTypes = {
    users: PropTypes.array
};

export default UsersList;
