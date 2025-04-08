import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Register.css";
import { toast } from "react-toastify";

function Register() {
  // State to store form input values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Hook to programmatically navigate to another route
  const navigate = useNavigate();

  // Handles the registration form submission
  const handleRegister = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior

    try {
      // Make a POST request to register the user
      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }), // Send email and password to backend
      });

      const data = await res.json(); // Parse JSON response

      // If registration fails, show error toast
      if (!res.ok) {
        toast.error(data.message || "Registration failed");
        return;
      }

      // Store the token in localStorage
      localStorage.setItem("token", data.token);

      // Show success message and navigate to home page
      toast.success("Registration successful!");
      navigate("/");
    } catch (err) {
      // Catch network or other unexpected errors
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="register-container">
      <h2>Create an Account</h2>
      <form onSubmit={handleRegister}>
        {/* Email input field */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password input field */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Submit button */}
        <button type="submit">Register</button>
      </form>

      {/* Link to login page if already registered */}
      <p className="register-login-text">
        Already registered? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}

export default Register;
