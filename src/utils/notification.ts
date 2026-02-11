export const requestNotificationPermission = async (): Promise<boolean> => {
  if (!("Notification" in window)) {
    console.log("This browser does not support notifications");
    return false;
  }

  if (Notification.permission === "granted") {
    return true;
  }

  if (Notification.permission !== "denied") {
    const permission = await Notification.requestPermission();
    return permission === "granted";
  }

  return false;
};

export const showNotification = (
  title: string,
  body: string,
  onClick?: () => void,
) => {
  if (Notification.permission === "granted") {
    const notification = new Notification(title, {
      body,
      tag: "catlog-reminder",
    });

    if (onClick) {
      notification.onclick = onClick;
    }

    // Auto-close after 10 seconds
    setTimeout(() => notification.close(), 10000);
  }
};
