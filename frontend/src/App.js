import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Spots from "./components/Spots";
import { getAllSpots } from "./store/allSpots";
import SingleSpot from "./components/SingleSpot";
import CreateSpot from "./components/CreateSpot";
import CurrentSpots from "./components/CurrentSpots"
import EditSpot from "./components/EditSpot/EditSpot";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    dispatch(getAllSpots())
    // dispatch(getCurrentSpots())
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/" exact>
            <Spots />
          </Route>
          <Route path='/spots/current'>
            <CurrentSpots />
          </Route>
          <Route path='/spots/new'>
            <CreateSpot />
          </Route>
          <Route path='/spot/:id/edit'>
            <EditSpot />
          </Route>
          <Route path="/spots/:id">
            <SingleSpot />
          </Route>
          <Route>
            Sorry this page does not exist
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
