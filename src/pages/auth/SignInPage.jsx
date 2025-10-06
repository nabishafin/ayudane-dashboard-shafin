import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import logo from "../../assets/logo ayudane.png";

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate(); // ✅ navigation hook

  const handleSubmit = (e) => {
    e.preventDefault();

    // (Optional) You can add real auth logic here
    console.log("Sign in:", { username, password, rememberMe });

    // ✅ After successful login → navigate to dashboard
    navigate("/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md rounded-lg bg-[#F3F8F4] p-8 shadow-lg">
        <div className="space-y-6">
          {/* Logo */}
          <div className="flex justify-center">
            <div className="rounded-full p-2">
              <div className="h-24 w-24 overflow-hidden rounded-full">
                <img
                  src={logo}
                  alt="ayudame logo"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Sign In Heading */}
          <h1 className="text-center text-2xl font-semibold text-gray-900">
            Sign In
          </h1>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username Input */}
            <div className="rounded-md bg-white p-3">
              <input
                type="text"
                placeholder="User name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border-0 p-0 text-gray-900 placeholder:text-gray-500 focus:outline-none"
              />
            </div>

            {/* Password Input */}
            <div className="rounded-md bg-white p-3">
              <div className="flex items-center gap-2">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border-0 p-0 text-gray-900 placeholder:text-gray-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <input
                  id="remember"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 cursor-pointer"
                />
                <label
                  htmlFor="remember"
                  className="cursor-pointer text-sm text-gray-700"
                >
                  Remember me
                </label>
              </div>
              <button
                type="button"
                onClick={() => navigate("/forgot-password")} // ✅ optional route
                className="text-sm text-gray-700 hover:text-gray-900"
              >
                Forgot password?
              </button>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="w-full rounded-md bg-[#1C5941] py-3 text-base font-medium text-white hover:bg-emerald-900 transition-colors"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
