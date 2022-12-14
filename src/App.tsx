import { FC, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Header } from "./components/Header";
import { Login } from "./components/Login";
import { TimerPage } from "./pages/TimerPage";
import { Signup } from "./components/Signup";
import { SettingsPage } from "./pages/SettingsPage";
import OneSignalReact from "react-onesignal";
import { useAppDispatch } from "./redux/store";
import { registerPush } from "./redux/pushNotifications/thunks";

const App: FC = () => {
    const dispatch = useAppDispatch();
    console.log(OneSignalReact);

    useEffect(() => {
        dispatch(registerPush());
    }, []);

    return (
        <Routes>
            <Route path="/" element={<Header />}>
                <Route path="/" element={<TimerPage />}></Route>
                {/* <Route path="/stats" element={<StatsPage />}></Route> */}
                <Route path="/settings" element={<SettingsPage />}></Route>
            </Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
        </Routes>
    );
};

export { App };
