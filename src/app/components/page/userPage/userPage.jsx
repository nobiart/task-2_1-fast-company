import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import API from '../../../api';
import SelectField from '../../common/form/selectField';
import UserInfoCard from '../../ui/cards/userInfoCard';
import QualitiesCard from '../../ui/cards/qualitiesCard';
import MeetingsCard from '../../ui/cards/meetingsCard';

const UserPage = ({ userId }) => {
    const [data, setData] = useState({
        _id: '',
        userId: '',
        pageId: '',
        content: '',
        created_at: ''
    });
    const [user, setUser] = useState();
    const [users, setUsers] = useState();
    useEffect(() => {
        API.users.getById(userId).then((data) => setUser(data));
        API.users.fetchAll().then((data) => setUsers(data));
    }, []);
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    if (user) {
        return (
            <div className="row gutters-sm">
                <div className="col-md-4 mb-3">
                    <UserInfoCard userId={userId} />
                    <QualitiesCard userId={userId} />
                    <MeetingsCard userId={userId} />
                </div>
                <div className="col-md-8">
                    <div className="card mb-2">
                        <div className="card-body">
                            <div>
                                <h2>New comment</h2>
                                <div className="mb-4">
                                    <SelectField
                                        name="userId"
                                        value={data.userId}
                                        defaultOption="Выберите пользователя"
                                        options={users}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label
                                        htmlFor="exampleFormControlTextarea1"
                                        className="form-label"
                                    >
                                        Сообщение
                                    </label>
                                    <textarea
                                        className="form-control"
                                        id="exampleFormControlTextarea1"
                                        rows="3"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card mb-3">
                        <div className="card-body">
                            <h2>Comments</h2>
                            <hr />
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
                                            <div
                                                className="
                                                    flex-grow-1 flex-shrink-1
                                                "
                                            >
                                                <div className="mb-4">
                                                    <div
                                                        className="
                                                            d-flex
                                                            justify-content-between
                                                            align-items-center
                                                        "
                                                    >
                                                        <p className="mb-1">
                                                            Джон Дориан
                                                            <span className="small ms-2">
                                                                5 минут назад
                                                            </span>
                                                        </p>
                                                        <button
                                                            className="
                                                                btn btn-sm
                                                                text-primary
                                                                d-flex
                                                                align-items-center
                                                            "
                                                        >
                                                            <i
                                                                className="
                                                                    bi bi-x-lg
                                                                "
                                                            />
                                                        </button>
                                                    </div>
                                                    <p className="small mb-0">
                                                        Lorem ipsum dolor sit
                                                        amet consectetur
                                                        adipisicing elit.
                                                        Corporis, soluta facilis
                                                        fugit hic quasi sapiente
                                                        accusamus quia
                                                        voluptatem dolorum
                                                        laboriosam id iste
                                                        voluptas modi animi eius
                                                        voluptatum adipisci amet
                                                        officiis.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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
