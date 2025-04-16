import { useState, createContext } from "react";

const UserContext = createContext();


const UserContextProvider = ({children})=>{
    const [isLoggedIn , setLoggedIn] = useState(false);
    return  (
        <UserContext.Provider value={{isLoggedIn,setLoggedIn}}>
             {children}
        </UserContext.Provider>
    )
}
export { UserContextProvider, UserContext }