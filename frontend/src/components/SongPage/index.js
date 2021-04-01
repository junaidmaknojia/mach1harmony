import "./SongPage.css";
import {useDispatch, useSelector} from "react-redux";
import { useState, useEffect } from "react";
import { loadComments, addComment, loadLikes, deleteComment, editComment } from "../../store/songData";
import { useHistory, useParams } from "react-router";
import { loadSongsThunk } from "../../store/song";

export default function SongPage({ isLoaded }) {

    const {userId, songId} = useParams();
    const history = useHistory();
    const dispatch = useDispatch();

    const [commentInput, setCommentInput] = useState("");
    const [edittingComment, setEditingComment] = useState(false);
    const [newComment, setNewComment] = useState("");
    const [foundSong, setFoundSong] = useState("");

    const sessionUser = useSelector(state => state.session.user);
    const foundSongs = useSelector((state) => Object.values(state.song));
    const comments = useSelector((state) => state.songData.songComments);

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

    async function commentSubmit(e){
        e.preventDefault();
        const payload = {text: commentInput, userId: sessionUser.id, songId: foundSong.id}
        let commentGood = await dispatch(addComment(payload, foundSong.id));
        // if(commentGood) history.push(`/${foundSong.userId}/${songId}`); // reload the page?
    }

    async function editSubmit(e){
        e.preventDefault();
        const commentId = e.target.value;
        const payload = {text: newComment , userId: sessionUser.id, songId: foundSong.id}
        let commentGood = await dispatch(editComment(payload, commentId));

        if(commentGood) setEditingComment(false);

    }

    async function handleDelete(e){
        // const commentId = e.target.value;
        // let deleteGood = await dispatch(deleteComment(commentId));
    }

    async function handleLike(e){
        // const likes = await dispatch(loadLikes(song.id));

        // const alreadyLiked = likes.find(like => like.userId === sessionUser.id);

        // if(alreadyLiked){
        //     await dispatch(removeLike(song.id));
        // }else{
        //     await dispatch(addLike(song.id));
        // }
    }

    return (
        <>
            <div className="songBanner">
            </div>
            {/* <h1>{foundSong.title}</h1>
            <h2>{foundSong.artist}</h2> */}
            <button onClick={handleLike}>Like!</button>
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
                                {edittingComment ? (
                                    <form value={comment.id} onSubmit={editSubmit}>
                                        <input
                                            type="textarea"
                                            value={comment.text}
                                            onChange={e=>setNewComment(e.target.value)}
                                            />
                                        <button type="submit">Update</button>
                                        <button onClick={() => setEditingComment(false)}>Cancel</button>
                                    </form>
                                ) : <p>{comment.text}</p>}
                                {(sessionUser.id === comment.userId) && (
                                    <>
                                        <button onClick={() => setEditingComment(true)}>Edit</button>
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
