import '../css/Register.css';
import './App.css';

//Register Page
export default function Register() {
    return (

        <div className="divRegister">
            <form className="formRegister">
                <p className="register">CREATE NEW ACCOUNT</p>
                <div className="inputsRegister">
                    <p className="text">NAME</p>
                    <input
                        className="nameRegister"
                        name="username"
                        type="text"
                        placeholder="username"
                        required />
                    <p className="text">EMAIL</p>
                    <input
                        className="emailRegister"
                        name="email"
                        type="email"
                        placeholder="email"
                        required />
                    <p className="text">PASSWORD</p>
                    <input
                        className="passwordRegister"
                        name="password"
                        type="password"
                        placeholder="password"
                        required />
                </div>
                <button className="button" type="submit">SIGN UP</button>
                <p className="smallText">ALREADY REGISTERED? LOGIN <a href="login" className='linkRegister'>HERE</a></p>
            </form>
        </div>

    );
}