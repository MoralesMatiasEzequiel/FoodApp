import axios from "axios";
import { Landing, Home, Detail, Form } from "./views";
import { Route, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";

axios.defaults.baseURL = "http://localhost:3001";

function App() {

  const location = useLocation();

  return (
    <div className="App">
      {location.pathname !== "/" && <NavBar />}
      <Route exact path='/'>
        <Landing />
      </Route>
      <Route path='/home'>
        <Home />
      </Route>
      <Route exact path="/recipes/:id" component={Detail} />
      <Route exact path="/create" component={Form} />


    </div>
  );
}

export default App;

