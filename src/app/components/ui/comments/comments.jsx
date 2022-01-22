import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import AddCommentForm from './addCommentForm';
import CommentsList from './commentsList';
import API from '../../../api';

const Comments = () => {
    const { userId } = useParams();
    const [comments, setComments] = useState([]);
    useEffect(() => {
        API.comments.fetchCommentsForUser(userId).then((data) => setComments(data));
    }, []);
    const handleSubmit = (data) => {
        API.comments
            .add({ ...data, pageId: userId })
            .then((data) => setComments([...comments, data]));
    };
    const handleRemove = (id) => {
        API.comments
            .remove(id)
            .then((id) =>
                setComments((prevState) => prevState.filter((comment) => comment._id !== id))
            );
    };
    return (
        <>
            <AddCommentForm onSubmit={handleSubmit} />
            {comments.length > 0 && <CommentsList comments={comments} onRemove={handleRemove} />}
        </>
    );
};

Comments.propTypes = {
    userId: PropTypes.string
};

export default Comments;
