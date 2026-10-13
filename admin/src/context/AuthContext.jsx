import { createContext } from 'react'
import React from 'react'

export const authDataContext = createContext()

const AuthContext = ({children}) => {

    let serverUrl = "https://onecart-rvf9.onrender.com"

    let value ={
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
