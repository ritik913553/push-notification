import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";


const firebaseConfig = {
   
};

const vapidKey =
    "BGYQzFM5FDvq2FYX69joZ2lQ_icoyswFQay137n06uuP_qSITFFG1RkRy6_poHwSaJl7doHn564CNoecAULItA8";
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const requestFCMToken = async () => {
    return Notification.requestPermission()
        .then((PermissionStatus) => {
            if (PermissionStatus === "granted") {
                return getToken(messaging, { vapidKey });
            } else {
                throw new Error("Notification not granted");
            }
        })
        .catch((err) => {
            console.log("Error getting FCM Token:", err);
        });
};
