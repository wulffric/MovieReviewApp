import '../css/NavBar.css';
import './App.css';
import { Link } from 'react-router-dom';
import logo from './logo.jpg';

// Navigation bar
export default function NavBar() {
    return (
        <div className="navBar">
            <div className="top">
                <img className='logo' src={logo}></img>
                <h1 className="title">
                    MOVIE REVIEW
                </h1>
            </div>

            <div className="link">
                <Link to="./home" className='links'>HOME</Link >
                <Link to="./reviews" className='links'>YOUR REVIEWS</Link>
                <Link to="./login" className='links'>LOGIN</Link>
                <Link to="./register" className='links'>REGISTER</Link>
            </div>
        </div>
    );
}
