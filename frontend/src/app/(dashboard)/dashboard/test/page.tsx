"use client";

import { useEffect, useState } from "react";

export default function TestPage() {
  const [token, setToken] = useState<string | null>(null);
  const [backendStatus, setBackendStatus] = useState("Checking...");

  useEffect(() => {
    // Check localStorage
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);

    // Check backend
    fetch("http://localhost:5000/api/auth/test")
      .then(() => setBackendStatus("✅ Backend is running"))
      .catch(() => setBackendStatus("❌ Backend is NOT running"));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Diagnostic Page</h1>
      
      <div className="space-y-4">
        <div className="bg-white/5 p-4 rounded-xl">
          <h2 className="font-bold mb-2">Authentication Token:</h2>
          <p className="text-sm break-all">{token ? `✅ ${token.substring(0, 50)}...` : "❌ No token found - Please login"}</p>
        </div>

        <div className="bg-white/5 p-4 rounded-xl">
          <h2 className="font-bold mb-2">Backend Status:</h2>
          <p className="text-sm">{backendStatus}</p>
        </div>

        <div className="bg-white/5 p-4 rounded-xl">
          <h2 className="font-bold mb-2">Quick Actions:</h2>
          <button 
            onClick={() => window.location.href = '/login'}
            className="px-4 py-2 bg-blue-600 rounded-lg mr-2"
          >
            Go to Login
          </button>
          <button 
            onClick={() => {
              localStorage.clear();
              alert("Cache cleared! Please login again.");
              window.location.href = '/login';
            }}
            className="px-4 py-2 bg-red-600 rounded-lg"
          >
            Clear Cache & Login
          </button>
        </div>
      </div>
    </div>
  );
}
