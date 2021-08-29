import React from 'react';

const Quality = ({_id, color, name}) => {
    let classes = 'me-1 badge bg-';
    return <span key={_id} className={classes + color}>{name}</span>
}

export default Quality;
