import React, { useEffect } from "react";
import { requestFCMToken } from "../utils/firebase";
import { notifyAdmin, update } from "../http";

const UserDashboard = ({ setUser }) => {
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
    const handlePlaceOrder = async () => {
        const user = JSON.parse(localStorage.getItem("User"));
        try {
            const res = await notifyAdmin({ userId: user?._id });
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="min-h-screen bg-gray-100 text-gray-900">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-blue-600">
                        User Dashboard
                    </h1>
                    <div className="flex items-center space-x-4">
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                            Active
                        </span>
                        <button
                            onClick={logoutHandler}
                            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg"
                        >
                            Logout
                        </button>
                    </div>
                </header>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-xl shadow">
                        <h3 className="text-gray-500 mb-2">Orders Placed</h3>
                        <p className="text-3xl font-bold">24</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow">
                        <h3 className="text-gray-500 mb-2">Pending Orders</h3>
                        <p className="text-3xl font-bold">3</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow">
                        <h3 className="text-gray-500 mb-2">Wallet Balance</h3>
                        <p className="text-3xl font-bold">$245.50</p>
                    </div>
                </div>

                {/* Main Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow">
                        <h2 className="text-xl font-semibold mb-4">
                            Quick Actions
                        </h2>
                        <div className="space-y-3">
                            <button
                                onClick={handlePlaceOrder}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                            >
                                Place New Order
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
