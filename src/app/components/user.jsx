import React from 'react'
import Quality from './quality';
import Bookmark from './bookmark';

const User = ({_id, name, qualities, profession, completedMeetings, rate, onDelete, onToggleBookmark, status}) => {
    return (
        <tr key={_id}>
            <td>{name}</td>
            <td>{qualities.map((quality) =>
                <Quality
                    key={quality._id}
                    color={quality.color}
                    name={quality.name}
                />
            )}
            </td>
            <td>{profession.name}</td>
            <td>{completedMeetings}</td>
            <td>{rate}/5</td>
            <td>
                <Bookmark
                    id={_id}
                    onToggleBookmark={onToggleBookmark}
                    status={status}
                />
            </td>
            <td>
                <button onClick={() => onDelete(_id)} className="btn btn-danger btn-sm">
                    Delete
                </button>
            </td>
        </tr>
    );
};

export default User;
