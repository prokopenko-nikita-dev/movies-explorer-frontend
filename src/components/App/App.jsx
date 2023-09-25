import { useState } from "react";

import Header from "../Header";
import Main from "../Main";
import Movies from "../Movies";
import Footer from "../Footer";
import {Routes, Route, useNavigate} from "react-router-dom";
import {Login, Register} from "../Auth";

import SavedMovies from "../SavedMovies";
import Profile from "../Profile/Profile";
import NotFoundPage from "../NotFoundPage";
import InfoToolTip from "../InfoToolTip";
import {useCurrentUser} from "../../context/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function App() {
    const {info, handleUpdateUser, handleLogin, handleRegister} = useCurrentUser();
    const {isAuth, isLoading} = info;
 
    const [infoToolTip, setInfoTooltip] = useState({
        message: "",
        isOpen: false,
        success: false,
    });
 

    function onClosePopup() {
        setInfoTooltip({...infoToolTip, isOpen: false});
    }

    function updateUser(body) {
        return handleUpdateUser(body)
        .then(() => {
            setInfoTooltip({
                message: `Вы успешно изменили свои данные!`,
                isOpen: true,
                success: true,
            });
            return true;
        })
            .catch((err) => {
                setInfoTooltip({
                    message: `Ошибка редактирования пользователя! ${err}`,
                    isOpen: true,
                    success: false,
                });
            });
        return false;
    }

    function onLogin(body) {
        return handleLogin(body)
            .then((res) => {
                console.log(res)
                setInfoTooltip({
                    message: "Вы успешно вошли!",
                    isOpen: true,
                    success: true,
                });
                return true;
            })
            .catch((err) => {
                setInfoTooltip({
                    message: `Ошибка авторизации! ${err}`,
                    isOpen: true,
                    success: false,
                });
                return false;
            });
    }

    function onRegister(body) {
        return handleRegister(body)
            .then((_) => {
                console.log(body, _)
                return handleLogin({email: body.email, password: body.password})
            })
            .then((res) => {
                console.log(res)
                setInfoTooltip({
                    message: "Вы успешно зарегистрировались!",
                    isOpen: true,
                    success: true,
                });
                return true;
            })
            .catch((err) => {
                setInfoTooltip({
                    message: `Ошибка регистрации! ${err}`,
                    isOpen: true,
                    success: false,
                });
                return false;
            });
    }

    const Wrap = ({children, header = true, footer = true}) => {
        return (
            <>
                {header && <Header isAuth={isAuth}/>}
                <main>
                    {children}
                </main>
                {footer && <Footer/>}
            </>
        );
    };
    console.log(isAuth, isLoading);

    return (

        <div className="page">
            <Routes>
                <Route
                    exact
                    path="/"
                    element={
                        <Wrap>
                            <Main/>
                        </Wrap>
                    }
                />
                <Route
                    path="/movies"
                    element={
                        <Wrap>
                            <ProtectedRoute flag={isAuth || isLoading}>
                                <Movies/>
                            </ProtectedRoute>
                        </Wrap>
                    }
                />
                <Route
                    path="/saved-movies"
                    element={
                        <Wrap>
                            <ProtectedRoute flag={isAuth || isLoading}>
                                <SavedMovies/>
                            </ProtectedRoute>
                        </Wrap>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <Wrap footer={false}>
                            <ProtectedRoute flag={isAuth || isLoading}>
                                <Profile onUpdate={updateUser}/>
                            </ProtectedRoute>
                        </Wrap>
                    }
                />
                <Route
                    path="/signin"
                    element={
                        <ProtectedRoute flag={!isAuth || isLoading}>
                            <main><Login onLogin={onLogin} success={infoToolTip.success}/></main>
                        </ProtectedRoute>
                        }
                />
                <Route
                    path="/signup"
                    element={
                        <ProtectedRoute flag={!isAuth || isLoading}>
                            <main><Register onRegister={onRegister} success={infoToolTip.success}/></main>
                        </ProtectedRoute>
                        }
                />
                <Route path="*" element={<main><NotFoundPage/></main>}/>
            </Routes>
            <InfoToolTip onClose={onClosePopup} infoToolTip={infoToolTip}/>
        </div>
    );
}

export default App;
