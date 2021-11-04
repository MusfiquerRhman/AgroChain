import React, { useState, createContext } from "react";

export const FlashMessageContext = createContext();

export function FlashMessageProvider(props) {
    const [flashMEssageC, setFlashMessageC] = useState("");
    const [isSuccessC, setISSuccessC] = useState(true);

    return(
        <FlashMessageContext.Provider value={{
            flashMEssageC, setFlashMessageC,
            isSuccessC, setISSuccessC
        }}>
            {props.children}
        </FlashMessageContext.Provider>
    )
}
