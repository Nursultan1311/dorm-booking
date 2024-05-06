import {createBrowserRouter} from "react-router-dom";
import Registration from "./pages/Registration/Registration";
import Contract from "./pages/Contract/Contract";
import Verify from "./pages/Verify/Verify";
import Profile from "./pages/Profile/Profile";
import Documents from "./pages/Documents/Documents";
import Login from "./pages/Login/Login";
import Main from "./pages/Main/Main";
import Booking from "./pages/Booking/Booking";
import PickPlace from "./pages/PickPlace/PickPlace";
import University from "./pages/University/University";

export const router = createBrowserRouter([
        {
            path: "/",
            element: <Main/>
        },
        {
            path: "/registration",
            element: <Registration/> // Pass the user's login status
        },
        {
            path: "/login",
            element: <Login/>
        },
        {
            path: "/contract",
            element: <Contract/> // Pass the user's login status
        },
        {
            path: "/verify",
            element: <Verify/> // Pass the user's login status
        },
        {
            path: "/profile",
            element: <Profile/>
        },
        {
            path: "/documents",
            element: <Documents/>
        },
        {
            path: '/bookings',
            element: <Booking/>
        },
        {
            path: "/university/:id",
            element: <University/>,
        },
    ]
);
