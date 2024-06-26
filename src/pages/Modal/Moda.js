import React, { useState } from 'react';
import './Modal.css';
import axios from "axios"; // Ensure to create a corresponding CSS file for styling

const Modal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        university: '',
        phone: '',
        email: '',
        document: null,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'document') {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        const response = await axios.post('https://dorm-booking.up.railway.app/api/request-for-partnership', formData);
        console.log(response.data);
        onClose(); // Close the modal on form submission
    };

    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Partner with us</h2>
                <p style={{width: "80%"}}>Simply complete the form below and a member of our friendly team of experts will be in touch at a time that suits you.</p>
                <p><a style={{color: 'red'}}> * </a> Required information</p>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="name" placeholder="Full name *" required onChange={handleChange}/>
                    <input type="text" name="university" placeholder="University name *" required
                           onChange={handleChange}/>
                    <input type="text" name="phone" placeholder="Phone number *" required
                           onChange={handleChange}/>
                    <input type="email" name="email" placeholder="Email address *" required onChange={handleChange}/>
                    <input type="file" name="document" required onChange={handleChange}/>
                    <p style={{width: "max-content"}}>By submitting this form you you agree to the privacy policy</p>
                    <button className='button' type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default Modal;
