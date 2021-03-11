import React,{useEffect} from 'react'
import firebase  from '../../firebase';
import $ from 'jquery'

const Leaderboard = () =>{
    useEffect(() => {
        const userRef = firebase.database().ref('Users').orderByChild('profile/level');
        userRef.once('value', (snapshot)=>{
            let leaderboard = [];
            snapshot.forEach((child)=>{
                leaderboard.push(child.val().profile)
            })
            leaderboard.reverse()
            leaderboard.sort((x,y)=>{
                if(x.level === y.level)
                return (x.created - y.created);

                else    
                    return 0
            })
            var i=1;
            leaderboard.forEach((leaderboard)=>{
                let classn = (leaderboard.userType==="admin")? "blue" : "" ;

                $("#leaderboard").append(`<tr class=${classn}><th scope='row'>${(leaderboard.userType==="admin")? "Creator" : i++}</th> <th> ${leaderboard.username}</th><th >${leaderboard.level}</th><th >${leaderboard.instituiton}</th></tr>`)
            })
    
        })
    }, [])



    return(
        <div className="leaderboard  p-5 ">
            <table className="table table-light my-5 table-borderless">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Username</th>
                    <th scope="col">Level</th>
                    <th scope="col">Institution</th>
                    </tr>
                </thead>
                <tbody id= "leaderboard">
     
                    
                                        
                </tbody>
                </table>
        </div>
    )
}

export default Leaderboard;