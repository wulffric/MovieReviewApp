import '../css/Login.css';
import './App.css';

//Login Page
export default function Login() {

    return (
        <div className="divLogin">
            <form className="form" >
                <p className="textLogin">LOGIN</p>
                <div className="inputsLogin">
                    <p className="text">EMAIL</p>
                    <input
                        className="emailLogin"
                        name="email"
                        type="email"
                        placeholder="email"
                        required />
                    <p className="text">PASSWORD</p>
                    <input
                        className="passwordLogin"
                        name="password"
                        type="password"
                        placeholder="password"
                        required />
                </div>
                <button className="button" type="submit">LOGIN</button>
                <p className="smallText">NOT REGISTERED? SIGN UP <a href="register" className='linkLogin' >HERE</a></p>
            </form>
        </div>
    );
}