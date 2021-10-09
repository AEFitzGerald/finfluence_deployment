import { BrowserRouter, Route, Switch } from "react-router-dom";
import QuestionBoard from './components/QuestionBoard';
import Registration from './components/Registration';
import LandingPage from "./components/LandingPage";
import OneQuestion from './components/OneQuestion';
import Dashboard from './components/Dashboard';
import Login from "./components/Login";
import Map from "./components/Map";
import './App.css';


function App() {


    return (
        <>
        <BrowserRouter> 
                <Switch>
                    <Route exact path="/">
                        <LandingPage></LandingPage>
                        <Map/>
                    </Route>

                    <Route exact path="/registration">
                        <Registration></Registration>
                    </Route>

                    <Route exact path="/login">
                        <Login></Login>
                    </Route>

                    <Route exact path="/dashboard">
                        <Dashboard></Dashboard>
                    </Route>

                    <Route exact path="/questionboard">
                        <QuestionBoard></QuestionBoard>    
                    </Route>

                    <Route exact path="/question/:idQuestion">
                        <OneQuestion></OneQuestion>
                    </Route>

                    

                </Switch>
        </BrowserRouter>
    
        
        </>

    );
}

export default App;
