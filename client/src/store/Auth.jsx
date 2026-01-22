import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [services, setServices] = useState([]);
    const authorizationToken = `Bearer ${token}`;

    const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

    const storeTokenInLS = (serverToken) => {
        setToken(serverToken);
        return localStorage.setItem('token', serverToken);
    };

    let isLoggedIn = !!token;
    //console.log("isLoggedIn", isLoggedIn);

    //tackling the logouto functionality
    const LogoutUser = () => {
        setToken(null);
        setUser("");
        localStorage.removeItem("token");
    };

    // JWT authentication - to get the currently logged user data 

    const userAuthentication = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`${API}/api/auth/user`, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,

                }
            });
            if (response.ok) {
                const data = await response.json();
                setUser(data.userData);
                setIsLoading(false);
            }
            if (response.status === 401) {
                setUser("");
                setIsLoading(false);
                return;
            }


        } catch (error) {
            console.error({ error: "Error fetching user data" });
        }
    };

    // to fetch the services data from the database
    const getServices = async () => {
        try {
            const response = await fetch(`${API}/api/data/service`, {
                method: "GET",
            })

            if (response.ok) {
                const data = await response.json();
                setServices(data.msg);
            }
        } catch (error) {
            console.log(`Services frontend error:${error}`);
        }
    }

    useEffect(() => {
        getServices();
        if (token) {
            userAuthentication();
        } else {
            setUser("");
            setIsLoading(false);
        }
    }, [token]);


    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                storeTokenInLS,
                LogoutUser,
                user,
                services,
                authorizationToken,
                isLoading,
                API,
            }}>
            {children}
        </AuthContext.Provider>
    );
};


export const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    if (!authContextValue) {
        throw new Error("useAuth used outside of the Provider");
    }

    return authContextValue;
};