"use client"

import { createContext, useState } from "react";

type ThemeContextType = {
    darkTheme : boolean;
    setDarkTheme : (darkTheme : boolean) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export default function ThemeProvider({ children} : {children : React.ReactNode}) {

    const [ darkTheme, setDarkTheme ] = useState(false)

    return (
        <ThemeContext.Provider value={{darkTheme, setDarkTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}