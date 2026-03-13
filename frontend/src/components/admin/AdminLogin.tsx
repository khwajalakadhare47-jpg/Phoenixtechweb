import { useState } from "react";
import {
  AlertCircle,
  Loader2,
  Lock,
  ArrowLeft
} from "lucide-react";
import logoImage from "../../assets/logophoneix.png";
import { useAdmin } from "../../contexts/AdminContext";

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onExitToSite: () => void;
}

export function AdminLogin({ onLoginSuccess, onExitToSite }: AdminLoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAdmin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!username.trim() || !password.trim()) {
      setError("Please enter both username and password");
      return;
    }
    
    setIsLoading(true);

    try {
      const success = await login(username, password);
      
      if (success) {
        setUsername("");
        setPassword("");
        onLoginSuccess();
      } else {
        setError("Invalid username or password");
        setPassword("");
      }
    } catch (err) {
      if (err instanceof Error) {
        if (err.message.includes("Network")) {
          setError("Network error. Please check your connection.");
        } else if (err.message.includes("timeout")) {
          setError("Request timeout. Please try again.");
        } else {
          setError("Login failed. Please try again.");
        }
      } else {
        setError("An unexpected error occurred");
      }
      setPassword("");
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0B0C10] via-[#111827] to-[#1F2933] px-4">
      
      {/* Glass Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 sm:p-8">
        <div className="mb-4">
          <button
            type="button"
            onClick={onExitToSite}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#0F0F12] hover:text-[#1F2933]"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Website
          </button>
        </div>
        
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img
              src={logoImage}
              alt="Phoenix Tech Academy"
              className="h-12 w-12 object-contain"
            />
            <div className="text-left">
              <h1 className="text-xl sm:text-2xl font-bold text-[#0F0F12] leading-tight">
                Phoenix Tech Academy
              </h1>
              <p className="text-sm text-[#C9A24D] font-medium">
                Admin Panel
              </p>
            </div>
          </div>
          <h2 className="text-lg font-semibold text-gray-800">
            Secure Admin Login
          </h2>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl flex gap-3 animate-in fade-in duration-300">
            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Username */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter admin username"
              disabled={isLoading}
              className="w-full px-4 py-4 rounded-xl bg-white text-gray-900 placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C9A24D] focus:border-[#C9A24D] transition text-base disabled:opacity-60 disabled:cursor-not-allowed"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              disabled={isLoading}
              className="w-full px-4 py-4 rounded-xl bg-white text-gray-900 placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C9A24D] focus:border-[#C9A24D] transition text-base disabled:opacity-60 disabled:cursor-not-allowed"
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading || !username.trim() || !password.trim()}
            className="w-full mt-2 bg-[#0F0F12] text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 hover:bg-[#1F2933] disabled:bg-gray-400 disabled:text-gray-200 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#C9A24D] focus:ring-offset-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Logging in...
              </>
            ) : (
              <>
                <Lock className="w-5 h-5" /> {/* Kept the lock on the button as per common UI patterns, but let me know if you want it gone from here too! */}
                Login
              </>
            )}
          </button>
        </form>



        {/* Security Note */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-400 flex items-center justify-center gap-1">
            <Lock className="w-4 h-4" />
            Your credentials are securely encrypted
          </p>
        </div>

      </div>
    </div>
  );
}