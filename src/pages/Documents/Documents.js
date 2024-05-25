import axios from 'axios';
import {Link, useNavigate} from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import { useEffect, useRef, useState } from "react";
import { FaUpload } from "react-icons/fa";
import { BsFillFileEarmarkTextFill } from "react-icons/bs";
import Header from "../../components/Header/Header";

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
    }
};




const DocumentUploadCard = ({ onUploadSuccess, onUploadFailure }) => {
    const navigate = useNavigate()
    const [documents, setDocuments] = useState([
        {
            id: 1,
            decline: '',
            title: 'Удостоверение личности',
            status: 'Not Set',
            required: true
        },
        {
            id: 2,
            decline: '',
            title: 'Справка 086',
            status: 'Not Set',
            required: true
        },
        {
            id: 3,
            decline: '',
            title: '075 форма',
            status: 'Not Set',
            required: true
        },
        {
            id: 4,
            decline: '',
            title: 'Адресная справка',
            status: 'Not Set',
            required: true
        },
        {
            id: 5,
            decline: '',
            title: 'Лист о приеме документов в университет',
            status: 'Not Set',
            required: true
        },
        {
            id: 6,
            decline: '',
            title: 'Заявление',
            status: 'Not Set',
            required: true
        },
        {
            id:7,
            decline: '',
            title: 'Справка об инвалидности',
            status: 'Not Set',
            required: false
        },
        {
            id:8,
            decline: '',
            title: 'Справка о зарплате',
            status: 'Not Set',
            required: false
        },
        {
            id:9,
            decline: '',
            title: 'Многодетная семья',
            status: 'Not Set',
            required: false
        },
        {
            id:10,
            decline: '',
            title: 'Family status',
            status: 'Not Set',
            required: false
        }
    ]);

    useEffect(() => {
        loadDocuments()
    }, []);

    const loadDocuments = () => {
        fetch('https://dorm-booking.up.railway.app//api/documents', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'jwt': localStorage.getItem('accessToken')})
        })
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

    const handleFileUpload = async (file, id, title) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', title);
        formData.append('id', id);
        formData.append('jwt', localStorage.getItem('accessToken'));

        try {
            const response = await axios.post('https://dorm-booking.up.railway.app//api/upload_document', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            });
            console.log('File uploaded successfully:', response.data);
            handleUploadSuccess(response.data);
        } catch (error) {
            console.error('Error uploading file:', error);
            onUploadFailure(error);
        }
        loadDocuments()

        // window.location.reload()
    };

    const hiddenFileInput = useRef({});
    const handleClick = (id) => {
        console.log(id)
        hiddenFileInput.current[id].click();
    };

    const handleChange = (event, id, title) => {
        const file = event.target.files[0];
        if (file) {
            handleFileUpload(file, id, title);
        }
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
                                        {doc.file}
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
                                {doc.title}
                                {doc.status !== 'approved' ? (<div>
                                    <button style={newStyles.uploadButton} onClick={() => handleClick(doc.id)}>
                                        <FaUpload style={{marginRight: '10px'}}/>
                                        Upload Document
                                    </button>
                                    <input
                                        type="file"
                                        onChange={(event) => handleChange(event, doc.id, doc.title)}
                                        ref={input => hiddenFileInput.current[doc.id] = input || []}
                                        style={{display: 'none'}}
                                    /></div>) : (<div></div>)}

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
                                        {doc.file}
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
                                {doc.status !== 'approved' ? (<div>
                                    <button style={newStyles.uploadButton} onClick={() => handleClick(doc.id)}>
                                        <FaUpload style={{marginRight: '10px'}}/>
                                        Upload Document
                                    </button>
                                    <input
                                        type="file"
                                        onChange={(event) => handleChange(event, doc.id, doc.title)}
                                        ref={input => hiddenFileInput.current[doc.id] = input || []}
                                        style={{display: 'none'}}
                                    /></div>) : (<div></div>)}

                            </li>
                        </div>) : (<a></a>)}
                    </div>
                ))}
            </ul>
        </div>
    );
};

const Profile = () => {
    const handleUploadFailure = (error) => {
        console.error('Error uploading file:', error);
    };

    return (
        <div>
            <Header/>
            <div style={styles.container}>
                <h1 style={styles.h1}>Personal account </h1>
                <nav style={styles.nav}>
                    <Link to="/profile" style={styles.navItem}>Personal information </Link>
                    <Link to="/documents" style={styles.navItemMain}>Documents</Link>
                    <Link to="/bookings" style={styles.navItem}>Booking</Link>
                </nav>
                <div style={styles.personalCardInfo}>
                    <DocumentUploadCard onUploadFailure={handleUploadFailure}/>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Profile;
