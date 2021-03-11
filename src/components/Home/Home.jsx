import React from 'react'
import firebase from '../../firebase';
import {Link} from 'react-router-dom'
import './Home.scss'

const Home = ({logged,setLogged}) =>{
    let locallogged;
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            locallogged= true;
            setLogged(true);
        } else {
          setLogged(false);
        }
      });
    return(

    <div className="homepage">
  {logged?
      <div className="spinner-border my-5 bg-light" role="status">
      <span className="sr-only">Loading...</span>
    </div>
    :locallogged?
            
            <>{window.location.replace("/play")}</>

        :
        <div className="text-center">
       <h1>Welcome to EncredX</h1>
       <p>Put your thinking to test</p>
       <div>
       <Link to="/signup" className="btn btn-lg btn-primary mx-2">SignUp</Link>
       <Link to="/login" className="btn btn-lg btn-primary mx-2">Log-In</Link>
       </div>
       </div>
}
    </div>
 
 
 )
}

export default Home;