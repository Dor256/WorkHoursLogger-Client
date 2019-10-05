export const validUser = (user: GoogleUser | null): boolean => {
    if(user) {
        return user.getBasicProfile().getEmail().split("@")[1] === "techsee.me";
    } 
    return false;
} 

const userAgent = window.navigator.userAgent;

export const isUsingSafari = userAgent.indexOf("Chrome") === -1 && userAgent.indexOf("Safari") > -1;