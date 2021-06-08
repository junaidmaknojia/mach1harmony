import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer(){


    return (
        <div className="footer">
            <Link to="/" className="footer__home">Home</Link>
            <p>Mach1Harmony claims no rights to the demo tracks. They are used for demonstration purposes only</p>
            <a href="https://github.com/junaidmaknojia/" target="_blank" rel="noopener noreferrer"><i class="fab fa-github"></i></a>
            <a href="https://www.linkedin.com/in/junaidmaknojia/" target="_blank" rel="noopener noreferrer"><i class="fab fa-linkedin-in"></i></a>
            <a href="https://junaidmaknojia.github.io/" target="_blank" rel="noopener noreferrer"><i class="fas fa-briefcase"></i></a>
        </div>
    )
}
