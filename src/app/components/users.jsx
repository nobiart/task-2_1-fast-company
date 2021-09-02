import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Pagination from './pagination';
import { paginate } from '../utils/paginate';
import User from './user';

const Users = ({ users: allUsers, onToggleBookmark, ...rest }) => {
    const count = allUsers.length;
    const pageSize = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const users = paginate(allUsers, currentPage, pageSize);
    return (
        <>
            {count === 0
                ? ''
                : (
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Имя</th>
                                <th scope="col">Качества</th>
                                <th scope="col">Профессия</th>
                                <th scope="col">Встретился, раз</th>
                                <th scope="col">Оценка</th>
                                <th scope="col">Избранное</th>
                                <th scope="col"> </th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <User
                                    key={user._id}
                                    onToggleBookmark={onToggleBookmark}
                                    {...user}
                                    {...rest}
                                />
                            ))}
                        </tbody>
                    </table>
                )}
            <Pagination
                itemsCount={count}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </>
    );
};
Users.propTypes = {
    users: PropTypes.array.isRequired,
    onToggleBookmark: PropTypes.func.isRequired,
    count: PropTypes.number
};

export default Users;
