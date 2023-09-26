import React, {createContext, useContext, useEffect, useState} from "react";
import auth from "../utils/auth";
import api from "../utils/api";
import MainApi from "../utils/MainApi";

const CurrentUserContext = createContext({
    info: {
        isAuth: false,
        isLoading: false,
        error: "",
        token: localStorage.getItem("jwt"),
        name: "",
        email: "",
    },
    handleUpdateUser: () => {},
    handleLogin: () => {},
    handleRegister: () => {},
});

const UserContextProvider = ({ children }) => {
    const [state, setState] = useState({
        isAuth: false,
        error: "",
        token: localStorage.getItem("jwt"),
        name: "",
        email: "",
    })
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        const jwt = localStorage.getItem("jwt");
        if (jwt && !state.name && !state.email) {
            setLoading(true)

            auth
                .authentication(jwt)
                .then((res) => {
                    setState({
                        isAuth: true,
                        token: jwt,
                        name: res.name,
                        email: res.email,
                    })
                })
                .catch((err) => {
                    setState({
                        ...state, error: err
                    })
                    console.log(err);
                }).finally(() => {
                    setLoading(false)
                })
        }
    }, [state.isAuth]);
    const api = new MainApi(state.token);

    function handleUpdateUser(body) {
       return api
            .updateUser(body, state.token)
            .then((data) => {
                setState({...state, ...data});
                return data;
            })
    }

    function handleLogin(body) {
        return auth
            .login(body)
            .then((res) => {
                console.log(res)
                localStorage.setItem("jwt", res.token)
                setState({...state, ...res, isAuth: true});
                console.log(state)
                return res;
            })
    }

    function handleRegister(body) {
        return auth
            .registration(body)
    }

    function handleLogout() {
        localStorage.removeItem("jwt");
        localStorage.removeItem("search");
        localStorage.removeItem("filter");
        localStorage.removeItem("filteredFilms");
        localStorage.removeItem("favourites");

        setState({
            isAuth: false,
            isLoading: true,
            error: "",
            token: "",
            name: "",
            email: ""
        });
    }

    return (
        <CurrentUserContext.Provider value={{info: {...state, isLoading}, handleUpdateUser, handleLogin, handleRegister, handleLogout}}>
            {children}
        </CurrentUserContext.Provider>
    )
}

function useCurrentUser() {
    return useContext(CurrentUserContext);
}

export {  UserContextProvider, useCurrentUser };
