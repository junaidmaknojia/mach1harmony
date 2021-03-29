import React, {useState, useEffect} from "react";


export default function UploadSongPage() {

    const [title, setTitle] = useState();
    const [artist, setArtist] = useState();
    const [album, setAlbum] = useState();
    const [year, setYear] = useState();

    return (
        <>
            <form type="submit" onSubmit={}>
                <div>
                    <input
                        placeholder="Title"
                        value={title}
                        onChange={e=>setTitle(e.target.value)}
                    >
                    </input>
                </div>
                <div>
                    <input
                        placeholder="Artist"
                        value={artist}
                        onChange={e=>setArtist(e.target.value)}
                    >
                    </input>
                </div>
                <div>
                    <input
                        placeholder="Album"
                        value={album}
                        onChange={e=>setAlbum(e.target.value)}
                    >
                    </input>
                </div>
                <div>
                    <input
                        placeholder="Year"
                        value={year}
                        onChange={e=>setYear(e.target.value)}
                    >
                    </input>
                </div>
            </form>
        </>
    );
}
