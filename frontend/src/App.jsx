import React, { useEffect, useState } from "react";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";

const App = () => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("User"));
        console.log(data)
        setUser(data);
    }, []);

    return (
        <div>
            {!user ? (
                <LoginPage setUser={setUser} />
            ) : user.role == "admin" ? (
                <AdminDashboard setUser={setUser} />
            ) : (
                <UserDashboard setUser={setUser} />
            )}
        </div>
    );
};

export default App;
