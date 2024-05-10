import axios from 'axios';
import {Link, useNavigate, useParams} from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import React, { useEffect, useRef, useState } from "react";
import { FaUpload } from "react-icons/fa";
import { BsFillFileEarmarkTextFill } from "react-icons/bs";
import Header from "../../components/Header/Header";
import time from "../Booking/img.png";
import {Doughnut} from "react-chartjs-2";
import AdminHeader from "../../components/HeaderAdmin/Header";

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
        width: '350px'
    },
    statusLabel: {
        padding: '5px 10px',
        borderRadius: '10px',
        fontWeight: 'bold',
        color: 'black'
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
        background: '#fff',
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
        width: '100%',
        backgroundColor: '#F6F7F9'
    },
    card: {
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        padding: '20px',
        background: '#fff',
        borderRadius: '15px'
    },
    cardContent: {
        fontWeight: 'bold',
        marginBottom: '10px'
    },
    documentItem: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '10px',
    },
    statusButton: {
        padding: '10px 20px',
        border: 'none',
        borderRadius: '20px',
        cursor: 'pointer',
        fontWeight: 'bold',
    },
    approved: {
        backgroundColor: '#28A745',
        color: 'white',
    },
    rejected: {
        backgroundColor: '#DC3545',
        color: 'white',
    },
    pending: {
        backgroundColor: '#FFC107',
        color: 'black',
    },
    modal: {
        position: 'fixed',
        top: '20%',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.25)',
        zIndex: '1000',
    },
    modalOverlay: {
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: '500',
    },
    modalHeader: {
        marginBottom: '20px',
    },
    modalCloseBtn: {
        cursor: 'pointer',
        float: 'right',
        border: 'none',
        background: 'none',
    },
    formControl: {
        marginBottom: '10px',
    },
    input: {
        width: '100%',
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
    },
    submitBtn: {
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        backgroundColor: '#0056b3',
        color: 'white',
        cursor: 'pointer',
    },
};




