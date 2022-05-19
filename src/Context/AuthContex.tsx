import {createContext, ReactNode, useEffect, useState} from 'react'

import { auth,database,firebase}from '../services/firebase';


type UserGoogle= {
  id:string,
  name:string,
  avatar:string,
  email: string,
  admin? : boolean
}


type AuthContextType={
  user: UserGoogle | undefined,
  signInWithGoogle: ()=> Promise<void>
}

type AuthContextProviderProps={
  children: ReactNode
}


export const AuthContext = createContext({} as AuthContextType)


function AuthContextProvider(props: AuthContextProviderProps){
  
  const [user, setUser]= useState<UserGoogle>() 
  
 /*
  useEffect(()=>{
    const unsubcribe = auth.onAuthStateChanged(user => {
      if(user){
          const{displayName,photoURL,uid} = user
  
         if(displayName && photoURL && displayName === "daniel bauboa"){
            setUser({
              id: uid,
              name: displayName,
              avatar: photoURL,
              admin: true
            })
          }else if (displayName && photoURL){
            console.log('eu');
            
            setUser({
              id: uid,
              name: displayName,
              avatar: photoURL,
            })
          }else{
            throw new Error("Missing information from Google Account."); 
          }
           
        }
    })
    return ()=> {
      unsubcribe()
    }
  },[])

 */
  async function signInWithGoogle(){
    const provider = new firebase.auth.GoogleAuthProvider()

    const result = await  auth.signInWithPopup(provider)
    
      if(result.user){
        const{displayName,photoURL,uid, email} = result.user

       if(displayName && photoURL && displayName === "daniel bauboa" && email){
      
          setUser({
            id: uid,
            name: displayName,
            avatar: photoURL,
            email: email,
            admin: true
          })
        }else if (displayName && photoURL && email){
          
          setUser({
            id: uid,
            name: displayName,
            avatar: photoURL,
            email: email
          })
        }else{
          throw new Error("Missing information from Google Account."); 
        }
         
      }
    }

 
  
  

  return (
    <AuthContext.Provider value={{user,signInWithGoogle}}>
     {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider