import React from 'react'
import firebase from '../../firebase';
import {Link} from 'react-router-dom'
import './Navbar.scss';


const Navbar = ({logged,setLogged,setHeading,setContent, setPurpose}) =>{

    return(
          
        <nav className="navbar" role="navigation" aria-label="main navigation">
          <div className="container-fluid">
            <div className="navbar-brand width-100">
            <Link className="text-decoration-none" to='/'>
                <b>EncredX</b>
              </Link>
            </div>
          {logged?
            <div id="hhcnavbar" className="navbar-menu">
                <div className="navbar-start w-100">
                    <Link className="navbar-item text-decoration-none" to='/play'>
                      Play
                    </Link>
              
                    <Link className="navbar-item text-decoration-none" to='/leaderboard'>
                      Leaderboard
                    </Link>
        
                    <Link className="navbar-item text-decoration-none" to='/rules'>
                        Rules
                    </Link>
                    <span className="navbar-item text-decoration-none" onClick={()=> {
                      firebase.auth().signOut()
                      setHeading("Logged Out")
                      setContent("Successfully")
                      setPurpose("primary")
                      setLogged(false)
                      }
                      }>
                      Logout
                    </span>
                </div>
            </div>
            :
            <div id="hhcnavbar" className="navbar-menu">
            <div className="navbar-start w-100">
                <Link className="navbar-item text-decoration-none" to='/rules'>
                  Rules
                </Link>
          
                <Link className="navbar-item text-decoration-none" to='/signup'>
                  SignUp
                </Link>
          
                <Link className="navbar-item text-decoration-none " to='/login'>
                  LogIn
                </Link>
    
            </div>
        </div>
}
</div>
          </nav>
        
    )
}

export default Navbar