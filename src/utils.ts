export const validUser = (user: GoogleUser): boolean => {
    const userProfile = user.getBasicProfile();
    if(userProfile) {
        return (userProfile.getEmail().split("@")[1] === "techsee.me") || userProfile.getEmail() === "workloggersd@gmail.com";
    }
    return false;
} 

const userAgent = window.navigator.userAgent;

export const isUsingSafari = userAgent.indexOf("Chrome") === -1 && userAgent.indexOf("Safari") > -1;

export const inProduction = process.env.NODE_ENV === "production";