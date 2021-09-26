import React from "react";

import SnackbarError from "./Snackbar/SnackbarError";
import SnackbarSuccess from "./Snackbar/SnackbarSuccess";
import SnackbarWarning from "./Snackbar/SnackbarWarning";
import SymptomPage from "./container/SymptomPage";

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
