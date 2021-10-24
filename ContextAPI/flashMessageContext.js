import React, { useState, createContext } from "react";

export const FlashMessageContext = createContext();

export function FlashMessageProvider(props) {
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [infoMessage, setInfoMessage] = useState("");

    return(
        <FlashMessageContext.Provider value={{
            successMessage, setSuccessMessage,
            errorMessage, setErrorMessage,
            infoMessage, setInfoMessage
        }}>
            {props.children}
        </FlashMessageContext.Provider>
    )
}
