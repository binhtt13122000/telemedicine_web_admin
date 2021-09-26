import React from "react";

import SnackbarError from "./component/Snackbar/SnackbarError";
import SnackbarSuccess from "./component/Snackbar/SnackbarSuccess";
import SnackbarWarning from "./component/Snackbar/SnackbarWarning";
import SymptomPage from "./container/SymptomPage";

type AppProps = {
    servity: string;
};

function App() {
    return (
        <div>
            <SymptomPage />
            <SnackbarSuccess />
            <SnackbarError />
            <SnackbarWarning />
        </div>
    );
}

export default App;
