import "./SongPage.css";
import {useDispatch, useSelector} from "react-redux";
import { useState, useEffect } from "react";
import { loadComments, addComment, loadLikes, deleteComment, editComment, updateUserLike } from "../../store/songData";
import { useHistory, useParams } from "react-router";
import { loadSongsThunk } from "../../store/song";

export default function SongPage({ isLoaded }) {

    const {userId, songId} = useParams();
    const history = useHistory();
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
        let commentGood = await dispatch(addComment(payload, foundSong.id));
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
        const commentId = e.target.value;
        console.log(commentId);
        let deleteGood = await dispatch(deleteComment(commentId, songId));
    }

    async function handleLike(e){
        // const likes = await dispatch(loadLikes(foundSong.id));
        // const alreadyLiked = likes.find(like => like.userId === sessionUser.id);
        await dispatch(updateUserLike(foundSong.id, sessionUser.id));
    }

    return (
        <>
            <div className="songBanner">
            </div>
            {foundSong && (
                <>
                    <h1>{foundSong.title}</h1>
                    <h2>{foundSong.artist}</h2>
                </>
            )}
            {likes && likes.length>0 && (
                <>
                    <p>{`${likes.length} people like this song!`}</p>
                    {sessionUser && (
                        <button onClick={handleLike}>{
                            likes.find(like => like.userId === sessionUser.id) ? "Unlike" : "Like"
                        }</button>
                    )}
                </>
            )}
            <h3>Comments</h3>
            <form onSubmit={commentSubmit}>
                <input
                    type="textarea"
                    placeholder="Add your comment..."
                    value={commentInput}
                    onChange={e=>setCommentInput(e.target.value)}
                />
                <button type="submit">Comment</button>
            </form>

            {comments && comments.length > 0 && (
                <>
                    {comments.map(comment => {
                        return (
                            <div key={comment.id}>
                                <p>{`Comment made at: ${comment.updatedAt}`}</p>
                                <p>{comment.User.username}</p>
                                {editCommentNumber === comment.id ? (
                                    <form value={comment.id} onSubmit={editSubmit}>
                                        <input
                                            type="textarea"
                                            value={newComment}
                                            onChange={e=>setNewComment(e.target.value)}
                                        />
                                        <button type="submit" value={comment.id}>Update</button>
                                        <button onClick={() => setEditCommentNumber(0)}>Cancel</button>
                                    </form>
                                ) : <p>{comment.text}</p>}
                                {(sessionUser.id === comment.userId) && (
                                    <>
                                        <button
                                            onClick={() => {
                                                setNewComment(comment.text);
                                                setEditCommentNumber(comment.id)}
                                            }
                                            hidden={editCommentNumber}
                                        >Edit</button>
                                        <button value={comment.id} onClick={handleDelete}>Delete</button>
                                    </>
                                )}
                            </div>
                        )
                    })}
                </>
            )}
        </>
    );
}
