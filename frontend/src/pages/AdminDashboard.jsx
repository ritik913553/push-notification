import React, { useEffect, useState } from "react";
import { requestFCMToken } from "../utils/firebase";
import { brodcast, update } from "../http";

const AdminDashboard = ({ setUser }) => {
    const [notification, setNotification] = useState("");
    const [notificationsSent, setNotificationsSent] = useState([
        "System maintenance tonight at 2AM",
        "New feature update available",
        "Please update your profile information",
    ]);

    const handleSendNotification = async () => {
        if (!notification.trim()) return;
        const user = JSON.parse(localStorage.getItem("User"));

        console.log("Notification sent:", notification);
        try {
            const res = await brodcast({
                adminId: user._id,
                body: notification,
            });
            console.log(res)
        } catch (error) {
            console.log(error);
        }
        setNotificationsSent([notification, ...notificationsSent]);
        setNotification("");
    };
    const logoutHandler = (e) => {
        e.preventDefault();
        localStorage.removeItem("User");
        setUser(null);
    };

    useEffect(() => {
        const fetchFCMToken = async () => {
            try {
                const token = await requestFCMToken();
                const user = JSON.parse(localStorage.getItem("User"));
                console.log(token);
                console.log(user);
                if (!user) {
                    setUser(null);
                }
                const res = await update({ fcmToken: token }, user._id);
                setUser(res.data.user);
                localStorage.setItem("User", JSON.stringify(res.data.user));
                console.log(res);
            } catch (error) {
                console.log("Error getting FCM Token:", error);
            }
        };
        fetchFCMToken();
    }, []);

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-purple-400">
                        Admin Dashboard
                    </h1>
                    <div className="flex items-center space-x-4">
                        <span className="bg-green-900 text-green-300 px-3 py-1 rounded-full text-sm">
                            Administrator
                        </span>
                        <button
                            onClick={logoutHandler}
                            className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg"
                        >
                            Logout
                        </button>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Admin Stats */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-gray-800 p-6 rounded-xl shadow">
                            <h3 className="text-gray-400 mb-2">Total Users</h3>
                            <p className="text-3xl font-bold text-white">
                                1,245
                            </p>
                        </div>
                        <div className="bg-gray-800 p-6 rounded-xl shadow">
                            <h3 className="text-gray-400 mb-2">Active Today</h3>
                            <p className="text-3xl font-bold text-green-400">
                                342
                            </p>
                        </div>
                        <div className="bg-gray-800 p-6 rounded-xl shadow">
                            <h3 className="text-gray-400 mb-2">
                                Notifications Sent
                            </h3>
                            <p className="text-3xl font-bold text-blue-400">
                                {notificationsSent.length}
                            </p>
                        </div>
                    </div>

                    {/* Notification Panel */}
                    <div className="lg:col-span-2">
                        <div className="bg-gray-800 p-6 rounded-xl shadow mb-6">
                            <h2 className="text-xl font-semibold mb-4">
                                Send Notification to All Users
                            </h2>
                            <div className="space-y-4">
                                <textarea
                                    value={notification}
                                    onChange={(e) =>
                                        setNotification(e.target.value)
                                    }
                                    placeholder="Type your notification message here..."
                                    className="w-full p-3 rounded-lg bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                                    rows="3"
                                />
                                <button
                                    onClick={handleSendNotification}
                                    className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                                >
                                    Broadcast Notification
                                </button>
                            </div>
                        </div>

                        {/* Notification History */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
