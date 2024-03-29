import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Pagination from '../../common/pagination';
import { paginate } from '../../../utils/paginate';
import GroupList from '../../common/groupList';
import SearchStatus from '../../ui/searchStatus';
import UsersTable from '../../ui/usersTable';
import _ from 'lodash';
// import { useParams } from 'react-router-dom';
import { useUser } from '../../../hooks/useUsers';
import { useProfessions } from '../../../hooks/useProfession';

const UsersListPage = () => {
    // const params = useParams();
    const { isLoading: professionsLoading, professions } = useProfessions();
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' });
    const [searchValue, setSearchValue] = useState('');
    const { users } = useUser();
    // console.log(users);
    const handleDelete = (userId) => {
        // setUsers(users.filter((user) => user._id !== userId));
        console.log(userId);
    };
    const handleToggleBookmark = (id) => {
        const newArray = users.map((user) => {
            if (user._id === id) {
                return { ...user, status: !user.status };
            }
            return user;
        });
        // setUsers(newArray);
        console.log(newArray);
    };
    const pageSize = 8;
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf, searchValue]);
    const handleProfessionSelect = (item) => {
        if (searchValue !== '') setSearchValue('');
        setSelectedProf(item);
    };
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const handleSort = (item) => {
        setSortBy(item);
    };
    const handleSearch = ({ target }) => {
        setSelectedProf(undefined);
        setSearchValue(target.value);
    };
    // const { userId } = params;
    if (users) {
        const filteredUsers = searchValue
            ? users.filter((user) => user.name.toLowerCase().includes(searchValue.toLowerCase()))
            : selectedProf
            ? users.filter(
                  (user) => JSON.stringify(user.profession) === JSON.stringify(selectedProf)
              )
            : users;
        const count = filteredUsers.length;
        const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
        const usersCrop = paginate(sortedUsers, currentPage, pageSize);
        const clearFilter = () => {
            setSelectedProf();
        };
        return (
            <div className="d-flex">
                {professions && !professionsLoading && (
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <GroupList
                            selectedItem={selectedProf}
                            items={professions}
                            onItemSelect={handleProfessionSelect}
                        />
                        <button className="btn btn-secondary m-2" onClick={clearFilter}>
                            Очистить
                        </button>
                    </div>
                )}
                <div className="d-flex flex-column">
                    <SearchStatus length={count} />
                    <input
                        type="text"
                        name="search"
                        id="search"
                        placeholder="Search..."
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
        );
    }
    return <h4 className="m-3">Loading...</h4>;
};
UsersListPage.propTypes = {
    users: PropTypes.array
};

export default UsersListPage;
