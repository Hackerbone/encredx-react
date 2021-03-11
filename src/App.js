import React, {useState} from 'react'
import SignUp from "./components/SignUp/SignUp";
import SignIn from "./components/SignIn/SignIn";
import Play from "./components/Play/Play";
import Home from "./components/Home/Home"
import {BrowserRouter as Router , Switch, Route, Redirect } from 'react-router-dom'
import './index.css';
// import Dashboard from "./components/Dashboard/Dashboard";
import Navbar from './components/Navbar/Navbar';
import Alert from './components/Alert/Alert'
import Leaderboard from './components/Leaderboard/Leaderboard'
import Admin from './components/Admin/Admin'
import Rules from './components/Rules/Rules';
function App() {
  const [logged, setLogged] = useState(false);
  const [heading, setHeading] = useState();
  const [content, setContent] = useState();
  const [purpose, setPurpose] = useState();

  return (
    <div className="App">
      <Router>
      <Navbar logged={logged} setLogged={setLogged} setHeading={setHeading} setContent={setContent} setPurpose={setPurpose}/>
      {(heading || content || purpose) ?
      <Alert heading={heading} content={content} purpose={purpose} setHeading={setHeading} setContent={setContent} setPurpose={setPurpose}/> 
      :
      <></>
      }
      {logged?
        <Switch>
            <Route path='/rules' component={Rules}/>
            <Route path='/adminpanel' exact component={() => <Admin />}/>
            <Route path='/leaderboard' exact component={Leaderboard}/>
            {/* <Route path='/dashboard' exact component={Dashboard}/> */}
            <Route path='/play' exact component={() => <Play setLogged={setLogged } setHeading={setHeading} setContent={setContent} setPurpose={setPurpose}/>}/>
            <Route path='/' render={() => <Redirect to="/play"/>}/>
        </Switch> 
              :
        <Switch>
            <Route path='/rules' component={() => <Rules /> }/>
            <Route path='/signup' exact component={() => <SignUp logged={logged} setLogged={setLogged} setHeading={setHeading} setContent={setContent} setPurpose={setPurpose}/>}/>
            <Route path='/login' exact component={() => <SignIn logged={logged} setLogged={setLogged} setHeading={setHeading} setContent={setContent} setPurpose={setPurpose}/>}/>
            <Route path='/' component={() => <Home logged={logged} setLogged={setLogged} /> }/>
            
        </Switch>
        
      }
      </Router>
    </div>
  );
}

export default App;
