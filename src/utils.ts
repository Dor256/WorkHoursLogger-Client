export const validUser = (user: GoogleUser | null): boolean => {
    if(user) {
        return user.getBasicProfile().getEmail().split("@")[1] === "techsee.me";
    } 
    return false;
} 