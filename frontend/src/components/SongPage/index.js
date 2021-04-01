import "./SongPage.css";
import {useDispatch, useSelector} from "react-redux";
import { useState, useEffect } from "react";
import { loadComments, addComment, loadLikes } from "../../store/songData";
import { useParams } from "react-router";
import { loadSongsThunk } from "../../store/song";

export default function SongPage() {

    const {userId, songId} = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadSongsThunk(userId))
    }, [dispatch]);

    const sessionUser = useSelector(state => state.session.user);
    const foundSongs = useSelector((state) => Object.values(state.song));
    const song = foundSongs.filter(s => {
        if(s) return s.id.toString() === songId // have to do this to avoid checking id of null in state.songs
    })[0];

    const [comment, setComment] = useState("");

    async function commentSubmit(e){
        e.preventDefault();
        // const payload = {comment, userId: sessionUser.id, songId: song.id}
        // let commentGood = await dispatch(addComment(payload, song.id));
    }

    useEffect(async () => {
        const comments = await dispatch(loadComments(song.id));
        console.log(comments);
    }, []);

    // const likes = await dispatch(loadLikes(song.id));

    return (
        <>
            <div className="songBanner">
            </div>
            <div>
                <h1>{song.title}</h1>
                <h2>{song.artist}</h2>
            </div>

            <h3>Comments</h3>
            <form onSubmit={commentSubmit}>
                <input
                    type="textarea"
                    placeholder="Add your comment..."
                    value={comment}
                    onChange={e=>setComment(e.target.value)}
                />
                <button type="submit">Comment</button>
            </form>
            {}
        </>
    );
}
