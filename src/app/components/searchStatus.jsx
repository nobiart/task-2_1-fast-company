import React from 'react';
import PropTypes from 'prop-types';

const SearchStatus = ({ length }) => {
    const phrase =
        length > 4 || length === 1 ? ' человек тусанет' : ' человека тусанут';
    return (
        <>
            {length !== 0
                ? (
                    <h2 className="m-2">
                        <span className="badge bg-primary">
                            {length + phrase} с тобой сегодня
                        </span>
                    </h2>
                )
                : (
                    <h2 className="m-2">
                        <span className="badge bg-danger">
                            Никто не тусанет с тобой сегодня
                        </span>
                    </h2>
                )}
        </>
    );
};
SearchStatus.propTypes = {
    length: PropTypes.number.isRequired
};

export default SearchStatus;
