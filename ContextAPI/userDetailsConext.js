import React, { useState, createContext } from "react";

export const userContext = createContext();

export function userProvider(props) {
    const [token, setToken] = useState("");
    const [userId, setId] = useState("");
    const [userEmail, setEmail] = useState("");
    const [userName, setName] = useState("");
    const [userPhone, setPhone] = useState("");
    const [userType, setType] = useState("");
    const [userJoinDate, setJoinDate] = useState("");
    
    return(
        <userContext.Provider value={{
            token, setToken,
            userId, setId,
            userEmail, setEmail,
            userName, setName,
            userPhone, setPhone,
            userType, setType,
            userJoinDate, setJoinDate
        }}>
            {props.children}
        </userContext.Provider>
    )
}
