import { Container } from "reactstrap";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import InvoicePage from "./components/InvoicePage";
import HomePage from "./components/HomePage";
import NavbarComponent from "./components/NavbarComponent";
import FooterComponent from "./components/FooterComponent";

function App() {
  return (
    <div className="App">
      <NavbarComponent />
      <Container>
        <Switch>
          <Route path="/invoice" component={InvoicePage}></Route>
          <Route path="/" component={HomePage}></Route>
        </Switch>
      </Container>
      <FooterComponent/>
    </div>
  );
}

export default App;
