import React , {useState, useEffect} from 'react'
import './Alert.scss'

const Alert = ({heading,content,purpose,setHeading,setContent, setPurpose}) =>{
  const [head, setHead] = useState();
  const [cont, setCont] = useState();
  const [purp, setPurp] = useState();
  
  useEffect(() => {
    setHead(heading)
    setCont(content)
    setPurp(purpose)
    setTimeout(()=>{
      setHeading('')
      setContent('')
      setPurpose('')
    },3000)
  }, [heading,content,purpose,setHeading,setContent,setPurpose])
  return(
    <div className={`alert alert-${purp} alert-dismissible fade show alert-custom`} role="alert">
      <strong>{head}</strong> {cont}
    </div>
    )
}

export default Alert;