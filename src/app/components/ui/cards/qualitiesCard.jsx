import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Qualities from '../qualities';
import API from '../../../api';

function QualitiesCard({ userId }) {
    const [user, setUser] = useState();
    useEffect(() => {
        API.users.getById(userId).then((data) => setUser(data));
    }, []);
    if (user) {
        return (
            <div className="card mb-3">
                <div
                    className="
                    card-body
                    d-flex
                    flex-column
                    justify-content-center
                    text-center
                "
                >
                    <h5 className="card-title">
                        <span>Qualities</span>
                    </h5>
                    <p className="card-text">
                        <Qualities qualities={user.qualities}/>
                    </p>
                </div>
            </div>
        );
    } else {
        return <p className="m-3">Loading</p>;
    }
}

QualitiesCard.propTypes = {
    userId: PropTypes.string.isRequired
};

export default QualitiesCard;
