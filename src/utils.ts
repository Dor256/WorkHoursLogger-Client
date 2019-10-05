export const validUser = (user: GoogleUser): boolean => {
    return user.getBasicProfile().getEmail().split("@")[1] === "techsee.me";
} 

const userAgent = window.navigator.userAgent;

export const isUsingSafari = userAgent.indexOf("Chrome") === -1 && userAgent.indexOf("Safari") > -1;