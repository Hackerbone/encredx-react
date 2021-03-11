import React  from 'react'
import firebase  from '../../firebase'
import {Link} from 'react-router-dom'
import './SignUp.scss'

const SignUp = ({setLogged ,setHeading,setContent, setPurpose}) =>{

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(e.target.pwd.value === e.target.confirmpwd.value){
            const email = e.target.email.value;
            const password = e.target.pwd.value;
            
            
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                let user = userCredential.user;
               
                const usersRef = firebase.database().ref('Users').child(user.uid);
                const date = new Date();
                const profile = {
                    name : e.target.name.value,
                    username: e.target.username.value,
                    instituiton: e.target.institution.value,
                    created: date.getTime(),
                    level: 0,
                    userType: "player"
                }

                usersRef.set(
                    {profile},
                    err => {
                        if(err)
                        console.log(err);
                    }
                )
            })
              .catch((error) => {
                let errorCode = error.code;
                let errorMessage = error.message;
                console.log(errorMessage, errorCode);
              });

       } 
        else{
            alert("Passwords do not match");
        }
    }
    
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            setHeading("Signed-Up")
            setContent("Successfully!")
            setPurpose("success") 
            setLogged(true);
            
        } 
      });


    return(
    <div className="signup">
        <div className="text-center bg-white py-5">

            <h1>Encredx // SignUp</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input className="form-control" type="text" placeholder="Name" name="name" />
                </div>
                <div className="form-group mb-3">
                    <input className="form-control" type="text" placeholder="Username" name="username" />
                </div>

                <div className="form-group mb-3">
                    <input className="form-control" type="email" placeholder="Email" name="email" />
                </div>
                <div className="form-group mb-3">
                    <input className="form-control" type="password" placeholder="Password" name="pwd" />
                </div>
                <div className="form-group mb-3">
                    <input className="form-control" type="password" placeholder="Confirm Password" name="confirmpwd" />
                </div>
                <div className="form-group mb-3">
                    <input className="form-control" type="text" name="institution" placeholder="institution" />
                </div>
                <div className="form-group mb-3">
                </div><input className="form-control btn btn-primary" type="submit" placeholder="Submit" />
            </form>
            <p>Already have an account?
                <Link to='/login'>Login</Link>
            </p>
        </div>
    </div>
    )
}

export default SignUp