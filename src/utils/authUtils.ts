
// Simple auth utility functions

export const isLoggedIn = (): boolean => {
  const user = localStorage.getItem("user");
  if (!user) return false;
  
  try {
    const userData = JSON.parse(user);
    return userData.isLoggedIn === true;
  } catch (e) {
    return false;
  }
};

export const isAdmin = (): boolean => {
  const user = localStorage.getItem("user");
  if (!user) return false;
  
  try {
    const userData = JSON.parse(user);
    return userData.isLoggedIn === true && userData.role === "admin";
  } catch (e) {
    return false;
  }
};

export const getCurrentUser = () => {
  const user = localStorage.getItem("user");
  if (!user) return null;
  
  try {
    return JSON.parse(user);
  } catch (e) {
    return null;
  }
};

export const logoutUser = () => {
  localStorage.removeItem("user");
};
