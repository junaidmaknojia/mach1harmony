import "./GenresPage.css";

export default function Genre({songs}){


    return (
        <div className="genreSongs">
            {songs.map(song => {
                return (
                    <div>
                        <img src={song.coverPhoto} style={{width: 40, height: 40}}/>
                        <span>{song.title}</span>
                        <span>{song.artist}</span>
                        <span>{song.album}</span>
                        <span>{song.numListens}</span>
                    </div>
                )
            })}
        </div>
    );
}
