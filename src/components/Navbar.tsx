import "./components.css";
import matchbooksLogo from "../assets/matchbooks-logo.svg?inline";

export default function Navbar() {
  return (
    <div id="navbar-container">
      <img src={matchbooksLogo} alt="matchbooks logo" height={18} />
    </div>
  );
}
