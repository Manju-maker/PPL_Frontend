import React from "react";
import Main from "./Main";
import Header from "./header";
import Footer from "./footer";
import { Route } from "react-router-dom";

class App extends React.Component {
    render() {
        return (
            <div>
                <Route path="" component={Header} />
                <Main />
                <Route path="" component={Footer} />
            </div>
        );
    }
}
export default App;
