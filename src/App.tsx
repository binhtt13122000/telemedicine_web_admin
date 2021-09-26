import React from "react";

import SnackbarError from "./component/Snackbar/SnackbarError";
import SnackbarInfo from "./component/Snackbar/SnackbarInfo";
import SnackbarSuccess from "./component/Snackbar/SnackbarSuccess";
import SnackbarWarning from "./component/Snackbar/SnackbarWarning";
import SymptomPage from "./container/SymptomPage";

type AppProps = {
    servity: string;
};

function App() {
    return (
        <div>
            <SnackbarSuccess />
            <SnackbarError />
            <SnackbarInfo />
            <SnackbarWarning />
            <SymptomPage />
        </div>
    );
}

export default App;
