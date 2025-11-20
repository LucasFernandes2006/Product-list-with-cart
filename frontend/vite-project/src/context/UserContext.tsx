import { createContext, useState, useEffect, type ReactNode } from "react";

type User ={
    name:string;
    user_type:string
};

type UserContextType ={
    loginUser:User;
    userInfo:(nameUser:string, typeUser: string) => void;
}
export const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider= ({children}: {children: ReactNode}) =>{
    const [loginUser, setLoginUser] = useState<User>(() =>{
        const stored = localStorage.getItem("loginUser");
        return stored ? JSON.parse(stored) : {name: "", user_type: ""}
    });

    useEffect (()=>{
    localStorage.setItem("loginUser", JSON.stringify(loginUser))
    }, [loginUser])

    const userInfo = (nameUser:string, typeUser: string) =>{
        setLoginUser(prevUser => ({
            ...prevUser,
            name: nameUser, 
            user_type:typeUser,
        }));
    };
    return (
        <UserContext.Provider value={{loginUser, userInfo}}> 
            {children}
        </UserContext.Provider>
    );
};