import React from 'react';
import PropTypes from 'prop-types';

const Bookmark = ({ status, onToggleBookmark, id }) => {
    const classes = 'bi bi-bookmark-';
    let statusClass = 'heart';
    if (status) {
        statusClass = 'heart-fill';
    }
    return (
        <button className="btn" onClick={() => onToggleBookmark(id)}>
            <i className={classes + statusClass} />
        </button>
    );
};
Bookmark.propTypes = {
    status: PropTypes.bool,
    onToggleBookmark: PropTypes.func.isRequired,
    id: PropTypes.string
};

export default Bookmark;
