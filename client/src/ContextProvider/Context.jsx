import React, { createContext, useState } from 'react'

export const LoginContext=createContext();

function Context({children}) {

  const [logindata, setlogindata] = useState("")
  return (
    <>
    <LoginContext.Provider value={{logindata,setlogindata}}>
    {children}
    </LoginContext.Provider>
    </>
  )
}

export default Context