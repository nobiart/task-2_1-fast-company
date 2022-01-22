import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import API from '../../../api';
import UserInfoCard from '../../ui/cards/userInfoCard';
import QualitiesCard from '../../ui/cards/qualitiesCard';
import MeetingsCard from '../../ui/cards/meetingsCard';
import Comments from '../../ui/comments/comments';

const UserPage = ({ userId }) => {
    const [user, setUser] = useState();
    useEffect(() => {
        API.users.getById(userId).then((data) => setUser(data));
    }, []);
    if (user) {
        return (
            <div className="row gutters-sm">
                <div className="col-md-4 mb-3">
                    <UserInfoCard userId={userId} />
                    <QualitiesCard userId={userId} />
                    <MeetingsCard userId={userId} />
                </div>
                <div className="col-md-8">
                    <Comments userId={userId} />
                </div>
            </div>
        );
    } else {
        return <h2 className="m-3">Loading</h2>;
    }
};
UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPage;
