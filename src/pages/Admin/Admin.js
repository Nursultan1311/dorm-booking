// ... other imports ...
import {Link, useNavigate, Route, Routes} from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import React, {useEffect, useState} from "react";
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import time from "./img.png"
import AdminHeader from "../../components/HeaderAdmin/Header";
import Suggestions from "../Suggestions/Suggestions";  // Create this component
import Partners from "../Partners/Partners";  // Create this component

const styles = {
    container: {
        color: '#333',
        width: '100%',
        maxWidth: '100%',
    },
    h1: {
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
        paddingBottom: '0',
        width: '100%',
        backgroundColor: '#F6F7F9'
    },
    card: {
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        padding: '20px',
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
    },
    filterContainer: {
        display: 'flex',
        alignItems: 'flex-start',
        padding: '20px',
        gap: '20px' // Adjust as necessary to match Figma spacing
    },
    statusColumn: {
        display: 'flex',
        gap: '10px',
    },
    inputContainer: {
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'space-between'
    },
    inputField: {
        flexBasis: '30%', // Adjust according to your design, ensures inputs do not grow too wide
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px'
    },
    statusButton: {
        marginBottom: '10px', // Space between buttons
        padding: '10px 20px',
        cursor: 'pointer',
        border: 'none',
        borderRadius: '5px',
        backgroundColor: '#f0f0f0',
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center'
    },
    activeStatusButton: {
        backgroundColor: '#46C295',
        color: 'white',
    },
    tabs: {
        display: 'flex',
        gap: '20px',
        padding: '10px 20px',
        borderBottom: '2px solid #ddd',
        marginBottom: '20px',
    },
    tabItem: {
        padding: '10px 15px',
        cursor: 'pointer',
        textDecoration: 'none',
        color: '#333',
        borderRadius: '5px 5px 0 0',
    },
    activeTabItem: {
        border: '2px solid #ddd',
        borderBottom: '2px solid white',
        backgroundColor: 'white',
    }
};

const BookingStatus = ({application}) => {
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
    return (
        <div style={{border: '1px solid grey', borderRadius: '20px', width: '100%', padding: '2%', background: 'white'}}>
            <div style={{width: '100%', display: 'flex', justifyContent: 'space-between', fontSize: '14px'}}>
                <p style={{fontWeight: 'bolder'}}>Creation date: {application.start}</p>

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

            <h4 style={{fontWeight: 'bold'}}>{application.user?.name + ' ' + application.user?.surname} | <span
                style={{fontWeight: 'normal'}}>{application.university}</span></h4>
            <div style={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
                <div>
                    <span style={{fontWeight: 'bolder'}}>ИИН: {application.user?.iin}</span>
                    <br/>
                    <span style={{fontWeight: 'bolder'}}>Почта: {application.user?.email}</span>
                    <br/>
                    <span style={{fontWeight: 'bolder'}}>Номер телефона: {application.user?.phone_number}</span>

                    <p className="popular__time2" style={{display: 'flex', alignItems: 'center'}}><img
                        width={'4%'} src={time}/>{application.days_left / 3600 / 24} days left </p>
                </div>
                <div style={{position: 'relative', width: '150px', height: '150px'}}>
                    <Doughnut style={{position: 'absolute', top:'-30%'}} data={data}/>
                    <p style={{position: 'absolute', top:'95%', width: '100%', textAlign: 'center'}}>{application.start}</p>
                    <h3 style={{position: 'absolute', top: '13%', left: '33%'}}>{application.chance}%</h3>
                </div>
                <Link to={'/change/' + application.user?.id} style={{width: 'max-content', fontSize: '20px',marginTop: '100px', borderRadius: '5px', height: 'max-content',color: 'white',background: '#EC6B1E', alignItems: 'end', padding: '10px', }}>Change status</Link>

            </div>

        </div>
    );
};

const statusStyles = {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-around',
    marginTop: '20px',
    marginBottom: '20px',
};

const statusBlock = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100px',
    width: '40%',
    borderRadius: '10px',
    color: 'white',
    fontSize: '24px',
    fontWeight: 'bold',
};

