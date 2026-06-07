"use client";

import { useState, useEffect } from "react";

interface User {
  id: string;
  name: string;
  email: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth token
    const token = localStorage.getItem("token");
    if (token) {
      // Fetch user data
      // This is a placeholder - implement actual API call
      setUser({
        id: "1",
        name: "John Doe",
        email: "john@example.com"
      });
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Implement login logic
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    localStorage.setItem("token", data.token);
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return { user, loading, login, logout };
}
