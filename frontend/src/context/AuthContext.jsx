import React, { createContext } from 'react'


export const authDataContext = createContext();
let serverUrl = "https://onecart-rvf9.onrender.com"

const AuthContext = ({children}) => {

    let value = {
        serverUrl
    }
  return (
    <div>
        <authDataContext.Provider value={value}>
            {children}
        </authDataContext.Provider>
        </div>
  )
}

export default AuthContext
