import "./Homepage.css";

export default function Homepage({isLoaded}) {

    //have a div for the following section ready
    // ternery operator for className that determines if you're loggedin
    // which stuff to show as trending

    return (
        <div className="homepage">
            <div className="banner"></div>
            <div className="trending"></div>
            <div className="newFeatures"></div>
            <div className="getStarted"></div>
        </div>
    );
}
