import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import API from '../../../api';
import Qualities from '../../ui/qualities';
import SelectField from '../../common/form/selectField';

const UserPage = ({ userId }) => {
    const history = useHistory();
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
    const handleClick = () => {
        history.push(`/users/${userId}/edit`);
    };
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
                    <div className="card mb-3">
                        <div className="card-body">
                            <button
                                className="
                                    position-absolute
                                    top-0
                                    end-0
                                    btn btn-light btn-sm
                                "
                                onClick={handleClick}
                            >
                                <i className="bi bi-gear" />
                            </button>
                            <div
                                className="
                                    d-flex
                                    flex-column
                                    align-items-center
                                    text-center
                                    position-relative
                                "
                            >
                                <img
                                    src={`https://avatars.dicebear.com/api/avataaars/${(
                                        Math.random() + 1
                                    )
                                        .toString(36)
                                        .substring(7)}.svg`}
                                    className="rounded-circle"
                                    width="150"
                                    alt={user.name}
                                />
                                <div className="mt-3">
                                    <h4>{user.name}</h4>
                                    <p className="text-secondary mb-1">
                                        {user.profession.name}
                                    </p>
                                    <div className="text-muted">
                                        <i
                                            className="
                                                bi bi-caret-down-fill
                                                text-primary
                                            "
                                            role="button"
                                        />
                                        <i
                                            className="
                                                bi bi-caret-up
                                                text-secondary
                                            "
                                            role="button"
                                        />
                                        <span className="ms-2">
                                            {user.rate}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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
                                <Qualities qualities={user.qualities} />
                            </p>
                        </div>
                    </div>
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
