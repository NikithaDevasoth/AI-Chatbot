import { createContext, useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import { dummyChats,dummyUserData } from "../assets/assets";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [chats, setChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    const fetchUser = async () => {
        setUser(dummyUserData); // Make sure dummyUserData is defined/imported
    };

    const fetchUsersChat = async () => {
        setChats(dummyChats); // Make sure dummyChats is defined/imported
        setSelectedChat(dummyChats[0]);
    };

    useEffect(() => {
        if (user) {
            fetchUsersChat();
        } else {
            setChats([]);
            setSelectedChat(null);
        }
    }, [user]);

    useEffect(() => {
        localStorage.setItem("theme", theme);
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [theme]);

    useEffect(() => {
        fetchUser();
    }, []);

    const value = {
        navigate,
        user, setUser, fetchUser,
        chats, setChats,
        selectedChat, setSelectedChat,
        theme, setTheme
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);
