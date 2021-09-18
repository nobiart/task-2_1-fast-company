import React from 'react';
// import User from './user';
import PropTypes from 'prop-types';
import TableHeader from './tableHeader';
import TableBody from './tableBody';
import Bookmark from './bookmark';

const UsersTable = ({
    users,
    onSort,
    selectedSort,
    onToggleBookmark,
    onDelete,
    ...rest
}) => {
    const columns = {
        name: { path: 'name', name: 'Имя' },
        qualities: { name: 'Качества' },
        professions: { path: 'profession.name', name: 'Профессия' },
        completedMeetings: {
            path: 'completedMeetings',
            name: 'Встретился, раз'
        },
        rate: { path: 'rate', name: 'Оценка' },
        status: {
            path: 'status',
            name: 'Избранное',
            component: (user) => (
                <Bookmark
                    status={user.status}
                    onClick={() => onToggleBookmark(user._id)}
                />
            )
        },
        delete: {
            component: (user) => (
                <button
                    onClick={() => onDelete(user._id)}
                    className="btn btn-danger btn-sm"
                >
                    Delete
                </button>
            )
        }
    };
    return (
        <table className="table">
            <TableHeader {...{ onSort, selectedSort, columns }} />
            <TableBody {...{ columns, data: users }} />
        </table>
    );
};

UsersTable.propTypes = {
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    onToggleBookmark: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default UsersTable;
