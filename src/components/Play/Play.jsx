import React, { useEffect,useState,useCallback } from 'react'
import firebase  from '../../firebase';
import './Play.scss'

const Play = () =>{
    const [msg,setMsg] =useState();
    const [color,setColor] =useState();
    
    const [level,setLevel] = useState();
    const [userData, setUserData] = useState();
    const [question, setQuestion] = useState('');
    const [comment,setComment] = useState('');
    const [url, setUrl] = useState('');
    const [answer, setAnswer] = useState('');
    const [imgurl, setImgurl] = useState('');
    
    
    const getQuestion = useCallback((level) =>{
        const questRef = firebase.database().ref('levels').child(level);
        questRef.on('value', (snapshot)=>{
            setQuestion(snapshot.val().question);
            setUrl(snapshot.val().url);
            setComment(snapshot.val().url);
            setImgurl(snapshot.val().imgurl);
            
        })
    },[])

    const getLevel = useCallback(() =>{
        const user = firebase.auth().currentUser;
        setUserData(user);
        const userId = user.uid;
        const userRef = firebase.database().ref('Users').child(userId + '/profile');
        userRef.on('value', (snapshot)=>{
            setLevel(snapshot.val().level);
            getQuestion(snapshot.val().level);
        })

    },[getQuestion])

    const nextLevel = () =>{
        setMsg("Correct Answer")
                setColor("success")
                setTimeout(()=>setMsg(null),2000 )
            
        let nextLevel = level;
        const date = new Date();
                
        const userReference = firebase.database().ref('Users').child(userData.uid + '/profile');
        userReference
        .update({
            created: date.getTime(),
            level: ++nextLevel
        })

        setQuestion(null);
        setUrl(null);
        setComment(null);
        setLevel(null);
        setUserData(null);
        setImgurl(null);
        getLevel();
    }

    const checkAnswer = (e) =>{
        e.preventDefault();
        e.target.submit.disabled = true;    
       
        e.target.submit.value = "Checking"
       
        const answerRef = firebase.database().ref('levels').child(level);
        answerRef.on('value', (snapshot)=>{
            if(answer === snapshot.val().answer){
                
                nextLevel();
              
            }
            else{
              setMsg("Wrong answer, Try again")
              setColor("danger")
        
              setTimeout(()=>setMsg(null),1000 )
            }
        })
        
        setTimeout(()=>{
            e.target.submit.disabled = false;    
            e.target.submit.value = "SUBMIT"
       
        }, 1000);
       
    }



    useEffect(()=>{
        getLevel();
    },[getLevel])
    return(
        <div className="parent">
            {msg?
            <div className={`alert alert-${color} alert-dismissible fade show alert-custom`} role="alert">
            <strong>{msg}</strong>
            <button type="button" className="btn-close btn-sm" data-dismiss="alert" aria-label="Close"></button>
            </div>:
            <></>
            }
            <div className="form-container">
            <h1 className="text-white">Level {level}</h1>
           
            <form className="question-form" onSubmit={checkAnswer} >
                {question || url?
                <div className="Question d-flex flex-column align-items-center">
                    {question} {url?
                       
                    <audio controls className="my-4">
                        <source src={url}/>
                    </audio>
                         
                         :imgurl?
                         <img style="width:200px; height:100px" src={imgurl} alt="image"/>
                         :
                         <></>
                         }
                    
                </div>
                :
                <div className="spinner-border my-5" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
                }
                <div className="form-group">
                    <input className="form-control mb-3" onChange={(e)=>{setAnswer(e.target.value)}} name="Answer" type="text"/></div>
                <div className="form-group">
                    <input className="form-control mb-3" type="submit" name="submit" value = "SUBMIT" />
                </div>
        
            </form>
            <div className="sneaky">
                {comment}
            </div>
            </div>
        </div>
    )
}

export default Play;