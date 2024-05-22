import {useState, useRef, useEffect} from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import {useNavigate} from "react-router-dom";


function Login() {
    const navigate = useNavigate();

    const formRef = useRef(null);
    const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        fetch('https://dorm-booking.up.railway.app/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'jwt': localStorage.getItem('accessToken')})
        })
            .then((response) => {
                if(response.status == 200){
                    navigate('/profile')
                }
            }).then(data => {
        })
    }, []);
    async function handleSubmit(e) {
        e.preventDefault();
        // you will need to use FormData instead of a regular object
        const formData = new FormData(formRef.current);
        const email = formRef.current.login.value
        const password = formRef.current.password.value
        try {
            fetch('https://dorm-booking.up.railway.app/api/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                        email: email,
                        password: password
                    }
                )
            }).then((response) => {
                return response.json()
            }).then((data) => {
                if (data.token) {
                    localStorage.setItem('accessToken', data.token)
                    navigate("/profile")
                }
                setErrorMessage("Wrong email or password")
            })
        }
        catch (error) {
            setErrorMessage("Wrong email or password")
            console.error('There was a problem with your fetch operation:', error);
        }
    }
    return (
        <div>
            <Header/>
            <div className="container mt-5 mb-5 justify-content-around d-flex">
                <form className="main" onSubmit={handleSubmit} ref={formRef}>
                    <h1>Login</h1>
                    <p>Don’t have an account? Sign up <a href="/registration">here</a>!</p>
                    <label htmlFor="login">Email address</label>
                    <input type="email" id="login" name="login" required/>

                    <label htmlFor="psw">Password</label>
                    <input type="password" id="psw" name="password" required/>
                    <p style={{color:'red'}}>{errorMessage}</p>
                    <input type="submit" style={{background: '#212138'}} value="Continue"/>
                </form>
            </div>
            <Footer/>
        </div>
    );
}

export default Login;
