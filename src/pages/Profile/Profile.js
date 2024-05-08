import React, {useEffect, useState} from 'react';
import Header from "../../components/Header/Header";
import {Link, useNavigate} from "react-router-dom";
import Footer from "../../components/Footer/Footer";

const styles = {
    container: {
        color: '#333',
        width: '100%',
        // padding: '0 5% 5% 5%',
        maxWidth: '100%',
    },
    h1: {
        // padding: '0 5% 5% 5%',
        paddingLeft: '5%',
        fontSize: '30px',
        fontWeight: 'bold',
        paddingBottom: '10px',
        marginBottom: '20px',
        marginTop: '70px'
    },
    nav: {
        paddingLeft: '5%',
        display: 'flex',
        gap: '34px',
        marginBottom: '70px'
    },
    navItem: {
        fontSize: '24px',
        color: '#333',
        textDecoration: 'none',
        fontWeight: 'bold',
        width: 'max-content',
    },
    navItemMain: {
        fontSize: '24px',
        color: '#333',
        textDecoration: 'none',
        fontWeight: 'bold',
        borderBottom: '1px solid black',
        width: 'max-content',
    },
    personalCardInfo: {
        margin: '0',
        padding: '50px',
        width: '100%',
      backgroundColor: '#F6F7F9'
    },
    card: {
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        padding: '20px',
        // margin: '50px',
        background: '#fff',
        borderRadius: '15px'
    },
    cardHeader: {
        fontSize: '18px',
        fontWeight: 'bold',
        marginBottom: '15px'
    },
    cardContent: {
        fontWeight: 'bold',
        marginBottom: '10px'
    },
    editLink: {
        color: 'black',
        textDecoration: 'none',
        fontSize: '14px',
        float: 'right',
        fontWeight: 'bolder',
        borderBottom: '1px solid black',
    },
    clear: {
        clear: 'both',
        fontWeight: 'medium',
    }
};

const PersonalInfoCard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({ email: "", first_name: "", last_name: "" });
    const [editMode, setEditMode] = useState({ email: false, first_name: false, last_name: false });
    const [editData, setEditData] = useState({ email: "", first_name: "", last_name: "" });

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const response = await fetch('https://dorm-booking.up.railway.app/api/user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 'jwt': localStorage.getItem('accessToken') })
            });
            if (response.status !== 200) navigate('/login');
            const data = await response.json();
            setUser(data);
            setEditData(data); // Initialize editData with fetched data
        } catch (error) {
            console.error('Failed to fetch user data:', error);
        }
    };

    const toggleEdit = (field) => {
        setEditMode(prev => ({ ...prev, [field]: !prev[field] }));
    };

    const handleEditChange = (field, value) => {
        setEditData(prev => ({ ...prev, [field]: value }));
    };

    const saveChanges = async (field) => {
        try {
            const response = await fetch(`https://dorm-booking.up.railway.app/api/user/update/${field}/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ [field]: editData[field], 'jwt': localStorage.getItem('accessToken') })
            });
            if (response.ok) {
                window.location.reload();
                toggleEdit(field);
            } else {
                console.error('Failed to update:', await response.text());
            }
        } catch (error) {
            console.error('Failed to send update:', error);
        }
    };
    function exit(){
        localStorage.removeItem("accessToken")
        navigate('/login')
    }
    return (
        <div style={styles.card}>
            <div style={styles.cardHeader}>
                Редактировать фотографию профиля
            </div>
            <hr/>

            <div style={{...styles.cardContent, ...styles.clear}}>
                Name Surname
                {editMode.first_name ? (
                        <span onClick={() => saveChanges('first_name')} style={styles.editLink}>Сохранить</span>
                        ) : (
                        <span onClick={() => toggleEdit('first_name')} style={styles.editLink}>Редактировать</span>
                )}

            </div>

            <div style={styles.cardContent}>
                {editMode.first_name ? (
                        <input
                            type="text"
                            value={editData.first_name}
                            onChange={(e) => handleEditChange('first_name', e.target.value)}
                        />
                ) : (
                    <p style={styles.p}>{user.first_name + " " + user.last_name}</p>
                    )}
            </div>
            <hr/>
            <div style={{...styles.cardContent, ...styles.clear}}>
                Sex
                <span style={styles.editLink}>Редактировать</span>
            </div>
            <div style={styles.cardContent}>
                <p style={styles.p}>Мужской</p>
            </div>f
            <hr/>
            <div style={{...styles.cardContent, ...styles.clear}}>
                Email address
                {editMode.email ? (
                    <span onClick={() => saveChanges('email')} style={styles.editLink}>Сохранить</span>
                ) : (
                    <span onClick={() => toggleEdit('email')} style={styles.editLink}>Редактировать</span>
                )}

            </div>

            <div style={styles.cardContent}>
                {editMode.email ? (
                    <input
                        type="text"
                        value={editData.email}
                        onChange={(e) => handleEditChange('email', e.target.value)}
                    />
                ) : (
                    <p style={styles.p}>{user.email}</p>
                )}
            </div>
            <hr/>
            <div style={{...styles.cardContent, ...styles.clear}}>
                Birth Date
                <span style={styles.editLink}>Редактировать</span>
            </div>
            <div style={styles.cardContent}>
                <p style={styles.p}>14.07.2004</p>
            </div>
            <hr/>
            <div style={{...styles.cardContent, ...styles.clear}}>
                SSN
                <span style={styles.editLink}>Редактировать</span>
            </div>
            <div style={styles.cardContent}>
                <p style={styles.p}>020716550669</p>
            </div>
            <hr/>
            <div style={styles.cardContent}>
                <button style={styles.p} onClick={exit}>Выйти с аккаунта</button>
            </div>
        </div>
    );
};

const Profile = () => {
    return (
        <div>
            <Header/>

            <div style={styles.container}>
                <h1 style={styles.h1}>
                    Личный кабинет
                </h1>
                <nav style={styles.nav}>
                    <Link to="/profile" style={styles.navItemMain}>Личная информация</Link>
                <Link to="/documents" style={styles.navItem}>Документы</Link>
                <Link to="/bookings" style={styles.navItem}>Бронь</Link>
            </nav>
            <div style={styles.personalCardInfo}>
                <PersonalInfoCard  />
            </div>
        </div>
        <Footer/>

    </div>
    );
};

export default Profile;
