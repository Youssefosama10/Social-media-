import { createContext , useState , useEffect } from "react"
import { jwtDecode } from 'jwt-decode'

export const authContext = createContext()

export default function AuthContextProvider ({children}) {

    
    const [ userToken , setUserToken ] = useState(function(){
      return localStorage.getItem('tkn')
    }) 

    const [uesrId, setuesrId] = useState(null)
  

    
    function setAuthenticatedUserToken(tkn)
    {
      setUserToken(tkn)
    }

    function clearUserToken()
    {
      setUserToken(null)
    }

    function decodeUesrToken()
    {
     const decodedToken =  jwtDecode(userToken)
     setuesrId(decodedToken.user)
    }

    useEffect( () => {
      if(userToken)
      {
        decodeUesrToken()
      }
    }, [userToken] )

  return (
    <div>
      <authContext.Provider value={{ userToken , setAuthenticatedUserToken , clearUserToken , uesrId }}>
      {children}
      </authContext.Provider>
    </div>
  )
}
