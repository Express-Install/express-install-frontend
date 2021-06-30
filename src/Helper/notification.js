import {
    NotificationManager
} from "react-notifications";

export const createNotification = (type, message) => {
    switch (type) {
        case "error":
            NotificationManager.error(message, "ERROR");
            break;
        case "info":
            NotificationManager.info(message, "INFO");
        case "success":
            NotificationManager.success(message, "SUCCESS");
        default:
            break;
    }
}