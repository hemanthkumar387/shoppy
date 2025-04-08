import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css"; // Import custom styles
import { toast } from "react-toastify"; // For toast notifications

function Login() {
  // State variables for email and password input fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate(); // For redirecting the user after login

  // Handler function when the form is submitted
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form from refreshing the page

    try {
      // Make POST request to login API
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" }, // Set header for JSON body
        body: JSON.stringify({ email, password }), // Send email and password as JSON
      });

      const data = await res.json(); // Parse JSON response

      // Show error if response is not successful
      if (!res.ok) {
        toast.error(data.message || "Login failed"); // Show error message
        return;
      }

      // Save JWT token to localStorage
      localStorage.setItem("token", data.token);
      toast.success("Login successful!"); // Show success message

      // Navigate to home page
      navigate("/");
    } catch (err) {
      console.error(err); // Log error to console
      toast.error("Something went wrong"); // Show generic error toast
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>

      {/* Login form */}
      <form onSubmit={handleLogin}>
        {/* Email input */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)} // Update email state on input
        />

        {/* Password input */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)} // Update password state on input
        />

        {/* Submit button */}
        <button type="submit">Login</button>
      </form>

      {/* Link to registration page */}
      <p className="login-register-text">
        Not registered yet? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}

export default Login;
