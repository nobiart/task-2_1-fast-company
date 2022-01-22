import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import API from '../../../api';
import formatDate from '../../../utils/formatDate';

function Comment({ id, userId, content, createdAt, onRemove }) {
    const [user, setUser] = useState();
    useEffect(() => {
        API.users.getById(userId).then((data) => setUser(data));
    }, []);
    const handleRemove = (id) => {
        onRemove(id);
    };
    if (user) {
        return (
            <div className="bg-light card-body mb-3">
                <div className="row">
                    <div className="col">
                        <div className="d-flex flex-start">
                            <img
                                src={`https://avatars.dicebear.com/api/avataaars/${(
                                    Math.random() + 1
                                )
                                    .toString(36)
                                    .substring(7)}.svg`}
                                className="
                                rounded-circle
                                shadow-1-strong
                                me-3
                            "
                                alt="avatar"
                                width="65"
                                height="65"
                            />
                            <div className="flex-grow-1 flex-shrink-1">
                                <div className="mb-4">
                                    <div
                                        className="
                                        d-flex
                                        justify-content-between
                                        align-items-center
                                    "
                                    >
                                        <p className="mb-1">
                                            {user.name}
                                            <span className="small ms-2">
                                                {formatDate(createdAt)}
                                            </span>
                                        </p>
                                        <button
                                            className="
                                            btn btn-sm
                                            text-primary
                                            d-flex
                                            align-items-center
                                        "
                                            onClick={() => handleRemove(id)}
                                        >
                                            <i className="bi bi-x-lg" />
                                        </button>
                                    </div>
                                    <p className="small mb-0">{content}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return <p className="m-3">Loading</p>;
    }
}

Comment.propTypes = {
    id: PropTypes.string,
    userId: PropTypes.string,
    content: PropTypes.string,
    createdAt: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onRemove: PropTypes.func
};

export default Comment;
