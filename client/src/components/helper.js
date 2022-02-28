export const clearLocalStorageDate = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userPhone");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("userJoinDate");
    localStorage.removeItem("token");
    localStorage.removeItem("keyboardCat");
}
