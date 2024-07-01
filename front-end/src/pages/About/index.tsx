import { Link } from "react-router-dom";


export default function About() {
  return (
    <div>
      <p>Página Sobre</p>

      <Link to={`/`}>Home</Link>
    </div>
  );
}
