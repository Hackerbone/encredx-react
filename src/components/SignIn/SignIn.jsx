import React from 'react'
import firebase  from '../../firebase';
import {Link} from 'react-router-dom';
import './SignIn.scss';

const SignIn = ({logged,setLogged,setHeading,setContent, setPurpose}) =>{
    
    const handleSubmit=(e)=>{
        e.preventDefault();
        if(e.target.email.value=== "" || e.target.pwd.value===""){
            alert("Login details cannot be empty");
        }
        else{
            firebase.auth().signInWithEmailAndPassword(e.target.email.value,e.target.pwd.value)
            .then((userCredential) => {
              setHeading("Logged In")
              setContent("Successfully!")
              setPurpose("success")  
              setLogged(true);
            
            })
            .catch((error) => {
              setHeading("This user does not exist");
              setPurpose("danger")  
              
            });
        }
        }

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              setHeading("Logged In")
              setContent("Successfully!")
              setPurpose("success")  
              setLogged(true);
            } else {
              setLogged(false);
            }
          });
    return(
    <div className="signup">
      {logged?
      <div className="spinner-border my-5 bg-light" role="status">
      <span className="sr-only">Loading...</span>
    </div>
    :
        <div className="text-center bg-white py-5">
        <h1>EncredX // Log-In</h1>
        <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
            <input className="form-control" type="email" placeholder="Email" name="email"/>
            </div>
            <div className="form-group mb-3">
            <input className="form-control" type="password" placeholder="Password" name="pwd"/>
            </div>
            <div className="form-group mb-3">
            </div><input className="form-control btn btn-primary" type="submit" placeholder="Submit"/>
        </form>
        
        <p>Don't an account? <Link to='/signup'>Signup</Link>
        </p>
        </div>
}
    </div>
    )
}

export default SignIn;