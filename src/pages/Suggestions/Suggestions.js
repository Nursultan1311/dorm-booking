import React, { useEffect, useState } from 'react';
import AdminHeader from "../../components/HeaderAdmin/Header";
import Footer from "../../components/Footer/Footer";
import {Link, useNavigate} from "react-router-dom";

const styles = {
    container: {
        color: '#333',
        width: '100%',
        maxWidth: '100%',
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
    filterContainer: {
        display: 'flex',
        alignItems: 'flex-start',
        padding: '20px',
        gap: '20px' // Adjust as necessary to match Figma spacing
    },
    inputContainer: {
        alignItems: 'center',
        flexGrow: 1,
        display: 'flex',
        gap: '20px'
        // justifyContent: 'space-between'
    },
    inputField: {
        flexBasis: '30%',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px'
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

const SuggestionCard = ({ suggestion }) => {
    return (
        <div style={{ border: '1px solid grey', borderRadius: '20px', width: '100%', padding: '2%', background: 'white' }}>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                <p style={{ fontWeight: 'bolder' }}>User: {suggestion.user}</p>
                <p style={{ background: 'grey', borderRadius: '15px', padding: '0 10px', height: 'max-content', boxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.25)' }}>
                    Rating: {suggestion.rating}
                </p>
            </div>
            <p>{suggestion.text}</p>
        </div>
    );
};

const Suggestions = () => {
    const [suggestions, setSuggestions] = useState([]);
    const [filters, setFilters] = useState({
        user: '',
        rating: '',
    });

    useEffect(() => {
        fetch('https://dorm-booking.up.railway.app//api/suggestions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'jwt': localStorage.getItem('accessToken')})
        })
            .then(response => response.json())
            .then(data => {
                setSuggestions(data);
            })
            .catch(error => console.error('Error fetching suggestions', error));

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
    const navigate = useNavigate();

    const fetchUserData = () => {
        fetch('https://dorm-booking.up.railway.app//api/user', {
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
    const [statusCounts, setStatusCounts] = useState({
        approved: 0,
        declined: 0,
    });

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const filteredSuggestions = suggestions.filter(suggestion => {
        return (filters.user === '' || suggestion.user.includes(filters.user)) &&
            (filters.rating === '' || suggestion.rating.toString() === filters.rating);
    });

    return (
        <div>
            <AdminHeader/>
            <StatusIndicator approved={statusCounts.approved} declined={statusCounts.declined}/>
            <div style={styles.tabs}>
                <Link to="/admin" className="tab-item"
                      style={window.location.pathname === "/admin" ? {...styles.tabItem, ...styles.activeTabItem} : styles.tabItem}>Documents</Link>
                <Link to="/suggestions" className="tab-item"
                      style={window.location.pathname === "/suggestions" ? {...styles.tabItem, ...styles.activeTabItem} : styles.tabItem}>Suggestions</Link>
                <Link to="/partners" className="tab-item"
                      style={window.location.pathname === "/partners" ? {...styles.tabItem, ...styles.activeTabItem} : styles.tabItem}>Partners</Link>
            </div>
            <div style={styles.filterContainer}>
                <div style={styles.inputContainer}>
                    <h3>Filter by:</h3>
                    <input
                        style={styles.inputField}
                        name="user"
                        type="text"
                        placeholder="User"
                        value={filters.user}
                        onChange={handleFilterChange}
                    />
                    <input
                        style={styles.inputField}
                        name="rating"
                        type="text"
                        placeholder="Rating"
                        value={filters.rating}
                        onChange={handleFilterChange}
                    />
                </div>
            </div>
            <div style={styles.container}>
                {filteredSuggestions.map((suggestion, index) => (
                    <div key={index} style={styles.personalCardInfo}>
                        <SuggestionCard suggestion={suggestion}/>
                    </div>
                ))}
            </div>
            <Footer/>
        </div>
    );
};

export default Suggestions;
