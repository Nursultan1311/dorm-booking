import "./Registration.css";
import {useState, useRef, useEffect} from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import {useNavigate} from "react-router-dom";

function Registration() {
    const navigate = useNavigate();

    const formRef = useRef(null);
    const [file, setFile] = useState("https://cdn-icons-png.flaticon.com/512/3135/3135715.png");
    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }
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
        formData.set('password', password)
        try {
            const response = await fetch('https://dorm-booking.up.railway.app/api/registration-request', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                navigate('/verify')
            } else {
                throw new Error('Network response was not ok.');
            }
        } catch (error) {
            console.error('There was a problem with your fetch operation:', error);
        }
    }
    const [value, onChange] = useState(new Date());
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    return (
    <div>
        <Header/>
        <div className="container_regis mt-5 mb-5">
            <form className="main" onSubmit={handleSubmit} ref={formRef}>
                <h1>Registration</h1>
                <p>Already have an account? Sign in <a href="/login">here</a>!</p>
                <div className="main_input_with_photo">
                    <div>
                        <div>
                            <label htmlFor="first_name">First Name</label>
                            <input type="text" id="first_name" name="first_name" required/>
                        </div>
                        <div>
                            <label htmlFor="last_name">Last Name</label>
                            <input type="text" id="last_name" name="last_name" required/>
                        </div>

                    </div>
                    <input id="image-file" type="file" className="hide" onChange={handleChange}/>
                    <label htmlFor="image-file"> <img width="100%" src={file} alt="Image"/></label>
                </div>
                <label htmlFor="email">Email address</label>
                <input type="email" id="email" name="email" required/>

                <label htmlFor="phone_number">Phone number </label>
                <input type="number" id="phone_number" name="phone_number" required/>

                <label htmlFor="iin">ИИН</label>
                <input type="number" id="iin" name="iin" required/>

                <label htmlFor="birth_date">Date of birth</label>
                <br/>

                <input type="date" id="birth_date" name="birth_date" required/>
                <br/>
                <br/>

                <label htmlFor="psw">Password</label>
                <input
                    id="pass"
                    type={
                        showPassword ? "text" : "password"
                    }
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                />
                <br/>
                <br/>

                <input
                    name="password"
                    id="check"
                    type="checkbox"
                    value={showPassword}
                    onChange={() =>
                        setShowPassword((prev) => !prev)
                    }
                />
                {/*<input type="password" id="psw" name="password" required/>*/}
                {/*<p><input type="checkbox" onclick="myFunction()"/> Show password</p>*/}

                <input type="password" id="psw-repeat" name="password_repeat" required/>

                <label htmlFor="check">Show Password</label>
                <input type="submit" value="Continue"/>
                <input
                    id="check"
                    type="checkbox"
                />
                <label htmlFor="check">Get all news to mail</label>

            </form>
        </div>
        <Footer/>
    </div>
    );
}

export default Registration;
