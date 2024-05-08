// import {Link} from "react-router-dom";

import "./Verify.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import {useRef, useState} from "react";
import {json, useNavigate} from "react-router-dom";

function Contract() {
    const navigate = useNavigate();
    const formRef = useRef(null);
    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(formRef.current);
        const sms_code = formData.get("1") + formData.get("2") + formData.get("3") + formData.get("4") + formData.get("5") + formData.get("6")
        console.log(sms_code)
        try {
            const response = await fetch('http://localhost:8000/api/registration-confirm', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    sms_code: sms_code
                })
            }).then(async (response) => {
                let jwt = await response.json()
                console.log(jwt.token)
                localStorage.setItem("accessToken", jwt.token)
                navigate("/profile")
            })

            if (response.ok) {
                navigate('/profile')
            } else {
                alert("Wrong code")
                throw new Error('Network response was not ok.');
            }
        } catch (error) {
            console.error('There was a problem with your fetch operation:', error);
        }
    }
    return (
    <div className="Body">
        <Header/>
        <form className="verifyContainer" onSubmit={handleSubmit} ref={formRef}>
            <h2>Enter the Code</h2>
            <p>We have sent a code to your email address</p>
            <a href="#" className="back-link">Didn't receive a code?</a>
            <div className="conde-inputs" >
                <input className="code-input" name="1" id="1" type="text" maxLength="1" autoFocus/>
                <input className="code-input" name="2" id="2" type="text" maxLength="1"/>
                <input className="code-input" name="3" id="3" type="text" maxLength="1"/>
                <input className="code-input" name="4" id="4" type="text" maxLength="1"/>
                <input className="code-input" name="5" id="5" type="text" maxLength="1"/>
                <input className="code-input" name="6" id="6" type="text" maxLength="1"/>
            </div>
                <button type="submit">Continue</button>
        </form>
        <Footer/>

    </div>
    );
}

export default Contract;
