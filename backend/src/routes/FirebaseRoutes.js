const express = require("express");
const router = express.Router();
const User = require("../model/UserModel");
const NotificationService = require("../service/NotificationService");
// Notify a user (generic)

router.post("/register", async (req, res) => {
    try {
        const { userName, password, role } = req.body;
        if (!userName || !password || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const user = new User({ userName, password, role });
        const savedUser = await user.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { userName, password } = req.body;
        if (!userName || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const user = await User.findOne({ userName });
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        const isMatch = user.password === password;
        if (!isMatch) {
            return res.status(401).send({ message: "Incorrect password" });
        }
        await user.save();
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});
router.put("/update-fcm-token/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { fcmToken } = req.body;
        if (!id || !fcmToken) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const user = await User.findByIdAndUpdate(
            id,
            { fcmToken },
            { new: true }
        );
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// Broadcast notification to all users
router.post("/brodcast", async (req, res) => {
    const { adminId, body } = req.body;
    const admin = await User.findOne({ _id: adminId, role: "admin" });
    if (!admin) {
        return res.status(404).send({ message: "Admin not found" });
    }
    const users = await User.find({ role: "user" });
    const deviceTokens = users.map((user) => user.fcmToken).filter(Boolean);
    const notiRes = await NotificationService.sendNotificationToMultipleDevices(
        deviceTokens,
        `New Notification by Admin: ${admin.userName}`,
        body
    );

    res.send(notiRes);
});

// Notify all admins
router.post("/notify-admin", async (req, res) => {
    const { userId } = req.body;
    const user = await User.findOne({ _id: userId, role: "user" });
    if (!user) {
        return res.status(404).send({ message: "User not found" });
    }
    const users = await User.find({ role: "admin" });
    const deviceTokens = users.map((user) => user.fcmToken).filter(Boolean);
    const notiRes = await NotificationService.sendNotificationToMultipleDevices(
        deviceTokens,
        `New Notification by User: ${user.userName}`,
        "Order placed successfully!"
    );

    res.send(notiRes);
});

// Notify a single user
router.post("/notify-single-user", async (req, res) => {
    const { adminId, userName, body } = req.body;
    const admin = await User.findOne({ _id: adminId, role: "admin" });
    if (!admin) {
        return res.status(404).send({ message: "Admin not found" });
    }
    const user = await User.findOne({ userName });
    if (!user) {
        return res.status(404).send({ message: "User not found" });
    }
    const deviceToken = user.fcmToken;
    const notiRes = await NotificationService.sendNotification(
        deviceToken,
        `New Notification by Admin: ${admin.userName}`,
        body
    );
    res.send("Notification sent to single user");
});

module.exports = router;
