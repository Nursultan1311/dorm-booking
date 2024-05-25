import {Link, useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "./logo.png";

function AdminHeader() {
    let [signedIn, setSignedIn] = useState(false);
    let [user, setUser] = useState({ email: '', name: 'Zholdas I.' });
    let [supportDropdownOpen, setSupportDropdownOpen] = useState(false);
    let [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
    let [userDropdownOpen, setUserDropdownOpen] = useState(false);
    const navigate = useNavigate();

    function exit(){
        localStorage.removeItem("accessToken")
        navigate('/login')
    }

    useEffect(() => {
        fetch('https://dorm-booking.up.railway.app/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 'jwt': localStorage.getItem('accessToken') })
        })
            .then((response) => {
                setSignedIn(response.status === 200);
                return response.json();
            })
            .then(data => {
                setUser(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div className="container p-2">
            <div className="flex-row position-relative flex justify-between align-items-center">
                <div><a href="/"><img src={logo} alt="Logo" width="200px" /></a></div>
                <div className="nav__link"><Link to={'/about_us'} className='nav__link'>About</Link></div>
                {/*<div className="nav__link"><Link to={'/privacy'} className='nav__link'>Privacy Policy</Link></div>*/}
                <div className="nav__link support" onMouseEnter={() => setSupportDropdownOpen(true)} onMouseLeave={() => setSupportDropdownOpen(false)}>
                    <div className="nav__link">Support</div>
                    {supportDropdownOpen && (
                        <div className="dropdown-menu">
                            <a href="https://wa.me/87758602858">
                                <i className="fab fa-whatsapp"></i> Whatsapp
                            </a>
                            <a href="mailto:dormbooking@gmail.com">
                                <i className="fas fa-envelope"></i> dormbooking@gmail.com
                            </a>
                        </div>
                    )}
                </div>
                <div className="nav__link language" onMouseEnter={() => setLanguageDropdownOpen(true)} onMouseLeave={() => setLanguageDropdownOpen(false)}>
                    <div className="nav__link">EN</div>
                    {languageDropdownOpen && (
                        <div className="dropdown-menu">
                            <a href="#" onClick={() => alert('Language switched to EN')}>EN</a>
                            <a href="#" onClick={() => alert('Language switched to KZ')}>KZ</a>
                        </div>
                    )}
                </div>
                <div className="nav__link user" onMouseEnter={() => setUserDropdownOpen(true)} onMouseLeave={() => setUserDropdownOpen(false)}>
                    {signedIn ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <i className="fas fa-user" style={{ fontSize: '24px' }}></i>
                            <p style={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                margin: '0'
                            }}>
                                {user.last_name + " " + user.first_name}
                            </p>
                        </div>
                    ) : (
                        <Link to='/login' className="nav__btn">Log In</Link>
                    )}
                    {userDropdownOpen && (
                        <div className="dropdown-menu user-dropdown">
                            <div className="user-info">
                                <p>{user.name}</p>
                                <p>{user.email}</p>
                            </div>
                            <Link to="/documents">
                                <i className="fas fa-pencil-alt"></i> Edit information
                            </Link>
                            <Link to="/profile">
                                <i className="fas fa-lock"></i> Change password
                            </Link>
                            <Link onClick={exit}>
                                <i className="fas fa-sign-out-alt"></i> Log out
                            </Link>
                        </div>
                    )}
                </div>
            </div>
            <hr style={{width: "100%", marginLeft: "0%"}} />
        </div>
    );
}

export default AdminHeader;
