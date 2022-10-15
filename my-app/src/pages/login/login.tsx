import assert from "assert";
import React, { useEffect, useState } from "react";
import supabase from "../../components/supabase";
import "./login.css"


function Login({ setToken } : any, { setLoggedIn } : any){
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  let familyArray: any[] | null = null;
  

  useEffect(() => {
    getFamilies()
    console.log("lskfgjskjdfg;lksdjfg;kldjfgjklsdf;gjsdlkg")
  })

  const getFamilies = async function getFamilyAsync() {
    let {data, error} = await supabase
    .from('families')
    .select();
    familyArray = data
  }

  function verifyLogin() {
    console.log("button clicked")
    if (familyArray != null) {
      let validUser = false
      let validPass = false
      for (let i = 0; i < familyArray.length; i++) {
        if(username == familyArray[i]['username']) {
          validUser = true
        } 
        if(password == familyArray[i]['password']) {
          validPass = true
          console.log('success')
          console.log('success')
          console.log('success')

          setToken(familyArray[i]['id'])
          setLoggedIn(true)
          break;
        } else {
          console.log("failure")
          console.log("failure")
          console.log("failure")
          console.log("failure")
          break;
        }

      }

    }
  
  }


  return (
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={verifyLogin}>
        <label>
          <p>Username</p>
          <input type="text" onChange={e => setUsername(e.target.value)}/>
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)}/>
        </label>
        <div>
          <button type="submit" >Submit</button>
        </div>
      </form>
    </div>
  )
}

export default Login;


