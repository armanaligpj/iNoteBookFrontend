import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
  const[credentials,setCredentials]=useState({name:"",email:"",password:"",cpassword:""})
  let navigate= useNavigate();
  const onChange=(e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value})
  }
  const handleSignup = async (e)=>{
    e.preventDefault(); 
    const response = await fetch(`http://localhost:4000/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password })
    });
    const json=await response.json()
    console.log(json)
    if(json.sucess){
      localStorage.setItem('token',json.authToken)
      props.showAlert("Account Create Sucessfully ","success")
      navigate("/")
    }else{
      props.showAlert("User Already Exist Login","danger")
    }
  }
  return (
    <div className='container'>
      <h2 className="mb-4 mt-4">Login To Continue with iNotebook</h2>
      <form onSubmit={handleSignup}>
  <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" onChange={onChange} value={credentials.name} required minLength={3} />
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange} value={credentials.email} required/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name="password" onChange={onChange} value={credentials.password} minLength={8} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} value={credentials.cpassword} minLength={8} required/>
  </div>
  <button type="submit" className="btn btn-primary" >SignUp</button>
</form>
    </div>
  )
}

export default Signup
