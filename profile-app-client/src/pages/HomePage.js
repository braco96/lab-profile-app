// Landing page offering navigation to Sign up and Log in forms

import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      <h1>Welcome to the Profile App</h1>
      {/* Navigation buttons leading to authentication pages */}
      <Link to="/signup">Sign up</Link>
      <br />
      <Link to="/login">Log in</Link>
    </div>
  );
}

export default HomePage;
