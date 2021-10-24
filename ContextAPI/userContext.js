import React, { useState, createContext } from "react";
import useInputState from '../hooks/useInputState';

export const UserContext = createContext();

export function UserProvider(props) {
    const [userId, setUserId] = useState("");
    const [userName, changeUserName, setUserName] = useInputState("");
    const [userPhoneNo, changeUserPhoneNo, setUserPhoneNo] = useInputState("");
    const [userEmail, changeUserEmail, setUserEmail] = useInputState("");
    const [userType, setUsertype] = useState("");
    const [userJoinDate, setUserJoinDate] = useState("");
    
    return(
        <UserContext.Provider value={{
            userId, userName, userPhoneNo, userEmail, userType, userJoinDate, 
            changeUserName, changeUserPhoneNo, changeUserEmail, 
            setUserId, setUserName, setUserPhoneNo, setUserEmail, setUsertype, setUserJoinDate
        }}>
            {props.children}
        </UserContext.Provider>
    )
}
