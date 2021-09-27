import React from "react";

import { Switch, Redirect, Route } from "react-router-dom";

import CustomSidebar from "./components/CustomSidebar";
import { Divider, Grid, Toolbar } from "@material-ui/core";

import { IRoute } from "./common/types";
import routes from "./routes";

function App() {
    const getRoutes = (allRoutes: IRoute[]) =>
        allRoutes.map((route) => (
            <Route exact path={route.path} component={route.component} key={route.key} />
        ));

    return (
        <React.Fragment>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <CustomSidebar />
                </Grid>
                <Grid item xs={8}>
                    <Toolbar />
                    <Divider />
                    <Switch>
                        {getRoutes(routes)}
                        <Redirect from="*" to="/hospitals" />
                    </Switch>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default App;
