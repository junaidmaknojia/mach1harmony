import React, {useEffect, useState} from "react";
import { Route, Switch } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Homepage from "./components/Homepage";
import UserProfile from "./components/UserProfile";
import Playbar from "./components/Playbar";

function App() {

  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const sessionUser = useSelector(state => state.session.user);


  return (
    <>
      <Navigation isLoaded={isLoaded}/>
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <Homepage isLoaded={isLoaded}/>
          </Route>
          {sessionUser && (
            <Route>
              <UserProfile path={`/${sessionUser.id}`} sessionUser={sessionUser} isLoaded={isLoaded}/>
            </Route>
          )}
        </Switch>
      )}
      <Playbar />
    </>
  );
}

export default App;
