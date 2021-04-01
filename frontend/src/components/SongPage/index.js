import "./SongPage.css";
import {useDispatch, useSelector} from "react-redux";
import { useState, useEffect } from "react";
import { loadComments, addComment, loadLikes } from "../../store/songData";
import { useParams } from "react-router";
import { loadSongsThunk } from "../../store/song";

export default function SongPage() {

    const {userId, songId} = useParams();
    const dispatch = useDispatch();

    const [commentInput, setCommentInput] = useState("");
    let [comments, setComments] = useState([]);
    let [song, setSong] = useState({});


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
        // const payload = {comment, userId: sessionUser.id, songId: song.id}
        // let commentGood = await dispatch(addComment(payload, song.id));
    }


    useEffect(async () => {
        const foundSong = foundSongs.filter(s => {
            if(s) return s.id.toString() === songId // have to do this to avoid checking id of null in state.songs
        })[0];
        comments = await dispatch(loadComments(foundSong.id));
        console.log(comments);
        setSong(foundSong);
        setComments(comments);
        console.log(song);
    }, []);


    // console.log(song.title);
    // const likes = await dispatch(loadLikes(song.id));

    return (
        <>
            <div className="songBanner">
            </div>
            <h1>{song.title}</h1>
            <h2>{song.artist}</h2>
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
                        <p>{comment.User.username}</p>
                        <p>{comment.text}</p>
                        <p>{`Comment made at: ${comment.updatedAt}`}</p>
                    </div>
                )
            })}
        </>
    );
}
