export const validUser = (user: GoogleUser): boolean => {
    const userProfile = user.getBasicProfile();
    if(userProfile) {
        return userProfile.getEmail().split("@")[1] === "techsee.me";
    }
    return false;
} 

const userAgent = window.navigator.userAgent;

export const isUsingSafari = userAgent.indexOf("Chrome") === -1 && userAgent.indexOf("Safari") > -1;

export const getHelloMessage = (userName: string): string => {
    const currentHour = new Date().getHours();
    if(currentHour < 12 && currentHour > 0) {
        return `Good Morning ${userName}`;
    } else if(currentHour >= 12 && currentHour < 18) {
        return `Good Afternoon ${userName}`;
    }
    return `Good Evening ${userName}`;
}