import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AddCommentForm from './addCommentForm';
import CommentsList from './commentsList';
import API from '../../../api';

const Comments = ({ userId }) => {
    const [comments, setComments] = useState([]);
    useEffect(() => {
        API.comments.fetchCommentsForUser(userId).then((data) => setComments(data));
    }, []);
    const handleSubmit = (data) => {
        API.comments
            .add({ ...data, pageId: userId })
            .then((data) => setComments([...comments, data]));
    };
    return (
        <>
            <AddCommentForm userId={userId} onSubmit={handleSubmit}/>
            {comments.length > 0 && (
                <CommentsList comments={comments}/>
            )}
        </>
    );
};

Comments.propTypes = {
    userId: PropTypes.string
};

export default Comments;
