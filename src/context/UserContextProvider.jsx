import React, { useState } from 'react'
import userContext from './userContext'

function UserContextProvider({children}) {

    const [userData, setUserData] = useState(null)
  return (
    <userContext.Provider value={{userData,setUserData}}>
        {children}
    </userContext.Provider>
  )
}

export default UserContextProvider