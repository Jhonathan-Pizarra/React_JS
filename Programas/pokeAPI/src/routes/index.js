import {BrowserRouter as Router} from "react-router-dom";
import  {Route} from "react-router-dom";
import {Switch} from "react-router-dom";

import Home from "../views/Home";
import Error404 from "../views/Error404";
import PokeDetail from "../views/PokeDetail";
import ScrollToTop from "../components/ScrollToTop"

function Routes() {

    return(
        <Router>
            <ScrollToTop/>
            <Switch>
                <Route path="/" exact>
                    <Home/>
                </Route>
                <Route path="/pokemon/:id">
                   <PokeDetail/>
                </Route>
                <Route>
                    <Error404/>
                </Route>
            </Switch>
        </Router>
    );
}

export default Routes;