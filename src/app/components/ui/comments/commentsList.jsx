import React from 'react';
import PropTypes from 'prop-types';
import Comment from './comment';

const CommentsList = ({ comments }) => {
    return (
        <div className="card mb-3">
            <div className="card-body">
                <h2>Comments</h2>
                <hr />
                {comments.map((comment) => (
                    <Comment
                        key={comment._id}
                        content={comment.content}
                        userId={comment.userId}
                        createdAt={comment.created_at}
                    />
                ))}
            </div>
        </div>
    );
};

CommentsList.propTypes = {
    comments: PropTypes.array
};

export default CommentsList;
