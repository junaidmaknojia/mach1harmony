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
                    <div className="songInfo">
                        <div className="songInfo__top">
                            <div className="appSubmitButton play" onClick={() => playSong(foundSong)}><i class="fas fa-play"></i></div>
                            <div className="songInfo__titles">
                                <h3>{foundSong.artist}</h3>
                                <h2 style={{fontSize: 50}}>{foundSong.title}</h2>
                            </div>
                        </div>
                        <span style={{marginRight: 5}}><i class="fas fa-headphones" style={{marginRight: 5}}></i>{foundSong.numListens}</span>
                        {sessionUser && (
                            <span onClick={handleLike} className="likeButton">
                                {likes?.find(like => like.userId === sessionUser.id) ? <i class="fas fa-2x fa-heart"></i> : <i class="far fa-2x fa-heart"></i>}
                            </span>
                        )}
                        <span>{`${likes?.length} ${sessionUser ? "" : "likes"}`}</span>
                        <img src="https://images.vexels.com/media/users/3/145464/isolated/preview/0842d1719ec663c3256b9f46c740bbed-audio-wave-by-vexels.png" className="songInfo__waves"/>
                    </div>
                    <img
                        src={foundSong.coverPhoto}
                        alt={foundSong.title}
                        className="songPhoto"
                        onClick={() => playSong(foundSong)}
                    />
                </div>
            )}

            <div className="songPage__body">
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
                                        <img src={comment.User.profilePic} alt={comment.User.username} className="userPic"/>
                                        <div>
                                            <div style={{marginTop: 10}}><Link to={`/users/${comment.User.id}`}>{comment.User.username}</Link></div>
                                            {editCommentNumber === comment.id ? (
                                                <form value={comment.id} onSubmit={editSubmit}>
                                                    <textarea
                                                        className="commentBox editBox"
                                                        value={newComment}
                                                        onChange={e=>setNewComment(e.target.value)}
                                                    />
                                                    <div>
                                                        <button className="appSubmitButton" type="submit" value={comment.id}>Update</button>
                                                        <button className="appSubmitButton" onClick={() => setEditCommentNumber(0)}>Cancel</button>
                                                    </div>
                                                </form>
                                            ) : <p className="commentText">{comment.text}</p>}

                                        </div>
                                        <p>{formatDate(comment.updatedAt)}</p>
                                        {sessionUser && (sessionUser.id === comment.userId) && (
                                            <div>
                                                <p
                                                    onClick={() => {
                                                        setNewComment(comment.text);
                                                        setEditCommentNumber(comment.id)}
                                                    }
                                                    hidden={editCommentNumber}
                                                    className="comment__edit"
                                                >Edit</p>
                                                <p className="comment__delete" value={comment.id} onClick={(e) => handleDelete(e)}>Delete</p>
                                            </div>
                                        )}
                                    </div>
                                )
                            })}
                        </>
                    )}

                </div>
                <div className="songPage__extras">
                    <div className="songPage__extras--author">
                        <h3>Song Artist</h3>
                        <img src={foundSong?.User?.profilePic} className="userPic extras"/>
                        <h4><Link to={`/users/${foundSong?.User?.id}`}>{foundSong?.User?.username}</Link></h4>
                    </div>
                    <div>
                        <p>Users who like this</p>
                        <div className="songPage__extras--likes">
                            {likes?.map(like => (
                                <Link to={`/users/${like?.User?.id}`} className="userPic"><img alt={like?.User?.username} src={like?.User?.profilePic} className="userPic"/></Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
