import React from 'react';

const SearchStatus = ({length}) => {
    let phrase = '';
    phrase = (length > 4 || length === 1)
        ? ' человек тусанет'
        : ' человека тусанут';
    return (
        <>
            {length !== 0
                ? <h2 className="m-2">
                    <span className="badge bg-primary">
                        {length + phrase} с тобой сегодня
                    </span>
                </h2>
                : <h2 className="m-2">
                    <span className="badge bg-danger">Никто не тусанет с тобой сегодня</span>
                </h2>
            }
        </>
    );
};

export default SearchStatus;
