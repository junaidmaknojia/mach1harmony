import "./SongPage.css";
import {useDispatch, useSelector} from "react-redux";
import { useState, useEffect } from "react";
import { loadComments, addComment, loadLikes, deleteComment, editComment } from "../../store/songData";
import { useHistory, useParams } from "react-router";
import { loadSongsThunk } from "../../store/song";

export default function SongPage() {

    const {userId, songId} = useParams();
    const history = useHistory();
    const dispatch = useDispatch();

    const [commentInput, setCommentInput] = useState("");
    const [edittingComment, setEditingComment] = useState(false);
    const [newComment, setNewComment] = useState("");
    // let [comments, setComments] = useState([]);
    // let [song, setSong] = useState({});


    useEffect(() => {
        dispatch(loadSongsThunk(userId))
    }, [dispatch]);

    const sessionUser = useSelector(state => state.session.user);
    const foundSongs = useSelector((state) => Object.values(state.song));
    // const song = foundSongs.filter(s => {
    //     if(s) return s.id.toString() === songId // have to do this to avoid checking id of null in state.songs
    // })[0];


    async function commentSubmit(e){
        e.preventDefault();
        // const payload = {text:commentInput, userId: sessionUser.id, songId: song.id}
        // let commentGood = await dispatch(addComment(payload, song.id));
        // if(commentGood) history.push(`/${sessionUser.id}`); // reload the page?
    }

    async function editSubmit(e){
        e.preventDefault();
        const commentId = e.target.value;
        // const payload = {text: newComment , userId: sessionUser.id, songId: song.id}
        // let commentGood = await dispatch(editComment(payload, commentId));

        // if(commentGood) setEditingComment(false);

    }

    async function handleDelete(e){
        // const commentId = e.target.value;
        // let deleteGood = await dispatch(deleteComment(commentId));
    }

    useEffect(async () => {
        const foundSong = foundSongs.filter(s => {
            if(s) return s.id.toString() === songId // have to do this to avoid checking id of null in state.songs
        })[0];
        const comments = await dispatch(loadComments(foundSong.id));
        localStorage.setItem("song", foundSong);
        localStorage.setItem("comments", comments);
        // setSong(foundSong);
        // setComments(comments);
    }, []);


    // console.log(song.title);
    // const likes = await dispatch(loadLikes(song.id));

    return (
        <>
            <div className="songBanner">
            </div>
            {/* <h1>{song.title}</h1>
            <h2>{song.artist}</h2> */}
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

            {comments.map(comment => {
                return (
                    <div key={comment.id}>
                        <p>{`Comment made at: ${comment.updatedAt}`}</p>
                        <p>{comment.User.username}</p>
                        {edittingComment ? <p>{comment.text}</p> : (
                            <form value={comment.id} onSubmit={editSubmit}>
                                <input
                                    type="textarea"
                                    value={comment.text}
                                    onChange={e=>setNewComment(e.target.value)}
                                />
                                <button type="submit">Edit</button>
                                <button onClick={() => setEditingComment(false)}>Cancel</button>
                            </form>
                        )}
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
    );
}
