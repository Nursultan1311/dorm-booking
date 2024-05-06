// ... other imports ...
import {Link} from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import React, {useEffect, useState} from "react";
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import Header from "../../components/Header/Header";
import time from "./img.png"

const newStyles = {
    documentList: {
        listStyleType: 'none',
        padding: '0',
        margin: '0',
    },
    documentItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '10px',
        padding: '10px',
        borderRadius: '5px',
        transition: 'background-color 0.2s',
        ':hover': {
            backgroundColor: '#f2f2f2',
        },
    },
    documentIcon: {
        fontSize: '24px',
        marginRight: '10px',
    },
    documentInfo: {
        flexGrow: '1',
    },
    statusLabel: {
        padding: '5px 10px',
        borderRadius: '10px',
        fontWeight: 'bold',
    },
    uploadButton: {
        width: 'max-content',
        cursor: 'pointer',
        padding: '8px 15px',
        margin: '10px 0',
        border: 'none',
        borderRadius: '5px',
        background: '#333',
        color: 'white',
        fontSize: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    fileInput: {
        marginBottom: '15px',
    },
    statusPending: {
        backgroundColor: '#FFD700',
    },
    statusApproved: {
        backgroundColor: '#28A745',
    },
    statusRejected: {
        backgroundColor: '#DC3545',
    },
};
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
const BookingStatus = ({ onUploadSuccess, onUploadFailure }) => {
    const [application, setApplication] = useState(0)
    const data = {
        datasets: [
            {
                data: [application.chance, 100-application.chance],
                backgroundColor: [
                    '#68DE7C',
                    'lightgrey',
                ],
                radius: 70
            },
        ],
    };
    useEffect(() => {
        fetch('https://dorm-booking.up.railway.app/api/application', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'jwt': localStorage.getItem('accessToken')})
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setApplication(data)
            })
            .catch(error => console.error('Error fetching documents', error));
    }, []);
    return (
        <div>
            { application.chance != -1 ? (
                    <div style={{border: '1px solid grey', borderRadius: '20px', width: '100%', padding: '2%', background: 'white'}}>
                        <div style={{width: '100%', display: 'flex', justifyContent: 'space-between', fontSize: '14px'}}>
                            <p style={{fontWeight: 'bolder'}}>Дата подачи: {application.start}</p>

                            {application.status &&
                                <p style={{
                                    background: '#68DE7C',
                                    borderRadius: '15px',
                                    padding: '0 10px',
                                    height: 'max-content',
                                    boxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.25)'
                                }}>Approved</p>

                            }
                            {!application.status &&
                                <p style={{
                                    background: 'grey',
                                    borderRadius: '15px',
                                    padding: '0 10px', height: 'max-content',
                                    boxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.25)'
                                }}>Processing</p>
                            }
                        </div>

                        <h4 style={{fontWeight: 'bold'}}>{application.user} | <span
                            style={{fontWeight: 'normal'}}>{application.university}</span></h4>
                        <div style={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
                            <div>
                                <span style={{fontWeight: 'bolder'}}>Убедитесь что вы заполнили и все документы до конца подачи заявок</span>

                                <p className="popular__time2" style={{display: 'flex', alignItems: 'center'}}><img
                                    width={'4%'} src={time}/>{application.days_left / 3600 / 24} days left </p>
                            </div>
                            <div style={{position: 'relative', width: '150px', height: '150px'}}>
                            <Doughnut data={data}/>
                                <h3 style={{position: 'absolute', top: '43%', left: '33%'}}>{application.chance}%</h3>
                            </div>
                        </div>

                    </div>) :
                (
                    <h2>У вас нет активной брони</h2>
                )}
        </div>


    );
};

// ... other components ...

const Booking = () => {
    return (
        <div>
            <Header/>
            <div style={styles.container}>
                <h1 style={styles.h1}>Личный кабинет</h1>
                <nav style={styles.nav}>
                    <Link to="/profile" style={styles.navItem}>Личная информация</Link>
                    <Link to="/documents" style={styles.navItem}>Документы</Link>
                    <Link to="/bookings" style={styles.navItemMain}>Бронь</Link>
                </nav>
                <div style={styles.personalCardInfo}>
                    <BookingStatus/>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Booking;
