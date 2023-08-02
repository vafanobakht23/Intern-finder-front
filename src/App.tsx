import React from "react";
import "./App.generated.css";
import Login from "./pages/Login";

function App(): React.ReactElement {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route component={NotFound} />
      </Switch>
      <Login />
      {/* <Register /> */}
    </>
  );
}

export default App;