const approvedStyle = {
    ...statusBlock,
    backgroundColor: '#46C295', // Green
};

const declinedStyle = {
    ...statusBlock,
    backgroundColor: '#FB5252', // Red
};

const StatusIndicator = ({ approved, declined }) => {
    return (
        <div style={statusStyles}>
            <div style={approvedStyle}>
                Approved {approved}
            </div>
            <div style={declinedStyle}>
                Declined {declined}
            </div>
        </div>
    );
};

const Admin = () => {
    const [filters, setFilters] = useState({
        time: '',
        firstName: '',
        surname: '',
        university: '',
        status: '', // assuming 'In Processing', 'Approved', 'Declined' as possible values
    });
    const [statusCounts, setStatusCounts] = useState({
        approved: 0,
        declined: 0,
    });
    const navigate = useNavigate()

    const [applications, setApplications] = useState([{}])
    useEffect(() => {
        fetch('https://dorm-booking.up.railway.app//api/applications', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'jwt': localStorage.getItem('accessToken')})
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setApplications(data)
                const approvedCount = data.filter(app => app.status).length;
                const declinedCount = data.filter(app => !app.status).length;
                setStatusCounts({
                    approved: approvedCount,
                    declined: declinedCount,
                });
            })
            .catch(error => console.error('Error fetching documents', error));
        fetchUserData()
    }, []);

    const fetchUserData = () => {
        fetch('https://dorm-booking.up.railway.app//api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'jwt': localStorage.getItem('accessToken')})
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('User data not available');
                }
                return response.json();
            })
            .then(data => {
                // Check if the user is an admin
                if (!data.isAdmin) {
                    navigate("/");
                }
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
                // Handle error (e.g., show an error message)
            });
    };
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleStatusChange = (status) => {
        setFilters(prev => ({ ...prev, status }));
    };

    const filteredApplications = applications.filter(app => {
        return (filters.status === '' || app.status === (filters.status === 'Approved')) &&
            (filters.firstName === '' || app.user.name.includes(filters.firstName)) &&
            (filters.surname === '' || app.user.surname.includes(filters.surname)) &&
            (filters.university === '' || app.university.includes(filters.university));
    });

    return (
        <div>
            <AdminHeader/>
            <StatusIndicator approved={statusCounts.approved} declined={statusCounts.declined}/>
            <div style={styles.tabs}>
                <Link to="/admin" className="tab-item"
                      style={window.location.pathname === "/admin" ? styles.activeTabItem : {}}>Documents</Link>
                <Link to="/suggestions" className="tab-item"
                      style={window.location.pathname === "/suggestions" ? styles.activeTabItem : {}}>Suggestions</Link>
                <Link to="/partners" className="tab-item"
                      style={window.location.pathname === "/partners" ? styles.activeTabItem : {}}>Partners</Link>
            </div>
                <div>
                    <div style={styles.filterContainer}>
                        <div style={styles.statusColumn}>
                            {['In Processing', 'Approved'].map(status => (
                                <button
                                    key={status}
                                    style={filters.status === status ? {...styles.statusButton, ...styles.activeStatusButton} : styles.statusButton}
                                    onClick={() => handleStatusChange(status)}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                        <div style={styles.inputContainer}>
                            <input
                                style={styles.inputField}
                                name="firstName"
                                type="text"
                                placeholder="First Name"
                                value={filters.firstName}
                                onChange={handleFilterChange}
                            />
                            <input
                                style={styles.inputField}
                                name="surname"
                                type="text"
                                placeholder="Surname"
                                value={filters.surname}
                                onChange={handleFilterChange}
                            />
                            <input
                                style={styles.inputField}
                                name="university"
                                type="text"
                                placeholder="University"
                                value={filters.university}
                                onChange={handleFilterChange}
                            />
                        </div>
                    </div>
                    <div style={styles.container}>
                        {filteredApplications.map((el, index) => (
                            <div key={index} style={styles.personalCardInfo}>
                                <BookingStatus application={el}/>
                            </div>
                        ))}
                    </div>
                </div>
            <Footer/>
        </div>
    );
};

export default Admin;
