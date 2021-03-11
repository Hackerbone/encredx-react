import React, { useEffect,useState } from 'react'
import Navbar from '../Navbar/Navbar'
import './Dashboard.scss'
const Dashboard = () =>{

    const [user,setUser] = useState()
   
    useEffect(()=>{
        setUser(localStorage.getItem("user"));
    },[])
    return(
        <div className="dashboard">
            <Navbar />
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora labore, maxime esse non molestias, tenetur voluptatum officiis dolor laboriosam eos debitis qui ratione. Officia nemo, quasi unde ea veritatis nulla eum reiciendis laudantium, harum consequatur alias fuga! Quo tenetur, minus perferendis temporibus vitae laboriosam quaerat fuga. Assumenda beatae soluta itaque sint incidunt nostrum iure, labore, sunt animi harum dolorum! Deleniti reiciendis molestias labore? Voluptate quidem, at possimus exercitationem aperiam ratione?
            {/* {user} */}
            </p>
        </div>
    )
}

export default Dashboard;