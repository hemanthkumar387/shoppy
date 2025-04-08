import "./NotFound.css"; 
import { Link } from "react-router-dom";

// NotFound component - displays a "404 Page Not Found" message when a user visits a non-existent page
function NotFound() {
  return (
    <div className="not-found-container">
      {/* Main heading for the 404 page */}
      <h1 className="not-found-title">404 - Page Not Found</h1>

      {/* Description text to inform users that the requested page does not exist */}
      <p className="not-found-text">
        Oops! The page you're looking for does not exist.
      </p>
      <Link to="/" className="back-home-btn">Back to Home</Link>
    </div>
  );
}

export default NotFound;