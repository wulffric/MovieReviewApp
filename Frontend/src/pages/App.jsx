import { Routes, Route } from "react-router-dom";
import Home from './Home';
import Reviews from './Reviews';
import Login from './Login';
import Register from './Register';
import NavBar from './NavBar';
import './App.css';

export default function App() {
    return (
        <>
            <div className='App'>
                <NavBar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/reviews" element={<Reviews />} />
                    <Route path="/register/login" element={<Login />} />
                    <Route path="/login/register" element={<Register />} />
                </Routes >
            </div>
        </>
    );
}