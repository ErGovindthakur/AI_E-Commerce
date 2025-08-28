import { createContext } from 'react'

// eslint-disable-next-line react-refresh/only-export-components
export const authDataContext = createContext();

const AuthContext = ({children}) => {
     let serverUrl = "http://localhost:9090";

     let value = {
          serverUrl
     };

  return (
    <authDataContext.Provider value={value}>
     {children}
    </authDataContext.Provider>
  )
}

export default AuthContext