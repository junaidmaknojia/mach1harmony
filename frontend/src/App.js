import React, {useEffect, useState} from "react";
import { Route, Switch } from "react-router-dom";
import {useDispatch} from "react-redux";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Homepage from "./components/Homepage";
import Playbar from "./components/Playbar";
import SongPage from "./components/SongPage";
import UserPage from "./components/UserPage";

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
          <Route path="/:userId/:songId" isLoaded={isLoaded}>
              <SongPage/>
          </Route>
          <Route path="/:userId">
              <UserPage isLoaded={isLoaded}/>
          </Route>
        </Switch>
      )}
      <Playbar />
    </>
  );
}

export default App;
