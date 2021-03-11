import React from 'react'
import firebase from '../../firebase'
import './Admin.scss'
const Admin = () =>{
    const currUid = firebase.auth().currentUser.uid;
    const userRef = firebase.database().ref('Users').child(currUid);
       
        userRef.on('value', (snapshot)=>{
            let user = [];
            user.push(snapshot.val().profile)
       
            if(user[0].userType !== "admin"){
                window.location.replace("/play")
            }
        })

    const handleSubmit = (e) =>{
        e.preventDefault()
        const lvlno = e.target.lvlno.value;
                
        const levelRef = firebase.database().ref('levels/' + lvlno)
                const leveldetails = {
                    answer : e.target.answer.value,
                    comment: e.target.comment.value,
                    question: e.target.question.value,
                    url: e.target.url.value,
                    imgurl: e.target.img.value
                
                }
                
                levelRef.set(
                        leveldetails
                    ,
                    err => {
                        if(err)
                        console.log(err);
                    }
                )
                    console.log("llo");

    }
return(
<div className="admin">
    <div className="text-center bg-white py-5">
        <h1>Add Data</h1>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <input className="form-control" type="number" placeholder="Level" name="lvlno" />
            </div>
            <div className="mb-3">
                <input className="form-control" type="text" placeholder="Question" name="question" />
            </div>
            <div className="form-group mb-3">
                <input className="form-control" type="text" placeholder="Answer" name="answer" />
            </div>
            <div className="form-group mb-3">
                <input className="form-control" type="text" placeholder="Secret" name="comment" />
            </div>
            <div className="mb-3">
                <input className="form-control" type="text" placeholder="Url" name="url" />
            </div>
            <div className="mb-3">
                <input className="form-control" type="text" placeholder="image url" name="img" />
            </div>
            
             <div className="form-group mb-3">
            </div><input className="form-control btn btn-primary" type="submit" placeholder="Submit" />
        </form>

    </div>

</div>
)



}

export default Admin;