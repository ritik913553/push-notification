import React, { useState } from "react";
import { login, register } from "../http";

const LoginPage = ({setUser}) => {
    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [regUsername, setRegUsername] = useState("");
    const [regPassword, setRegPassword] = useState("");

    const [darkMode, setDarkMode] = useState(true);
    const [error, setError] = useState("");
    const [isLogin, setIsLogin] = useState(true);

    const handleLogin = async () => {
        if (!loginUsername.trim() || !loginPassword.trim()) {
            setError("Please enter both username and password");
            return;
        }

        setError("");
        
        alert(`Welcome ${loginUsername}! Logged in as user`);
        try {
          const res = await login({userName:loginUsername, password:loginPassword});
          localStorage.setItem("User", JSON.stringify(res.data.user));
          setUser(res.data.user);
          console.log(res);
          setLoginUsername("");
          setLoginPassword("");
        } catch (error) {
          console.log(error)
        }
    };

    const handleRegister = async (role) => {
        if (!regUsername.trim() || !regPassword.trim()) {
            setError("Please enter both username and password");
            return;
        }
        if (regUsername.includes(" ")) {
            setError("Username should not contain spaces");
            return;
        }

        setError("");
        alert(`Registered ${regUsername} as ${role} `);
        console.log(`${role} registered with username: ${regUsername}`);
        try {
            const res = await register({
                userName: regUsername,
                password: regPassword,
                role: role,
            });
            setIsLogin((prev)=>!prev);
            setRegUsername("");
            setRegPassword("");
            console.log(res);
        } catch (error) {
          console.log(error)
        }
    };

    return (
        <div
            className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
                darkMode ? "bg-gray-900" : "bg-gray-100"
            }`}
        >
            <div>
                <div
                    className={`flex mb-2 gap-x-10 ${
                        darkMode ? "text-white" : "text-black"
                    }`}
                >
                    <button
                        onClick={() => setIsLogin(true)}
                        className={`p-3 py-1 border-1 rounded-md ${
                            isLogin
                                ? darkMode
                                    ? "bg-gray-700"
                                    : "bg-gray-300"
                                : ""
                        }`}
                    >
                        Login
                    </button>
                    <button
                        onClick={() => setIsLogin(false)}
                        className={`p-3 py-1 border-1 rounded-md ${
                            !isLogin
                                ? darkMode
                                    ? "bg-gray-700"
                                    : "bg-gray-300"
                                : ""
                        }`}
                    >
                        Register
                    </button>
                </div>

                {isLogin ? (
                    <div
                        className={`w-full max-w-md p-8 rounded-lg shadow-xl ${
                            darkMode ? "bg-gray-800" : "bg-white"
                        }`}
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h1
                                className={`text-2xl font-bold ${
                                    darkMode ? "text-white" : "text-gray-800"
                                }`}
                            >
                                Login
                            </h1>
                            <button
                                onClick={() => setDarkMode(!darkMode)}
                                className={`p-2 rounded-full ${
                                    darkMode
                                        ? "bg-gray-700 hover:bg-gray-600"
                                        : "bg-gray-200 hover:bg-gray-300"
                                }`}
                            >
                                {darkMode ? "☀️" : "🌙"}
                            </button>
                        </div>

                        <div className="mb-4">
                            <label
                                className={`block mb-2 text-sm font-medium ${
                                    darkMode ? "text-gray-300" : "text-gray-700"
                                }`}
                            >
                                Username
                            </label>
                            <input
                                type="text"
                                value={loginUsername}
                                onChange={(e) =>
                                    setLoginUsername(e.target.value)
                                }
                                className={`w-full p-3 rounded-lg border ${
                                    darkMode
                                        ? "bg-gray-700 border-gray-600 text-white"
                                        : "bg-white border-gray-300 text-gray-900"
                                }`}
                            />
                        </div>

                        <div className="mb-6">
                            <label
                                className={`block mb-2 text-sm font-medium ${
                                    darkMode ? "text-gray-300" : "text-gray-700"
                                }`}
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                value={loginPassword}
                                onChange={(e) =>
                                    setLoginPassword(e.target.value)
                                }
                                className={`w-full p-3 rounded-lg border ${
                                    darkMode
                                        ? "bg-gray-700 border-gray-600 text-white"
                                        : "bg-white border-gray-300 text-gray-900"
                                }`}
                            />
                            {error && (
                                <p className="mt-2 text-sm text-red-500">
                                    {error}
                                </p>
                            )}
                        </div>

                        <button
                            onClick={handleLogin}
                            className={`w-full py-3 px-4 rounded-lg font-medium ${
                                darkMode
                                    ? "bg-blue-600 hover:bg-blue-700"
                                    : "bg-blue-500 hover:bg-blue-600"
                            } text-white`}
                        >
                            Login
                        </button>
                    </div>
                ) : (
                    <div
                        className={`w-full max-w-md p-8 rounded-lg shadow-xl ${
                            darkMode ? "bg-gray-800" : "bg-white"
                        }`}
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h1
                                className={`text-2xl font-bold ${
                                    darkMode ? "text-white" : "text-gray-800"
                                }`}
                            >
                                Register
                            </h1>
                            <button
                                onClick={() => setDarkMode(!darkMode)}
                                className={`p-2 rounded-full ${
                                    darkMode
                                        ? "bg-gray-700 hover:bg-gray-600"
                                        : "bg-gray-200 hover:bg-gray-300"
                                }`}
                            >
                                {darkMode ? "☀️" : "🌙"}
                            </button>
                        </div>

                        <div className="mb-4">
                            <label
                                className={`block mb-2 text-sm font-medium ${
                                    darkMode ? "text-gray-300" : "text-gray-700"
                                }`}
                            >
                                Username (no spaces)
                            </label>
                            <input
                                type="text"
                                value={regUsername}
                                onChange={(e) => setRegUsername(e.target.value)}
                                className={`w-full p-3 rounded-lg border ${
                                    darkMode
                                        ? "bg-gray-700 border-gray-600 text-white"
                                        : "bg-white border-gray-300 text-gray-900"
                                }`}
                            />
                        </div>

                        <div className="mb-6">
                            <label
                                className={`block mb-2 text-sm font-medium ${
                                    darkMode ? "text-gray-300" : "text-gray-700"
                                }`}
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                value={regPassword}
                                onChange={(e) => setRegPassword(e.target.value)}
                                className={`w-full p-3 rounded-lg border ${
                                    darkMode
                                        ? "bg-gray-700 border-gray-600 text-white"
                                        : "bg-white border-gray-300 text-gray-900"
                                }`}
                            />
                            {error && (
                                <p className="mt-2 text-sm text-red-500">
                                    {error}
                                </p>
                            )}
                        </div>

                        <div className="space-y-4">
                            <button
                                onClick={() => handleRegister("admin")}
                                className={`w-full py-3 px-4 rounded-lg font-medium ${
                                    darkMode
                                        ? "bg-purple-600 hover:bg-purple-700"
                                        : "bg-purple-500 hover:bg-purple-600"
                                } text-white`}
                            >
                                Register as Admin
                            </button>
                            <button
                                onClick={() => handleRegister("user")}
                                className={`w-full py-3 px-4 rounded-lg font-medium ${
                                    darkMode
                                        ? "bg-blue-600 hover:bg-blue-700"
                                        : "bg-blue-500 hover:bg-blue-600"
                                } text-white`}
                            >
                                Register as User
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoginPage;
