import {Link} from "react-router-dom";
import logo from "./logo.png";
import {useEffect, useState} from "react";
import userpng from "./user.png"
function AdminHeader() {
    let [signedIn, setSignedIn] = useState(false)
    let [user, setUser] = useState({
        'email': ''
    })

    useEffect( () => {
        fetch('https://dorm-booking.up.railway.app/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'jwt': localStorage.getItem('accessToken')})
        })
            .then((response) => {
                setSignedIn(response.status === 200)
                return response.json()
            }).then(data => {
                setUser(data)
        })
            .catch((error) => {
                console.log(error)
            })
    }, []);
    return (
        <div className="container">
            <div className="flex-row position-relative flex justify-between align-items-center">
                <div><a href="/admin"><img src={logo} alt={'Logo'}/></a></div>
                <div className="nav__link"><Link to={'/about_us'} className='nav__link'>About</Link></div>
                <div className="nav__link"><Link to={'/privacy'} className='nav__link'>Privacy Policy</Link></div>
                <div className="position-absolute"></div>
                <div className="nav__link">En</div>
                <div className="nav__link">
                    {signedIn ? (
                        <Link to="/profile" style={{display: 'flex', gap: '15px'}}>
                            <img src={userpng} style={{height: '40px'}} alt="User"/>
                            <p style={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-around',
                                margin: '0'
                            }}>
                                {user.email}
                            </p>
                        </Link>

                    ) : (
                        <Link to='/login' className="nav__btn">Log In</Link>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AdminHeader;