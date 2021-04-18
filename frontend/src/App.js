import React, {useEffect, useState} from "react";
import { Route, Switch } from "react-router-dom";
import {useDispatch} from "react-redux";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Homepage from "./components/Homepage";
import Playbar from "./components/Playbar";
import SongPage from "./components/SongPage";
import UserPage from "./components/UserPage";
import GenresPage from "./components/GenresPage";
import Search from "./components/Search";

function App() {

  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  //Routes can only go in the App where it is switched

  return (
    <>
      <Navigation isLoaded={isLoaded}/>
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <Homepage isLoaded={isLoaded}/>
          </Route>
          <Route exact path="/search">
            <Search/>
          </Route>
          <Route path="/users/:userId/:songId">
              <SongPage/>
          </Route>
          <Route path="/genres">
              <GenresPage/>
          </Route>
          <Route path="/users/:userId">
              <UserPage isLoaded={isLoaded}/>
          </Route>
        </Switch>
      )}
      <Playbar />
    </>
  );
}

export default App;
