import "./SongPage.css";
import {useDispatch, useSelector} from "react-redux";
import { useState } from "react";

export default function SongPage({song}) {

    const sessionUser = useSelector(state => state.session.user);

    const [comment, setComment] = useState("");
    const dispatch = useDispatch();

    async function commentSubmit(e){
        e.preventDefault();
        let commentGood = await dispatch(addComment(comment, sessionUser.id))
    }


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
                />
                <button type="submit">Comment</button>
            </form>
            {}
        </>
    );
}
