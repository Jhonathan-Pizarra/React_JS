import {BrowserRouter as Router} from "react-router-dom";
import  {Route} from "react-router-dom";
import {Switch} from "react-router-dom";

import Home from "../views/Home";
import Error404 from "../views/Error404";

function Routes() {
    return(
        <Router>
            <Switch>
                <Route path="/" exact>
                    <Home/>
                </Route>
                <Route>
                    <Error404/>
                </Route>
            </Switch>
        </Router>
    );
}

export default Routes;