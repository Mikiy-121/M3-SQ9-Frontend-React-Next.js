import { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "./AuthContext";
import { isValidLocalPhone, toFullPhone } from "./phone";

const STORAGE_KEY = "addis-eats-user";

function readStoredUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoredUser);

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  function login(localNumber) {
    const trimmed = localNumber.trim();
    if (!isValidLocalPhone(trimmed)) return false;
    setUser({ phone: toFullPhone(trimmed) });
    return true;
  }

  function logout() {
    setUser(null);
  }

  const value = useMemo(() => ({ user, login, logout }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
