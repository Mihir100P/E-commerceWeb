import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState(null);
  
   useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    const adminToken = localStorage.getItem("adminToken");
    const storedUser = localStorage.getItem("user");
    const storedAdmin = localStorage.getItem("admin");

    if (userToken && storedUser) {
      setUser(JSON.parse(storedUser));
    } else if (adminToken && storedAdmin) {
      setAdmin(JSON.parse(storedAdmin));
    }

    setLoading(false);
  }, []);


  const login = (token, userData) => {
    localStorage.setItem("userToken", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };
  
  const reg = (token, userData) => {
    localStorage.setItem("userToken", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("user");
    setUser(null);
  };

  const AdminLogin = (token, adminData) => {
    localStorage.setItem("adminToken", token);
    localStorage.setItem("admin", JSON.stringify(adminData));
    setAdmin(adminData);
  };
  
  const Adminreg = (token, adminData) => {
    localStorage.setItem("adminToken", token);
    localStorage.setItem("admin", JSON.stringify(adminData));
    setAdmin(adminData);
  };

  const AdminLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin");
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, Adminreg, AdminLogin, AdminLogout, user, reg, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
