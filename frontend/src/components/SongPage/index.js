import "./SongPage.css";
import {useDispatch, useSelector} from "react-redux";
import { useState, useEffect } from "react";
import { loadComments, addComment, loadLikes, deleteComment, editComment, updateUserLike } from "../../store/songData";
import { useParams } from "react-router";
import {Link} from "react-router-dom";
import { loadSongsThunk } from "../../store/song";
import { sendSong } from "../../store/playbar";


export default function SongPage({ isLoaded }) {

    const {userId, songId} = useParams();
    const dispatch = useDispatch();

    const [commentInput, setCommentInput] = useState("");
    const [editCommentNumber, setEditCommentNumber] = useState(0);
    const [newComment, setNewComment] = useState("");
    const [foundSong, setFoundSong] = useState("");

    const sessionUser = useSelector(state => state.session.user);
    const foundSongs = useSelector((state) => Object.values(state.song));
    const comments = useSelector((state) => state.songData.songComments);
    const likes = useSelector(state => state.songData.songLikes);

    useEffect(async () => {
        dispatch(loadSongsThunk(userId));
    }, [dispatch]);


    useEffect(() => {
        if(foundSongs.length){
            const hopefullyNewSong = (foundSongs.filter(s => {
                if(s) return s.id.toString() === songId // have to do this to avoid checking id of null in state.songs
            })[0]);
            setFoundSong(hopefullyNewSong);
        }
    }, [foundSongs]);

    useEffect(() => {
        if(foundSong){
            dispatch(loadComments(foundSong.id));
        }
    }, [dispatch, foundSong]);

    useEffect(() => {
        if(foundSong){
            dispatch(loadLikes(foundSong.id));
        }
    }, [dispatch, foundSong]);

    async function commentSubmit(e){
        e.preventDefault();
        const payload = {text: commentInput, userId: sessionUser.id, songId: foundSong.id}
        await dispatch(addComment(payload, foundSong.id));
        setCommentInput("");
        // if(commentGood) history.push(`/${foundSong.userId}/${songId}`); // reload the page?
    }

    async function editSubmit(e){
        e.preventDefault();
        const commentId = parseInt(e.target[1].value, 10); // refactor to get the e.target.value
        const payload = {text: newComment , userId: sessionUser.id, songId: foundSong.id}
        let commentGood = await dispatch(editComment(payload, commentId));
        if(commentGood){
            setEditCommentNumber(0);
        }
    }

    async function handleDelete(e){
        const commentId = e.target.getAttribute("value");
        await dispatch(deleteComment(commentId, songId));
    }

    async function handleLike(e){
        // const likes = await dispatch(loadLikes(foundSong.id));
        // const alreadyLiked = likes.find(like => like.userId === sessionUser.id);
        await dispatch(updateUserLike(foundSong.id, sessionUser.id));
    }

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    async function playSong(song) {
        await dispatch(sendSong(song));
    }

    return (
        <div className="songPage">
            {foundSong && (
                <div className="songBanner">
                    <img
                        src={foundSong.coverPhoto}
                        alt={foundSong.title}
                        className="songPhoto"
                        onClick={() => playSong(foundSong)}
                    />
                    <img src="https://alohajarren.github.io/webpage-mockup/images/songplay.png" className="playHover"/>


                    <div className="songInfo">
                        <h1 style={{fontSize: 50}}>{foundSong.title}</h1>
                        <h2>{foundSong.artist}</h2>
                        <span style={{marginRight: 5}}>{foundSong.numListens}<i class="fas fa-headphones"></i></span>
                        {likes && likes.length>0 && (
                            <>
                                <p>{`${likes.length} Likes`}</p>
                                {sessionUser && (
                                    <span onClick={handleLike} className="likeButton">{
                                        likes.find(like => like.userId === sessionUser.id) ? <i class="fas fa-heart"></i> : <i class="far fa-heart"></i>
                                    }</span>
                                )}
                            </>
                        )}
                    </div>
                </div>
            )}

            <div className="commentsList">
                {sessionUser && (
                    <form onSubmit={commentSubmit}>
                        <textarea
                            className="commentBox"
                            placeholder="Add your comment..."
                            value={commentInput}
                            onChange={e=>setCommentInput(e.target.value)}
                            />
                        <button type="submit" className="appSubmitButton">Comment</button>
                    </form>
                )}

                {comments && comments.length > 0 && (
                    <>
                        {comments.map(comment => {
                            return (
                                <div key={comment.id} className="commentDiv">
                                    <img src={comment.User.profilePic} alt={comment.User.username} style={{width: 50}} className="userPic"/>
                                    <div style={{marginTop: 10}}><Link to={`/${comment.User.id}`}>{comment.User.username}</Link></div>
                                    <p>{formatDate(comment.updatedAt)}</p>
                                    {editCommentNumber === comment.id ? (
                                        <form value={comment.id} onSubmit={editSubmit}>
                                            <textarea
                                                className="commentBox"
                                                value={newComment}
                                                onChange={e=>setNewComment(e.target.value)}
                                            />
                                            <button className="appSubmitButton" type="submit" value={comment.id}>Update</button>
                                            <button className="appSubmitButton" onClick={() => setEditCommentNumber(0)}>Cancel</button>
                                        </form>
                                    ) : <p className="commentText">{comment.text}</p>}
                                    {sessionUser && (sessionUser.id === comment.userId) && (
                                        <div style={{marginBottom: 10}}>
                                            <p
                                                onClick={() => {
                                                    setNewComment(comment.text);
                                                    setEditCommentNumber(comment.id)}
                                                }
                                                hidden={editCommentNumber}
                                                style={{margin: 5, color: "orange"}}
                                            >Edit</p>
                                            <p style={{margin: 5, color: "orange"}} value={comment.id} onClick={(e) => handleDelete(e)}>Delete</p>
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </>
                )}

            </div>
        </div>
    );
}
