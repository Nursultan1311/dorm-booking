// ... other imports ...
import axios from 'axios';
import ProfileHeader from "../ProfileHeader/ProfileHeader";
import {Link} from "react-router-dom";
import Footer from "../Footer/Footer";
import React, {useEffect, useState} from "react";
import {FaUpload} from "react-icons/fa";
import {BsFillFileEarmarkTextFill} from "react-icons/bs";
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';

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
        padding: '0 5% 5% 5%',
        maxWidth: '100%',
    },
};


const PickPlace = () => {
    return (
        <div>
            <ProfileHeader/>
            <div style={styles.container}>
                <div style={{width: '60%'}}>
                    <img width={'100%'} src='book_place.png'/>

                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default PickPlace;
