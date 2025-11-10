import {Link } from 'react-router';

export function Homepage() {
  return (
    <div>
      <h1>Welcome to the Homepage</h1>
      <Link className="link" to="/pearlEarring">
        <span className="pearlEarring">  Girl with a pearl Earring </span>
      </Link>
    </div>
  )
}
