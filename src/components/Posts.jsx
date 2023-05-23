import React, { useState, useEffect } from 'react';

import { db } from "../firebase";
import Avatar from 'react-avatar';
import firebase from 'firebase/compat/app';
import "firebase/compat/firestore";
import { AiFillDelete } from 'react-icons/ai'
import { MdDeleteOutline } from 'react-icons/md'
import {FcEditImage  } from 'react-icons/fc'
import { Link, useNavigate } from 'react-router-dom';




function Posts({ postId, user, userName, caption, imageURL }) {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState([]);
    const [editComment, setEditComment] = useState('');
    const [commentID, setCommentID] = useState('');
    const [show, setShow] = useState(false)
    const navigate = useNavigate()
    

    useEffect(() => {
        let unsubscribe;
        if (postId) {
            unsubscribe = db
                .collection("posts")
                .doc(postId)
                .collection("comments")
                .orderBy('timestamp', 'desc')
                .onSnapshot((snapshot) => {
                    setComments(snapshot.docs.map
                        ((doc) => ({
                            id: doc.id,
                            comment: doc.data(),
                        }))
                    );
                });
        }
        return () => {
            unsubscribe();
        };

    }, [postId])

    const postComment = (event) => {
        event.preventDefault();
        db.collection("posts").doc(postId).collection("comments").add({
            text: newComment,
            username: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        setNewComment('');
    }

    const handleEdit = (id, txt) => {
        setShow(true)
        setEditComment(txt)
        setCommentID(id)

    }

    const updateComment = () => {
        db.collection("posts")
            .doc(postId)
            .collection("comments")
            .doc(commentID).update({
                text: editComment
            })
        setShow(false)

    }
    const navigateToUserDetail = () => {
        navigate(`/users/${userName}`);
      };

    return (
        <>
        <div className="post">
               
            <div className="post__header" >
            <Link to={`/users/${userName}`}>
                <Avatar
                    alt={userName}
                    src=""
                    className="avatar h-10 w-10 rounded-full"
                    name={userName} size="100" round
                    onClick={navigateToUserDetail}
                />
                <h3>{userName}</h3>
                </Link>
            </div>
               

            <img
                className="post__image"
                src={imageURL}
            />

            <p className="post__text">
                <b>{userName}</b> {caption}
            </p>

            <div className="post__comments">
                {comments.map(({ id, comment }) => (
                    <>
                        <p key={id}>
                            <b>{comment.username}</b>: &nbsp;{comment.text}
                        </p>

                    </>
                ))}

                &nbsp;
                {comments.map(({ id, comment }) => (
                    (comment.username === user.displayName || user.displayName === userName) &&
                    <p key={id}>
                        <FcEditImage size={26} style={{ color: 'blue' }} onClick={() => { handleEdit(id, comment.text) }} />
                        <MdDeleteOutline size={26} style={{ color: 'red' }} onClick={() => {
                            db.collection("posts")
                                .doc(postId)
                                .collection("comments")
                                .doc(id).delete()
                        }} />

                    </p>

                ))}


            </div>
            {user && show && <>
                <form className="post__commentbox">
                    <input
                        className="post__input"
                        type="text"
                        placeholder="Edit comment..."
                        value={editComment}
                        onChange={(e) => setEditComment(e.target.value)}
                    />
                    <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              
                        disabled={!editComment}
                        type="submit"
                        onClick={updateComment}
                    >
                        update
                    </button>
                </form>
            </>}
            {user && (
                <form className="post__commentbox">
                    <input
                        className="post__input"
                        type="text"
                        placeholder="Add a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              
                        
                        disabled={!newComment}
                        type="submit"
                        onClick={postComment}
                    >
                        POST
                    </button>
                    {
                        user.displayName === userName &&

                        <AiFillDelete size={26} style={{ color: ' red' }} onClick={() => {
                            db
                                .collection("posts")
                                .doc(postId).delete()
                        }} />
                    }

                </form>
            )}


        </div>
          
                    </>

    );
}

export default Posts;