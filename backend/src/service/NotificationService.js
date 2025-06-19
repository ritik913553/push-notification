const admin = require("../utils/firebase");
class NotificationService {
    static async sendNotification(deviceToken, title, body) {
        const message = {
            notification: {
                title,
                body,
            },
            token: deviceToken,
        };
        try {
            const response = await admin.messaging().send(message);
            return response;
        } catch (err) {
            throw err;
        }
    }

    static async sendNotificationToMultipleDevices(deviceTokens, title, body) {
        const messages = deviceTokens.map(token =>({
            notification: {
                title,
                body,
            },
            token: token,
        }))

        try {
            const response = await admin.messaging().sendEach(messages);
            return response; 
        } catch (err) {
            throw err;
        }
    }
}

module.exports = NotificationService;
