import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import AdminHeader from "../../components/HeaderAdmin/Header";
import Footer from "../../components/Footer/Footer";
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
const Partners = () => {

    const [partners, setPartners] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://dorm-booking.up.railway.app/api/partners',{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(response => response.json())
            .then(data => {
                setPartners(data);
            })
            .catch(error => console.error('Error fetching partners', error));
        fetch('https://dorm-booking.up.railway.app/api/applications', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'jwt': localStorage.getItem('accessToken')})
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                const approvedCount = data.filter(app => app.status).length;
                const declinedCount = data.filter(app => !app.status).length;
                setStatusCounts({
                    approved: approvedCount,
                    declined: declinedCount,
                });
            })
            .catch(error => console.error('Error fetching documents', error));
        fetchUserData();
    }, []);
    const [statusCounts, setStatusCounts] = useState({
        approved: 0,
        declined: 0,
    });
    const fetchUserData = () => {
        fetch('https://dorm-booking.up.railway.app/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 'jwt': localStorage.getItem('accessToken') })
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
            });
    };

    return (
        <div>
            <AdminHeader />
            <StatusIndicator approved={statusCounts.approved} declined={statusCounts.declined}/>
            <div style={styles.tabs}>
                <Link to="/admin" className="tab-item" style={window.location.pathname === "/admin" ? { ...styles.tabItem, ...styles.activeTabItem } : styles.tabItem}>Documents</Link>
                <Link to="/suggestions" className="tab-item" style={window.location.pathname === "/suggestions" ? { ...styles.tabItem, ...styles.activeTabItem } : styles.tabItem}>Suggestions</Link>
                <Link to="/partners" className="tab-item" style={window.location.pathname === "/partners" ? { ...styles.tabItem, ...styles.activeTabItem } : styles.tabItem}>Partners</Link>
            </div>
            <div style={styles.container}>
                {partners.map((partner, index) => (
                    <div key={index} style={styles.personalCardInfo}>
                        <div style={{ ...styles.card, marginBottom: '20px' }}>
                            <div style={styles.cardHeader}>Full name</div>
                            <div style={styles.cardContent}>{partner.name}</div>
                            <div style={styles.cardHeader}>University name</div>
                            <div style={styles.cardContent}>{partner.university}</div>
                            <div style={styles.cardHeader}>Phone number</div>
                            <div style={styles.cardContent}>{partner.phone}</div>
                            <div style={styles.cardHeader}>Email address</div>
                            <div style={styles.cardContent}>{partner.email}</div>
                            <div style={styles.cardHeader}>A document confirming that you are a resident of the university</div>
                            <div style={styles.cardContent}><a href={partner.document_url} target="_blank" rel="noopener noreferrer">View Document</a></div>
                            <div style={styles.cardContent}><button style={styles.statusButton}>Confirm</button></div>
                        </div>
                    </div>
                ))}
            </div>
            <Footer />
        </div>
    );
};

export default Partners;
