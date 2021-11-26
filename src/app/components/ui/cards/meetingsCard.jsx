import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import API from '../../../api';

function MeetingsCard({ userId }) {
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
                        <span>Completed meetings</span>
                    </h5>

                    <h1 className="display-1">
                        {user.completedMeetings}
                    </h1>
                </div>
            </div>
        );
    } else {
        return <p className="m-3">Loading</p>;
    }
}

MeetingsCard.propTypes = {
    userId: PropTypes.string.isRequired
};

export default MeetingsCard;