const DocumentUploadCard = ({ onUploadSuccess, onUploadFailure }) => {
    const [documents, setDocuments] = useState([
        {
            decline: '',
            title: 'Удостоверение личности',
            status: 'Not Set',
            required: true
        },
        {
            decline: '',
            title: 'Справка 086',
            status: 'Not Set',
            required: true
        },
        {
            decline: '',
            title: '075 форма',
            status: 'Not Set',
            required: true
        },
        {
            decline: '',
            title: 'Адресная справка',
            status: 'Not Set',
            required: true
        },
        {
            decline: '',
            title: 'Лист о приеме документов в университет',
            status: 'Not Set',
            required: true
        },
        {
            decline: '',
            title: 'Заявление',
            status: 'Not Set',
            required: true
        },
        {
            decline: '',
            title: 'Справка об инвалидности',
            status: 'Not Set',
            required: false
        },
        {
            decline: '',
            title: 'Справка о зарплате',
            status: 'Not Set',
            required: false
        },
        {
            decline: '',
            title: 'Многодетная семья',
            status: 'Not Set',
            required: false
        },
        {
            decline: '',
            title: 'Family status',
            status: 'Not Set',
            required: false
        }
    ]);
    useEffect(() => {
        loadDocuments()
    }, []);
    let { id } = useParams();

    const loadDocuments = () => {
        fetch('https://dorm-booking.up.railway.app/api/documents/' + id)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                handleUploadSuccess(data);
            })
            .catch(error => console.error('Error fetching documents', error));
    }

    const handleUploadSuccess = (newDocument) => {
        const mergedDocuments = [...documents];
        newDocument.forEach(apiItem => {
            const existingDocumentIndex = mergedDocuments.findIndex(doc => doc.title === apiItem.title);
            if (existingDocumentIndex !== -1) {
                mergedDocuments[existingDocumentIndex] = {
                    ...mergedDocuments[existingDocumentIndex],
                    id: apiItem.id,
                    score: apiItem.score,
                    status: apiItem.status,
                    file: apiItem.file,
                    decline: apiItem.decline
                };
            } else {
                mergedDocuments.push({
                    id: apiItem.id,
                    title: apiItem.title,
                    score: apiItem.score,
                    status: apiItem.status,
                    file: apiItem.file,
                    decline: apiItem.decline
                });
            }
        });
        setDocuments(mergedDocuments);
    };

    const [showModal, setShowModal] = useState(false);
    const [currentDoc, setCurrentDoc] = useState(null);

    const openModal = (doc) => {
        setCurrentDoc(doc);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setCurrentDoc(null);
    };

    return (
        <div style={{...styles.card, ...newStyles.card}}>
            <input type="file" style={newStyles.fileInput} id="file" hidden/>
            <h3>Mandatory Documents:</h3>
            <ul style={newStyles.documentList}>
                {documents.map((doc, index) => (
                    <div>
                        {doc.required === true ? (<div>
                            <li key={doc.id} style={newStyles.documentItem}>
                                <div style={{display: "flex", alignItems: "center", gap: '30px'}}>
                                    <BsFillFileEarmarkTextFill style={newStyles.documentIcon}/>
                                    <div style={newStyles.documentInfo}>
                                        {doc.title}{doc.required && <span style={{color: 'red'}}> *</span>}
                                        <br/>
                                        <a href={'https://dorm-booking.up.railway.app/media/' + doc.file}>{doc.file}</a>
                                    </div>


                                    <span style={{
                                        ...newStyles.statusLabel,
                                        ...(doc.status === 'pending' && newStyles.statusPending),
                                        ...(doc.status === 'approved' && newStyles.statusApproved),
                                        ...(doc.status === 'rejected' && newStyles.statusRejected),
                                    }}>

                                        {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                                    </span>

                                    {doc.status === 'rejected' &&
                                        <span style={{color: 'red'}}>
                                        {doc.decline}
                                    </span>}
                                </div>
                                {
                                    (doc.status === 'rejected' || doc.status === 'pending') &&
                                    <button style={{width: 'max-content'}}
                                            onClick={() => doc.status !== 'Approved' && openModal(doc)}
                                    >
                                        edit
                                    </button>
                                }
                            </li>

                        </div>) : (<a></a>)}
                    </div>
                ))}
            </ul>
            <br/>
            <h3>Additional Documents:</h3>
            <ul style={newStyles.documentList}>
            {documents.map((doc, index) => (
                    <div>
                        {doc.required !== true ? (<div>
                            <li key={doc.id} style={newStyles.documentItem}>
                                <div style={{display: "flex", alignItems: "center", gap: '30px'}}>
                                    <BsFillFileEarmarkTextFill style={newStyles.documentIcon}/>
                                    <div style={newStyles.documentInfo}>
                                        {doc.title}{doc.required && <span style={{color: 'red'}}> *</span>}
                                        <br/>
                                        <a href={'https://dorm-booking.up.railway.app/media/' + doc.file}>{doc.file}</a>
                                    </div>
                                    <span style={{
                                        ...newStyles.statusLabel,
                                        ...(doc.status === 'pending' && newStyles.statusPending),
                                        ...(doc.status === 'approved' && newStyles.statusApproved),
                                        ...(doc.status === 'rejected' && newStyles.statusRejected),
                                    }}>
                                        {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                                    </span>
                                </div>
                                {
                                    (doc.status === 'rejected' || doc.status === 'pending') &&
                                    <button style={{width: 'max-content'}}
                                            onClick={() => doc.status !== 'Approved' && openModal(doc)}
                                    >
                                        edit
                                    </button>
                                }

                            </li>
                        </div>) : (<a></a>)}
                    </div>
            ))}
            </ul>
            {showModal && (
                <StatusChangeModal
                    isOpen={showModal}
                    onClose={closeModal}
                    documentTitle={currentDoc.title}
                    documentId={currentDoc.id}
                />
            )}
        </div>
    );
};
const StatusChangeModal = ({ isOpen, onClose, documentTitle, documentId }) => {
    const [status, setStatus] = useState('Approved');
    const [reason, setReason] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        await fetch('https://dorm-booking.up.railway.app/api/document/update/' + documentId, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'status': status, 'reject_reason': reason})
        })
        window.location.reload()
    };

    if (!isOpen) return null;

    return (
        <>
            <div style={styles.modalOverlay} onClick={onClose} />
            <div style={styles.modal}>
                <div style={styles.modalHeader}>
                    <h4 style={{fontWeight: 'bolder'}}>Change Status - {documentTitle}</h4>
                    <button onClick={onClose} style={styles.modalCloseBtn}>X</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div style={styles.formControl}>
                        <label>Status:</label>
                        <select value={status} onChange={(e) => setStatus(e.target.value)} style={styles.input}>
                            <option value="Approved">Approved</option>
                            <option value="Rejected">Rejected</option>
                            <option value="Pending">Pending</option>
                        </select>
                    </div>
                    {status === 'Rejected' && (
                        <div style={styles.formControl}>
                            <label>Reason:</label>
                            <textarea value={reason} onChange={(e) => setReason(e.target.value)} style={styles.input} />
                        </div>
                    )}
                    <button type="submit" style={styles.submitBtn}>Update Status</button>
                </form>
            </div>
        </>
    );
};


const Profile = () => {
    let { id} = useParams()
    const handleUploadFailure = (error) => {
        console.error('Error uploading file:', error);
    };
    const navigate = useNavigate()

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
        fetch('https://dorm-booking.up.railway.app/api/application/' + id)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setApplication(data)
            })
            .catch(error => console.error('Error fetching documents', error));
        fetchUserData()
    }, []);
    const fetchUserData = () => {
        fetch('https://dorm-booking.up.railway.app/api/user', {
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

    return (
        <div>
            <AdminHeader/>
            <div style={styles.container}>
                <h1 style={styles.h1}>Documents пользователя</h1>
                <div style={{
                    border: '1px solid grey',
                    borderRadius: '20px',
                    width: '90%',
                    padding: '2%',
                    marginLeft: '5%',
                    background: 'white'
                }}>
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

                    <h4 style={{fontWeight: 'bold'}}>{application.user} | <span
                        style={{fontWeight: 'normal'}}>{application.university}</span></h4>
                    <div style={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
                        <div>
                            <span style={{fontWeight: 'bolder'}}>Make sure you have completed all Documents before the end of the application process.</span>

                            <p className="popular__time2" style={{display: 'flex', alignItems: 'center'}}><img
                                width={'4%'} src={time}/>{application.days_left / 3600 / 24} days left </p>
                        </div>
                        <div style={{position: 'relative', width: '150px', height: '150px'}}>
                            <Doughnut data={data}/>
                            <h3 style={{position: 'absolute', top: '43%', left: '33%'}}>{application.chance}%</h3>
                        </div>
                    </div>

                </div>
                <div style={styles.personalCardInfo}>
                    <DocumentUploadCard onUploadFailure={handleUploadFailure}/>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Profile;
