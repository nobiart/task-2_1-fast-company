import React from 'react';

const Bookmark = ({status, onToggleBookmark, id}) => {
    const classes = 'bi bi-bookmark-';
    let statusClass = 'heart';
    if (status) {
        statusClass = 'heart-fill';
    }
    return (
        <button className="btn" onClick={() => onToggleBookmark(id)}>
            <i className={classes + statusClass}/>
        </button>
    );
};

export default Bookmark;
