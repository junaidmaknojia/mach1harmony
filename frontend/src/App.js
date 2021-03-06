import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Homepage from "./components/Homepage";
import Playbar from "./components/Playbar";
import SongPage from "./components/SongPage";
import UserPage from "./components/UserPage";
import GenresPage from "./components/GenresPage";

function App() {

	const sessionUser = useSelector(state => state.session.user);
	const dispatch = useDispatch();
	const [isLoaded, setIsLoaded] = useState(false);
	useEffect(() => {
		dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
	}, [dispatch]);

	//Routes can only go in the App where it is switched

	return (
		<>
			{sessionUser && (
				<Navigation isLoaded={isLoaded} />
			)}
			{isLoaded && (
				<Switch>
					<Route exact path="/">
						<Homepage isLoaded={isLoaded} />
					</Route>
					<Route path={`/users/:userId(\\d+)/:songId(\\d+)`}>
						<SongPage />
					</Route>
					<Route path="/genres">
						<GenresPage />
					</Route>
					<Route path={`/users/:userId(\\d+)`}>
						<UserPage isLoaded={isLoaded} />
					</Route>
					<Route><h1>The page you're looking for doesn't exist</h1></Route>
				</Switch>
			)}
			<Playbar />
		</>
	);
}

export default App;
