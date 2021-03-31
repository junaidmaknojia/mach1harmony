import "./SongPage.css";
import {useDispatch, useSelector} from "react-redux";
import { useState } from "react";
import { addComment, loadComments,  } from "../../store/comment";

export default function SongPage({song}) {

    const sessionUser = useSelector(state => state.session.user);

    const [comment, setComment] = useState("");
    const dispatch = useDispatch();

    async function commentSubmit(e){
        e.preventDefault();
        const payload = {comment, userId: sessionUser.id, songId: song.id}
        let commentGood = await dispatch(addComment(payload));
    }

    const comments = await dispatch(loadComments(song.id));

    return (
        <>
            <div className="songBanner">
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
